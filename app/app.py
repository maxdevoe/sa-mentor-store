from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def hello():
    return {"Hello": "Flask"}

@app.route("/catalog")
def catalog():
    catalog = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    return catalog.json()

if __name__ == "__main__":
	app.run(debug=True,host="0.0.0.0")