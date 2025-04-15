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
import { Posts, useWebSocket } from "../../../constant/provider";
import { sortPostsByTimestamp } from "../../../constant/social_api";


const SocialHome : React.FC = ({}) => {
  //interface List {}

  //const [list, setList] = useState<List[]>();
  interface Analytics{
        title: string;
        icon: React.ReactNode;
        period: string;
        value: {
            current: number;
            prev: number;
        }
  }

  interface OutletContext {
    platformShowing: string;
    setPlatformShowing: (value: string) => void;
  }
  let { platformShowing, setPlatformShowing } = useOutletContext<OutletContext>();
  const { socialPosts } : {socialPosts: Record<string, Posts[]>} = useWebSocket();

  


  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [recentPosts, setRecentPost] = useState<Posts[]>([]);
  const [monthsInterval, setMonthsInterval] = useState<number>(60);

  useEffect(() => {
    let totalPosts : number = 0;
    let totalLikes : number = 0;
    let totalShares: number = 0;
    let totalComment: number = 0;

    const currentDate : Date = new Date();
    const startDate : Date = new Date();
    if(monthsInterval < 0) return;

      // Calculate the start date by subtracting `monthsInterval` months from the current date
    startDate.setMonth(currentDate.getMonth() - monthsInterval);
    
    platformShowing.toLowerCase() === "all" ? 
    Object.values(socialPosts).flat()
      .filter((item: Posts) => new Date(item.timestamp || "") >= startDate)
      .forEach((item: Posts) => {
          totalPosts += 1 //Object.values(socialPosts).flat().length || 0;
          totalLikes += Number(item.like_count) || 0;
          totalShares += Number(item.shares_count) || 0;
          totalComment += Number(item.comments_count) || 0;
      })
    : 
    (socialPosts[platformShowing] || [])
    .filter((item: Posts) => new Date(item.timestamp || "") >= startDate)
    .forEach((item: Posts) => {
        totalPosts += 1 //Object.values(socialPosts[platformShowing]).length || 0;
        totalLikes += Number(item.like_count) || 0;
        totalShares += Number(item.shares_count) || 0;
        totalComment += Number(item.comments_count) || 0;
    });

    //calculate previous interval months starting from startDate
    let totalPrevPosts : number = 0;
    let totalPrevLikes : number = 0;
    let totalPrevShares: number = 0;
    let totalPrevComment: number = 0;

    const prevStartDate : Date = new Date();
    const prevEndDate : Date = new Date();

    prevStartDate.setMonth(startDate.getMonth() - monthsInterval); // Previous interval start date
    prevEndDate.setMonth(startDate.getMonth()); // Previous interval end date (which is the same as the startDate)

    // Now calculate the metrics for the previous interval
    platformShowing.toLowerCase() === "all" ? 
      Object.values(socialPosts).flat()
        .filter((item: Posts) => {
            const postDate = new Date(item.timestamp || "");
            return postDate >= prevStartDate && postDate < prevEndDate;
        })
        .forEach((item: Posts) => {
            totalPrevPosts += 1;
            totalPrevLikes += Number(item.like_count) || 0;
            totalPrevShares += Number(item.shares_count) || 0;
            totalPrevComment += Number(item.comments_count) || 0;
        })
      : 
      (socialPosts[platformShowing] || [])
        .filter((item: Posts) => {
            const postDate = new Date(item.timestamp || "");
            return postDate >= prevStartDate && postDate < prevEndDate;
        })
        .forEach((item: Posts) => {
            totalPrevPosts += 1;
            totalPrevLikes += Number(item.like_count) || 0;
            totalPrevShares += Number(item.shares_count) || 0;
            totalPrevComment += Number(item.comments_count) || 0;
        });


        

    


    setAnalytics([
      {
        title: "Total post",
        icon: <FaRegNoteSticky style={{backgroundColor: "#ff20ec27"}} className="social_feature_card_icons" color="#ff20ec" size={25} />,
        period: monthsInterval === 1 ? `Month` : `${monthsInterval} Months`,
        value: {
          current: totalPosts,
          prev: totalPrevPosts,
        }
      },
      {
        title: "Total Like",
        icon: <FiThumbsUp style={{backgroundColor: "#0245ff25"}} className="social_feature_card_icons" color="blue" size={25} />,
        period: monthsInterval === 1 ? `Month` : `${monthsInterval} Months`,
        value: {
          current: Math.round(totalLikes / 1),
          prev: Math.round(totalPrevLikes / 1),
        }
      },
      {
        title: "Total comment",
        icon: <BiCommentDetail style={{backgroundColor: "#02ff0f25"}} className="social_feature_card_icons" color="green" size={25} />,
        period: monthsInterval === 1 ? `Month` : `${monthsInterval} Months`,
        value: {
          current: Math.round(totalComment / 1),
          prev: Math.round(totalPrevComment / 1),
        }
      },
      {
        title: "Average Share",
        icon: <BiShare style={{backgroundColor: "#ff4b1525"}} className="social_feature_card_icons" color="#FA5A2A" size={25} />,
        period: monthsInterval === 1 ? `Month` : `${monthsInterval} Months`,
        value: {
          current: Math.round(totalShares / monthsInterval),
          prev: Math.round(totalPrevShares / monthsInterval),
        }
      }
    ])
  }, [platformShowing, monthsInterval, socialPosts]);


  useEffect(() => {
    let post : Posts[] = [];
    if(platformShowing.toLowerCase() !== "all" && (!socialPosts[platformShowing]  || socialPosts[platformShowing].length === 0)) return setRecentPost([]);

    platformShowing.toLowerCase() === "all" ?
    post = sortPostsByTimestamp(Object.values(socialPosts).flat()).slice(0, 4)
    :
    post = sortPostsByTimestamp(socialPosts[platformShowing]).slice(0, 4);


    setRecentPost(post);


   /* setRecentPost([
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
  ]);*/
  }, [socialPosts, platformShowing])

  //const lastPath = window.location.pathname.split('/').filter(Boolean).pop();

  return (
    <div className="social_home_container">
        <div className="publish_header_content_container">
            <div className="publish_header_left_container">
                <FaWandMagicSparkles size={25} className='publish_header_left_icon' />
                <span onClick={() => {
                    if(platformShowing === "All") return;
                    setPlatformShowing("All");
                }} className="social_analyse_header_left_path_root">Dashboard</span>
                <span className="social_analyse_header_left_path_root">/</span>
                <span className="social_analyse_header_left_path_root_absolute">{platformShowing.charAt(0).toUpperCase() + platformShowing.slice(1)}</span>
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
           icon={<RiGroupLine color="#fa5a2a" size={12} />}
           data={{}}
           option={{
            graph:{
              barColors: ["#FA5a2a"],
              borderRadius: 10
            },
            body:{
              accent: "#fa5a2a",
              backgroundAccent: "#fa5a2a27",
              width: "50"
            },
            font: {
              family: 'Arial',  // Change to your desired font
              size: 14,         // Adjust font size
              weight: 'bold',   // 'normal', 'bold', 'bolder', etc.
              style: 'italic'   // 'normal', 'italic', 'oblique'
            },
            x: {
              font: {
                family: 'cursive', // X-axis font
                size: 12
              },
            },
            y: {
              font: {
                family: 'cursive', // Y-axis font
                size: 12
              },
            }

           }}
           />
          <SocialGraphVisuals
           title="Engagements"
           icon={<PiPlugsConnectedDuotone color="#fa5a2a" size={12} />}
           data={{}}
           option={{
            graph:{
              barColors: ["#FA5a2a"],
              borderRadius: 10,
              barThickness: 20
            },
            body:{
              accent: "#fa5a2a",
              backgroundAccent: "#fa5a2a27",
              width: "50"
            },
            font: {
              family: 'Arial',  // Change to your desired font
              size: 14,         // Adjust font size
              weight: 'bold',   // 'normal', 'bold', 'bolder', etc.
              style: 'italic'   // 'normal', 'italic', 'oblique'
            },
            x: {
              font: {
                family: 'cursive', // X-axis font
                size: 12
              },
            },
            y: {
              font: {
                family: 'cursive', // Y-axis font
                size: 12
              },
            }

           }}
           />
        </div>



    </div>
  )
}

export default SocialHome