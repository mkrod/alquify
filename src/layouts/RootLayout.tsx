// Desc: Layout for the root of the application
import { Outlet } from 'react-router-dom'
import'./css/root.css';
import { useEffect } from 'react';
import { appLogoUri } from '../constant';


const RootLayout = () => {

  useEffect(() => {
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = appLogoUri
    document.head.appendChild(icon);
  })

  return (
    <div className='root-layout'>
        <div className='loading-container'>
          <div className='fidget-spinner-1'></div>
          <div className='fidget-spinner-2'></div>
        </div>
        <Outlet />
    </div>
  )
}

export default RootLayout