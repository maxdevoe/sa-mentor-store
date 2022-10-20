import PlaceOrder from "./PlaceOrder";

/*
A react child component will rarely contain logic outside of the return section. The return section
will contain css classes, other child components, and regular HTML elements that help format how the
component is displayed on the page. 

A child component will also take in the props that we passed to it from the top level component.
*/
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