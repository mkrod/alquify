// onboarding navbars component
import { useLocation, useNavigate } from 'react-router-dom';
import './css/o_navbar.css';
import { appLogoUri, appName } from '../constant';
import { useEffect, useState } from 'react';


const OnboardingNavbars = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [CurrentPath, setCurrentPath] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = (page: string) => {
    setIsOpen(false);
    document.querySelector(".loading-container")?.classList.add("gen_active");
    //setCurrentPath(page);
    setTimeout(() => {
      document.querySelector(".loading-container")?.classList.remove("gen_active");
      navigate(page);
    }, 1000)
  }

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
 
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="o-navbar">
    <div className="o-navbar-brand">
      <img 
        src={appLogoUri} 
        alt="App Logo" 
        className="o-navbar-logo"
      />
      <span className="o-navbar-app-name">{appName}</span>
    </div>
    
    <div className={`o-navbar-links ${isOpen ? 'mobile-open' : ''}`}>
      <button onClick={() => navigateTo("/")} className={`o-navbar-link ${CurrentPath === '/' && "active"}`}>Home</button>
      <button onClick={() => navigateTo("/dash")} className={`o-navbar-link ${CurrentPath.startsWith('/dash') && "active"}`}>Dashboard</button>
      <button onClick={() => navigateTo("/docs")} className={`o-navbar-link ${CurrentPath.startsWith('/docs') && "active"}`}>Docs</button>
      <button onClick={() => navigateTo("/support")} className={`o-navbar-link ${CurrentPath.startsWith('/support') && "active"}`}>Support</button>
      <button onClick={() => navigateTo("/demo")} className={`o-navbar-link ${CurrentPath.startsWith('/demo') && "active"}`}>Demo</button>
    </div>
    
    <div className="o-navbar-mobile-menu">
        <button 
          className="o-mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="o-menu-icon">{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>
  </nav>
  );
}   

export default OnboardingNavbars;