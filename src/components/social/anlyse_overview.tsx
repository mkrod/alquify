import React, { useEffect, useState } from 'react'
import "./css/analyse_overview.css";
import { FaAngleDown } from 'react-icons/fa6';
import { LuCalendar1 } from 'react-icons/lu';

type Item = {
    title: string;
    value: {
        prev: string;
        current: string;
    }
}


interface Props {
    title: string;
    icon: React.ReactNode;
    width?: string;
    data: Item[];
    option?: {
        body?:{
            accent?: string;
            backgroundAccent?: string;
        }
    }
}




const AnalyseOverView : React.FC<Props> = ({title, icon, width, data, option}) => {

    interface Prop{
        color: string;
        bg: string;
        percent?: string;
    }
    const [props, setProps] = useState<Prop[]>([])
    const  [isOpen, setIsOpen]  = useState<boolean>(false);
    const [period, setPeriod] = useState<string | undefined>("Jan");



    useEffect(() => {
        if (data.length === 0) return;
    
        const updatedProps = data.map((item) => {
            const prevValue = Number(item.value.prev);
            const currentValue = Number(item.value.current);
            const difference = currentValue - prevValue;
    
            const percent = prevValue !== 0 ? ((difference * 100) / Math.abs(prevValue)).toFixed(2) : 0;
    
            return {
                color: difference > 0 ? "green" : "red", // Fixing the color logic
                bg: difference > 0 ? "#00800027" : "#ff000027",
                percent: percent.toString(),
            };
        });
    
        console.log("Updated Props:", updatedProps); // Debugging
        setProps(updatedProps);
    }, [data]);
    
    
 
    console.log("Outside ", props)



  return (
    <div style={{width: width}} className='analyse_overview_container'>
        <div className="analyse_overview_header">
            <div className="analyse_overview_header_left">
                <div style={{backgroundColor: option?.body?.backgroundAccent || "#00800027"}} className="analyse_overview_header_left_icon">
                    {icon}
                </div>
                <div className="analyse_overview_header_left_title">
                    {title}
                </div>
            </div>
            <div onClick={() => setIsOpen(!open)} className="analyse_overview_header_right">
                <div style={{ backgroundColor: option?.body?.backgroundAccent}} className="socal_graph_visual_top_right_dropdown">
                    <span style={{color: option?.body?.accent}} className="socal_graph_visual_top_right_dropdown_text">{period}</span>
                    <FaAngleDown size={15} color={option?.body?.accent} className='' />
                </div>
                
                <div style={{ backgroundColor: option?.body?.backgroundAccent}} className={`socal_graph_visual_top_right_dropdown_options_container ${isOpen && "open_followers_period_option"}`}>
                      <div className="socal_graph_visual_top_right_dropdown_option" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPeriod((e.target as HTMLDivElement).textContent || undefined)}><LuCalendar1 color='green' /> Nov</div>
                     <div className="socal_graph_visual_top_right_dropdown_option" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPeriod((e.target as HTMLDivElement).textContent || undefined) }><LuCalendar1 color='green' /> Dec</div>
                </div>
            </div>
        </div>



        <div className="analyse_overview_content_container">
            {data?.map((item: Item, index: number) => (
                <div key={index} className="analyse_overview_content">
                    <div className="analyse_overview_content_left">
                        <span className="analyse_overview_content_left_title">{item.title}</span>
                        <div style={{background: props[index]?.bg || "", color: props[index]?.color || "", borderColor: props[index]?.bg}} className="analyse_overview_content_left_percent">{props[index]?.percent + "%"}</div>
                    </div>
                    <div className="analyse_overview_content_right">{Number(item.value.current)?.toLocaleString()}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AnalyseOverView 