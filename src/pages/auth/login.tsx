import React, { useEffect, useState } from "react";
import "./css/register.css";
import { appLogoUri, authenticateUser, isEmailValid, startSession } from "../../constant";
import { FiEye } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";




const Register = () => {

  const navigate = useNavigate();

  interface Form {
    email: string,
    password: string,
  }

  interface Err {
    email: boolean,
    password: boolean,
    LoginError: boolean,
  }

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const [passwordBoxType, setPasswordBoxType] = useState<string>("password");
  const [canNotProceed, setCanNotProceed] = useState<boolean>(true)
  const [err, setErr] = useState<Err>({
    email: false,
    password: false,
    LoginError: false,
  })

  useEffect(() => {

    if(form.email && form.email.length >= 6) {
      if(isEmailValid(form.email)) {
        setErr(prevErr => ({ ...prevErr, email: false }));

        if(form.password && form.password.length >= 6) {
          setCanNotProceed(false);
        } else {
          setCanNotProceed(true); 
        }
      } else {
        setErr(prevErr => ({ ...prevErr, email: true }));
        setCanNotProceed(true);
      }
    }
 
  }, [form])
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.querySelector(".loading-container")?.classList.add("gen_active");

    setTimeout(() => { 
      const formElement = document.getElementById("auth_form") as HTMLFormElement;

      if(formElement){
        const authFormData : any = new FormData(formElement);

        authenticateUser(authFormData)
        .then((res: any) => {
          console.log(res);
          if(res.status === 200 || res.message === "success") {
            if(res.data.remember){
              localStorage.setItem("userData", JSON.stringify(res.data.data))
            }

            startSession()
            .then((res:any) => {
              if(!res) alert("error starting session, please try again");
            });

            document.querySelector(".loading-container")?.classList.remove("gen_active");
            window.open("/dash", "_blank");
            window.close() //= "about:blank";

          }else{
            setErr(prevErr => ({ ...prevErr, LoginError: true }));
            document.querySelector(".loading-container")?.classList.remove("gen_active");
          }
        })
      }

     }, 1000);
  }

    
  



  return (
    <div className="register_auth_container">
      <div className="register_auth_content">
        <div className="register_auth_content_header">
          <img src={appLogoUri} alt='logo' id='logo_dash_navbar' />
          <span className='dash_navbar_appname'>Alquify</span>
        </div>

        <h1 className="register_auth_create_head_text">
          Please Log in
        </h1>


        <form id="auth_form" onSubmit={handleSubmit}>
          <div className="auth_input_box_container">
            <div className="auth_input_box_label_container">
             <label className="auth_input_box_label">Email</label>
             {err.email && <div className="auth_error_message">Invalid email</div>}
             {err.LoginError && !err.email && <div className="auth_error_message">Invalid credentials</div>}
            </div>
            <div className="auth_input_box">
              <input type="email" name="email" style={{ borderColor: `${err.email ? 'red' : ''}`}} className="auth_email" id="auth_input_box" value={form.email} placeholder="Enter your email" onChange={(e: any) => setForm(({...form, email: e.target.value}))} />
            </div>
          </div>

          <div className="auth_input_box_container">
            <div className="auth_input_box_label_container">
             <label className="auth_input_box_label">Password</label>
             {err.password && <div className="auth_error_message">include upper, lower, numeric, symbol</div>}
            </div>
            <div className="auth_input_box">
              <input type="password" name="password" style={{ borderColor: `${err.password ? 'red' : ''}`}} className="auth_password" id="auth_input_box" value={form.password} placeholder="Enter password" onChange={(e: any) => setForm(({...form, password: e.target.value}))} />
              {passwordBoxType === 'password' && <FiEye className="auth_eye_icon" onClick={() => {
                setPasswordBoxType("text");
                document.querySelector(".auth_password")?.setAttribute("type", "text");
              }} />}
              {passwordBoxType === 'text' && <BsEyeSlash className="auth_eye_icon" onClick={() => {
                setPasswordBoxType("password");
                document.querySelector(".auth_password")?.setAttribute("type", "password");
              }} />}
            </div>
          </div>

         


          <div className="auth_remember_forgot">
            <div className="auth_checkbox_remember">
              <input type="checkbox" name="auth_checkbox" id="auth_checkbox" />
              
              <label htmlFor="auth_checkbox" className="auth_checkbox_label">Remember me</label>
            </div>

            {/* forgot password */}
          </div>

          <div className="auth_buttons_container">
            <button className="auth_proceed_button" type="submit" disabled={canNotProceed} >Sign in</button>
          </div>



        </form>    
          <div className="auth_already_have_account_container">
            <span className="auth_already_have_account">Don't have an account?</span>
            <span className="auth_already_have_account_sign" onClick={() => {
            document.querySelector(".loading-container")?.classList.add("gen_active");
            setTimeout(() => {
               navigate(`../sign-up?pl=${Date.now()}&r=${Math.round(Math.random()).toString()}`)
               document.querySelector(".loading-container")?.classList.remove("gen_active");
            }, 1000)
        }}>Sign Up</span>
          </div>
      </div>
    </div>
  )
}

export default Register