
import React, { useState } from "react";
import "./css/chat_wizard.css";
import ChatWizardFirst from "../../components/chat_wizard/1";
import ChatWizardSecond from "../../components/chat_wizard/2";
import { MdOutlineSync } from "react-icons/md";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import ChatWizardThird from "../../components/chat_wizard/3";
import { useNavigate } from "react-router-dom";
import { sendChatSetupData } from "../../constant";
import { IoArrowBack } from "react-icons/io5";


const ChatWizard : React.FC = () => {

    const navigate = useNavigate();

    const [err, setErr] = useState<boolean>(false)

    //for 2.tsx
    const [orgName, setOrgName] = useState<string>("");
    const [orgWeb, setOrgWeb] = useState<string>("");



    ////// from 3.tsx
    const [file, setFile] = useState<File | null>(null);
    const [theme, setTheme] = useState<string>("#FF6B00");
    const [scheme, setScheme] = useState<string>("#FFFFFF");
    const [wlcMsg, setWlcMsg] = useState<string | null>("👋 Hello There, How may we help?")
    const [suggestedMsg, setSgMsg] = useState<string[]>([
        "I have a question",
        "Tell me more",
    ])
    ///////////////////////

    
    const [stage, setStage] = useState<undefined | number>(1);


    const saveConfig = async () => {
        document.querySelector(".loading-container")?.classList.add("gen_active");


        console.log(`
            orgName: ${orgName} ---
            orgWeb: ${orgWeb} ---
            file: ${file}---
            theme: ${theme}--
            scheme: ${scheme}--
            wlcMsg: ${wlcMsg}---
        `)

        suggestedMsg.forEach((msg) => {
            console.log(`suggested: ${msg}---`);
        })

        const formData = new FormData();

        formData.append("name", orgName);
        formData.append("website", orgWeb);
        if(file){
            formData.append("file", file);
        }
        formData.append("theme", theme);
        formData.append("scheme", scheme);
        if(wlcMsg){
            formData.append("welcome_msg", wlcMsg)
        }
        formData.append("suggested_msg", JSON.stringify(suggestedMsg));
        formData.append("request_type", "register");
        /// continue to send the data



        setTimeout(() => {

            sendChatSetupData(formData)
            .then((res: any) => res.json())
            .then((d: any) => {
                console.log("D: ", d);
                let data = JSON.parse(d)
                if(data.message === "success"){
                    localStorage.setItem("alquify_user_chat_setup", "true")
                    navigate("/dash/chats", {
                        replace: true
                    })
                }

            })
            .catch((err) => console.log("err", err))
            //navigate(`sign-up?pl=${Date.now()}&r=${Math.round(Math.random()).toString()}`)
            document.querySelector(".loading-container")?.classList.remove("gen_active");
         }, 1000)


    }

  return (
    <div className='dash_home_container'>
        {stage && stage > 1 && <div className="chat_wizard_setup_home_restart" onClick={() => setStage(1)}>
            restart
            <MdOutlineSync className="chat_wizard_setup_home_restart_icon" />
        </div>}
        {stage && stage > 1 && <div className="chat_wizard_setup_home_back_icon" onClick={() => {
            setStage((prev: number | undefined) => prev && prev - 1)
        }}>
            <IoArrowBack />
        </div>}
        {stage === 1 && <ChatWizardFirst />}
        {stage === 2 && 
         <ChatWizardSecond 
            err={err}
            orgName={orgName}
            setOrgName={setOrgName}
            orgWeb={orgWeb}
            setOrgWeb={setOrgWeb}
        />}
        {stage === 3 && 
         <ChatWizardThird
            err={err}
            setFile={setFile}
            theme={theme}
            setTheme={setTheme}
            scheme={scheme}
            setScheme={setScheme}
            wlcMsg={wlcMsg}
            setWlcMsg={setWlcMsg}
            suggestedMsg={suggestedMsg}
            setSgMsg={setSgMsg}
        />}
        <div className='chat_wizard_setup_home_next' onClick={() => {
            if(stage && stage <= 3){
                if(stage && stage === 2 && orgName.length < 2 && orgWeb.length < 3){
                    setErr(true);
                }else if(stage && stage ===  3 && wlcMsg && wlcMsg.length < 5 ||
                         stage && stage ===  3 && file === null ||
                         stage && stage ===  3 && theme === "" ||
                         stage && stage ===  3 && wlcMsg === "" ||
                         stage && stage ===  3 && suggestedMsg.length < 1){

                    setErr(true)
                }else{
                    setErr(false)
                    if(stage === 3){
                        saveConfig();
                    }else{
                        setStage((prev: any) => prev + 1);
                    }
                }
            }else{
                setErr(false);
       
            }
        }}>
            Next
            <LiaAngleDoubleRightSolid />
        </div>
    </div>
  )
}

export default ChatWizard

  



