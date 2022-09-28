import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

const Product = (props) => {
  return (
    <span>
      {props.products.map((product) => {
        return (
          <div>
            <p>{product.description}</p>
            <p>{product.id}</p>
            <p>{product.image_link}</p>
            <p>{product.link}</p>
            <p>{product.price}</p>
            <p>{product.sku}</p>
            <p>{product.title}</p>
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

  useEffect(() => {getCatalog()}, [])

  return (
    <div>
      <Product products={products} />
    </div>
  )
}

export default App;
