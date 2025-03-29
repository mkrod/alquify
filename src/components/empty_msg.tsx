import React from 'react'
import "./css/empty_msg.css";

interface Props {
    image: string;
    message: string;
    message2: string;
}



const EmptyMsg : React.FC<Props> = ({ image, message, message2 }) => {
  return (
    <div className='empty_msg_container'>
        <img src={ image } className='empty_msg_image' />
        <span className='empty_msg_message'>{ message }</span>
        <span className='empty_msg_message_2'>{ message2 }</span>
    </div>
  )
}

export default EmptyMsg