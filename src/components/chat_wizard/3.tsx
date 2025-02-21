
import React from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6"
import { RiDeleteBinLine } from "react-icons/ri";


interface ChatWizardThirdProps {
    err: boolean;
    setFile: (value: any) => void;
    theme: string;
    setTheme: (value: string) => void;
    scheme: string;
    setScheme: (value: string) => void;
    wlcMsg: string | null;
    setWlcMsg: (value: string | null) => void;
    suggestedMsg: string[];
    setSgMsg: (value: string[]) => void;
}
  
  

const ChatWizardThird : React.FC<ChatWizardThirdProps> = ({ err, setFile, theme, setTheme, scheme, setScheme, wlcMsg, setWlcMsg, suggestedMsg, setSgMsg }) => {




        // Function to determine if a color is dark or light
    const isDarkColor = (hex: string) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.55; // If luminance is low, it's a dark color
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setTheme(newColor);
        setScheme(isDarkColor(newColor) ? "#FFFFFF" : "#000000"); // Set text color based on background
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const selection = window.getSelection();
        
        // Save caret position
        const range = selection?.getRangeAt(0);
        const offset = range ? range.startOffset : null;
        
        // Update state
        setWlcMsg(el.textContent || "");
        
        // Restore caret position
        setTimeout(() => {
            if (offset !== null && selection) {
                const newRange = document.createRange();
                newRange.setStart(el.childNodes[0] || el, offset);
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        }, 0);
    };

    const previewLogo = (e: React.ChangeEvent<HTMLInputElement>) => {

        const input = e.target as HTMLInputElement | null;
        if (!input || !input.files) return;
        
        const file = input.files[0];
        if (file) {
            setFile(file);

            const reader = new FileReader();
            reader.onload = function(event: ProgressEvent<FileReader>) {
                const img = document.querySelector(".chat_wizard_setup_third_logo") as HTMLImageElement | null;
                if (img) img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

  return (
    <div className='chat_wizard_setup_third'>
        <div className='chat_wizard_setup_third_header_container'>
            <span className="chat_wizard_setup_third_header_text">Customize the widget</span>
            <span className='chat_wizard_setup_third_header_text_second'>(you can change this later)</span>
        </div>

        <label className="chat_wizard_setup_third_logo_label">Logo <span style={{color: 'red'}}>*</span></label>
        <div className='chat_wizard_setup_third_logo_container'>
            <img src="/image_placeholder.png" className="chat_wizard_setup_third_logo" />
            <FaPlus className="chat_wizard_setup_third_logo_add_sign" />
            <input type="file" onChange={previewLogo} className="chat_wizard_setup_third_logo_add_file" accept="image/*" />
        </div>


        <label className="chat_wizard_setup_third_logo_label">Colors <span style={{color: 'red'}}>*</span></label>
        <div className="chat_wizard_setup_third_color_picker_container">
            <input type="color" value={theme} className="chat_wizard_setup_third_color_picker" onChange={handleColorChange} />
            <div className="chat_wizard_setup_third_color_picked">{theme !== "" && theme}</div>
            <div className="chat_wizard_setup_third_color_picked">Scheme (Auto): {scheme !== "" && scheme}</div>
        </div>


        <label className="chat_wizard_setup_third_logo_label">Welcome message <span style={{color: 'red'}}>*</span></label>
        <div className="chat_wizard_setup_third_welcome_message" contentEditable suppressContentEditableWarning onInput={handleInput}>
            {wlcMsg}
        </div>

        
        <div className="chat_wizard_setup_third_head_text_container">
          <label className="chat_wizard_setup_third_logo_label">Suggested message <span style={{color: 'red'}}>*</span></label>
          <CiCircleQuestion className="chat_wizard_setup_third_suggested_clue" />
        </div>

        <div className="chat_wizard_setup_third_suggested_messages_container">
            {suggestedMsg.map((msg, index) => (
                <div key={index} className="chat_wizard_setup_third_suggested_message">
                    <input type="text" onChange={(e) => {
                            const updatedMessages = [...suggestedMsg]; // Copy array
                            updatedMessages[index] = e.target.value; // Update specific message
                            setSgMsg(updatedMessages); // Update state
                        }} value={msg} placeholder="Enter a message" className="chat_wizard_setup_third_suggested_message_input" />
                    <RiDeleteBinLine color="#ff0000" onClick={() => {
                        setSgMsg(suggestedMsg.filter((thisMsg) => thisMsg !== msg))
                    }} className="chat_wizard_setup_third_suggested_message_delete_icon" />
                </div>
            ))}

            <div className="chat_wizard_setup_third_add_suggested_message" onClick={() => {
                setSgMsg([...suggestedMsg, ""]);
            }}>
                Add message
            </div>
        </div>


    </div>
  )
}

export default ChatWizardThird;