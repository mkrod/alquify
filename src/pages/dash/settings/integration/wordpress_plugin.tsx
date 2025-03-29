import { BsWordpress } from 'react-icons/bs';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const WordPressPlugin = ({isOpen, click} : {isOpen: boolean, click: () => void}) => {

  return (
        <div className={`settings_integration_type ${isOpen ? "settings_integration_type_open" : ""}`}>
            <div className="settings_integration_type_header" onClick={click}>
              <div className="settings_integration_type_header_title">
                <BsWordpress className='integration_image' />
                <span className="settings_integration_type_header_means">Wordpress Plugin</span>
              </div>
              <div className="settings_integration_type_header_actions">
                        {isOpen ? <FaAngleUp className="integration_icons" /> : <FaAngleDown className="integration_icons" />}
              </div>
            </div>
    
    
            <div className="settings_integration_type_content">
                <div className='settings_integration_wordpress_list_container'>
                    <span className='settings_integration_wordpress_list_details_text'>Install our plugin in your CMS:</span>
                    <li className='settings_integration_wordpress_list'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. In the left menu, go to the "Plugins" section and select "Add New."</li>
                    <li className='settings_integration_wordpress_list'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Search for "Alquify Chat Widget".</li>
                    <li className='settings_integration_wordpress_list'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Click the Install (Activate) button and Alquify will appear in the left menu.</li>
                    <li className='settings_integration_wordpress_list'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Click on Alquify Chat in the menu and input your Secret key.</li>
                </div>


                <NavLink to="#" className="settings_integration_nav_link">
                    Read Full Tutorial
                </NavLink>
            </div>
          </div>
  )
}

export default WordPressPlugin