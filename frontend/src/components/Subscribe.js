const Subscribe = (props) => {
    return (
        <span>
            <input type='text' onChange={props.handleSubscriber} placeholder='Enter Email'/>
            <button onClick={props.handleClickSubscriber}>Subscribe to Newsletter</button>
        </span>
    )
}

export default Subscribe;