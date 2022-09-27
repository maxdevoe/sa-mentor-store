import requests
import json

def hello():
    return print({"Hello": "Flask"})

def load_catalog():
    url = requests.get('https://raw.githubusercontent.com/benjimelito/Sample-Repository/master/sample3.json')
    catalog = url.json()
    return print(catalog)

if __name__ == "__main__":
    load_catalog()
