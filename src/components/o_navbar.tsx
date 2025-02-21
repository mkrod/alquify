// onboarding navbars component
import { NavLink } from 'react-router-dom';
import './css/o_navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


const OnboardingNavbars = () => {

  useEffect(() => {
    const bars = document.querySelector('.o_nav_container-mobile') as HTMLElement;
    const menu = document.querySelector('.o_nav_container') as HTMLElement;
    const xmark = document.querySelector('.o_nav_xmark') as HTMLElement;
    if(bars && menu){
     
      bars.addEventListener('click', () => {
        menu.style.top = '0';
      })
    }
    if(xmark && menu){
      xmark.addEventListener('click', () => {
        menu.style.top = '-100%';
      })
    }
    
  }, []);  
 

  return (
    <>
    <div className="o_nav_container">
      <div className="o_nav_container-left">
        <span className="o_nav_name-text">
          <img src='https://cdn.dribbble.com/users/702789/avatars/normal/62dc313bebbc78f08ffd3076b6228377.png?1646754829' alt='logo' id='logo_o_navbar' />
          Alquify
        </span>

        <FontAwesomeIcon icon={faXmark} className='o_nav_xmark' />
      </div>

      <ul className="o_nav_container-navlinks">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/dash">
            <li>Dashboard</li>
          </NavLink>
          <NavLink to="/support">
            <li>Support</li>
          </NavLink>
          <NavLink to="/docs">
            <li>Docs</li>
          </NavLink>
        </ul>

      <div className="o_nav_container-right">
        <button className="o_nav-btn btn-primary">Get Started</button>
        <button className="o_nav-btn btn-secondary">Login</button>
      </div>
    </div>


      <div className="o_nav_container-mobile">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </>
  );
}   

export default OnboardingNavbars;