import { SiMediapipe } from 'react-icons/si'
import { NavLink, Outlet } from 'react-router-dom'
import "./css/publish_home.css";
import { useState } from 'react';


const PublishHome = () => {

    interface Que {
        
    }

    interface Draft {

    }

    interface Contents {

    }

    const [que, setQue] = useState<Que[]>([])
    const [draft, setDraft] = useState<Draft[]>([]);
    const [contents, setContents] = useState<Contents[]>([])
    const [currentChannel, setCurrentChannel] = useState<string>();


  return (
    <div>
        <div className="publish_header_content_container">
            <div className="publish_header_left_container">
                <SiMediapipe size={25} className='publish_header_left_icon' />
                <span className='publish_header_left_text'>All Channels</span>
            </div>


            <div className="publish_header_right_container">

            </div>
        </div>

        <div className="publish_navbar_conatainer">
            <NavLink end to="" className="publish_navbar_link">
                Queue {que.length}
            </NavLink>
            <NavLink end to="draft" className="publish_navbar_link">
                Draft {draft.length}
            </NavLink>
            <NavLink end to="contents" className="publish_navbar_link">
                Contents {contents.length}
            </NavLink>
        </div>


        <div className="publish_content_container">
             <Outlet context={{ currentChannel, setCurrentChannel, setQue, que, draft, setDraft, contents, setContents }}/>
        </div>
    </div>
  )
}

export default PublishHome