import { useEffect } from "react"
import { FaPlus } from "react-icons/fa6"
import "./css/queue.css";
import { TbCalendarTime } from "react-icons/tb";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
   que:  { id: number; content: string }[];
   setQue: (value:  any) => void;
   setIsComposing: React.Dispatch<React.SetStateAction<boolean>>;
}



const PublishQueue = ()=> {

    const { que, setQue, setIsComposing } = useOutletContext<OutletContext>();

    useEffect(() => {
        //fetch scheduled que and
        setQue([]);
    }, [])


  return (
    <div className="publish_que_container">


        {que.length === 0 && 
        <div className="publish_que_empty_state_container">
            <TbCalendarTime className="que_empty_state_icon" />
            <span className="que_empty_state_text">No Post Scheduled</span>
            <span className="que_empty_state_text_fade">Schedule some posts and they will appear here</span>
            <button onClick={() => setIsComposing(true)} className="que_empty_state_button">
                <FaPlus size={15} color="#fff" />
                New Post
            </button>
        </div>
        }
    </div>
  )
}

export default PublishQueue