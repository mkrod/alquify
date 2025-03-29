import React, { useEffect, useRef, useState } from "react"
import { PiWarningCircleDuotone } from "react-icons/pi";
import './css/in_chat.css';
import { getColorFromName, getInitials, server } from "../constant";
import { CgShortcut } from "react-icons/cg";
import { LuBot, LuMessageCircleQuestion } from "react-icons/lu";
import { GoPaperclip } from "react-icons/go";
import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import { GrChannel } from "react-icons/gr";
import { useWebSocket } from "../constant/websocket";
import MsgandFile from "./msg_area/msg_and_file";
import Message from "./msg_area/message";
import MesFile from "./msg_area/mes_file";
import ResandFile from "./msg_area/res_and_file";
import Response from "./msg_area/response";
import ResFile from "./msg_area/res_file";
import { MdOutlineTune } from "react-icons/md";
import { RiExpandHorizontalLine } from "react-icons/ri";
import EmptyMsg from "./empty_msg";

interface Props {
  currentChat: string | undefined;
  user: string | undefined;
}






const ChatUI : React.FC<Props> = ({ currentChat, user }) => {

  const customImage = getInitials(user !== "Unknown User" && user || currentChat || "Unknown User");
  const bgColor = getColorFromName(user !== "Unknown User" && user || currentChat || "Unknown User");

  interface Msg{
    id: number;
    outgoing_id: string;
    incoming_id: string;
    outgoing_msg: string;
    file: string;
    msg_timestamp: string;
    msg_date: string;
    viewed: boolean;
}

  const { latestMessage, online } = useWebSocket();

  const [refreshing, setRefreshing] = useState<boolean>(true);
  const divRef = useRef<HTMLDivElement>(null);
  const AiOptionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([])
  const [channel, setChannel] = useState<string | undefined>("c")

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


      const [forceUpdate, setForceUpdate] = useState(0);

      useEffect(() => {
        if (!currentChat) return;
      
        const getChats = async () => {
          try {
            const response = await fetch(`${server}/user-get-messages`, {
              method: "POST",
              body: JSON.stringify({ currentChat }),
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error("Failed to fetch messages");
            }
      
            const result = await response.json();
            setMessages(result);
            setForceUpdate((prev) => prev + 1); // Force re-render
          } catch (error) {
            console.error("Error fetching messages:", error);
          } finally {
            setRefreshing(false);
          }
        };
      
        getChats();
      }, [latestMessage, refreshing, forceUpdate]);
       // Dependencies ensure it runs when any of these change
      



  const [isEmpty, setIsEmpty] = useState<boolean>(true); // Track empty state

  const handleInput = () => {
    setIsEmpty(divRef.current?.textContent?.trim() === "");
  };

  const toggleEmoji = () => {

    const emojiContainer = document.querySelector('.chat_ui_footer_emoji_container') as HTMLDivElement;

    if (emojiContainer.style.opacity === "0" || emojiContainer.style.opacity === '') {
        emojiContainer.style.scale = "1";
        setTimeout(() => {
            emojiContainer.style.opacity = "1";
        }, 50)

    } else {
        emojiContainer.style.opacity = "0";

        setTimeout(() => {
            emojiContainer.style.scale = "0";
        }, 200)
    }

}

   useEffect(() => {

    const pickerOptions = { 
      onEmojiSelect: (e: any) => {
        if (divRef.current) {
          divRef.current.innerHTML += e.native;
        }
      },
    };



  const picker = new (window as any).EmojiMart.Picker(pickerOptions);
  const emojiContainer = document.querySelector('.chat_ui_footer_emoji_container') as HTMLElement;
  if(emojiContainer.innerHTML === ""){
    emojiContainer.appendChild(picker)
  }


   }, [])



   const ai = () => {
    const messageInput = divRef.current?.textContent;
    if(!messageInput || messageInput.length < 2) return;

    if (AiOptionRef.current && AiOptionRef.current.style.scale === "1") {
      AiOptionRef.current.style.opacity = "0";
      setTimeout(() => {
        if (AiOptionRef.current) {
          AiOptionRef.current.style.scale = "0";
        }
      }, 400)
    }else{
      if(AiOptionRef){
        if (AiOptionRef.current) {
          AiOptionRef.current.style.scale = "1";
        }
        setTimeout(() => {
          if (AiOptionRef.current) {
            AiOptionRef.current.style.opacity = "1";
          }
        }, 100)
      }
    }
  }



    const sendToAi = async (event: React.MouseEvent<HTMLDivElement>) => {

      if(AiOptionRef){
        if (AiOptionRef.current) {
          AiOptionRef.current.style.opacity = "0";
        }
        setTimeout(() => {
          if (AiOptionRef.current) {
            AiOptionRef.current.style.scale = "0";
          }
        }, 100);
      }

      


      const target = event.target as HTMLElement;
      const messageInput = divRef.current?.textContent;
      const prompt = target.getAttribute("data-prompt");
      if(!messageInput || messageInput.length < 2) return;
      document.querySelector(".chat_ui_footer_ai_isloading_spinner")?.classList.add("active");

      const ask = `[${messageInput}], ${prompt}`;

      

      const result = await fetch(`${server}/ai-assist-message`, {
        method: "POST",
        body: JSON.stringify({q: ask}),
        headers: {
          "Content-Type":"application/json",
        },
      })

      const res = await result.json();

      divRef.current.textContent = res.data.content;

      document.querySelector(".chat_ui_footer_ai_isloading_spinner")?.classList.remove("active");
    }



  
    const sendMessage = async () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear().toString();
      const hour = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      
      const date = `${day}/${month}/${year}`;
      const time = `${hour}:${minutes}`;
    
      const form = document.querySelector(".chat_ui_footer") as HTMLFormElement;
      const formData = new FormData(form);
      const message = divRef.current?.textContent?.trim() || "";
      
      console.log("divRef.current: ", divRef.current);
      console.log("Extracted message: ", message);
    
      formData.append("message", message);
      if (currentChat) {
        formData.append("reciever", currentChat);
      }
      formData.append("date", date);
      formData.append("time", time);
      document.querySelector(".chat_ui_footer_ai_isloading_spinner")?.classList.add("active");
    
      /*console.log("FormData contents:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }*/
    
      fetch(`${server}/user-send-message`, {
          method: "POST",
          body: formData,
          credentials: "include",
      })
      .then((res: any) => res.json())
      .then((d: any) => {
            console.log("Response data: ", d);
            (document.querySelector(".chat_ui_footer_message_input") as HTMLDivElement).textContent = "";
            (document.querySelector(".chat_ui_footer") as HTMLFormElement).reset();
            (document.querySelector(".chat_ui_footer_file_name") as HTMLDivElement).textContent = "";
            scrollToBottom();
            document.querySelector(".chat_ui_footer_ai_isloading_spinner")?.classList.remove("active");
      })
      .catch((error) => console.error("Fetch error: ", error));
    }
    

    function scrollToBottom() {
      const chatContainer = document.querySelector('.chat_ui_main') as HTMLDivElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

  return (
    <div className="chat_ui_container">
      <div className="chat_ui_header">
        <div className="chat_ui_header_left">
          <div className="chat_ui_dp_presence">
            {user && <div style={{backgroundColor: bgColor}} className="chat_ui_dp customer_profile_picture" >{ customImage }</div>}
            <div style={{backgroundColor: currentChat && online[currentChat] ? "#00c900" : "gray" }} className="chat_ui_presence"></div>
          </div>
        </div>
        <div className="chat_ui_name_id_presence_text">
          <span className="chat_ui_name_id">{ user || currentChat }</span>
          <span className="chat_ui_presence_text">{ currentChat && online[currentChat] ? "Online" : "Offline" }</span>
        </div>
        <PiWarningCircleDuotone className="chat_ui_header_icon" />
      </div>

      <main className="chat_ui_main">

        {messages.length > 0 && messages.map((msg: Msg) => {
          if(msg.incoming_id === myID){
            if(msg.outgoing_msg !== "" && msg.file !== ""){
              return (
                <ResandFile
                  img={[bgColor, customImage]}
                  key={msg.id}
                  msg={msg.outgoing_msg}
                  file={msg.file}
                  time={msg.msg_timestamp}
                  date={msg.msg_date}
                />
              )

            }else if(msg.outgoing_msg !== "") {
              return (
                <Response
                  img={[bgColor, customImage]}
                  key={msg.id}
                  msg={msg.outgoing_msg}
                  time={msg.msg_timestamp}
                  date={msg.msg_date}
                />
              )
            }else if(msg.file !== ""){
              return(
                <ResFile 
                  img={[bgColor, customImage]}
                  key={msg.id}
                  file={msg.file}
                  time={msg.msg_timestamp}
                  date={msg.msg_date}
                />
              )
            }
          }else if(msg.outgoing_id === myID){
            if(msg.outgoing_msg !== "" && msg.file !== ""){
              return(
                <MsgandFile 
                  key={msg.id}
                  msg={msg.outgoing_msg}
                  file={msg.file}
                  time={msg.msg_timestamp}
                  date={msg.msg_date}
                />
              )

            }else if(msg.outgoing_msg !== ""){
              return(
                <Message 
                  key={msg.id}
                  msg={msg.outgoing_msg}
                  time={msg.msg_timestamp}
                  date={msg.msg_date}
                />
              )
            }else if(msg.file !== ""){
              return(
                <MesFile 
                    key={msg.id}
                    file={msg.file}
                    time={msg.msg_timestamp}
                    date={msg.msg_date}
                />
              )
            }
          }
        })}

        {messages.length < 1 && <EmptyMsg image="/assets/message.png" message="No New Conversation" message2="Send message to start new conversation" />}
      </main>

      <form className="chat_ui_footer" encType="mutipart/form-data" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendMessage();
        }}>
          <div className="chat_ui_footer_content_container">
            {isEmpty && <span className="chat_ui_footer_placeholder">
              {channel === "c" && "Reply to Live Chat"}
              {channel === "e+c" && "Send to Email and Chat"}
            </span>}
            <div ref={divRef} onInput={handleInput} contentEditable suppressContentEditableWarning className="chat_ui_footer_message_input">
              
            </div>
            <div className="chat_ui_footer_file_details">
              <GoPaperclip />
              <span className="chat_ui_footer_file_name"></span>
              <FaXmark onClick={() => {
                (document.querySelector(".chat_ui_footer") as HTMLFormElement)?.reset();
                const fileNameElement = document.querySelector(".chat_ui_footer_file_name");
                if (fileNameElement) {
                  fileNameElement.textContent = "";
                }
                if(divRef.current?.textContent === ""){
                  setIsEmpty(true);
                }
              }} className="chat_ui_footer_file_details_close" />
            </div>
            <div className="chat_ui_footer_controls">
              <div className="chat_ui_footer_controls_left">
                <div className="chat_ui_footer_emoji_container"></div>
                <CgShortcut className="chat_ui_footer_icon others" />
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "25px", width: "25px", overflow: "hidden"}}>
                  <input type="file" name="file" onChange={(e) => {
                    if(e.target.files && e.target.files[0].size > 0){
                      const fileNameElement = document.querySelector(".chat_ui_footer_file_name");
                      if (fileNameElement) {
                        fileNameElement.textContent = e.target.files[0].name;
                      }
                      setIsEmpty(false);
                    }else{
                      setIsEmpty(true);
                    }
                  }} className="chat_ui_footer_file_input" />
                  <GoPaperclip className="chat_ui_footer_icon others paper_clip" />
                </div>
                <FaRegFaceSmile id="picker" onClick={toggleEmoji} className="chat_ui_footer_icon others" />
                <div style={{position: "relative"}}>
                <div ref={AiOptionRef} className="chat_ui_foooter_ai_options_container">
                  <div className="chat_ui_footer_ai_header">AI Assistant</div>
                  <div className="chat_ui_footer_ai_option" onClick={sendToAi} data-prompt="correct the word in the bracket if not correctly spelt or written in just a single correction precisely no additiion or subtraction, i dont need other words"><LuMessageCircleQuestion /> Grammar check</div>
                  <div className="chat_ui_footer_ai_option" onClick={sendToAi} data-prompt="assuming i'm sending the message in bracket to a customer as a customer care representative, can you expand the message, i dont need irrelvant text from you, just send only what i asked"><RiExpandHorizontalLine />  Expand more</div>
                  <div className="chat_ui_footer_ai_option" onClick={sendToAi} data-prompt="make the message in that bracket more professional just only answer what i asked, i dont need irrelevant text from you."><MdOutlineTune /> Make more professional</div>
                </div>
                <button className="chat_ui_footer_ai_trigger_button" disabled={isEmpty} onClick={(e) => {e.preventDefault(); ai(); }}>
                  <LuBot className="chat_ui_footer_icon ai" />
                </button>
                </div>
                <div className="chat_ui_footer_ai_isloading">
                   <div className="chat_ui_footer_ai_isloading_spinner"></div>
                </div>
              </div>
              <div className="chat_ui_footer_controls_right">
                <div className="chat_ui_footer_controls_channel_container">
                  <GrChannel className="chat_ui_footer_controls_channel_icon" />
                  <select value={channel} name="channel" className="chat_ui_footer_controls_channel" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChannel(e.target.value)}>
                      <option className="chat_ui_footer_controls_channel_option" value="c">Live Chat</option>
                      <option className="chat_ui_footer_controls_channel_option" value="e+c">Email + Live Chat</option>
                  </select>
                </div>
                <button disabled={isEmpty} type="submit" className="chat_ui_footer_controls_send">Send</button>
              </div>
            </div>
          </div>
      </form>
    </div>
  )
}

export default ChatUI