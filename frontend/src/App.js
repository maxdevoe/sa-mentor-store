import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import Product from "./components/Product";
import Subscribe from "./components/Subscribe";

const App = () => {
  /*
  The App component is our top level component and what gets rendered on our static page. It 
  also contains our state variables, event handler functions, and initially rendered child
  components.
  */

  /*
  STATE
  In react, state is a collction of variables (ex. products) and setter functions (ex. setProducts)
  that allow us to manage changing data within the application. The useState hook is how we declare
  a state variable and it's default type. In this application we have 3 state variables and their
  corresponding setter functions.
  */
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [subscriber, setSubsriber] = useState('');

  /*
  The getCatalog function is used to fetch the catalog data from our server. This is done using the
  axios library to make an ajax call to the /catalog endpoint in our Flask app. The object returned
  will have various properties including status, which indicates the http response code, and data,
  which will, upon a 200 response, contain our catalog data in JSON/object format. If our ajax call
  is successful, we save our catalog data in state.

  The try catch block will attempt to execute the code in the try section and, if that fails, execute
  the code in the catch section.
  */
  const getCatalog = async () => {
    try {
      const response = await axios.get("/catalog");
      if (response.status === 200) {
        setProducts([...response.data])
      }
    } catch (err) {
      setError(err)
      console.log(err)
    }
  };

  /*
  The handlePlaceOrder event handler function is used to send product data to our server. When the 
  "Place Order" button is clicked, the entire product object is passed into this function and used
  as the data paremeter in the ajax call to our Flask app.
  */
  const handlePlaceOrder = async (event) => {
    try {
      const response = await axios.post('/place_order', {event});
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  /*
  The handleViewProduct event handler function works the same as handlePlaceOrder except we change the
  data structure before we make the ajax call. The same product data is passed to this function but
  for a viewed product event, we only need 3 fields instead of all 8.
  */
  const handleViewProduct = async (event) => {
    try {
      let viewedProduct = {
        'title':event.title,
        'link':event.link,
        'price':event.price
      };
      const response = await axios.post('/track_viewed_product', {viewedProduct});
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  /*
  The handleSubscriber event handler function will set state based on typed string inside our text input.
  This will update state in real time on each key stroke.
  */
  const handleSubscriber = (event) => {
    console.log(event.target.value)
    setSubsriber(event.target.value)
  }

  const handleClickSubscriber = async () => {
    try {
      const response = await axios.post('/subscribe', {subscriber})
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  /*
  The useEffect hook is used to execute functions on page load - in this case, the getCatalog function
  which fetches our catalog data to be displayed on the page.
  */
  useEffect(() => { getCatalog() }, [])

  /*
  Each react component is a function and needs to return something. But also in react, the return section
  contains a dynamic HTML/Javscript language called JSX which allows us to Render child components that we define
  in addition to regular HTML elements. We can also pass our state variables and event handler functions as props
  to child components.
  */
  return (
    <div>
      <Product products={products} handlePlaceOrder={handlePlaceOrder} handleViewProduct={handleViewProduct} />
      <Subscribe handleSubscriber={handleSubscriber} handleClickSubscriber={handleClickSubscriber} />
    </div>
  )
}

// In order for react components to be used outside of their files, we need to export them.
export default App;
