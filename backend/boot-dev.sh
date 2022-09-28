#!/bin/bash

cd /app
pip install -e .

echo "Starting server.."
export FLASK_APP=app.py
export FLASK_DEBUG=true
flask run --host=0.0.0.0 --port=80
