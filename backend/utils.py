import time
import random

def _create_klaviyo_track_payload(data, event_type):
    """
    This is a helper function to serialize a Klaviyo Track event payload. Track
    events will all contain token, event, customer properties, properties, and time.
    Event and properties will be what we use to differentiate between event types.
    Event will be set by the event_type function parameter and properties will be set
    conditionally based on the event_type function parameter using 1 of 2 other helper
    functions. The entire either Placed Order or Viewed Product payload will be returned.

    inputs:
    data = json event data
    event_type = name of event in string format

    returns a serialized JSON event payload
    """
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
    """
    This function will apply properties of a supplied JSON object to the "properties" field
    of a Placed Order payload.
    """
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
    """
    This function will apply properties of a supposed JSON object to the "properties" field
    of a Viewed Product payload.
    """
    return {
        "ProductName": data["title"],
        "value": data["price"],
        "ProductUrl": data["link"]
    }

def _create_klaviyo_subscribe_payload(email):
    """
    This function will return a properly formatted /subscribe endpoint payload using the supplied email.
    """
    return {
        "profiles": [
            {"email": email}
        ]
    }