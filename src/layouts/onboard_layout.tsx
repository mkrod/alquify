// Desc: Layout for onboarding pages
import { Outlet } from "react-router-dom";
import OnboardingNavbars from "../components/o_navbar";

const OnboardLayout = () => {
  return (
    <div className="onboard-layout">
            <OnboardingNavbars />
        <div className="container">
            <Outlet />
        </div>
    </div>
  )
}

export default OnboardLayout;