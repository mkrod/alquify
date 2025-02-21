import { useNavigate } from 'react-router-dom'
import './css/onboarding.css'

const Onboarding = () => {

  const navigate = useNavigate();


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className="o_content_container o_one">
        <span id='onboarding_header_text'>Making AI flow seamlessly into daily tasks or business processes</span>

        <div className='o_content_container-btns'>
          <button className='o_btn btn-create' onClick={() => {
            document.querySelector(".loading-container")?.classList.add("gen_active");
            setTimeout(() => {
              navigate("/auth");
               document.querySelector(".loading-container")?.classList.remove("gen_active");
            }, 1000)
          }}>Sign up - its free</button>
          <span id='o_no_credit_req'>No credit card required</span>
        </div>``
      </div>


      <div className="o_content_container o_two">
        {/* section for sample video or so */}
      </div>


      <div className="o_content_container o_three">
        <div className='o_feature_1'>
          
        </div>
      </div>


    </div>
  )
}

export default Onboarding