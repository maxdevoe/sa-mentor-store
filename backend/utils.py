import time
import random

def _create_klaviyo_event_payload(data, event_type):
    serialized_data = {
            "token": "R53yng",
            "event": event_type,
            "customer_properties": {
                "$email": "john.smith@gmail.com",
                "$first_name": "John",
                "$last_name": "Smith",
            },
            "properties": __add_placed_order_details(data) if event_type == "Placed Order" else __add_viewed_product_details(data),
            "time": int(time.time()),
        }
    return serialized_data

def __add_placed_order_details(data):
    return {
        "$data_id": f"{random.randint(1000,9999)}_data",
        "value": data["price"],
        "OrderId": "43251",
        "ProductID": data["id"],
        "SKU": data["sku"],
        "ProductName": data["title"],
        "ItemPrice": data["price"],
        "ProductURL": data["link"],
        "ImageURL": data["image_link"],
        "Categories": data["categories"],
    }

def __add_viewed_product_details(data):
    return {
        "ProductName": data["title"],
        "value": data["price"],
        "ProductUrl": data["link"]
    }