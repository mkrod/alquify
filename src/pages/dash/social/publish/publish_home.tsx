import { SiMediapipe } from 'react-icons/si'
import { NavLink, Outlet } from 'react-router-dom'
import "./css/publish_home.css";
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useWebSocket, Posts } from '../../../../constant/provider';
import { sortPostsByTimestamp } from '../../../../constant/social_api';


const PublishHome = () => {

    const { platformShowing, setPlatformShowing, setIsComposing } = useOutletContext<{
        platformShowing: string,
        setIsComposing: React.Dispatch<React.SetStateAction<boolean>>
        setPlatformShowing: React.Dispatch<React.SetStateAction<string>>
    }>();

    const { socialPosts, socialAccounts } = useWebSocket();

    interface Que {
        
    }

    interface Draft {

    }

    const [que, setQue] = useState<Que[]>([])
    const [draft, setDraft] = useState<Draft[]>([]);
    const [contents, setContents] = useState<Posts[]>([])
    const [currentChannel, setCurrentChannel] = useState<string>();

    useEffect(() => {
        const current = platformShowing === "All" 
            ? sortPostsByTimestamp(Object.values(socialPosts).flat()) 
            : sortPostsByTimestamp((Object.values(socialPosts)
            .flat())
            .filter(post => post.platform === platformShowing));

            setContents(current);

    }, [platformShowing, socialAccounts, socialPosts]);
    const lastPath : string = window.location.pathname.split('/').filter(Boolean).pop() || "";



  return (
    <div>
        <div className="publish_header_content_container">
            <div className="publish_header_left_container">
                <SiMediapipe size={25} className='publish_header_left_icon' />
                <span onClick={() => {
                    if(platformShowing === "All") return;
                    setPlatformShowing("All");
                }} className="social_analyse_header_left_path_root">{lastPath.charAt(0).toUpperCase() + lastPath.slice(1)}</span>
                <span className="social_analyse_header_left_path_root">/</span>
                <span className="social_analyse_header_left_path_root_absolute">{platformShowing.charAt(0).toUpperCase() + platformShowing.slice(1)}</span>
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
             <Outlet context={{ currentChannel, setCurrentChannel, setQue, que, draft, setDraft, contents, setContents, setIsComposing }}/>
        </div>
    </div>
  )
}

export default PublishHome