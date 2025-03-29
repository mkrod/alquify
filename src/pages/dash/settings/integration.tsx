import { useState } from "react";
import "./css/integration.css";
import ScriptTag from "./integration/script_tag";
import WordPressPlugin from "./integration/wordpress_plugin";
import AlquifyKey from "./integration/key";



const SettingsIntegration = () => {

  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);




  return (
    <div className="settings_integration_container">
      <ScriptTag 
        isOpen={activeIntegration === 'scriptTag'}
        click={() => setActiveIntegration(activeIntegration === "scriptTag" ? null : "scriptTag")}
      />
      <WordPressPlugin
        isOpen={activeIntegration === 'wordpress'}
        click={() => setActiveIntegration(activeIntegration === 'wordpress' ?  null : 'wordpress')}
      />
      <AlquifyKey 
        isOpen={activeIntegration === 'key'}
        click={() => setActiveIntegration(activeIntegration === "key" ? null : "key")}
      />



    </div>
  )
}

export default SettingsIntegration