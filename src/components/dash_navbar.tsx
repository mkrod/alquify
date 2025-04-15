// dashbard navbar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/d_navbar.css';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { GrChat } from "react-icons/gr";
import { LuHouse } from 'react-icons/lu';
import { CiCreditCard2, CiDark, CiGlobe } from 'react-icons/ci';
import { GoGear } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { MdLogout, MdSunny } from 'react-icons/md';
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { appLogoUri } from '../constant';



const DashNavbar = () => {

  useEffect(() => {
    const themeSet = localStorage.getItem('theme');
    if(themeSet){
      switch (themeSet) {
        case 'light':
          document.documentElement.style.setProperty('--background-color', '#ffffff');
          document.documentElement.style.setProperty('--fade-background-color', '#24242443');
          document.documentElement.style.setProperty('--tab-background', '#dddddd');
          document.documentElement.style.setProperty('--text-fade-color', '#3a3a3ab7');
          document.documentElement.style.setProperty('--color', '#242424');

          document.querySelector('.d_nav_bottom_bar_down_light_container')?.classList.add('active_theme');
          document.querySelector('.d_nav_bottom_bar_down_dark_container')?.classList.remove('active_theme');
          break;

        case 'dark':
          document.documentElement.style.setProperty('--background-color', '#242424');
          document.documentElement.style.setProperty('--fade-background-color', '#ffffff43');
          document.documentElement.style.setProperty('--tab-background', '#1a1a1a');
          document.documentElement.style.setProperty('--color', '#ffffff');
          document.documentElement.style.setProperty('--text-fade-color', '#bdbdbdbd');

          document.querySelector('.d_nav_bottom_bar_down_dark_container')?.classList.add('active_theme');
          document.querySelector('.d_nav_bottom_bar_down_light_container')?.classList.remove('active_theme');
          break;
        default:
          break;
      }
    }

  }, [])

  const openBar = () => {
   
      const navbar = document.querySelector(".d_nav_container") as HTMLElement;
      const appName = document.querySelector(".dash_navbar_appname") as HTMLElement;


      if(window.matchMedia("(max-width: 1024px)").matches){
        navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
      }

      Array.from(document.querySelectorAll(".dash_tab_link_title")).forEach((element) => {
        (element as HTMLElement).style.display = 'flex';
        appName.style.opacity = '1';
      });
      
      setTimeout(() => {
        navbar.style.width = 'min(240px, 80%)';
      }, 5)


      const themeNames = document.querySelectorAll(".d_nav_bottom_bar_down_light_text, .d_nav_bottom_bar_down_dark_text");
      if (themeNames) {
        Array.from(themeNames).forEach(element => {
          (element as HTMLElement).style.display = 'flex';
        });
      }

      const proFile = document.querySelector(".d_nav_bottom_bar_top") as HTMLElement;
      proFile.style.opacity = "1";

      const theme_container = document.querySelector(".d_nav_bottom_bar_down") as HTMLDivElement;
      theme_container.classList.remove("close_bar")
      
  }


  const closeBar = () => {
    
      const navbar = document.querySelector(".d_nav_container") as HTMLElement;
      const appName = document.querySelector(".dash_navbar_appname") as HTMLElement;

      if(window.matchMedia("(max-width: 1024px)").matches){
       navbar.style.width = '0%';
       Array.from(document.querySelectorAll(".dash_tab_link_title")).forEach((element) => {
        (element as HTMLElement).style.display = 'none';
        appName.style.display = 'none';
      });



      }else{
        navbar.style.width = 'min(100px, 6%)';
        Array.from(document.querySelectorAll(".dash_tab_link_title")).forEach((element) => {
          (element as HTMLElement).style.display = 'none';
          appName.style.opacity = '0';
        });
      }

      if(window.matchMedia("(max-width: 1024px)").matches){
      setTimeout(() => {
        navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
      }, 200);
      }


      const themeNames = document.querySelectorAll(".d_nav_bottom_bar_down_light_text, .d_nav_bottom_bar_down_dark_text");
      if (themeNames) {
        Array.from(themeNames).forEach(element => {
          (element as HTMLElement).style.display = 'none';
        });
      }

      const proFile = document.querySelector(".d_nav_bottom_bar_top") as HTMLElement;
      proFile.style.opacity = "0";

      const theme_container = document.querySelector(".d_nav_bottom_bar_down") as HTMLDivElement;
      theme_container.classList.add("close_bar")
     
  }

  const toogleNavBar = () => {
    //const navbar = document.querySelector(".d_nav_container") as HTMLElement;
    const appName = document.querySelector(".dash_navbar_appname") as HTMLElement;
    console.log(appName.style.opacity)
    if(appName.style.opacity === '1'){
      closeBar();
    }else{
      openBar();
    }
  }

  

  const toggleLight = () => {
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--background', '#f0f0f0;');
    document.documentElement.style.setProperty('--text-fade-color', '#3a3a3ab7');
    document.documentElement.style.setProperty('--fade-background-color', '#24242443');
    document.documentElement.style.setProperty('--tab-background', '#dddddd');
    document.documentElement.style.setProperty('--color', '#242424');

    document.querySelector('.d_nav_bottom_bar_down_light_container')?.classList.add('active_theme');
    document.querySelector('.d_nav_bottom_bar_down_dark_container')?.classList.remove('active_theme');

    localStorage.setItem('theme', 'light');
  }
  const toggleDark = () => {
    document.documentElement.style.setProperty('--background-color', '#242424');
    document.documentElement.style.setProperty('--background', '#2e2e2e;');
    document.documentElement.style.setProperty('--text-fade-color', '#bdbdbdbd');
    document.documentElement.style.setProperty('--fade-background-color', '#ffffff43');
    document.documentElement.style.setProperty('--tab-background', '#1a1a1a');
    document.documentElement.style.setProperty('--color', '#ffffff');

    document.querySelector('.d_nav_bottom_bar_down_dark_container')?.classList.add('active_theme');
    document.querySelector('.d_nav_bottom_bar_down_light_container')?.classList.remove('active_theme');

    localStorage.setItem('theme', 'dark');
  }

  const [email, setEmail] = useState<string | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData).email : "Loading...";
  });

  useEffect(() => {
    if(email !== null || email !== "Loading..." || email !== "") return;
    const userData = localStorage.getItem("userData");
    if(userData){
       const parsedUserData = JSON.parse(userData);
       parsedUserData?.email?.length > 19 ? setEmail(parsedUserData?.email?.slice(0, 16) + "...") : setEmail(parsedUserData?.email) 
    }else{
      setEmail("Loading...")
    }
  }, [email]);

  return (
    <>
    <div className='d_nav_bar_icon' onClick={openBar}>
       <FaBarsStaggered />
    </div>
    <div className="d_nav_container">
      <div className="d_nav_name_logo">
        <img src={appLogoUri} alt='logo' id='logo_dash_navbar' onClick={toogleNavBar} />
        <span className='dash_navbar_appname' style={{opacity: "1"}}>Alquify</span>
        <div style={{ fontSize: 24 }} className='d_nav_head_cancel'>
           <IoMdCloseCircleOutline onClick={closeBar} />
        </div>
           <FontAwesomeIcon icon={faSort} id='d_nav_head_icon' onClick={toogleNavBar} />
      </div>


      <div className="d_nav_tabs_links_container">
        {/*tabs*/}
        <ul className="d_nav_tabs_links">
          <NavLink end to='/dash' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <LuHouse size={20} color='green' />
              <span className='dash_tab_link_title'>Home</span>
            </li>
          </NavLink>
          <NavLink end={false} to='/dash/chats' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <GrChat color='#4124e6' size={18} />
              <span className='dash_tab_link_title'>Chat</span>
            </li>
          </NavLink>
          <NavLink to='/dash/socials' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <CiGlobe size={20} color='violet'/>
              <span className='dash_tab_link_title'>Socials</span>
            </li>
          </NavLink>
          <NavLink end to='/dash/subs' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <CiCreditCard2 size={20} color='orange' />
              <span className='dash_tab_link_title'>Manage Subscription</span>
            </li>
          </NavLink>
          <NavLink to='/dash/settings' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <GoGear size={18} color='#9115ca' />
              <span className='dash_tab_link_title'>Settings</span>
            </li>
          </NavLink>
          <NavLink end to='/auth/logout' className='dash_tab_link_a' onClick={closeBar}>
            <li className="dash_tab_link">
              <MdLogout size={18} color='#f00e0e' />
              <span className='dash_tab_link_title'>Logout</span>
            </li>
          </NavLink>
        </ul>
        
      </div>


      <div className="d_nav_bottom_bar_container">
        {/*bottom*/}
        <div className='d_nav_bottom_bar_top'>
          <div className='d_nav_bottom_bar_top_up'>
            <div className='d_nav_bottom_bar_top_up_dp_container'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEM7h-3_xucDg6PXVOyOxh9QOnMkS0dvydRA&s' className='d_nav_bottom_bar_top_up_dp'/>
              <div style={{ backgroundColor: 'green'}} className='d_nav_bottom_bar_top_up_presence'></div>
            </div>
            <div className='d_nav_bottom_bar_top_up_name_email'>
              <span className='d_nav_bottom_bar_top_up_name'>Unknown Organi...</span>
              <span className='d_nav_bottom_bar_top_up_email'>{ email && email.length <=  15 ? email :  email?.slice(0, 15) + "..." }</span>
            </div>
            <div className='d_nav_bottom_bar_top_up_dp_current_plan_container'>
              <div className='d_nav_bottom_bar_top_up_dp_current_plan'>Free</div>
            </div>
          </div>

          <div className='d_nav_bottom_bar_top_down'>
            <button className='d_nav_bottom_bar_top_down_button'>
              Upgrade to Pro
            </button>
          </div>
        </div>


        <div className='d_nav_bottom_bar_down'>
          <div className='d_nav_bottom_bar_down_light_container' onClick={toggleLight}>
            <MdSunny color='' size={18} />
            <span className='d_nav_bottom_bar_down_light_text'>Light</span>
          </div>

          <div className='d_nav_bottom_bar_down_dark_container' onClick={toggleDark}>
            <CiDark color='' size={18} />
            <span className='d_nav_bottom_bar_down_light_text'>Dark</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashNavbar