import { useState } from "react"



const ChangePassword = ({ setChangingPassword }: { setChangingPassword: (value: boolean) => void }) => {

    const [data, setData] = useState({
        newPassword: "",
        confirmNewPassword: "",
        confirmOldPasssword: "",
    })
    return (
        <div className="change_password_container">
            <div className="change_password_header_text_close" onClick={() => setChangingPassword(false)}>Close</div>

            <form>
            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">New Password <strong style={{color: "red"}}>*</strong></label>
                <input type="password" value={data.newPassword} onChange={(e) => setData((prev) => ({...prev, newPassword: e.target.value}))} id="settings_profile_content_input_field" placeholder="Enter New Password" />
            </div>
            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">Confirm new Password <strong style={{color: "red"}}>*</strong></label>
                <input type="password"  value={data.confirmNewPassword} onChange={(e) => setData((prev) => ({...prev, confirmNewPassword: e.target.value}))} id="settings_profile_content_input_field" placeholder="Confirm New Password" />
            </div>
            <div className="settings_profile_content_input_field_box">
                <label htmlFor="settings_profile_content_input_field_label" className="settings_profile_content_input_field_label">Confirm Old Password <strong style={{color: "red"}}>*</strong></label>
                <input type="password" value={data.confirmOldPasssword} onChange={(e) => setData((prev) => ({...prev, confirmOldPasssword: e.target.value}))} id="settings_profile_content_input_field" placeholder="Confirm Old Password" />
            </div>

            <button className="settings_profile_save">Save Changes</button>
            </form>

            
        </div>
    )
}

export default ChangePassword