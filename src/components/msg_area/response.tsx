import React from "react";

interface Props{
    img: [string, string];
    msg: string;
    time: string;
    date: string;
}

const Response : React.FC<Props> = ({msg, img, time, date}) => {

  return (
    <div className="chat_widget_main_response_container">
    <div className="chat_widget_main_response_left">
      {img && <div style={{backgroundColor: img[0]}} className="chat_ui_dp customer_profile_picture" >{ img[1] }</div>}
    </div>
    <div className="chat_widget_main_response_right">
      <span className="chat_widget_main_response_right_message">{ msg }</span>
      <span className="chat_widget_main_response_right_time res">{ time }</span>
    </div>
    <div className="chat_widget_main_date_time">{ date }</div>
  </div>
  )
}

export default Response