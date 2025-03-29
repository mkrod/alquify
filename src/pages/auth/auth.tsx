import { FcGoogle } from 'react-icons/fc'
import './css/auth.css'
import { FaFacebook, FaXTwitter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthClientID, GoogleAuthCallbackURL, FbLogin, googleAuthClient, authUserWithFb } from "../../constant/"
import { useEffect } from 'react'

const Auth = () => {

  const navigate = useNavigate();

  const googleAuth = () => {
    googleAuthClient(GoogleAuthClientID, GoogleAuthCallbackURL);
  }
  const fbAuth = async () => {
    try{
      const res : any = await FbLogin();

      const isLogged = await authUserWithFb(res.id);
      
    }
    catch(err){
      console.log("FB-err: ", err)
    }
  }
  const XAuth = () => {}

  useEffect(() => {
    localStorage.removeItem("userData")
    localStorage.clear();
  }, [])

  return (
    <div className="auth_index_container">
      <div className='auth_index_contents'>
        <div className="auth_index_buttons">
          <button className='auth_index_button sign_in' onClick={() => {
             document.querySelector(".loading-container")?.classList.add("gen_active");
             setTimeout(() => {
                navigate(`log-in?pl=${Date.now()}&r=${Math.round(Math.random()).toString()}`)
                document.querySelector(".loading-container")?.classList.remove("gen_active");
             }, 1000)
        }}>Sign In</button>

          <button className='auth_index_button sign_up' onClick={() => {
            document.querySelector(".loading-container")?.classList.add("gen_active");
            setTimeout(() => {
               navigate(`sign-up?pl=${Date.now()}&r=${Math.round(Math.random()).toString()}`)
               document.querySelector(".loading-container")?.classList.remove("gen_active");
            }, 1000)
        }}>Sign Up</button>
        </div>


        <div className="auth_index_links">
          <div className="auth_index_continue_with_text_c">
              <div className="auth_index_continue_with_text_line"></div>
              <span className="auth_index_continue_with_text">or continue with</span>
          </div>
          

          <div className="auth_index_links_container">
            <div className="auth_index_link">
             <FcGoogle size={25} className='auth_index_link_logo' onClick={googleAuth} />
            </div>

            <div className="auth_index_link">
             <FaFacebook size={24} className='auth_index_link_logo' onClick={fbAuth} />
            </div>

            <div className="auth_index_link">
             <FaXTwitter size={24} className='auth_index_link_logo' onClick={XAuth} />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth