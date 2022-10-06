import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import PlaceOrder from "./components/PlaceOrder";

const Product = (props) => {
  return (
    <span class="products">
      {props.products.map((product) => {
        return (
          <div class="productContainer">
            <p class="description">{product.description}</p>
            <p class="title">{product.title}</p>
            <p class="productId">#{product.id}</p>
            <img src={product.image_link} />
            <p className="price">${product.price}</p>
            <button className="productButton">
              <p className="productLink"><a href={product.link}>Go to Product Page</a></p>
            </button>
            <p className="sku">{product.sku}</p>
            <PlaceOrder placeOrderHandler={props.handlePlaceOrder} product={product}/>
          </div>
        )
      })}
    </span>
  )
}

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
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
      console.log(event)
      const response = await axios.post('/place_order', {event});
      console.log(response)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  const handleOnsiteTracking = async () => {
    return "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=R53yng"
  }

  useEffect(() => { getCatalog() }, [])
  useEffect(() => {handleOnsiteTracking}, [])

  return (
    <div>
      <Product products={products} handlePlaceOrder={handlePlaceOrder} />
    </div>
  )
}

export default App;
