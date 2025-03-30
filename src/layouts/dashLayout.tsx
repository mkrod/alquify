// Desc: DashLayout component
import { Outlet, useNavigate } from "react-router-dom";
import DashNavbar from "../components/dash_navbar";
import { useEffect } from "react";
import { isLoggedIn, startSession } from "../constant";
import { WebSocketProvider } from "./../constant/websocket";
import "./css/dashlay.css";

const DashLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector(".loading-container")?.classList.add("gen_active");
        try {
            if (localStorage.getItem("userData")) {
                startSession();
            } else {
                const getEmailFromCookie = () => {
                    const cookies = document.cookie.split("; ");
                    const emailCookie = cookies.find(row => row.startsWith("user_email="));
                    return emailCookie ? decodeURIComponent(emailCookie.split("=")[1]) : null;
                };
                const getIDFromCookie = () => {
                    const cookies = document.cookie.split("; ");
                    const IDCookie = cookies.find(row => row.startsWith("user_id="));
                    return IDCookie ? decodeURIComponent(IDCookie.split("=")[1]) : null;
                };

                const userEmail = getEmailFromCookie();
                const userID = getIDFromCookie()
                const data = { email: userEmail, user_id: userID };
                localStorage.setItem("userData", JSON.stringify(data));
            }

            isLoggedIn()
            .then((isLogged: any) => {
                if (!isLogged) {
                    console.log("not-logged in going to auth")
                    navigate("/auth");
                    document.querySelector(".loading-container")?.classList.remove("gen_active");
                }else{
                    console.log("logged in staying...")
                    document.querySelector(".loading-container")?.classList.remove("gen_active");
                }
            })
            .catch((err) => {
                console.log('session_check_error: ', err);
                document.querySelector(".loading-container")?.classList.remove("gen_active");
                navigate("/auth");
            })
        } catch (err) {
            console.log("Auth error:", err);
            navigate("/auth");
            document.querySelector(".loading-container")?.classList.remove("gen_active");
        }


    }, []);

    return (
        <WebSocketProvider>
            <div className="dash_layout_container">
                <DashNavbar />
                <div className="dash_layout_container_2">
                    <Outlet />
                </div>
            </div>
        </WebSocketProvider>
    );
};

export default DashLayout;
