import { useEffect, useState } from 'react'
import { server, } from '../../constant'
import { useNavigate } from 'react-router-dom'
import ChatList from '../../components/chat_list';
import ChatUI from '../../components/in_chat';
import './css/chat_home.css';
import FeaturesOnChatList from '../../components/app_feature_chat_list';

const ChatHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("alquify_user_chat_setup") || localStorage.getItem("alquify_user_chat_setup") && localStorage.getItem("alquify_user_chat_setup") !== "true"){
            let formData = new FormData();
            formData.append("request_type", "check");

            fetch(`${server}/reg-chat-data`, {
                method: "POST",
                body: formData,
                credentials: "include",
            })
            .then((res: any) => res.json())
            .then((d: any) => {
                let data = JSON.parse(d);
                console.log("data: ", data);
                if(data.message === "not_registered"){
                    localStorage.setItem("alquify_user_chat_setup", "false")
                    navigate("wizard", {
                        replace: true
                    })

                }else{
                    localStorage.setItem("alquify_user_chat_setup", "true")
                }
            })
        }
    }, [])




    const [currentChat, setCurrentChat] = useState<string | undefined>("")
    const [user, setUser] = useState<string | undefined>("")


    useEffect(() => {
        // update chat ui div
        
    }, [currentChat])

  return (
    <div className='dash_home_container'>
        <div className='dash_chat_container'>
            <div className='dash_chat_left_container'>
                <ChatList 
                 currentChat={currentChat}
                 setCurrentChat={setCurrentChat}
                 setUser={setUser}
                />
            </div>
            <div className='dash_chat_right_container'>
                {currentChat && <ChatUI
                currentChat={currentChat}
                user={user}
                />}

                {!currentChat && <FeaturesOnChatList />}


            </div>
        </div>
    </div>
  )
}

export default ChatHome