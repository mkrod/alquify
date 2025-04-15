import React, { useState } from 'react'
//import "./css/previewing_card.css";
import * as ReactIcons from "react-icons/fa6";
import { PostChild, Posts } from '../../../constant/provider'
import LightGallery from 'lightgallery/react';
import "swiper/css";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-video.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import VideoPlayerComponent from '../../misc/video_player';


interface Props {
    data: Posts;
}



const ContentPreviewCard : React.FC<Props> = ({data}) => {
    

    const [fullTitle, setFullTitle] = useState<boolean>(false);
    const [fullDescription, setFullDescription] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playing, setPlaying] = useState<string>("");
    



  return (
    <div className='publish_content_preview_card_container'>
        {(data.media_type || "")?.toLowerCase() === "image" && 
            <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} elementClassNames='publish_content_preview_image_container'>
                <a href={data.media_url || ""} className='publish_content_preview_image_container'>
                    <img src={data.media_url || ""} className='publish_content_preview_image' />
                </a>
            </LightGallery>
        }
        {(data.media_type || "").toLowerCase() === "video" && 
            <div className='publish_content_preview_video_container'>
                {data.thumbnail_url ? (<>
                     <img src={data.thumbnail_url || ""} className='publish_content_preview_video_thumbnail' onClick={() => setIsPlaying(true)} />
                     <div className="publish_content_card_media_is_video_indicator_container"  onClick={() => {setIsPlaying(true); setPlaying(data.media_url || "")}}>
                        <ReactIcons.FaPlay color='whitesmoke' />
                    </div>
                    </>) : (
                        <video className='publish_content_preview_video_thumbnail'>
                            <source src={data.media_url || ""}/>
                        </video>
                    ) }
            </div>
        }
                {(data.media_type || "")?.toLowerCase() === "carousel_album" && 
                <div className='publish_content_preview_carousel_album_container'>
                    {data.media_children?.map((child: PostChild, index: number) => (
                    <div key={index} className='publish_content_preview_carousel_item_container'>
                        {(child.media_type || "").toLowerCase() === "video" ? (
                        <div>
                            {/* Keep your video logic here */}
                        </div>
                        ) : (
                        <LightGallery speed={500} plugins={[lgZoom, lgThumbnail]}>
                            <a href={child.media_url || ""} style={{ display: "block", width: "100%", height: "100%" }}>
                            <img
                                src={child.media_url || ""}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </a>
                        </LightGallery>
                        )}
                    </div>
                    ))}
                </div>
                }
        {(fullTitle || fullDescription) && <div style={{position: 'absolute', left: "0", right: "0", top: "0", bottom: "0", backgroundColor: "#000000c2"}}></div>}
        <div className='publish_content_preview_caption_container'>
            <span className='publish_content_preview_caption_title'>
                {fullTitle ? (
                    <span>
                        {data?.title}
                        <strong style={{cursor: "pointer"}} onClick={() =>  setFullTitle(false)}>...collapse</strong>
                    </span>
                ) : (
                    <span>
                        {data.title?.slice(0, 50)}
                        {(data.title?.length || 0) > 50 && <strong style={{cursor: "pointer"}} onClick={() =>  setFullTitle(true)}>...expand</strong>}
                    </span>
                )}
            </span>
            {data.title !== data.description && 
            <span className='publish_content_preview_caption_description'>
                {fullDescription ? (
                    <span>
                        {data?.description}
                        <strong style={{cursor: "pointer"}} onClick={() =>  setFullDescription(false)}>...collapse</strong>
                    </span>
                ) : (
                    <span>
                        {data.description?.slice(0, 50)}
                        <strong style={{cursor: "pointer"}} onClick={() =>  setFullDescription(true)}>...expand</strong>
                    </span>
                )}
            </span>}
        </div>

        {isPlaying && playing !== "" && <VideoPlayerComponent url={playing} onclose={() => {setIsPlaying(false); setPlaying("")}} title={data.title || ""} desc={data.title !== data.description ? (data.description || "") : ""} />}
    </div>
  )
}

export default ContentPreviewCard