import { useState } from "react";
import { appLogoUri, server} from "../../../constant"
import "./css/profile.css";
import { TbEdit } from "react-icons/tb";
import ChangePassword from "../../../components/change_password";




const Profile = () => {

    const [changingPassword, setChangingPassword] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);



        const result = await fetch(`${server}/update-profile`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        const data = await result.json();

        console.log("data: ", data);

        localStorage.setItem("userData", JSON.stringify(data))
    }
    const [newsletter, setNewsletter] = useState(() => {
        return JSON.parse(localStorage.getItem("userData") || "{}").newsletter || "yes";
      });
      
      // Update localStorage when the user selects an option
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewsletter(event.target.value);
        localStorage.setItem("userData", JSON.stringify({ ...JSON.parse(localStorage.getItem("userData") || "{}"), newsletter: event.target.value }));
      };

  return (
    <div className="settings_profile_container">
    <div className="settings_profile_left">
        <div className="settings_profile_header">
            <span className="settings_profile_header_text">Profile</span>
        </div>

        <div className="settings_profile_picture_section">
          <div className="settings_profile_picture_container">
            <TbEdit className="settings_profile_picture_edit_icon" />
            <img src={appLogoUri} className="settings_profile_picture" />
          </div>
        </div>


        <form className="settings_profile_content_container" onSubmit={handleSubmit}>
            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">Name <strong style={{color: "red"}}>*</strong></label>
                <input type="text" name="name" id="settings_profile_content_input_field" placeholder={`${JSON.parse(localStorage.getItem("userData") || "").name || "Enter Name"}`} />
            </div>

            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">Email <strong style={{color: "red"}}>*</strong></label>
                <input type="email" name="email" id="settings_profile_content_input_field" placeholder={`${JSON.parse(localStorage.getItem("userData") || "").email || "Enter Name"}`} />
            </div>

            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">Position / Description <strong style={{color: "red"}}>*</strong></label>
                <input type="text" name="status" id="settings_profile_content_input_field" placeholder={`${JSON.parse(localStorage.getItem("userData") || "").status || "What Describes You?"}`} />
            </div>

            <div className="settings_profile_change_password_text_box_container">
              <label htmlFor="" className="settings_profile_content_input_field_label">Password</label>
              <div onClick={() => setChangingPassword(true)} className="settings_change_password_text">Change Password</div>
            </div>

            <div className="settings_profile_change_password_text_box_container">
              <label htmlFor="" className="settings_profile_content_input_field_label">Do you want to hear about latest news and features?</label>

              <div className="settings_profile_radio_buttons_container">
                <div className="settings_profile_radio_button_container">
                    <label htmlFor="settings_profile_updates_new_radio_button_one" className="settings_profile_updates_new_radio_button_text">Yes</label>
                    <input type="radio" checked={newsletter === 'yes'} onChange={handleChange} name="newsletter" value="yes" id="settings_profile_updates_new_radio_button_one" />
                </div>
                <div className="settings_profile_radio_button_container">
                    <label htmlFor="settings_profile_updates_new_radio_button_two" className="settings_profile_updates_new_radio_button_text">No&nbsp;</label>
                    <input type="radio" checked={newsletter === 'no'} onChange={handleChange} name="newsletter" value="no" id="settings_profile_updates_new_radio_button_two" />
                </div>
              </div>
            </div>



            <button type="submit" className="settings_profile_save">Save</button>
        </form>
    </div>


    {changingPassword && <ChangePassword setChangingPassword={setChangingPassword} />}
    </div>
  )
}

export default Profile