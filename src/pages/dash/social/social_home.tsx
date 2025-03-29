import { FaGripVertical, FaPlus, FaWandMagicSparkles } from "react-icons/fa6";
import "./css/social_home.css";
//import {  useState } from "react";
import { RiGalleryView2 } from "react-icons/ri";


const SocialHome = () => {
  //interface List {}

  //const [list, setList] = useState<List[]>();


  return (
    <div className="social_home_container">
        <div className="publish_header_content_container">
            <div className="publish_header_left_container">
                <FaWandMagicSparkles size={25} className='publish_header_left_icon' />
                <span className='publish_header_left_text'>Create</span>
            </div>


            <div className="social_header_right_container">
              <div className="social_home_header_right_generate_idea_button">
                <FaWandMagicSparkles color="#008000" />
                AI Idea
              </div>
              <div className="social_home_header_right_tabs_view_switch_container">
                <span className="social_home_header_right_tabs_view_switch list">
                  <FaGripVertical />
                  List
                </span>
                <span className="social_home_header_right_tabs_view_switch gallery active">
                <RiGalleryView2 />
                  Gallery
                </span>
              </div>

              <span className="social_home_header_right_button">
                <FaPlus />
                New Idea
              </span>
            </div>
        </div>





    </div>
  )
}

export default SocialHome