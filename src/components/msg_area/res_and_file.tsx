import React from "react";
import { server } from "../../constant";

interface Props{
    img: [string, string];
    file: string;
    msg: string;
    time: string;
    date: string;
}

const ResandFile : React.FC<Props> = ({ msg, img, file, time, date }) => {

    const getFileExtension = (filename: string): string => {
        return filename.includes(".") ? filename.slice(filename.lastIndexOf(".") + 1) : "";
    };

    function openFile () {
        const ele = document.querySelector(".chat_widget_main_response_right_file_extension") as HTMLDivElement;
        if(ele){
            const url : string = ele.getAttribute("data-url") || "";

            window.open(url, "_blank");
        }
    }


  return (
    <div className="chat_widget_main_response_container">
    <div className="chat_widget_main_response_left">
    {img && <div style={{backgroundColor: img[0]}} className="chat_ui_dp customer_profile_picture" >{ img[1] }</div>}
    </div>
    <div className="chat_widget_main_response_right">
      <span className="chat_widget_main_response_right_message">{ msg }</span>
    <div className="chat_widget_main_response_right_file_container">
      <span style={{fontSize: "10px"}} className="chat_widget_main_response_right_filename no_accent">{ file.length > 10 ? file.slice(0, 10) + "..." : file.slice(0, file.lastIndexOf(".")) }</span>
      <span  className="chat_widget_main_response_right_file_extension" data-url={`${server}/temp/${file}`} onClick={openFile}>{ getFileExtension(file) }</span>
    </div>
    <span className="chat_widget_main_response_right_time res">{ time }</span>
    </div>

    <div className="chat_widget_main_date_time">{ date }</div>
  </div>
  )
}

export default ResandFile