import React, { useEffect, useState } from "react";
import "./css/register.css";
import { appLogoUri, isEmailValid, isStrong, registerUser, startSession } from "../../constant";
import { FiEye } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";




const Register = () => {

  const navigate = useNavigate();

  interface Form {
    email: string,
    password: string,
    confirmPassword: string
  }

  interface Err {
    confirmPassword: boolean,
    email: boolean,
    password: boolean,
    emailExist: boolean,
  }

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordBoxType, setPasswordBoxType] = useState<string>("password");
  const [confirmPasswordBoxType, setConfirmPasswordBoxType] = useState<string>("password");
  const [canNotProceed, setCanNotProceed] = useState<boolean>(true)
  const [err, setErr] = useState<Err>({
    confirmPassword: false,
    email: false,
    password: false,
    emailExist: false,
  })

  useEffect(() => {
    
    if (form.password && form.password.length >= 6 && form.confirmPassword && form.confirmPassword.length >= 1) {
      if (form.password !== form.confirmPassword) {
        setErr(prevErr => ({ ...prevErr, confirmPassword: true }));
        setCanNotProceed(true);
      } else {
        setErr(prevErr => ({ ...prevErr, confirmPassword: false }));

        if(isStrong(form.password)){
          setErr(prevErr => ({...prevErr, password: false}));

          if (isEmailValid(form.email)) {
            setErr(prevErr => ({ ...prevErr, email: false }));
            setCanNotProceed(false);
          } else {
            setErr(prevErr => ({ ...prevErr, email: true }));
            setCanNotProceed(true);
          }
        }else{
          setErr(prevErr => ({...prevErr, password: true}));
          setCanNotProceed(true);
        }
      }
    } else {
      setCanNotProceed(true);
    }
  }, [form]);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErr(prevErr => ({ ...prevErr, emailExist: false }));

    document.querySelector(".loading-container")?.classList.add("gen_active");

    setTimeout(() => {
      const formElement = document.getElementById("auth_form") as HTMLFormElement;
      if(formElement){
        const authFormData : any = new FormData(formElement);
  
        registerUser(authFormData)
        .then((data : any) => {
          console.log("data: ", data);
          if(data.message === 'error' && data.data.userExists){
            //user Exists

            setErr(prevErr => ({ ...prevErr, emailExist: true }));

          }else if(data.message === 'success' && !data.data.userExists){
            // user Registered proceed
            if(data.data.remember){
              localStorage.setItem("userData", JSON.stringify(data.data.data))
            }
            startSession()
            .then((res:any) => {
              if(!res) alert("error starting session, please login");
            });

            navigate("/dash");
          }
          document.querySelector(".loading-container")?.classList.remove("gen_active");
        })
        .catch(error => console.log("error: ", error))
      }
    }, 2000)
    
  }

    
  



  return (
    <div className="register_auth_container">
      <div className="register_auth_content">
        <div className="register_auth_content_header">
          <img src={appLogoUri} alt='logo' id='logo_dash_navbar' />
          <span className='dash_navbar_appname'>Alquify</span>
        </div>

        <h1 className="register_auth_create_head_text">
          Create an account
        </h1>


        <form id="auth_form" onSubmit={handleSubmit}>
          <div className="auth_input_box_container">
            <div className="auth_input_box_label_container">
             <label className="auth_input_box_label">Email</label>
             {err.email && <div className="auth_error_message">Invalid email</div>}
             {err.emailExist && !err.email && <div className="auth_error_message">Email already exist</div>}
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
              <input type="password" name="password" style={{ borderColor: `${err.password ? 'red' : ''}`}} className="auth_password" id="auth_input_box" value={form.password} placeholder="Choose a password" onChange={(e: any) => setForm(({...form, password: e.target.value}))} />
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

          <div className="auth_input_box_container">
            <div className="auth_input_box_label_container">
             <label className="auth_input_box_label">Confirm password</label>
             {err.confirmPassword && <div className="auth_error_message">Password don't match</div>}
            </div>
            <div className="auth_input_box">
              <input type="password" style={{ borderColor: `${err.confirmPassword ? 'red' : '' }`}} className="auth_confirm_password" id="auth_input_box" value={form.confirmPassword} placeholder="Re-enter password" onChange={(e: any) => setForm(({...form, confirmPassword: e.target.value}))} />
              {confirmPasswordBoxType === 'password' && <FiEye className="auth_eye_icon" onClick={() => {
                setConfirmPasswordBoxType("text");
                document.querySelector(".auth_confirm_password")?.setAttribute("type", "text");
              }} />}
              {confirmPasswordBoxType === 'text' && <BsEyeSlash className="auth_eye_icon" onClick={() => {
                setConfirmPasswordBoxType("password");
                document.querySelector(".auth_confirm_password")?.setAttribute("type", "password");
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
            <button className="auth_proceed_button" type="submit" disabled={canNotProceed} >Sign up</button>
          </div>



        </form>    
          <div className="auth_already_have_account_container">
            <span className="auth_already_have_account">Already have an account?</span>
            <span className="auth_already_have_account_sign" onClick={() => {
            document.querySelector(".loading-container")?.classList.add("gen_active");
            setTimeout(() => {
               navigate(`../log-in?pl=${Date.now()}&r=${Math.round(Math.random()).toString()}`)
               document.querySelector(".loading-container")?.classList.remove("gen_active");
            }, 1000)
        }}>Sign In</span>
          </div>
      </div>
    </div>
  )
}

export default Register