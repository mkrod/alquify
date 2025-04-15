import React, { useEffect, useRef, useState } from 'react'
import "./css/content_card.css";
import { PostChild, Posts, useWebSocket } from '../../../constant/provider'
import * as ReactIcons from 'react-icons/fa6'
import { BiDotsVerticalRounded, BiLike } from 'react-icons/bi';
import { PiArrowSquareOutBold, PiShareFat } from 'react-icons/pi';
import { LiaCommentAltSolid } from 'react-icons/lia';
//import { LuEye } from 'react-icons/lu';
import { FaRetweet } from 'react-icons/fa6';
import { FiBookmark } from 'react-icons/fi';
import { IoLink } from 'react-icons/io5';
import { IoMdAlbums } from 'react-icons/io';
import VideoPlayerComponent from '../../misc/video_player';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-video.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

interface Props {
    post: Posts;
    openMedia?: (value?: Posts) => void;
}

const ContentCard : React.FC<Props> = ({ post, openMedia }) => {
    const { setNote } = useWebSocket();
    const [optionOpened, setOptionOpened] = useState<boolean>(false); //for the three dot options in the bottom
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    const [playingVideo, setPlayingVideo] = useState<boolean>(false);
    const [VideoPlayer, triggerVideoPlayer] = useState<string>("");
    const [showCarousel, setShowCarousel] = useState<boolean>(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          const container = carouselRef.current;
          if (!container) return;
      
          const scrollLeft = container.scrollLeft;
          const child = container.children[0] as HTMLElement | undefined;
      
          if (!child) return;
      
          // Ensure you're calculating the width based on the carousel item width
          const itemWidth = child.offsetWidth; // This might be off depending on flexbox behavior
          const index = Math.round(scrollLeft / itemWidth);
      
          setActiveIndex(index);
          console.log('scrollLeft:', scrollLeft, 'itemWidth:', itemWidth, 'index:', index); // Log for debugging
        };
      
        const container = carouselRef.current;
        container?.addEventListener("scroll", handleScroll);
      
        // Cleanup listener on unmount
        return () => {
          container?.removeEventListener("scroll", handleScroll);
        };
      }, []);
      
      

      


  return (
    <div className='publish_content_card_container'>
        {(post?.thumbnail_url != null || post?.media_url != null) && 
        <div className="publish_content_card_media_container">
            {isMediaLoading && <div className='publish_content_card_media_is_loading_container'>
                <div className='publish_content_card_media_is_loading'></div>
            </div>}
            {(post.media_type?.toLowerCase() === "image") && 
            <LightGallery speed={500} plugins={[lgZoom, lgThumbnail]} >      
              <a
                    href={post.thumbnail_url ?? post.media_url ?? ""}
                    data-src={post.thumbnail_url ?? post.media_url ?? ""}
                    
                >   
               <img onLoad={() => setIsMediaLoading(false)} src={post?.thumbnail_url ?? post?.media_url ?? ''} className='publish_content_card_media_thumbnail' />
             </a>
            </LightGallery>}
            {post.media_type?.toLowerCase() === "video" && 
               <img onLoad={() => setIsMediaLoading(false)} src={post?.thumbnail_url ?? post?.media_url ?? ''} className='publish_content_card_media_thumbnail' />
            }
            {(post.media_type  || "")?.toLowerCase() === "carousel_album" &&
               <img onClick={() => setShowCarousel(true)} onLoad={() => setIsMediaLoading(false)} src={post?.thumbnail_url ?? post?.media_url ?? ''} className='publish_content_card_media_thumbnail' />
            }


            {post?.media_type && (post?.media_type)?.toLowerCase() === "video" && <div className="publish_content_card_media_is_video_indicator_container" onClick={() => {setPlayingVideo(true);}}>
                <ReactIcons.FaPlay color='whitesmoke' />
            </div>}
            {post?.media_type && (post?.media_type).toLowerCase() === "carousel_album" && <div className="publish_content_card_media_is_album_indicator_container">
                <IoMdAlbums color='whitesmoke' size={20} />
            </div> }
        </div>}
        <div className="publish_content_card_bottom_details">
            <div className="publish_content_card_bottom_name_date">
                <div className="publish_content_card_bottom_platform">
                    {post?.platform === "x" ? "Twitter / X" : post?.platform ? post?.platform.charAt(0).toUpperCase() + post?.platform?.slice(1) : "Unknown Platform"}
                    {post?.platform === "facebook" && <ReactIcons.FaFacebook size={15} color='#1877F2' className="publish_content_card_bottom_platform_icon" />}
                    {post?.platform === "google" && <ReactIcons.FaYoutube size={15} color='#ff0000' className="publish_content_card_bottom_platform_icon" />}
                    {post?.platform === "tiktok" && <ReactIcons.FaTiktok size={15} color='#000000' className="publish_content_card_bottom_platform_icon" />}
                    {post?.platform === "linkedin" && <ReactIcons.FaLinkedin size={15} color='#0077B5' className="publish_content_card_bottom_platform_icon" />}
                    {post?.platform === "instagram" && <ReactIcons.FaInstagram size={15} color='#E1306C' className="publish_content_card_bottom_platform_icon" />}
                    {post?.platform === "x" && <ReactIcons.FaSquareXTwitter size={15} color='#000000' className="publish_content_card_bottom_platform_icon" />}
                </div>
                <div className="publish_content_card_bottom_name">{post?.username}</div>
                <div className="publish_content_card_bottom_date">
                    {new Date(post?.timestamp || "")?.toLocaleString()}
                </div>
            </div>
            <div className="publish_content_card_bottom_caption_container">
                {(post?.title ?? "").length > 50 ? (
                <span>
                    {post?.title?.slice(0, 50)}
                    <strong>...more</strong>
                </span>) : (
                <span>
                    {post?.title}
                </span>)}
            </div>
            <div className="publish_content_card_bottom_interactions_container">
                <div className="publish_content_card_bottom_interaction">
                    <BiLike className='publish_content_card_bottom_interaction_icon' />
                    <span className='publish_content_card_bottom_interaction_value'>{post?.like_count}</span>
                </div>
                <div className="publish_content_card_bottom_interaction">
                    <LiaCommentAltSolid className='publish_content_card_bottom_interaction_icon' />
                    <span className='publish_content_card_bottom_interaction_value'>{post?.comments_count}</span>
                </div>
                {post?.platform === "x" && <div className="publish_content_card_bottom_interaction">
                    <FaRetweet className='publish_content_card_bottom_interaction_icon' />
                    <span className='publish_content_card_bottom_interaction_value'>{post?.retweet_count}</span>
                </div>}
                <div className="publish_content_card_bottom_interaction">
                    <PiShareFat className='publish_content_card_bottom_interaction_icon' />
                    <span className='publish_content_card_bottom_interaction_value'>{post?.shares_count}</span>
                </div>
                {post?.platform !== "x" && <div className="publish_content_card_bottom_interaction">
                    <FiBookmark className='publish_content_card_bottom_interaction_icon' />
                    <span className='publish_content_card_bottom_interaction_value'>{post?.favorite_count}</span>
                </div>}


                <div className="publish_content_card_bottom_button_view_post_container">
                    <button className="publish_content_card_bottom_button_view_post" onClick={() => window.open(post?.permalink || "about:blank", "_blank")}>
                        <PiArrowSquareOutBold />
                        View Post
                    </button>
                    <button className="publish_content_card_bottom_button_options" onClick={() => setOptionOpened(!optionOpened)}>
                        <BiDotsVerticalRounded size={15} />
                    </button>
                    <div className={`publish_content_card_bottom_options_container ${optionOpened && "publish_content_card_bottom_options_opened"}`}>
                        <div className="publish_content_card_bottom_button_option" onClick={() => {
                            navigator.clipboard.writeText(post?.permalink || "")
                            .then(() => {
                                setNote("Copied to Clipboard");
                                setOptionOpened(!optionOpened);
                                setTimeout(() => setNote("") ,2000)
                            })
                            }}>
                            <IoLink />
                            Copy Link
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {playingVideo && <VideoPlayerComponent title={post.title || ""} desc={post.title !== post.description && post.description || ""} url={((post.media_type || "")?.toLowerCase() === "video" ? post.media_url : VideoPlayer) || ""} onclose={() => {setPlayingVideo(false)}}/>}
        {showCarousel && 
    <div className='publish_content_card_show_carousel_container'>
        <div className='publish_content_card_show_carousel'>
            {(post.media_children || []).length > 0 && post.media_children?.map((child: PostChild, index: number) => {
                const isVideo = (child.media_type || "").toLowerCase() === "video";
                const imageUrl = child.thumbnail_url ?? child.media_url ?? "";
                return (
                    <div key={index} className="carousel_item_wrapper">
                        <img 
                            src={imageUrl} 
                            alt="media preview" 
                            className='publish_content_card_show_carousel_image_thumbnail' 
                        />
                        {isVideo && (
                            <div 
                                className="publish_content_card_media_is_video_indicator_container" 
                                onClick={() => setPlayingVideo(true)}
                            >
                                <ReactIcons.FaPlay color='whitesmoke' />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>


        <div ref={carouselRef} className="publish_content_card_show_carousel_active_indicator_container">
            {post.media_children?.map((child: PostChild, index: number) => (
                <div key={index} className={`publish_content_card_show_carousel_active_item_container ${index === activeIndex ? "publish_content_card_show_carousel_active_item_container_active" : ""}`}>
                    <img src={child.thumbnail_url ?? child.media_url ?? ""} className='publish_content_card_show_carousel_active_item' />
                </div>
            ))}
        </div>
    </div>
}

    </div>
  )
}

export default ContentCard