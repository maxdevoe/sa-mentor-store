from flask import Flask, request
from utils import _create_klaviyo_track_payload, _create_klaviyo_subscribe_payload
import requests
import json

app = Flask(__name__)

@app.route("/")
def index():
    # comment
    return {"hello": "world"}

@app.route("/catalog", methods=['GET'])
def catalog():
    catalog = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    return catalog.json()

@app.route("/place_order", methods=['POST'])
def place_order():
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
    subscriber = request.json["subscriber"]
    serialized_event = _create_klaviyo_subscribe_payload(subscriber)

    url = "https://a.klaviyo.com/api/v2/list/TqZGgR/subscribe?api_key=pk_0b69b95dd7d07bfe1cdfcdb344fad4cf70"
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(url, json=serialized_event, headers=headers)
    return response.text