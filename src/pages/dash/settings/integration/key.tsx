import { appLogoUri } from '../../../../constant';
import { FaAngleDown, FaAngleUp, FaCopy } from 'react-icons/fa6';
import { useWebSocket } from '../../../../constant/websocket';




const AlquifyKey = ({ isOpen, click }: { isOpen: boolean, click: () => void }) => {

    const { setNote } = useWebSocket();
  
  
    const copyThis = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      
      const element = event.currentTarget as HTMLDivElement; // More reliable than event.target
      
      const grandParent = element?.parentElement?.parentElement; // Finds nearest <pre>
      const preElement = grandParent?.querySelector("pre") as HTMLElement;
      if (!preElement) return; // Prevent errors if <pre> is not found
    
      const codeElement = preElement.querySelector("code") as HTMLElement;
      if (!codeElement) return;
    
      const text = codeElement.innerText;
      navigator.clipboard.writeText(text);
    
      setNote("Copied to clipboard");
      setTimeout(() => setNote(""), 2000);
    };
    


  return (
    <div className={`settings_integration_type ${isOpen ? "settings_integration_type_open" : ""}`}>
        <div className="settings_integration_type_header" onClick={click}>
          <div className="settings_integration_type_header_title">
            <img src={appLogoUri} alt="logo" className="integration_image" />
            <span className="settings_integration_type_header_means">Secret Key</span>
          </div>
          <div className="settings_integration_type_header_actions">
                    {isOpen ? <FaAngleUp className="integration_icons" /> : <FaAngleDown className="integration_icons" />}
          </div>
        </div>


        <div className="settings_integration_type_content">
          <span className="settings_integration_type_content_desc">Your Alquify Access key.</span>

          <pre className="settings_inegration_script_tag_container" style={{height: "fit-content", padding: "20px"}}>
            <code>
{`${JSON.parse(localStorage.getItem("userData") || "{}").user_id}`}
            </code>
          </pre>

          <div className="settings_integration_copy_share">
            <div className="settings_integration_copy" onClick={copyThis} >
              <FaCopy className="settings_integration_icons" />
              <span>Copy</span>
            </div>
          </div>
        </div>
      </div>

  )
}

export default AlquifyKey;