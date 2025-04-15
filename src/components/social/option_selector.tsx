import React, { useState } from 'react'
import "./css/option_selector.css";
import { appLogoUri } from '../../constant';
import { MdOutlineSyncAlt } from 'react-icons/md';
import { FaFacebook, FaYoutube, FaTiktok, FaLinkedin, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { AiOutlineDisconnect } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GoFileMedia } from 'react-icons/go';


interface Pages {
    title: string;
    id: string,
    username?: string;
    name: string;
    category?: string;
    picture?: string;
    platform?: string;
    type?: string;

}

interface Props {
    data: {
        action: string;
        data: Pages[];
        onfinish?: (id?: string) => string | void;
    }
}

const OptionSelector : React.FC<Props> = ({data}) => {

    const navigate = useNavigate();
    const [selectedID, setSelectedId] = useState<string>("");
  return (
    <div className='option_selector_container'>
        <div className="option_selector_content_container">
            <div className="option_selector_content_header">
                <div className="option_selector_content_header_icons">
                    <img onClick={() => navigate("/")} src={appLogoUri} className="social_conn_modal_content_header_dp" />
                    {data.action === "add" && <MdOutlineSyncAlt size={15} />}
                    {data.action === "remove" && <AiOutlineDisconnect size={15} />}
                    {(() => {
                        const openLink = (url: string) => window.open(url, "_blank");
                        switch (data.data?.[0]?.platform) {
                            case "facebook":
                                return <FaFacebook onClick={() => openLink(`https://facebook.com`)} size={30} color='#1877F2' className='social_conn_modal_content_header_image_logo' />;
                            case "google":
                                return <FaYoutube onClick={() => openLink(`https://youtube.com`)} size={30} color='#ff0000' className='social_conn_modal_content_header_image_logo' />;
                            case "tiktok":
                                return <FaTiktok onClick={() => openLink(`https://tiktok.com`)} size={30} color='#000000' className='social_conn_modal_content_header_image_logo' />;
                            case "linkedin":
                                return <FaLinkedin onClick={() => openLink(`https://linkedin.com`)} size={30} color='#0077B5' className='social_conn_modal_content_header_image_logo' />;
                            case "instagram":
                                return <FaInstagram onClick={() => openLink(`https://instagram.com`)} size={30} color='#E1306C' className='social_conn_modal_content_header_image_logo' />;
                            case "x":
                                return <FaSquareXTwitter onClick={() => openLink(`https://x.com`)} size={30} color='#000000' className='social_conn_modal_content_header_image_logo' />;
                            default:
                                return <GoFileMedia size={30} color='#808080' className='social_conn_modal_content_header_image_logo' />;
                        }
                    })()}
                </div>
                <span className='option_selector_content_header_text'>{data.data[0]?.title || "Default Title"}</span>
            </div>




            <div className="option_selector_content">
                {data.data && data.data.length > 0 && data.data?.map((item: Pages, index: number) => (
                    <div key={index} className="option_selector_content_item_container" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        const selectedElement = document.querySelector('.option_selector_content_item_container.option_selector_selected');
                        if (selectedElement) {
                            selectedElement.classList.remove('option_selector_selected');
                        }

                        const thisElement = e.currentTarget as HTMLDivElement; 

                        const radioButton = thisElement.querySelector('#option_selector_content_item_right_radio') as HTMLInputElement;
                        if (radioButton) {
                            radioButton.checked = true;
                        }

                        e.currentTarget.classList.add('option_selector_selected');
                        setSelectedId(item.id);
                    }}>
                        <div className="option_selector_content_item_left">
                            <img src={item.picture} alt="" className='option_selector_content_item_left_img' />
                        </div> 
                        <div className="option_selector_content_item_middle">
                            <span className='option_selector_content_item_middle_name'>{item.name}</span>
                            <span className='option_selector_content_item_middle_category'>{item.category || item.username}</span>
                        </div>
                        <div className="option_selector_content_item_right">
                            <input type="radio" name="selected_id" value={item.id} id='option_selector_content_item_right_radio' className="option_selector_content_item_right_radio" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="option_selector_actions_container">
                <div className="option_selector_actions_helps">
                    <a href="https://www.instagram.com/accounts/professional_account_settings/" className='option_selector_actions_help_options'>Switch to Professional account</a>
                    <a href="https://web.facebook.com/settings/?tab=linked_profiles&setting_id=linked_profiles_instagram" className='option_selector_actions_help_options'>Link Page to IG business account</a>
                </div>
                <button disabled={selectedID === ""} className='option_selector_confirm' onClick={() => {
                    data.onfinish && data.onfinish(selectedID)
                    setSelectedId("");
                    }}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default OptionSelector