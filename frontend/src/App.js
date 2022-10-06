import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

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
            <p class="price">${product.price}</p>
            <button class="productButton">
              <p class="productLink"><a href={product.link}>Go to Product Page</a></p>
            </button>
            <p class="sku">{product.sku}</p>
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

  useEffect(() => { getCatalog() }, [])

  return (
    <div>
      <Product products={products} />
    </div>
  )
}

export default App;
