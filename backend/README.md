# Backend or "server side" directory

In programming, the terms `backend` or `server side` can be used interchangably. Both refer to the code being executed on a server instead of on a user's computer. We typically use backend code to do things like execute complex logic or interface with other infrastructures such as databases.

For this application, we will be using Flask as the framework for our server side application. Flask is referred to as a "microframework" which basically means "framework used for microservices". It is lightweight and easy to get up and running. 

In the `app.py` module of the `backend` directory:
- We start with imports: `from flask import Flask`
    - This can be translated as: import the Flask class from the flask library.
- We then initialize our Flask application by binding it to a variable, in this case `app`
- We can now use our Flask app to create routes that will be used by our React client to read or write data. This is done by add the @app.route() decorator above our functions. A decorator (indicated by the @ symbol) is a python function that extends the behavior of another function without modifying it. In this case, it takes our `catalog()` function and adds a route to it using Flask's `route()` function.
- The `catalog()` function uses the `requests` library to load the contents of our flat file and return it json format.