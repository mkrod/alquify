import { useWebSocket } from "../../constant/websocket";


const SettingsHome = () => {
    const { sendMessage } = useWebSocket();

    const sendTestMessage = () => {
      sendMessage({ type: "", message: "Yo" });
    };

    return (
        <div>
            <h1>settings Page</h1>
            <button onClick={sendTestMessage}>Send Message</button>
        </div>
    );
};

export default SettingsHome;
