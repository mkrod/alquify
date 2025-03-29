import { useEffect, useState } from 'react';
import './css/shortcuts.css';
import { BsThreeDots } from 'react-icons/bs';
import EmptyMsg from '../../../components/empty_msg';

const SettingsShortcuts = () => {
  interface Shortcut {
    name: string,
    type: string,
    text: string,
    state: string
  }

  const [shortcuts, setShortcuts] = useState<Shortcut[]>([])



    useEffect(() => {
      // if there is no cached shortcut list
      // fetch the list and save it to the array
      //  then save it to the cache and set expiry for 24hours
      // to prevent persistent and unecessary query to the database...
    }, [])


    
  return (
    <div className="settings_shortcuts_container">
      <div className="settings_shortcuts_header">
        <span className="settings_shortcuts_header_title">Shortcuts</span>
        <div className="settings_shortcuts_header_right">
          <div className="settings_shortcuts_header_right_guage_container">
            <span className="settings_shortcuts_header_right_guage_text">8/10</span>
            <div className="settings_shortcuts_header_right_guage">
              <div className="settings_shortcuts_header_right_guage_fill"></div>
            </div>
          </div>
          <button className="settings_shortcuts_header_right_button">Add Shortcut</button>
        </div>
      </div>



      <div className="settings_shortcuts_content">

        <div className="settings_shortcuts_content_header">
          <span className='settings_shortcuts_content_header_titles title'>Shortcut name</span>
          <span className='settings_shortcuts_content_header_titles'>
            <span className='settings_shortcuts_content_header_titles_type'>Type</span>
          </span>
          <span className='settings_shortcuts_content_header_titles text'>Text</span>
          <span className='settings_shortcuts_content_header_titles state'>State</span>
        </div>

        {shortcuts.length  > 0 && shortcuts.map((shortcut, index) => (
          <div key={index} className="settings_shortcuts_content_item_container">
            <span className='settings_shortcuts_content_item title'>{shortcut.name}</span>
            <span className='settings_shortcuts_content_item type'>
              <span className='settings_shortcuts_content_item_type'>{shortcut.type}</span>
            </span>
            <span className='settings_shortcuts_content_item text'>{shortcut.text.length > 20 ? shortcut.text.slice(0, 17) + "..." : shortcut.text}</span>
            <div className='settings_shortcuts_content_item state'>
              <label className='settings_shortcuts_content_item_state_toggle_switch switch'>
                <input type="checkbox" className='settings_content_item_state_toogle_switch_value' />
                <span className='settings_shortcuts_content_item_state_toggle_switch_circle slider round'></span>
              </label>

              <BsThreeDots className='settings_shortcuts_content_item_state_option_open' />
            </div>
          </div>
        ))}


        {shortcuts.length === 0 && <EmptyMsg image='' message2='' message="Looks Like you've not added any shortcut"  />}


      </div>
    </div>
  )
}

export default SettingsShortcuts