import React from "react";

interface Props{
    msg: string;
    time: string;
    date: string;
}

const Message : React.FC<Props> = ({msg, time, date}) => {
  return (
    <div className="chat_widget_main_message_container">
    <div className="chat_widget_main_message_right">
    <span className="chat_widget_main_response_right_message message"> {msg} </span>
    <span className="chat_widget_main_response_right_time">{time}</span>
    </div>

    <div className="chat_widget_main_date_time">{date}</div>
  </div>
  )
}

export default Message