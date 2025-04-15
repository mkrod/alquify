import React, { useEffect, useState } from 'react'
import "./css/analyse_home.css";
import { useOutletContext } from 'react-router-dom';
import AnalyseOverView from '../../../../components/social/anlyse_overview';
import InverseGraph from '../../../../components/social/inverse_graph';
import { RxEyeOpen } from 'react-icons/rx';
import { BiGroup } from 'react-icons/bi';
import { SlGraph } from 'react-icons/sl';
import AnalyseInsight from '../../../../components/social/analyse_insight';
import { TbDeviceAnalytics, TbGraph, TbSticker2 } from 'react-icons/tb';


const AnalyseHome : React.FC = () => {
    interface OutletProp {
        platformShowing: string;
        setPlatformShowing: React.Dispatch<React.SetStateAction<string>>;
    }

    interface AnalyticData {
        title: string;
        value: {
            prev: string;
            current: string;
        }
    }

    const { platformShowing, setPlatformShowing } = useOutletContext<OutletProp>()
    const [analyticData, setAnalyticData] = useState<AnalyticData[]>([])

    useEffect(() => {
        setAnalyticData([
            {
                title: "Post Reach",
                value: {
                    prev: "8",
                    current: "14"
                }
            },
            {
                title: "Post Reach",
                value: {
                    prev: "880000",
                    current: "880800"
                }
            },
            {
                title: "Post Reach",
                value: {
                    prev: "880000",
                    current: "1000000"
                }
            },
            {
                title: "Post Reach",
                value: {
                    prev: "880000",
                    current: "980800"
                }
            },
            {
                title: "Post Reach",
                value: {
                    prev: "880000",
                    current: "798000"   
                }
            },
            {
                title: "Post Reach",
                value: {
                    prev: "880000",
                    current: "880800"
                }
            },
        ])
    }, [])

  return (
    <div className='social_analyse_home_container'>
        <div className="social_analyse_header">
            <div className="social_analyse_header_left">
                <span onClick={() => {
                    if(platformShowing === "All") return;
                    setPlatformShowing("All")
                }} className="social_analyse_header_left_path_root">Analytics</span>
                <span className="social_analyse_header_left_path_root">/</span>
                <span className="social_analyse_header_left_path_root_absolute">{platformShowing.charAt(0).toUpperCase() + platformShowing.slice(1)}</span>
            </div>
            <div className="social_analyse_header_right">
                <TbDeviceAnalytics size={20} color='#fa5a2a' />
            </div>
        </div>


        <div className="social_analyse_content_one">
            <AnalyseOverView width='50%' title='Overview' icon={<RxEyeOpen color='#fa5a2a' />} data={analyticData} option={{body: {accent: "#fa5a2a", backgroundAccent: "#fa5a2a27"}}} />
            <InverseGraph title='Audience' icon={<BiGroup color='#FA5A2A' />} data={{}} option={{body: {width: "25%", backgroundAccent: "#FA5A2A27"}, graph: {style: "bar", barColors: ["#FA5A2A"], borderRadius: 0, barThickness: 5,}, x: {font: {family: "Poppins, sans-serif" ,size: 10}, color: ""}, y: {font: {family: "Poppins, sans-serif", size: 10, weight: 700}}}} />
            <InverseGraph title='Growth' icon={<SlGraph color='#FA5A2A' />} data={{}} option={{body: {width: "25%", backgroundAccent: "#FA5A2A27"}, graph: {style: "line", barColors: ["#FA5A2A"] , flip: false}, x: {font: {family: "Poppins, sans-serif" ,size: 10}}, y: {font: {family: "Poppins, sans-serif", size: 10}}}} />
        </div>


        <div className="social_analyse_content_two">
            <AnalyseInsight title='Latest Content Insight' icon={<TbSticker2 color='#Fa5a2a' size={15} />} data={[]} options={{width: "75%", accent: "#fa5a2a", bgAccent: "#Fa5a2a27"}} />
            <AnalyseOverView width='25%' title='Messaging Performance' icon={<TbGraph color='#fa5a2a' />} data={analyticData} option={{body: {accent: "#fa5a2a", backgroundAccent: "#fa5a2a27"}}} />
        </div>

    </div>
  )
}

export default AnalyseHome