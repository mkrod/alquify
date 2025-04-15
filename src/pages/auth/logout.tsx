import { useEffect } from 'react';
import { LogOut } from '../../constant';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    LogOut()
    .then((loggedOut: boolean) => { 
      if(!loggedOut) return;
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