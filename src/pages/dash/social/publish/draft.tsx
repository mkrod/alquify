import { useEffect } from "react"
import { FaPlus } from "react-icons/fa6"
import { TbEdit } from "react-icons/tb"
import { useOutletContext } from "react-router-dom"


const PublishDraft = () => {

    interface OutletContext {
        draft: { id: number; content: string }[];
        setDraft:(value: any) => void;
        setIsComposing: React.Dispatch<React.SetStateAction<boolean>>;
    }

    const { draft, setDraft, setIsComposing } = useOutletContext<OutletContext>()

    useEffect(() => {
        //fetch draft from localstorage and
        setDraft([]);
    }, [])

  return (
    <div className="publish_draft_container">


        {draft.length === 0 && 
        <div className="publish_que_empty_state_container">
            <TbEdit className="que_empty_state_icon" />
            <span className="que_empty_state_text">No Draft</span>
            <span className="que_empty_state_text_fade">Save some draft contents, and they'll appear here</span>
            <button onClick={() => setIsComposing(true)} className="que_empty_state_button">
                <FaPlus size={15} color="#fff" />
                New Post
            </button>
        </div>
        }
    </div>
  )
}

export default PublishDraft