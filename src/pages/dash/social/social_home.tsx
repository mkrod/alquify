import { FaPlus, FaRegNoteSticky, FaWandMagicSparkles } from "react-icons/fa6";
import "./css/social_home.css";
//import {  useState } from "react";
import { RiGroupLine } from "react-icons/ri";
import SocialFeatureCard from "../../../components/social/social_home_card";
import React, { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail, BiShare } from "react-icons/bi";
import SocialRecentPostCard from "../../../components/social/social_recent_post_card";
import NewSocialTask from "../../../components/social/new_social_task";
import SocialGraphVisuals from "../../../components/social/social_graph_visuals";
import { PiPlugsConnectedDuotone } from "react-icons/pi";
import { useOutletContext } from "react-router-dom";


const SocialHome : React.FC = ({}) => {
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

  interface OutletContext {
    platformShowing: string;
    setPlatformShowing: (value: string) => void;
  }
  let { platformShowing, setPlatformShowing } = useOutletContext<OutletContext>();

  


  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [recentPosts, setRecentPost] = useState<Record<string, any>[]>([])

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


  useEffect(() => {
    setRecentPost([
    {
      thumbnail: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/c_fill,w_3840,h_2880,g_auto/f_auto/q_auto/v1/images/mountain?_a=BAVAZGBy0",
      title: "Most visited place in bangladesh",
      tags: ["travel", "city"],
      date: "24, Tue Sep",
      platform: "facebook"
    },
    {
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKXYOn509GNZR1RY1dgn0ml-mTja0lpNueC7GqlOgik-b2EYF8XcMfH6KG4tej06ZT6E&usqp=CAU",
      title: "Most visited place in bangladesh",
      tags: ["travel", "city"],
      date: "24, Tue Sep",
      platform: "instagram"
    },
    {
      thumbnail: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/c_fill,w_3840,h_2880,g_auto/f_auto/q_auto/v1/images/mountain?_a=BAVAZGBy0",
      title: "Most visited place in bangladesh",
      tags: ["travel", "city"],
      date: "24, Tue Sep",
      platform: "linkedin"
    },
    {
      thumbnail: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/c_fill,w_3840,h_2880,g_auto/f_auto/q_auto/v1/images/mountain?_a=BAVAZGBy0",
      title: "Most visited place in bangladesh",
      tags: ["travel", "city"],
      date: "24, Tue Sep",
      platform: "x"
    },  
  ]);
  }, [])


  return (
    <div className="social_home_container">
        <div className="publish_header_content_container">
            <div className="publish_header_left_container">
                <FaWandMagicSparkles size={25} className='publish_header_left_icon' />
                <span className='publish_header_left_text'>Board</span>
            </div>

            <div className="social_home_header_path">
              <span className="social_home_header_path_base" onClick={() => {
                if(platformShowing  === "All") return;
                document.querySelector(".loading-container")?.classList.add("gen_active");
                setTimeout(() => {
                  setPlatformShowing("All")
                  document.querySelector(".loading-container")?.classList.remove("gen_active");
                }, 1000);
              }}>Dashboard/</span>
              <span className="social_home_header_path_current">{platformShowing.charAt(0).toUpperCase() + platformShowing.slice(1)}</span>
            </div>




            <div className="social_header_right_container">
              <div className="social_home_header_right_generate_idea_button">
                <FaWandMagicSparkles color="#008000" />
                AI Idea
              </div>

              <span className="social_home_header_right_button">
                <FaPlus />
                New Idea
              </span>
            </div>
        </div>



        <div className="social_home_content_top_feature_cards">
          {analytics.map((item: Analytics, index: number) => {
            //use  platformShowing prop to filter the data that is being passed i.e if(item.id === platformShowing) item.id or so will have value like facebook, instagram , x, etc
            return (
            <SocialFeatureCard 
              key={index}
              title={item.title}
              icon={item.icon}
              period={item.period}
              value={item.value}
            />
          )})}
        </div>


        <div className="social_home_content_recent_posts_container">
          <SocialRecentPostCard data={recentPosts} platformShowing={platformShowing} cardTitle="Recent Post" />
          <NewSocialTask />
        </div>

        <div className="social_home_content_visualization_container">
          <SocialGraphVisuals
           title="Followers"
           icon={<RiGroupLine color="green" size={12} />}
           data={{}}
           />
          <SocialGraphVisuals
           title="Engagements"
           icon={<PiPlugsConnectedDuotone color="green" size={12} />}
           data={{}}
           />
        </div>



    </div>
  )
}

export default SocialHome