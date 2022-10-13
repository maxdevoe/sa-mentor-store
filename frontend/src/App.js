import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import Product from "./components/Product";
import Subscribe from "./components/Subscribe";

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [subscribe, setSubsribe] = useState('');

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

  const handlePlaceOrder = async (event) => {
    try {
      const response = await axios.post('/place_order', {event});
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

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

  const handleSubscribe = (event) => {
    setSubsribe(event.target.value)
  }

  const handleClickSubscribe = async () => {
    debugger
    try {
      const response = await axios.post('/subscribe', {subscribe})
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  useEffect(() => { getCatalog() }, [])

  return (
    <div>
      <Product products={products} handlePlaceOrder={handlePlaceOrder} handleViewProduct={handleViewProduct} />
      <Subscribe handleSubscribe={handleSubscribe} handleClickSubscribe={handleClickSubscribe} />
    </div>
  )
}

export default App;
