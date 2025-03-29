import { PiRobotDuotone } from 'react-icons/pi'
import "./css/app_feature_chat_list.css"
import { useNavigate } from 'react-router-dom'
import { CgShortcut } from 'react-icons/cg'
import { TbPlugConnected } from 'react-icons/tb'
import { FaWpforms } from 'react-icons/fa6'
import { BiCustomize } from 'react-icons/bi'

const FeaturesOnChatList = () => {

    const navigate = useNavigate();

  return (
    <div className='chat_ui_app_feature_container'>
        <span className='chat_ui_app_feature_title'>Take a Moment</span>
        <span className='chat_ui_app_feature_title_details'>Learn some of the best use of Alquify</span>


        <div className='chat_ui_app_feature_content_container'>
            <div className="chat_ui_app_feature_box">
                <div className="chat_ui_app_feature_box_left">
                  <PiRobotDuotone className='chat_ui_app_feature_logo' />
                </div>         
                <div className="chat_ui_app_feature_box_right">
                    <span onClick={() => navigate("/dash/settings")} className="chat_ui_app_feature_box_title">AI Chat</span>
                    <span className="chat_ui_app_feature_box_text">Get AI powered chatbots to help you with your daily tasks and customize you chat inputs</span>
                </div>         
            </div>

            <div className="chat_ui_app_feature_box">
                <div className="chat_ui_app_feature_box_left">
                  <TbPlugConnected className='chat_ui_app_feature_logo' />
                </div>         
                <div className="chat_ui_app_feature_box_right">
                    <span onClick={() => navigate("/dash/settings")} className="chat_ui_app_feature_box_title">Connect</span>
                    <span className="chat_ui_app_feature_box_text">Connect your social media page for optimal analytical experience</span>
                </div>         
            </div>

            <div className="chat_ui_app_feature_box">
                <div className="chat_ui_app_feature_box_left">
                  <CgShortcut className='chat_ui_app_feature_logo' />
                </div>         
                <div className="chat_ui_app_feature_box_right">
                    <span onClick={() => navigate("/dash/settings")} className="chat_ui_app_feature_box_title">Shortcut</span>
                    <span className="chat_ui_app_feature_box_text">Shortcut feature for easy accessibility to frequently used text </span>
                </div>         
            </div>

            <div className="chat_ui_app_feature_box">
                <div className="chat_ui_app_feature_box_left">
                  <FaWpforms className='chat_ui_app_feature_logo' />
                </div>         
                <div className="chat_ui_app_feature_box_right">
                    <span onClick={() => navigate("/dash/settings")} className="chat_ui_app_feature_box_title">Contact Form</span>
                    <span className="chat_ui_app_feature_box_text">Create form to access customer contact email for seamless messaging</span>
                </div>         
            </div>

            <div className="chat_ui_app_feature_box">
                <div className="chat_ui_app_feature_box_left">
                  <BiCustomize className='chat_ui_app_feature_logo' />
                </div>         
                <div className="chat_ui_app_feature_box_right">
                    <span onClick={() => navigate("/dash/settings")} className="chat_ui_app_feature_box_title">Customization</span>
                    <span className="chat_ui_app_feature_box_text">Customize chat to enable seamless experience</span>
                </div>         
            </div>


        </div>
    </div>
  )
}

export default FeaturesOnChatList