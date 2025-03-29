import { FaFacebook, FaXmark } from "react-icons/fa6";
import "./css/social_conn_modal.css";
import { appLogoUri } from "../../constant";
import { MdSyncAlt } from "react-icons/md";
import * as ReactIcons from "react-icons/fa6";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDisconnect } from "react-icons/ai";

interface Props {
  platform: string;
  action: string;
  close: (value: any) => void;
}


const SocialConnectedModal : React.FC<Props> = ({ platform , action, close }) => {
  //alert(platform)
  const navigate = useNavigate();

  return (
    <div className='social_conn_modal_container'>
        <div className="social_conn_modal_content_container">
          <div className="social_conn_modal_close_container"><FaXmark onClick={close} className="social_conn_modal_content_close_button" size={12}/></div>
          <div className="social_conn_modal_content_header">
            <img onClick={() => navigate("/")} src={appLogoUri} className="social_conn_modal_content_header_dp" />
            {action === "add" && <MdSyncAlt size={15} />}
            {action === "remove" && <AiOutlineDisconnect size={15} />}
             {platform === "facebook" && <FaFacebook onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#1877F2' className='social_conn_modal_content_header_image_logo' />}
             {platform === "google" && <ReactIcons.FaYoutube onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#ff0000' className='social_conn_modal_content_header_image_logo' />}
             {platform === "tiktok" && <ReactIcons.FaTiktok onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#000000' className='social_conn_modal_content_header_image_logo' />}
             {platform === "linkedin" && <ReactIcons.FaLinkedin onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#0077B5' className='social_conn_modal_content_header_image_logo' />}
             {platform === "instagram" && <ReactIcons.FaInstagram onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#E1306C' className='social_conn_modal_content_header_image_logo' />}
             {platform === "x" && <ReactIcons.FaSquareXTwitter onClick={() => window.open(`https://${platform}.com`,"_blank")} size={30} color='#000000' className='social_conn_modal_content_header_image_logo' />}
          </div>

          <span className="social_conn_modal_content_title">
            {action === "add" && `Great! You're now connected`}
            {action === "remove" && `Disconnected`}
          </span>

          <span className="social_conn_modal_content_sub_title">
            {action === "add" && `You've successfully connected ${platform === "x" && "Twitter / X" || platform} to Alquify. Now you can begin scheduling posts to it.`}
            {action === "remove" && `You've successfully disconnected ${platform === "x" && "Twitter / X" || platform} from Alquify.`}
          </span>

          {action === "add" && <div className="social_conn_modal_content_button_container">
            <button className="social_conn_modal_content_button">Create a Post</button>
            <span className="social_conn_modal_content_button_label">Create Your Posting Plan</span>
          </div>}

        </div>
    </div>
  )
}

export default SocialConnectedModal