import json
import base64
import calendar
import time

def _create_klaviyo_event_payload(event):
    serialized_event = {
            "token": "R53yng",
            "event": "Placed Order",
            "customer_properties": {
                "$email": "john.smith@test.com",
                "$first_name": "John",
                "$last_name": "Smith",
                "$phone_number": "5551234567",
                "$address1": "123 Abc st",
                "$address2": "Suite 1",
                "$city": "Boston",
                "$zip": "02110",
                "$region": "MA",
                "$country": "USA"
            },
            "properties": {
                "$event_id": "1234",
                "$value": event["price"],
                "OrderId": "1234",
                "Categories": event["categories"],
                "ItemNames": [event["title"]],
                "Items": [{
                    "ProductID": event["id"],
                    "SKU": event["sku"],
                    "ProductName": event["title"],
                    "ItemPrice": event["price"],
                    "ProductURL": event["link"],
                    "ImageURL": event["image_link"],
                    "Categories": event["categories"],
                }],
            },
            "time": time.time(),
        }
    return serialized_event

def _encode_json_dictionary(dictionary):
    json_string = json.dumps(dictionary)
    return base64.b64encode(json_string.encode()).decode()