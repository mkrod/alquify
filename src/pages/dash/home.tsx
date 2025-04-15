import React, { useEffect, useState } from 'react';
import './css/home.css';
import UsageCounter from '../../components/usage_counter';
import { IoBookmark, IoSearch } from 'react-icons/io5';
import { FiGift, FiGrid } from 'react-icons/fi';
import { FaArrowRight, FaArrowRightLong, FaPeopleGroup, FaRegClock, FaRegComment } from 'react-icons/fa6';
import HomeBoard from '../../components/home/home_board';
import SocialGraphVisuals from '../../components/social/social_graph_visuals';
import { BiSolidMagicWand } from 'react-icons/bi';
import { LiaRobotSolid } from 'react-icons/lia';
import { getColorFromText, mediaLocation } from '../../constant';
import { PiBellBold } from 'react-icons/pi';
import { useWebSocket } from '../../constant/provider';
import { BsDot } from 'react-icons/bs';



const Home : React.FC = () => {

interface Props {
    title:  string;
    info: string;
    icon: React.ReactNode;
    data: {
        total:  string;
        remaining: string;
    }
    canUpgrade: boolean;
}

interface BoardDataProp {
    title?: string;
    subtitle?: string;
    action?: {
        text: string;
        path: string;
    };
}

interface VideosProp {
  title: string;
  group:  string;
  link: string;
}

interface Activity {
  activity: string;
  qty: number | string;
}

interface Watch {
  title?: string;
  link?: string;
}

  const [featuresUsage, setFeaturesUsage] = useState<Props[]>([])
  const [boardData, setBoardData] = useState<BoardDataProp[]>([])
  const [videos, setVideos] = useState<VideosProp[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [reminder, setReminders] = useState<string[]>([]);
  const [watch, setWatch] = useState<Watch>({});
  const { userData } = useWebSocket();

  useEffect(() => {
    setFeaturesUsage([
      {
        title: "Conversation Usage",
        info: "conversations. Get more conversations and access our best features. Upgrade now",
        icon: <FaRegComment color='#FA5A2A' size={15} />,
        data: {
          total: "50",
          remaining: "50"
        },
        canUpgrade: true
      },
      {
        title: "ChatBot" ,
        info: "Guide your visitors on their buyer journey, automate frequently asked questions, and drive your online sales through conversations. Upgrade and start using a chatbot.",
        icon: <LiaRobotSolid color='#FA5A2A' size={15} />,
        data: {
          total: "0",
          remaining: "0"
        },
        canUpgrade: true
      },
      {
        title: "Qui Ai Bonus" ,
        info: "The number of conversations you can use to try out Qui AI on your website. If you just want to test the AI, start a chat with Mira AI in the Live preview & publish section",
        icon: <FiGift color='#FA5A2A' size={15} />,
        data: {
          total: "10",
          remaining: "0"
        },canUpgrade: false
      },
      {
        title: "Unlock Qui AI conversations",
        info: "Increase sales and excite customers with excellent care. The Qui AI precisely responds to each customer's needs. It is always available, recommends personalized products, and provides advice in any situation. Upgrade your plan and start using the Qui AI.",
        icon: <BiSolidMagicWand color='#FA5A2A' size={15} />,
        data: {
          total: "0",
          remaining: "0"
        },
        canUpgrade: true
      }
  ])
  }, []);


  useEffect(() => {
    setBoardData([
        {
          title: "Schedule content for later",
          subtitle: "we analyse the traffic on your social account network to identify the best time to share your post. Then you can easily schedule them for that specific time!",
          action: {
              text: "Try it for free",
              path: "/dash/socials/publish",
          }
      },
      {
        title: "Chat with your visitors",
        subtitle: "All your visitors' conversation in a place, don't miss a moment",
        action: {
            text: "Try it for free",
            path: "/dash/chats",
        }
    },
      {
        title: "Monitor Performance",
        subtitle: "Visit analytics to see how your various account perform over a period of time.",
        action: {
            text: "Go",
            path: "/dash/socials/analyse",
        }
    },
      {
        title: "Agents",
        subtitle: "Register agents to manage specific portion of the app, enhance productivity and speciality",
        action: {
            text: "Try it for free",
            path: "/dash/settings/agents",
        }
    },

    ])
  }, []);


  useEffect(() => {
    setVideos([
      {
        title: "Facebook Ads",
        group: "Crash Course",
        link: "https://www.example.com"
      },
      {
        title: "Youtube Optimization",
        group: "Tutorials",
        link: "https://www.example.com"
      },
      {
        title: "Is Timing Important?",
        group: "Article",
        link: "https://www.example.com"
      },
    ])
  }, [])


  useEffect(() => {
    setActivity([
      {
        activity: "Scheduled",
        qty: 184
      },
      {
        activity: "Promotions",
        qty: 94
      },
    ])
  }, [])


  useEffect(() => {
    setReminders([
      "Promote last week's post on instagram",
      "Learn YouTube optimization",
      "Compare June and July",
      "Promote last week's post on instagram",
      "Learn YouTube optimization",
    ])
  }, [])


  useEffect(() => {
    setWatch({
      title: "How to Grow Audience",
      link: "https://www.youtube.com/"
    })
  }, [])


  return (
    <div className='dash_home_container'>
      <div className="dash_home_content_container">
        <div className="dash_home_content_left_container">
          <div className="dash_home_content_left_header_container">
            <div className="dash_home_content_left_header_left">
              <div className="dash_home_content_left_header_left_search">
                <IoSearch color='#FA5A2A' size={15} />
              </div>
              <div className="dash_home_content_left_header_left_customize">
                <FiGrid color='#FA5A2A' size={15} />
                <span className='dash_home_content_left_header_left_customize_text'>Customize</span>
              </div>
            </div>
            <div className="dash_home_content_left_header_right">
              {featuresUsage.length > 0 && featuresUsage.map((item: Props, index: number) => (
                <UsageCounter 
                key={index}
                title={item.title}
                info={item.info}
                icon={item.icon}
                data={item.data}
                canUpgrade={item.canUpgrade}
                />
              ))}
            </div>
          </div>




          <div className="dash_home_content_left_board_container">
            <HomeBoard 
              data={boardData}
            />
          </div>


          <div className="dash_home_content_left_graphs_container">
            <SocialGraphVisuals title="Total Impressions" icon={<FaPeopleGroup color='' />} data={{}}  option={{ body: { width: "60%", accent: "#fa5a2a", backgroundAccent: "#fa5a2a27" }, graph:{ barColors: ["#fa5a2a"], borderRadius: 10, barThickness: 30  }, x:{ font: { family: "Inconsolata" } }, y: { font: { family:  "Inconsolata" } }}}/>
            <SocialGraphVisuals title="Audience Growth" icon={<FaPeopleGroup color='' />} data={{}}  option={{ body: { width: "60%", accent: "#fa5a2a", backgroundAccent: "#fa5a2a27" }, graph:{ barColors: ["#fa5a2a"], borderRadius: 10, barThickness: 30, style: "line"  }, x:{ font: { family: "Inconsolata" } }, y: { font: { family:  "Inconsolata" } }}}/>
          </div>


          <div className="dash_home_content_left_video_section_container">
            <div className="dash_home_content_left_video_section_header">
              Tutorials
            </div>

            <div className="dash_home_content_left_video_section_content">
              {videos.map((item:  VideosProp, index: number) => (
                <div style={{background: getColorFromText(item.title, "fade")}} key={index} className="dash_home_content_left_video_card_container">
                  <div className="dash_home_content_left_video_card_title">{item.group}</div>
                  <div className="dash_home_content_left_video_card_body">
                    <div className="dash_home_content_left_video_card_body_title">{item.title}</div>
                    <button style={{background: getColorFromText(item.title, "plain")}} className="dash_home_content_left_video_card_body_button" onClick={() => window.open(item.link, "_blank")}>
                      <FaArrowRightLong size={12} color='white' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>



       </div>








        <div className="dash_home_content_right_container">
          <div className="dash_home_content_right_name_header">
            <div className="dash_home_content_right_header_left">
              <PiBellBold size="" color='#fa5a2a' />
            </div>
            <div className="dash_home_content_right_header_middle">
              <span className="dash_home_content_right_header_middle_hello">Hello</span>
              <span className="dash_home_content_right_header_middle_name">{ (userData?.name as string)?.slice(0, 7) || "User" }</span>
            </div>
            <div className="dash_home_content_right_header_right">
              <img src={`${userData?.profile_picture ? mediaLocation + "/" + userData.profile_picture : "/placeholder.png" }`} className='dash_home_content_right_header_right_picture' />
            </div>
          </div>



          <div className="dash_home_content_right_activity_cards_container">  
              {activity.map((item: Activity, index: number) =>  (
                <div key={index} className="dash_home_content_right_activity_card">
                  <div className="dash_home_content_right_activity_card_top">{item.activity}</div>
                  <div className="dash_home_content_right_activity_card_down">
                    <BsDot color='#fa5a2a'/>
                    <span className='dash_home_content_right_activity_card_down_qty'>{item.qty}</span>
                    <button className='dash_home_content_right_activity_card_button'>
                       <FaArrowRightLong size={15} color='#fa5a2a' />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="dash_home_content_right_reminder_section_container">
            {reminder.map((item: string, index: number) => (
              <div key={index} className="dash_home_content_right_reminder_container">
                <div className="dash_home_content_right_reminder_left">
                  <FaRegClock color='#fa5a2a' size={20} />
                </div>
                <div className="dash_home_content_right_reminder_right">{item}</div>
              </div>
            ))}
          </div>

          <div className="dash_home_content_right_other">
            <IoBookmark size={40} color='#fa5a2a' className='dash_home_content_right_other_icon' />
            <div className="dash_home_content_right_other_text_link">
              <span className="dash_home_content_right_other_text">Interested?</span>
              <span className="dash_home_content_right_other_link" onClick={() =>  window.open(watch.link,  "_blank")}>{watch.title}</span>
            </div>
            <FaArrowRight size={15} color='black' />
          </div>

          
        </div>

      </div>
    </div>
  )
}

export default Home