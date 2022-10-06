const PlaceOrder = (props) => {
    return (
        <span>
            <button onClick={() => props.placeOrderHandler(props.product)}>Place Order</button>
        </span>
    )
}

export default PlaceOrder;