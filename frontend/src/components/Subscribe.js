const Subscribe = (props) => {
    return (
        <span>
            <input type='text' onChange={props.handleSubscribe} placeholder='Enter Email'/>
            <button onClick={props.handleClickSubscribe}>Subscribe to Newsletter</button>
        </span>
    )
}

export default Subscribe;