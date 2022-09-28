from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return {"hello": "world"}

@app.route("/catalog", methods=['GET'])
def catalog():
    catalog = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    return catalog.json()