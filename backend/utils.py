import time
import random

def _create_klaviyo_event_payload(event):
    serialized_event = {
            "token": "R53yng",
            "event": "Ordered Product",
            "customer_properties": {
                "$email": "john.smith@gmail.com",
                "$first_name": "John",
                "$last_name": "Smith",
            },
            "properties": {
                "$event_id": f"{random.randint(1000,9999)}_EVENT",
                "value": event["price"],
                "OrderId": "43251",
                "ProductID": event["id"],
                "SKU": event["sku"],
                "ProductName": event["title"],
                "ItemPrice": event["price"],
                "ProductURL": event["link"],
                "ImageURL": event["image_link"],
                "Categories": event["categories"],
            },
            "time": int(time.time()),
        }
    return serialized_event