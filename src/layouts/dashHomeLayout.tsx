import { Outlet } from 'react-router-dom'
import { useWebSocket } from '../constant/websocket'

const DashHomeLayout = () => {

  const { ReConnecting } = useWebSocket();
  
  return (
    <div>
       <Outlet />
        <div style={{top: ReConnecting ? "0" : "-100%"}} className="dash_layout_connecting_container">
          <div className="dash_layout_bar_line"></div>
          <div className="dash_layout_connecting_text">Reconnecting to server</div>
      </div>
    </div>
   
  )
}

export default DashHomeLayout;