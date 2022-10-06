import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import PlaceOrder from "./components/PlaceOrder";

const Product = (props) => {
  return (
    <span>
      {props.products.map((product) => {
        return (
          <div>
            <p className="description">{product.description}</p>
            <p className="title">{product.title}</p>
            <p className="productId">#{product.id}</p>
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
      const response = await axios.post('/place_order', {event});
      debugger
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  useEffect(() => { getCatalog() }, [])

  return (
    <div>
      <Product products={products} handlePlaceOrder={handlePlaceOrder} />
    </div>
  )
}

export default App;
