import { FaPlus } from "react-icons/fa6";
import "./css/contents.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlinePermMedia } from "react-icons/md";

const PublishContents = () => {

    interface OutletContext {
        contents: {}[];
        setContents:(value: any) => void;
    }

    const { contents, setContents } = useOutletContext<OutletContext>();


    useEffect(() => {
        //fetch contents posts and

        setContents([]);
    }, [])

  return (
    <div className="publish_content_container">



        {contents.length === 0 && 
        <div className="publish_que_empty_state_container">
            <MdOutlinePermMedia className="que_empty_state_icon" />
            <span className="que_empty_state_text">No Content</span>
            <span className="que_empty_state_text_fade">Published Contents will appear here</span>
            <button className="que_empty_state_button">
               <FaPlus size={15} color="#fff" />
               New Post
            </button>
           </div>
        }
    </div>
  )
}

export default PublishContents