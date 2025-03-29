import React from "react";
import { defaultMsgDp, getColorFromName, getInitials } from "../constant";

interface Props {
    presence: boolean;
    currentChat: string | undefined;
    setCurrentChat: (value: string) => void;
    setUser: (value: string) => void;
    user: string | undefined;
    userImg: string | undefined;
    userID: string | undefined;
    preview: string;
    time: string | undefined;
    unread: string | undefined;
}

const ChatListMsg : React.FC<Props> = ({ presence, currentChat, setCurrentChat, setUser, user, userImg, userID, preview, time, unread }) => {


    const customImage = getInitials(user || userID || "Unknown User");
    const bgColor : string = getColorFromName(user || userID || "Unknown User");



  return (
    <div className="chat_list_msg" onClick={() => {

        if(userID && userID !== ""){
            setCurrentChat(userID);
            setUser(user || "Unknown User");
        }
        

    }}>
        <div className="chat_list_msg_left">
            <div className="chat_list_image_presence">
                {userImg === "" && <div style={{backgroundColor: bgColor}} className="customer_profile_picture" >{ customImage }</div>}
                {userImg && <img src={userImg || defaultMsgDp} className="chat_list_image" />}
                <div style={{backgroundColor: presence ? "#00c900" : "gray" }} className="chat_list_presence"></div>
            </div>
        </div>

        <div className="chat_list_msg_center">
            <span className="chat_list_msg_user">{ user || "Unknown user" }</span>
            <span className="chat_list_msg_preview">{ preview.length > 25 ? preview.slice(0, 25) + "..." : preview }</span>
        </div>
        <div className="chat_list_msg_right">
            <span className="chat_list_msg_time_date">{ time }</span>
            <div className="chat_list_unread_message">{ unread }</div>
        </div>

        {currentChat === userID && <div className="chat_list_active_in_view"></div>}
    </div>
  )
}

export default ChatListMsg