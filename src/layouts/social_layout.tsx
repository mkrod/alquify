import { FaFacebook, FaPlus } from 'react-icons/fa6'
import { NavLink, Outlet } from 'react-router-dom'
import "./css/social_layout.css";
import { PiNotePencilBold, PiVisorThin } from 'react-icons/pi';
import { IoGrid } from 'react-icons/io5';
import * as ReactIcons from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';
import { authorizeFB, authorizeGoogle, authorizeLinkedIn, authorizeTwitter, getIGIDWithFbPageId, setUserDetails } from '../constant/auth_socials';
import { server } from '../constant';
import { useWebSocket } from '../constant/provider';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import SocialConnectedModal from '../components/misc/social_conn_modal';
import OptionSelector from '../components/social/option_selector';
import ComposePost from '../components/social/compose_post';


const SocialLayout = () => {

    const { note, setNote, socialAccounts, setSocialAccounts, /*addedKeys, removedKeys, socialAccTracker, setSocialAccTracker*/ } = useWebSocket();

    interface Channel {
        id: number;
        title: string;
        icon: keyof typeof ReactIcons;
        details: string;
        iconSize: number;
        iconColor: string;
        onclick: () => void;
    }

    const [options, setOptions] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    // @ts-ignore
    const [channel, setChannel] = useState<Channel[]>([
        {
            id: 1,
            title: 'Facebook',
            icon: 'FaFacebook',
            details: 'Connect your Facebook page to start publishing content',
            iconSize: 30,
            iconColor: '#1877F2',
            onclick: authorizeFB
        },
        {
            id: 2,
            title: 'Twitter',
            icon: 'FaSquareXTwitter',
            details: 'Connect your Twitter page to start publishing content',
            iconSize: 30,
            iconColor: '#000000',
            onclick: authorizeTwitter
        },
        {
            id: 3,
            title: 'Instagram',
            icon: 'FaInstagram',
            details: 'Connect your Instagram page to start publishing content',
            iconSize: 30,
            iconColor: '#E1306C',
            onclick: () => {
                //replace with logic to authorize user and redirect to callback @ /auth/instagram/callback then process the token for acessToken
                //window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${IGClient}&redirect_uri=${server}/auth/instagram/callback&scope=instagram_basic&response_type=code`;
                window.open(`${server}/auth/instagram/callback`, "_self");


            }
        },
        {
            id: 4,
            title: 'LinkedIn',
            icon: 'FaLinkedin',
            details: 'Connect your LinkedIn page to start publishing content',
            iconSize: 30,
            iconColor: '#0077B5',
            onclick: authorizeLinkedIn
        },
        {
            id: 5,
            title: 'TikTok',
            icon: 'FaTiktok',
            details: 'Connect your TikTok page to start publishing content',
            iconSize: 30,
            iconColor: '#000000',
            onclick: async () => {
                window.location.href = `${server}/tiktok/auth`;
            },

        },
        {
            id: 6,
            title: 'YouTube',
            icon: 'FaYoutube',
            details: 'Connect your YouTube page to start publishing content',
            iconSize: 30,
            iconColor: '#FF0000',
            onclick: () => authorizeGoogle
        },
        {
            id: 7,
            title: 'Google My Business',
            icon: 'FaGoogle',
            details: 'Connect your Google My Business page to start publishing content',
            iconSize: 30,
            iconColor: '#4285F4',
            onclick: () => console.log('Google My Business')
        },
        {
            id: 8,
            title: 'Pinterest',
            icon: 'FaPinterest',
            details: 'Connect your Pinterest page to start publishing content',
            iconSize: 30,
            iconColor: '#E60023',
            onclick: () => console.log('Pinterest')
        },
        {
            id: 9,
            title: 'Reddit',
            icon: 'FaReddit',
            details: 'Connect your Reddit page to start publishing content',
            iconSize: 30,
            iconColor: '#FF4500',
            onclick: () => console.log('Reddit')
        },
        {
            id: 10,
            title: 'Snapchat',
            icon: 'FaSnapchat',
            details: 'Connect your Snapchat page to start publishing content',
            iconSize: 30,
            iconColor: '#FFFC00',
            onclick: () => console.log('Snapchat')
        },
   ]);

   const [channelOptioning, setChannelOptioning] = useState<string>("")

   



    interface SelectingOptionFromBackendProp {
        action: string;
        data: Pages[];
        onfinish: (value: string | undefined) => void;
    }

    interface Pages {
        title: string;
        id: string,
        username?: string;
        name: string;
        category?: string;
        picture?: string;
        platform?: string;
        type?: string;
    }
    const [SelectingOptionFromBackend, setSelectingOptionFromBackend] = useState<SelectingOptionFromBackendProp>({
        action: "",
        data: [],
        onfinish: () => {}
    });

    useEffect(() => { //for ig linkage proccess
        const getCookieValue = (name: string) => {
            const match = document.cookie
                .split("; ")
                .find(row => row.startsWith(name + "="));
            return match ? match.split("=")[1] : null; // Extract only the value
        }

        const pages_string = getCookieValue("fb_pages");
        console.log("raw pages_string", pages_string);
        console.log("raw pages_string", decodeURIComponent(pages_string || ""));
     
        const fb_pages: Pages[] = pages_string ? JSON.parse(decodeURIComponent(pages_string)) : null;
        if (fb_pages) {
            setSelectingOptionFromBackend({
                data: fb_pages,
                action: "add",
                onfinish: (id: string | undefined) => {
                    if (!id) return;
                    document.querySelector(".loading-container")?.classList.add("gen_active");
                    setTimeout(() => {
                        //after first render logic

                        getIGIDWithFbPageId(id)
                        .then((res) => {
                            if(res.message === "success"){
                                setSelectingOptionFromBackend({data: [], action: "", onfinish: () => {}});
                                setSelectingOptionFromBackend({
                                    data: res.data,
                                    action: "add",
                                    onfinish: async (value) => {                                        
                                        if (!value) {
                                            setNote("Please Select your account to continue");
                                            setTimeout(() => setNote(""), 2000);
                                            return;
                                        }
                                        setSelectingOptionFromBackend({data: [], action: "", onfinish: () => {}});
                                        document.querySelector(".loading-container")?.classList.add("gen_active");

                                        const result = await fetch(`${server}/save-instagram-token`, {
                                            method: "POST",
                                            body: JSON.stringify({ ig_bus_id: value }),
                                            credentials: "include",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        });
                                        interface Res {
                                            message: string;
                                            data: any;
                                        }
                                        if (!result.ok) throw new Error("Failed to save instagram token");
                                        const res: Res = await result.json();
                                        if (res.message === "success") {
                                            setTimeout(() => {
                                                window.location.reload();
                                                document.querySelector(".loading-container")?.classList.remove("gen_active");
                                            }, 2000);
                                        }else{
                                            
                                        }
                                        //finalize


                                    },

                                })
                            }else{
                                setNote(res.data.message);
                                setTimeout(() => setNote(""), 2000);
                            }

                        })
                        .catch((err) => {
                            console.log(err);

                        })
                        .finally(() => {
                            document.querySelector(".loading-container")?.classList.remove("gen_active");
                        });
                    }, 2000);
                }
            });

            document.cookie = "fb_pages=; Max-Age=0"; // Clear the cookie
        }
    }, []);




    const [isComposing, setIsComposing] = useState<boolean>(false);

    const Option = () => {
        return(
            <div className='social_home_navbar_option_container'>


            <div className="social_home_navbar_option_top_item" onClick={() => setIsComposing(true)}>
                <div className='social_home_navbar_option_top_item_icon'>
                <PiNotePencilBold size={17} color='green' />
                </div>
                
                <div className='social_home_navbar_option_top_item_texts'>
                    <span className='social_home_navbar_option_top_item_text'>Post</span>
                    <span className='social_home_navbar_option_top_item_text_fade'>Publish content to a channel</span>
                </div>
            </div>


            


            <div className="social_home_navbar_option_top_item" onClick={() => setIsConnecting(!isConnecting)}>
                <div className='social_home_navbar_option_top_item_icon'>
                <IoGrid size={17} color='blue' />
                </div>
                
                <div className='social_home_navbar_option_top_item_texts'>
                    <span className='social_home_navbar_option_top_item_text'>Connect a new channel</span>
                    <span className='social_home_navbar_option_top_item_text_fade'></span>
                </div>
            </div>


          
        </div>
        );
    }

    interface ChannelComponentProp {
        size: number;
        icon: keyof typeof ReactIcons;
        color: string;
        title: string;
        details: string;
        onclick: (value: any) => void;
    }

    const ChannelComponent : React.FC<ChannelComponentProp> = ({ size, icon, color, title, details, onclick }  ) => (

        <div className="channel_connect_list_content_channel" onClick={onclick}>
            <div className="channel_connect_list_content_channel_left">
                {React.createElement(ReactIcons[icon] as React.ElementType, { size, color })}
            </div>
            <div className="channel_connect_list_content_channel_right">
                <span className="channel_connect_list_content_channel_right_title">{title}</span>
                <span className="channel_connect_list_content_channel_right_details">{details}</span>
            </div>
        </div>

    )




    interface ChannelProp {
        channel: Channel[];
    }

    const Channels : React.FC<ChannelProp> = ({ channel }) => (
        <div className='channel_connect_list_container' onClick={() => setIsConnecting(!isConnecting)}>
          <div className='channel_connect_list_content_container'>
            <div className="channel_connect_list_content_header">
                <span>Connect a New Channel</span>
            </div>

            <div className="channel_connect_list_content">

              {channel.map((item, index) => (
                <ChannelComponent 
                 key={index}
                 size={item.iconSize}
                 icon={item.icon}
                 color={item.iconColor}
                 title={item.title}
                 details={item.details}
                 onclick={item.onclick}
                />
              ))}
            </div>
          </div>
        </div>
    )


    useEffect(() => {
        //console.log("token", localStorage.getItem('social_token'));
        //if(localStorage.getItem('social_token') !== null || ) return;
        console.log('Fetching tokens');
        fetch(`${server}/auth/get-tokens`, { 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log("data", data.data);
            setUserDetails(data.data)
            .then((data: any) => {
                setSocialAccounts(data);
                //setSocialAccTracker(data)
            })
            .catch((err) => {
                console.log(err);
            })
            //localStorage.setItem('social_token', data.access_token)
        });
    },[]);

    
    interface Links {
        linked: string;
        unLinked: string;
    }

    const [links, setLinks] = useState<Links>({
        linked:  "",
        unLinked: ""
    });

    useEffect(() => {

        const getCookieValue = (name: string) => {
            const match = document.cookie
                .split("; ")
                .find(row => row.startsWith(name + "="));
            return match ? match.split("=")[1] : null; // Extract only the value
        };


        const linkedAcc = getCookieValue("linked_account");
        if (linkedAcc) {
            setLinks(prev => ({ ...prev, linked: linkedAcc }));
            document.cookie = "linked_account=; Max-Age=0"; // Clear the cookie
        }

        const unlinkedAcc = getCookieValue("unlinked_account");
        if (unlinkedAcc) {
            setLinks(prev => ({ ...prev, unLinked: unlinkedAcc }));
            document.cookie = "unlinked_account=; Max-Age=0"; // Clear the cookie
        }
    }, [])


    const [platformShowing, setPlatformShowing] = useState<string>("All");

  useEffect(() => {
    


  }, [socialAccounts, /* newPost (create new variable and make it trigger update also after post from here) */]);

  return (
    <div className='dash_home_container'>
        <div className="social_home_navbar">
            <div className="social_home_navbar_left">
                <NavLink className='social_home_navbar_links' to="publish">
                    Publish
                </NavLink>
                <NavLink className='social_home_navbar_links' end to="">
                    Board
                </NavLink>
                <NavLink className='social_home_navbar_links' end to="analyse">
                    Analyse
                </NavLink>
                <NavLink className='social_home_navbar_links' end to="engage">
                    Engage
                </NavLink>
                <NavLink className='social_home_navbar_links' end to="start-page">
                    Start Page
                </NavLink>
            </div>






            <div className="social_home_navbar_right">
                <div className='social_home_navbar_account_links'>

                    {
                        Object.keys(socialAccounts).map((key) => (
                            <div className='social_home_navbar_account_links_item' key={key}>
                                <img src={socialAccounts[key].picture} className='social_home_navbar_image_dp' />
                                {key === "facebook" && <FaFacebook size={15} color='#1877F2' className='social_home_navbar_image_logo' />}
                                {key === "google" && <ReactIcons.FaYoutube size={15} color='#ff0000' className='social_home_navbar_image_logo' />}
                                {key === "tiktok" && <ReactIcons.FaTiktok size={15} color='#000000' className='social_home_navbar_image_logo' />}
                                {key === "linkedin" && <ReactIcons.FaLinkedin size={15} color='#0077B5' className='social_home_navbar_image_logo' />}
                                {key === "instagram" && <ReactIcons.FaInstagram size={15} color='#E1306C' className='social_home_navbar_image_logo' />}
                                {key === "x" && <ReactIcons.FaSquareXTwitter size={15} color='#000000' className='social_home_navbar_image_logo' />}
                                <div className='social_home_navbar_link_item_settings_icon' onClick={() => {
                                  
                                  if(channelOptioning !== key && channelOptioning !== ""){
                                    (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.remove("intersecting");
                                    setTimeout(() => (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.add("intersecting"), 100);
                                    setChannelOptioning(key);
                                  }else if(channelOptioning === key){
                                    (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.remove("intersecting");
                                    setChannelOptioning("");
                                  }else if(channelOptioning === ""){
                                    (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.add("intersecting");
                                    setChannelOptioning(key)
                                  }
                                  
                                }}>
                                    <HiDotsHorizontal className='settings_icon_social_home' />
                                </div>
                            </div>
                        ))
                    }

                        <div className='social_home_navbar_link_item_options'>
                          <div className='social_home_navbar_link_item_option' onClick={() => {
                            document.querySelector(".loading-container")?.classList.add("gen_active");

                            setTimeout(() => {
                                (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.remove("intersecting");
                                setPlatformShowing(channelOptioning)
                                document.querySelector(".loading-container")?.classList.remove("gen_active");
                            }, 2000);
                            
                            }}>
                            <PiVisorThin color='blue' />
                            <span className='social_home_navbar_link_item_option_label'>Sort</span>
                          </div>
                          <div className='social_home_navbar_link_item_option'>
                            <ReactIcons.FaGear color='green' />
                           <span className='social_home_navbar_link_item_option_label'>Settings</span>
                          </div>
                          <div className='social_home_navbar_link_item_option' onClick={ async () => {
                               document.querySelector(".loading-container")?.classList.add("gen_active");
                                try {
                                    const existingUserData = JSON.parse(localStorage.getItem("userSocialData") || "{}");
                                    const result = await fetch(`${server}/remove-social-token`, {
                                      method: "POST",
                                      body: JSON.stringify({ key: channelOptioning }),
                                      credentials: "include",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    });
                              
                                    interface Res {
                                      message: string;
                                      data: any;
                                    }
                              
                                    if (!result.ok) throw new Error("Failed to remove social token");
                              
                                    const res: Res = await result.json();
                              
                                    if (res.message === "success") {
                                      delete existingUserData[channelOptioning]; // Remove expired user details
                                      setSocialAccounts(existingUserData);
                                      localStorage.setItem("userSocialData", JSON.stringify(existingUserData)); // ✅ Convert object to JSON string
                                      setLinks(prev => ({...prev, unLinked: channelOptioning}));
                                    }
                                  } catch (error) {
                                    console.error("Error removing social token:", error);
                                  }

                                  (document.querySelector(".social_home_navbar_link_item_options") as HTMLDivElement || null)?.classList?.remove("intersecting");
                                  setChannelOptioning("");
                                  setTimeout(() =>  document.querySelector(".loading-container")?.classList.remove("gen_active"), 1000);
                          }}>
                            <BiLogOut color='#ff1b1b' />
                           <span className='social_home_navbar_link_item_option_label'>Sign out</span>
                          </div>
                        </div>
                </div>




                <button className='social_home_navbar_button' onClick={() => setOptions(!options)}>
                    <FaPlus size={12} color='#fff' />
                    New
                </button>
            </div>


            {options && <Option />}
            {isConnecting && <Channels channel={channel} />}
        </div>

        <div className="social_home_container">
         <Outlet context={{platformShowing, setPlatformShowing, setIsComposing}} />
        </div>



        {links.linked !== "" && links.unLinked === "" && <SocialConnectedModal platform={links.linked} action="add" close={() => setLinks((prev : Links) => ({...prev, linked: ""}))} />}
        {links.unLinked !== "" && links.linked === "" && <SocialConnectedModal platform={links.unLinked} action="remove" close={() => setLinks((prev : Links) => ({...prev, unLinked: ""}))} />}
        {SelectingOptionFromBackend.data && SelectingOptionFromBackend.data.length > 0 && <OptionSelector data={SelectingOptionFromBackend} />}

        {note &&
        <div style={{top: note !== "" ? "0" : "-100%", zIndex: "10001"}} className="dash_layout_connecting_container">
          <div style={{backgroundColor: "greenyellow"}} className="dash_layout_bar_line"></div>
          <div className="dash_layout_connecting_text">{note}</div>
        </div>}



        {isComposing && <ComposePost onexit={() => setIsComposing(false)} />}
    </div>
  )
}

export default SocialLayout