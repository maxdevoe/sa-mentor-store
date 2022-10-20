from flask import Flask, request
from utils import _create_klaviyo_track_payload, _create_klaviyo_subscribe_payload
import requests
import json
import random

app = Flask(__name__)

@app.route("/")
def index():
    """
    The index endpoint is used to test if the service is working.
    """
    return {"Hello": "Flask"}

@app.route("/catalog", methods=['GET'])
def catalog():
    """
    Catalog enpoint will use the requests library to retrieve the json
    catalog from the supplied URL and return the JSON encoded content.
    """
    catalog = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    return catalog.json()

@app.route("/place_order", methods=['POST'])
def place_order():
    """
    Place order endpoint will retrieve a placed order event payload from the 
    client, serialize it using a helper function, and finally make a request
    to our Track API using the requests library. The Track API requires the
    payload to be a JSON string which json.dumps() will accomplish. The Track
    API response is then returned to our client.
    """
    event = request.json["event"]
    serialized_event = _create_klaviyo_track_payload(event, "Placed Order")

    url = "https://a.klaviyo.com/api/track"
    headers = {
        "accept": "text/html",
        "content-type": "application/json"
    }

    response = requests.post(url, data=json.dumps(serialized_event), headers=headers)
    return response.text

@app.route("/track_viewed_product", methods=['POST'])
def track_viewed_product():
    """
    Track viewed product endpoint works the same was as the place order endpoint,
    same API, different event payload.
    """
    event = request.json["viewedProduct"]
    serialized_event = _create_klaviyo_track_payload(event, "Viewed Product")

    url = "https://a.klaviyo.com/api/track"
    headers = {
        "accept": "text/html",
        "content-type": "application/json"
    }

    response = requests.post(url, data=json.dumps(serialized_event), headers=headers)
    return response.text

@app.route("/subscribe", methods=['POST'])
def subscribe():
    """
    Subscribe endpoint will retrieve a subscribe user event payload from the
    client, serialize it using a helper function, and finally make a request
    to the /subscribe endpoint of our List API using the requests library. The
    List API response is then returned to our client.
    """
    subscriber = request.json["subscriber"]
    serialized_event = _create_klaviyo_subscribe_payload(subscriber)

    url = "https://a.klaviyo.com/api/v2/list/TqZGgR/subscribe?api_key=pk_0b69b95dd7d07bfe1cdfcdb344fad4cf70"
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(url, json=serialized_event, headers=headers)
    return response.text