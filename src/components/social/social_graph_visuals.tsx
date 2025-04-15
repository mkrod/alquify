import React, { useState, useEffect, useRef } from 'react'
import "./css/social_graph_visuals.css";
import { FaAngleDown } from 'react-icons/fa6';
import { LuCalendar1 } from 'react-icons/lu';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


interface Props {
    title: string;
    icon: React.ReactNode
    data: Record<string, any>;
    option?:  {
        font?: {
            family?: string;
            weight?: any;
            size?: number;
            style?:  any;
        }
        color?: string;
        x?: {
            font?: {
                family?: string;
                weight?: any;
                size?: number;
                style?:  any;
            },
            color?: string;
        }
        y?: {
            font?: {
                family?: string;
                weight?: any;
                size?: number;
                style?:  any;
            },
            color?: string;
        },
        graph?:  {
            style?: "bar" | "line" |  "radar" | "pie";
            color?:  string;
            borderColor?: [string];
            borderRadius?: number;
            barColors?: [string];
            barThickness?: number;
        }
        body?: {
            accent?: string;
            backgroundAccent?: string;
            width?: string;
        }


    }
}

const SocialGraphVisuals : React.FC<Props> = ({title, icon, data, option}) => {

    //const style = getComputedStyle(document.body);
    //const graphLabelColor = style.getPropertyValue('--text-fade-color').trim();


    const [period, setPeriod] = useState<any>("Jan");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const chartRef = useRef<Chart | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Use ref for canvas

    interface Votes {
        label: string;
        count: number;
    }

    const [votes, setVotes] = useState<Votes[]>([]);

    const labels = votes?.map((vote) => vote.label);

    useEffect(() => {
        setVotes([
            { label: 'Jul', count: 345 },
            { label: 'Aug', count: 234 },
            { label: 'Sep', count: 340 },
            { label: 'Oct', count: 677 },
            { label: 'Nov', count: 1433 },
            { label: 'Dec', count: 532 },
        ])
    }, [])


    useEffect(() => {
        data //
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
    
        // Destroy previous chart instance if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }
    
 

        // Create new chart instance and store in ref
        chartRef.current = new Chart(canvasRef.current, {
            type: option?.graph?.style || 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "",
                        data: votes?.map((vote) => vote.count),
                        backgroundColor: option?.graph?.barColors,
                        borderColor: option?.graph?.borderColor,
                        borderRadius: option?.graph?.borderRadius,
                        barThickness: option?.graph?.barThickness,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {display: false,
                        labels: {
                            font: {
                                family: option?.font?.family,  // Change to your desired font
                                size: option?.font?.size,         // Adjust font size
                                weight: option?.font?.weight,   // 'normal', 'bold', 'bolder', etc.
                                style: option?.font?.style   // 'normal', 'italic', 'oblique'
                            },
                            color: option?.color       // Change text color if needed
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                family: option?.x?.font?.family, // X-axis font
                                size: option?.x?.font?.size,
                                weight: option?.x?.font?.weight,
                                style: option?.x?.font?.style
                            },
                            color: option?.x?.color // X-axis label color
                        },
                        grid: {
                            display: false // Removes the horizontal grid lines
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                family: option?.y?.font?.family, // Y-axis font
                                size: option?.y?.font?.size
                            },
                            color: option?.y?.color // Y-axis label color
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Cleanup function to destroy chart on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [votes]); // Re-run useEffect when votes change

    

  return (
    <div style={{width: option?.body?.width}} className='social_graph_visual_container'>
        <div className="social_graph_visual_top">
            <div className="social_graph_visual_top_left">
                <div style={{ backgroundColor: option?.body?.backgroundAccent}} className="social_graph_visual_top_left_left_icon">{icon}</div>
                <span style={{ color: option?.body?.accent}} className="social_graph_visual_top_left_title">{title}</span>
            </div>
            <div className="social_graph_visual_top_right"onClick={() => setIsOpen(!isOpen)}>
                <div style={{ backgroundColor: option?.body?.backgroundAccent}} className="socal_graph_visual_top_right_dropdown">
                    <span style={{color: option?.body?.accent}} className="socal_graph_visual_top_right_dropdown_text">{period}</span>
                    <FaAngleDown size={15} color={option?.body?.accent} className='' />
                </div>

                <div style={{ backgroundColor: option?.body?.backgroundAccent}} className={`socal_graph_visual_top_right_dropdown_options_container ${isOpen && "open_followers_period_option"}`}>
                    <div className="socal_graph_visual_top_right_dropdown_option" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPeriod((e.target as HTMLDivElement).textContent)}><LuCalendar1 color='green' /> Nov</div>
                    <div className="socal_graph_visual_top_right_dropdown_option" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPeriod((e.target as HTMLDivElement).textContent)}><LuCalendar1 color='green' /> Dec</div>
                </div>
            </div>
        </div>

        <div className="social_graph_visual_bottom">
           <canvas ref={canvasRef} className='social_graph_visual_bottom_canvas'></canvas>
        </div>
    </div>
  )
}

export default SocialGraphVisuals