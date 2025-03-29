import { NavLink, Outlet } from 'react-router-dom';
import { useWebSocket } from '../constant/websocket';
import "./css/settings_layout.css";

const SettingsLayout = () => {

        const { note } = useWebSocket();

  return (
    <div style={{display: "flex", flexDirection: "column"}} className='dash_home_container'>
        <div className='settings_home_header'>
            <span className='settings_home_header_title'>Settings</span>
            <span className='settings_home_header_subtitle'>Manage your account settings</span>
        </div>

        <div className='settings_home_nav_container'>
            <NavLink end className='settings_home_nav' to=''>
                    Account
            </NavLink>

            <NavLink end className='settings_home_nav' to='notification'>
                    Notification
            </NavLink>
            
            <NavLink end className='settings_home_nav' to='billing'>
                    Billing
            </NavLink>

            <NavLink end className='settings_home_nav' to='integration'>
                    Integration
            </NavLink>
            
            <NavLink end className='settings_home_nav' to='shortcuts'>
                    Shortcuts
            </NavLink>

            <NavLink end className='settings_home_nav' to='customize'>
                    Customize
            </NavLink>
            
            <NavLink end className='settings_home_nav' to='agents'>
                    Agents
            </NavLink>

            <NavLink end className='settings_home_nav' to='groups'>
                    Groups
            </NavLink>

            <NavLink end className='settings_home_nav' to='profile'>
                    Profile
            </NavLink>

        </div>

        <div className='settings_content_container'>
            <Outlet />
            
      <div style={{top: note !== "" ? "0" : "-100%"}} className="dash_layout_connecting_container">
          <div style={{backgroundColor: "greenyellow"}} className="dash_layout_bar_line"></div>
          <div className="dash_layout_connecting_text">{note}</div>
      </div>
        </div>
    </div>
  )
}

export default SettingsLayout