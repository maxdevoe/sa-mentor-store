import '../App.css'

const PlaceOrder = (props) => {
    return (
        <span>
            <button className='productButton' onClick={() => props.placeOrderHandler(props.product)}>Place Order</button>
        </span>
    )
}

export default PlaceOrder;