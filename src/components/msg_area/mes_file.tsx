import React from "react"
import { serverUri } from "../../constant";

interface Props { 
    file: string;
    time: string;
    date: string;
}
const MesFile : React.FC<Props> = ({ file, time, date }) => {

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
    <div className="chat_widget_main_message_container">
    <div className="chat_widget_main_message_right">
      <div className="chat_widget_main_response_right_file_container">
        <span className="chat_widget_main_response_right_filename">{ file.length > 10 ? file.slice(0, 10) + "..." : file.slice(0, file.lastIndexOf(".")) }</span>
        <span className="chat_widget_main_message_right_file_extension" data-url={`${serverUri}/temp/${file}`} onClick={openFile}>{ getFileExtension(file) }</span>
      </div>
    <span className="chat_widget_main_response_right_time">{ time }</span>
    </div>

    <div className="chat_widget_main_date_time">{ date }</div>
  </div>
  )
}

export default MesFile