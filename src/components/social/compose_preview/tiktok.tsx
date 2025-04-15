import React from 'react'
import { useWebSocket } from '../../../constant/provider';
import "./css/tiktok.css";
import { IoSearchSharp } from 'react-icons/io5';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa6';
import { RiChat3Fill } from 'react-icons/ri';
import { BsBookmarkFill } from 'react-icons/bs';
import { PiShareFatFill } from 'react-icons/pi';
import { HiPlusCircle } from 'react-icons/hi';



interface Prop {
    data: {
        caption: string;
        media: string[];
    }
}

const TiktokFYPPreview : React.FC<Prop> = ({data}) => {
        const { socialAccounts } = useWebSocket();
        const profile : {id: string; name: string; username: string; picture: string;} = socialAccounts.tiktok;


  return (
    <div className='compose_tiktok_preview_post_container'>
        <div className="compose_tiktok_preview_post_content_wrapper">
            <div className="compose_tiktok_preview_post_content_header">
                <div className="compose_tiktok_preview_post_content_header_titles_labels">Following</div>
                <div className="compose_tiktok_preview_post_content_header_titles_labels composer_fyp_preview">For You</div>
                <IoSearchSharp className='compose_tiktok_preview_post_content_header_search' />
            </div>


            <div className="compose_tiktok_preview_post_content_actions">
                <div className="compose_tiktok_preview_post_content_actions_dp_container">
                    <img src={profile?.picture} alt="" className='compose_tiktok_preview_post_content_actions_dp' />
                    <HiPlusCircle size={15} className='compose_tiktok_preview_post_content_actions_dp_add' />
                </div>

                <FaHeart color='whitesmoke' size={25} />
                <RiChat3Fill style={{transform: 'rotate(270deg)'}} color='whitesmoke' size={25} />
                <BsBookmarkFill color='whitesmoke' size={25} />
                <PiShareFatFill color='whitesmoke' size={25} />
            </div>

            {data.media.length > 1 && <div className='compose_tiktok_preview_post_content_carousel_container'>
                {data.media.map((_, index: number) => (
                    <div key={index} style={{backgroundColor: index === 0 ? "white" : "#757474"}} className='compose_tiktok_preview_post_carousel'></div>
                ))}
                </div>}
            <div className="compose_tiktok_preview_post_content_bottom">
                <div className="compose_tiktok_preview_post_content_bottom_left">
                    <div className='compose_tiktok_preview_post_content_bottom_username'>
                        {profile?.username || "chill_n_football"}
                    </div>
                    {data.caption.length > 120 ? (
                        <span className="compose_tiktok_preview_post_content_bottom_caption">
                            {data.caption.slice(0, 120)}
                            <strong>...more</strong>
                        </span>
                    ) : (
                        <span className="compose_tiktok_preview_post_content_bottom_caption">
                            {data.caption}
                        </span>
                    )}
                </div>
                <div className="compose_tiktok_preview_post_content_bottom_right">
                    <img src={profile.picture} className='compose_tiktok_preview_post_content_bottom_image'></img>
                </div>
            </div>
        </div>

        <div className="compose_tiktok_preview_post_content_imgs_wrapper">
            <img src={data.media[0]} alt="" className='compose_tiktok_preview_post_content_img' />
        </div>
    </div>
  )
}

export default TiktokFYPPreview