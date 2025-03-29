import { useEffect } from 'react';
import { LogOut } from '../../constant';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userData");
    LogOut()
    .then(() => { 
      localStorage.clear();
      navigate("/dash")
     })
    .catch((err) => {
      console.log("logout error: ", err)
    })
    
  }, [])
  return (<></>)
}

export default Logout