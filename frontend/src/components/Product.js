import PlaceOrder from "./PlaceOrder";

const Product = (props) => {
    return (
      <span className="products">
        {props.products.map((product) => {
          return (
            <div className="productContainer">
              <p className="description">{product.description}</p>
              <p className="title">{product.title}</p>
              <p className="productId">#{product.id}</p>
              <img src={product.image_link} />
              <p className="price">${product.price}</p>
              <button className="productButton" onClick={() => props.handleViewProduct(product)}>
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

export default Product;