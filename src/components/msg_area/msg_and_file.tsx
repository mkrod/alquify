import React from "react";
import { server } from "../../constant";

interface Props { 
    file?: string;
    msg: string;
    time: string;
    date: string;
}

const MsgandFile : React.FC<Props> = ({ msg, file = "", time, date }) => {

    const getFileExtension = (filename: string): string => {

      if(!filename) return "";
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
    <div className="chat_widget_main_message_container">
    <div className="chat_widget_main_message_right">
    <span className="chat_widget_main_response_right_message">{ msg }</span>
      <div className="chat_widget_main_response_right_file_container">
        <span  style={{fontSize: "10px"}} className="chat_widget_main_response_right_filename">
          {file ? (file.length > 10 ? file.slice(0, 10) + "..." : file.slice(0, file.lastIndexOf("."))) : "Unknown File"}
        </span>
        <span className="chat_widget_main_message_right_file_extension" data-url={`${server}/temp/${file}`} onClick={openFile}>{ getFileExtension(file) }</span>
      </div>
    <span className="chat_widget_main_response_right_time">{ time }</span>
    </div>

    <div className="chat_widget_main_date_time">{ date }</div>
  </div>
  )
}

export default MsgandFile
