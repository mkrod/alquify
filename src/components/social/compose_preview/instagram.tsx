import React from 'react'
import "./css/instagram.css";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useWebSocket } from '../../../constant/provider';
import { FaRegHeart, FaUser } from 'react-icons/fa6';
import { RiChat3Line } from 'react-icons/ri';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import { HiOutlineBookmark } from 'react-icons/hi';


interface Props {
    data: {
        caption: string;
        media: string[];
    }
}

const IGFeedPreview : React.FC<Props> = ({data}) => {
    const { socialAccounts } = useWebSocket();
    const profile : {id: string; name: string; username: string; picture: string;} = socialAccounts.instagram;

  return (
    <div className='compose_ig_preview_post_container'>
      <div className="compose_ig_preview_post_header">
        <div className="compose_ig_preview_post_header_left">
          <div className="compose_ig_preview_post_header_left_dp_container">
            <img src={profile.picture} className='compose_ig_preview_post_header_left_dp' />
          </div>
          <span className='compose_ig_preview_post_header_left_username'>{profile.username}</span>
        </div>
        <div className="compose_ig_preview_post_header_right">
          <BsThreeDotsVertical />
        </div>
      </div>


      <div className="compose_ig_preview_post_images_container">
        <div className="compose_ig_preview_post_images_icon_tag">
        <FaUser size={10} className='' />
        </div>
        <img src={data.media[0]} className='compose_ig_preview_post_image' />
      </div>


      {data.media.length > 1 && <div className="compose_ig_preview_post_carousel_container">
        {data.media.map((_, index: number) => (
          <div key={index} className={`compose_ig_preview_post_carousel ${index === 0 && "ig_preview_post_carousel_active"}`}></div>
        ))}
      </div>}


      <div className="compose_ig_preview_post_actions_container">
        <FaRegHeart size={22} className='compose_ig_preview_post_actions_icon' />
        <RiChat3Line style={{transform: "rotate(270deg)"}} size={22} className='compose_ig_preview_post_actions_icon' />
        <PiPaperPlaneTiltBold size={22} className='compose_ig_preview_post_actions_icon' />
        <HiOutlineBookmark style={{marginLeft: "auto"}} size={22} className='compose_ig_preview_post_actions_icon' />
      </div>


      <div className="compose_ig_preview_post_caption_container">
        {data.caption  !== "" && <strong className='compose_ig_preview_post_caption_username'>{profile.username}</strong>}
        {data.caption.length > 36 ? (
          <span className='compose_ig_preview_post_caption'>
            {data.caption.slice(0, 36)}
            <span style={{color: "var(--text-fade-color)"}}> ...more</span>
          </span>
        )  : (
          <span className='compose_ig_preview_post_caption'>
            {data.caption}
          </span>
        )}
      </div>


    </div>
  )
}

export default IGFeedPreview