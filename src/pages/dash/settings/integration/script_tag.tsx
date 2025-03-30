import { appLogoUri, server } from '../../../../constant';
import { FaAngleDown, FaAngleUp, FaCopy, FaShare } from 'react-icons/fa6';
import { useWebSocket } from '../../../../constant/websocket';




const ScriptTag = ({ isOpen, click }: { isOpen: boolean, click: () => void }) => {

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
  
    const shareThis = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  
      const element = event.currentTarget as HTMLDivElement; // More reliable than event.target
      
      const grandParent = element?.parentElement?.parentElement; // Finds nearest <pre>
      const preElement = grandParent?.querySelector("pre") as HTMLElement;
      if (!preElement) return; // Prevent errors if <pre> is not found
    
      const codeElement = preElement.querySelector("code") as HTMLElement;
      if (!codeElement) return;
    
      const text = codeElement.innerText;
      
      navigator.share({
        title: "Alquify Live Chat Widget",
        text: `Insert this Alquify chat code into your website html just before the </body> tag to start chatting with your visitors.
  
               -----------------
  
              ${text}`,
        //url: "https://www.alquify.com",
      })
      .then(() => {
        setNote("Shared")
        setTimeout(() => setNote(""), 2000)
      })
    }
    


  return (
    <div className={`settings_integration_type ${isOpen ? "settings_integration_type_open" : ""}`}>
        <div className="settings_integration_type_header" onClick={click}>
          <div className="settings_integration_type_header_title">
            <img src={appLogoUri} alt="logo" className="integration_image" />
            <span className="settings_integration_type_header_means">Script tag</span>
          </div>
          <div className="settings_integration_type_header_actions">
                    {isOpen ? <FaAngleUp className="integration_icons" /> : <FaAngleDown className="integration_icons" />}
          </div>
        </div>


        <div className="settings_integration_type_content">
          <span className="settings_integration_type_content_desc">Insert this chat code into your website html just before the &lt;/body&gt; tag to start chatting with your visitors.</span>

          <pre className="settings_inegration_script_tag_container">
            <code>
{`<!-- Alquify Live Chat Widget -->
<script type="text/javascript">
(function(d) {
var s, c, serverUri = "${server}"; // Replace with your actual server URI
var userId = "${JSON.parse(localStorage.getItem("userData") || "{}").user_id}" || "guest"; // Default to 'guest' if no user_id
var alquify = window.alquify || function() { alquify._.push(arguments) };
alquify._ = [];
s = d.getElementsByTagName('script')[0];
c = d.createElement('script');
c.id = "alquify-script-chat-widget";
c.type = "text/javascript";
c.charset = "utf-8";
c.async = true;
c.src = "${server}/chat-widget/index.js";
c.setAttribute("data-user-id", userId);                     
s.parentNode.insertBefore(c, s);
})(document);
</script>
<noscript>Powered by <a href="https://www.alquify.com" target="_blank">Alquify</a></noscript>
`}
            </code>
          </pre>

          <div className="settings_integration_copy_share">
            <div className="settings_integration_copy" onClick={copyThis} >
              <FaCopy className="settings_integration_icons" />
              <span>Copy</span>
            </div>

            <div className="settings_integration_copy" onClick={shareThis}>
              <FaShare className="settings_integration_icons" />
              <span>Share</span>
            </div>
          </div>
        </div>

        

      </div>

  )
}

export default ScriptTag;