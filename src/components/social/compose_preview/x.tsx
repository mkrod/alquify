import React from 'react'
import { useWebSocket } from '../../../constant/provider';
import "./css/x.css";



interface Props {
    data: {
        caption: string;
        media: string[];
    }
}

const XFeedPreview : React.FC<Props> = ({data}) => {

  const { socialAccounts } = useWebSocket();
  const profile : {id: string; name: string; username: string; picture: string;} = socialAccounts.x;
  //console.log(profile)

  return (
    <div className='compose_x_preview_post_container'>
      <div className="compose_x_preview_post_header">
        <div className="compose_x_preview_post_header_left">
          <img src={profile.picture} className='compose_x_preview_post_header_left_img' />
        </div>
        <div className="compose_x_preview_post_header_right">
          <span className="compose_x_preview_post_header_name">{profile.name}</span>
          <span className="compose_x_preview_post_header_username">@{profile.username}</span>
        </div>
      </div>


      
        {data.caption.length > 60 ? (
          <div className="compose_x_preview_post_body_caption">
            {data.caption.slice(0, 60)}
            <strong>...more</strong>
          </div>
            ) : (
            <div className="compose_x_preview_post_body_caption">
              {data.caption}
            </div>
            )}
      


      <div className={`compose_x_preview_post_body_medias_container ${"x_media_children_" + data.media.length}`}>
        {data.media && data.media.length > 0 && data.media.map((item: string, index: number) => (
        <div key={index} className={`compose_x_preview_post_body_media_container ${"x_media_child_" + (index + 1)}`}>
          <img src={item} alt="" className='compose_x_preview_post_body_media' />
        </div>))}
      </div>


    </div>
  )
}

export default XFeedPreview