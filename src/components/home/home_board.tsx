import React, { useEffect, useState } from 'react'
import "./css/home_board.css";
import { getColorFromText } from '../../constant';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';




interface HomeBoardProps {
    data: {
        title?: string;
        subtitle?: string;
        action?: {
            text: string;
            path: string;
        };
    }[];
}


const HomeBoard : React.FC<HomeBoardProps> = ({data}) => {

    const [active, setActive] = useState<number>(0);
    const navigate = useNavigate();


    /*const nextSlide = () => {
        setActive((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setActive((prev) => (prev - 1 + data.length) % data.length);
    };*/

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % data.length);
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup interval when component re-renders
    }, [data.length]); // Depend on `data.length` to reset when data changes



    interface BoardProps {
        title?: string;
        subtitle?: string;
        action?: {
            text: string;
            path: string;
        }
    }


    const BoardContent : React.FC<BoardProps> = ({title, subtitle, action}) => {



        return(
            <div className="board_content_container_ui" style={{ background: getColorFromText(title || "", "fancy"), transform: `translateX(-${active * 100}%)` }}>
                <div className="board_content_container_left">
                    <span style={{color:  subtitle && getColorFromText(subtitle , "plain")}} className="board_content_container_left_title">{title}</span>
                    <span className="board_content_container_left_subtitle">{subtitle}</span>
                    {action && <div onClick={() => navigate(action.path)} style={{boxShadow: `0 0 15px ${getColorFromText(title || "", "plain")}`, borderColor: getColorFromText(title || "", "plain")}} className="board_content_left_try_or_navigate">{action?.text} <FaLongArrowAltRight /></div>}
                </div>


                <div className="board_content_container_right"></div>
            </div>
        )
    }





  return (
    <div className='dash_home_board_container'>

        {data.map((item: BoardProps, index: number) => (
            <BoardContent
                key={index}
                {...item}
            />
        ))}
         
        

            {/* Carousel Indicators */}
            <div className="dash_home_board_carousel_indicators">
                {data.map((_, index) => (
                    <div
                        key={index}
                        className={`dash_home_board_carousel_indicator ${
                            active === index ? "dash_home_board_active_carousel" : ""
                        }`}
                        onClick={() => setActive(index)}
                    ></div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {/*<button className="prev_button" onClick={prevSlide}>◀</button>
            <button className="next_button" onClick={nextSlide}>▶</button>*/}
        </div>
  )
}

export default HomeBoard;