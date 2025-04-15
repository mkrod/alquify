import { FaPlus } from "react-icons/fa6";
import "./css/contents.css";
import { useOutletContext } from "react-router-dom";
//import { useEffect } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { Posts, useWebSocket } from "../../../../constant/provider";
import ContentCard from "../../../../components/social/publish/content_card";
import { useState } from "react";
import ContentPreviewCard from "../../../../components/social/publish/previewing_card";

const PublishContents = () => {


    interface OutletContext {
        contents: Posts[];
        setContents:(value: any) => void;
        setIsComposing: React.Dispatch<React.SetStateAction<boolean>>;
    }

    const { contents, setIsComposing } = useOutletContext<OutletContext>();
    const { fetchingPosts } = useWebSocket();

    const [previewing, setPreviewing] = useState<Posts>({});


  return (
    <div className="publish_content_container">
      {contents.length > 0 && (
        <div className="publish_actual_contents_container">
            {contents.map((item: Posts, index: number) => (
              <ContentCard key={index} post={item} openMedia={() => setPreviewing(item)} />
            ))}
        </div>
      )}


        {contents.length === 0 && !fetchingPosts &&
        <div className="publish_que_empty_state_container">
            <MdOutlinePermMedia className="que_empty_state_icon" />
            <span className="que_empty_state_text">No Content</span>
            <span className="que_empty_state_text_fade">Published Contents will appear here</span>
            <button onClick={() => setIsComposing(true)} className="que_empty_state_button">
               <FaPlus size={15} color="#fff" />
               New Post
            </button>
           </div>
        }
        {fetchingPosts &&
        <div className="publish_content_fetching_loading_container">
          <div className="publish_content_fetching_loading_fidget_spinner"></div>
          <span>Loading Contents</span>
        </div>}
    </div>
  )
}

export default PublishContents