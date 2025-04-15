import React from 'react'
import "./css/linkedin.css";
import { BiDotsVerticalRounded, BiRepost } from 'react-icons/bi';
import { MdOutlinePublic } from 'react-icons/md';
import { useWebSocket } from '../../../constant/provider';
import { PiDot } from 'react-icons/pi';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { RiSendPlaneFill } from 'react-icons/ri';
import { LiaCommentAlt } from 'react-icons/lia';


interface Prop {
    data: {
        caption: string;
        media: string[];
    }
}

const LinkedInFeedPreview : React.FC<Prop> = ({data}) => {

      const { socialAccounts } = useWebSocket();
      const profile : {id: string; name: string; username: string; picture: string;} = socialAccounts.linkedin;




  return (
    <div className='compose_linkedin_post_preview_container'>
      <div className="compose_linkedin_post_preview_header">
        <div className="compose_linkedin_post_preview_header_left">
          <img src={profile.picture} className='compose_linkedin_post_preview_header_left_img'  />
        </div>
        <div className="compose_linkedin_post_preview_header_middle">
          <span className='compose_linkedin_post_preview_header_middle_name'>{profile.name}</span>
          <div className='compose_linkedin_post_preview_header_left_time_public'>1h <PiDot size={15} /> <MdOutlinePublic /></div>
        </div>
        <div className="compose_linkedin_post_preview_header_right"><BiDotsVerticalRounded /></div>
      </div>

      <div className="compose_linkedin_post_preview_caption_container">
        {data.caption.length > 100 ? (
          <span className='compose_linkedin_post_preview_caption'>
            {data.caption.slice(0, 100)}
            <span style={{color: "var(--text-fade-color)"}}>...see more</span>
          </span>
        ) : (
          <span className='compose_linkedin_post_preview_caption'>
            {data.caption}
          </span>
        )}
      </div>

      <div className={`compose_linkedin_post_preview_media_container ${data.media.length < 3 && "linkedin_post_preview_media_container_children_less_than_three"}`}>
        {data.media.map((item: string, index: number) => (
          <img key={index} src={item} className='compose_linkedin_post_preview_image' />
        ))}
      </div>

      <div className="compose_linkedin_post_preview_actions">
        <div className="compose_linkedin_post_preview_icon_container">
          <FaRegThumbsUp className='compose_linkedin_post_preview_icon' />
          <span className='compose_linkedin_post_preview_icon_label'>Like</span>
        </div>
        <div className="compose_linkedin_post_preview_icon_container">
          <LiaCommentAlt style={{transform: ""}} className='compose_linkedin_post_preview_icon' />
          <span className='compose_linkedin_post_preview_icon_label'>Like</span>
        </div>
        <div className="compose_linkedin_post_preview_icon_container">
          <BiRepost className='compose_linkedin_post_preview_icon' />
          <span className='compose_linkedin_post_preview_icon_label'>Like</span>
        </div>
        <div className="compose_linkedin_post_preview_icon_container">
          <RiSendPlaneFill className='compose_linkedin_post_preview_icon' />
          <span className='compose_linkedin_post_preview_icon_label'>Like</span>
        </div>
      </div>



    </div>
  )
}

export default LinkedInFeedPreview