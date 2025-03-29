import React from "react"
import { defaultMsgDp, serverUri } from "../../constant";

interface Props { 
    img: [string, string];
    file: string;
    time: string;
    date: string;
}
const ResFile : React.FC<Props> = ({ file, img, time, date }) => {

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
    <div className="chat_widget_main_response_right_file_container">
      <span className="chat_widget_main_response_right_filename no_accent">{ file.length > 10 ? file.slice(0, 10) + "..." : file.slice(0, file.lastIndexOf(".")) }</span>
      <span className="chat_widget_main_response_right_file_extension" data-url={`${serverUri}/temp/${file}`} onClick={openFile}>{ getFileExtension(file) }</span>
    </div>
    <span className="chat_widget_main_response_right_time res">{ time }</span>
    </div>

    <div className="chat_widget_main_date_time">{ date }</div>
  </div>
  )
}

export default ResFile