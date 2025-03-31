import { FaGripVertical, FaPlus, FaRegNoteSticky, FaWandMagicSparkles } from "react-icons/fa6";
import "./css/social_home.css";
//import {  useState } from "react";
import { RiGalleryView2 } from "react-icons/ri";
import SocialFeatureCard from "../../../components/social/social_home_card";
import { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail, BiShare } from "react-icons/bi";


const SocialHome = () => {
  //interface List {}

  //const [list, setList] = useState<List[]>();
  interface Analytics{
        title: string;
        icon: React.ReactNode;
        period: string;
        value: {
            current: string;
            prev: string;
        }
  }
  const [analytics, setAnalytics] = useState<Analytics[]>([]);

  useEffect(() => {
    setAnalytics([
      {
        title: "Total post",
        icon: <FaRegNoteSticky style={{backgroundColor: "#ff20ec27"}} className="social_feature_card_icons" color="#ff20ec" size={25} />,
        period: "Month",
        value: {
          current: "2543",
          prev: "1997",
        }
      },
      {
        title: "Average Like",
        icon: <FiThumbsUp style={{backgroundColor: "#0245ff25"}} className="social_feature_card_icons" color="blue" size={25} />,
        period: "Month",
        value: {
          current: "244076",
          prev: "248890",
        }
      },
      {
        title: "Average comment",
        icon: <BiCommentDetail style={{backgroundColor: "#02ff0f25"}} className="social_feature_card_icons" color="green" size={25} />,
        period: "Month",
        value: {
          current: "188086",
          prev: "170679",
        }
      },
      {
        title: "Average Share",
        icon: <BiShare style={{backgroundColor: "#ff4b1525"}} className="social_feature_card_icons" color="#FA5A2A" size={25} />,
        period: "Month",
        value: {
          current: "58089",
          prev: "48484",
        }
      }
    ])
  }, []);


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



        <div className="social_home_content_top_feature_cards">
          {analytics.map((item: Analytics, index: number) => (
            <SocialFeatureCard 
              key={index}
              title={item.title}
              icon={item.icon}
              period={item.period}
              value={item.value}
            />
          ))}
        </div>



    </div>
  )
}

export default SocialHome