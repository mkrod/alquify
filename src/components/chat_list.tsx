import { IoSettingsOutline } from "react-icons/io5"
import './css/chat_list.css';
import ChatListMsg from "./chat_list_msg";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "../constant/websocket";
import { server } from "../constant";
import EmptyMsg from "./empty_msg";

interface Props {
    currentChat: string | undefined;
    setCurrentChat: (value: string) => void;
    setUser: (value: string) => void;
}

const ChatList : React.FC<Props> = ({ currentChat, setCurrentChat, setUser }) => {

    const { online } = useWebSocket();

    const { refreshing, setRefreshing, latestMessage } = useWebSocket();
    interface msgProp{
        outgoing_id: string;
        incoming_id: string;
        outgoing_msg: string;
        file: string;
        msg_timestamp: string;
        msg_date: string;
        message_count: number;
    }

    const [messageList, setMessageList] = useState<msgProp[]>([]);


    

    useEffect(() => {
        const fetchChats = async () => {
            const result = await fetch(`${server}/fetch-message-list`, {
                credentials: "include",
            });
    
            const response = await result.json();
    
            //console.log("res list: ", response[0]?.message_count);
            setMessageList(response);
    
            setRefreshing(false);
        };
    
        // Run fetchChats on mount and whenever refreshing or latestMessage changes
        if (refreshing || messageList.length === 0) {
            fetchChats();
        }
    }, [refreshing, latestMessage]);

    

    const [myID, setMyID] = useState<string>(() => {
        const data = localStorage.getItem("userData");
        return data ? JSON.parse(data).user_id : "";
    });

    useEffect(() => {
        if(myID !== "") return;

        const data = localStorage.getItem("userData");
        if(data){
            let userData = JSON.parse(data);
    
            setMyID(userData.user_id)
        }
        
    }, [])

    function Preview  (iD : string, msg : string | null) : string{

        if(iD === myID){

            if(msg  === ""){
              return `You sent a file`;
            }else{
               return `You: ${msg}`;
            }


      }else{

        if(msg  === ""){
            return `You Recieved a file`;
          }else{
             return `${msg}`;
          }


      }
    }


    //console.log(JSON.stringify(online, null, 2));
    console.log("messageList: ", messageList);



  return (
    <div style={{flex: 1}}>
        <div className="chat_list_header">
            <span className="chat_list_header_text">Inbox</span>
            <IoSettingsOutline className="chat_list_header_icon_settings" />
        </div>

        <div className="chat_list_search_container">
            <input type="text" placeholder="search user or message" className="chat_list_search_box" />
        </div>

        <div className="chat_list_msgs_container">
            {messageList.length > 0 && messageList.map((msg, index) => (
                <ChatListMsg
                    key={index}
                    presence={msg.outgoing_id === myID ? online[msg.incoming_id] : online[msg.outgoing_id]}
                    currentChat={currentChat}
                    setUser={setUser}
                    setCurrentChat={setCurrentChat}
                    user=""
                    userImg=""
                    userID={msg.incoming_id === myID ? msg.outgoing_id : msg.incoming_id}
                    preview={Preview(msg.outgoing_id, msg.outgoing_msg)}
                    time={msg.msg_timestamp}
                    unread={msg.message_count > 0 ? msg.message_count.toString() : ""}
                />
            ))}

            {messageList.length < 1 && <EmptyMsg 
                                        image="/assets/message.png"
                                        message="No Messages" 
                                        message2="Looks like your inbox is empty"
            />}
         </div>
    </div>
  )
}

export default ChatList