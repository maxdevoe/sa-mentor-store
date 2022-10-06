from time import gmtime
from flask import Flask, request
from utils import _create_klaviyo_event_payload, _encode_json_dictionary
import requests
import json
import base64
import calendar

app = Flask(__name__)

@app.route("/")
def index():
    return {"hello": "world"}

@app.route("/catalog", methods=['GET'])
def catalog():
    catalog = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    return catalog.json()

@app.route("/place_order", methods=['POST'])
def place_order():
    event = request.json["event"]
    serialized_event = _create_klaviyo_event_payload(event)


    url = "https://a.klaviyo.com/api/track"
    headers = {
        "accept": "text/html",
        "content-type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=f"data={_encode_json_dictionary(serialized_event)}", headers=headers)
    return response.text

