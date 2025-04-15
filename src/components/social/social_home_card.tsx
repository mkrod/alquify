import React, { useEffect, useState } from "react"
import "./css/social_home_card.css";

interface Props {
    title: string;
    icon: React.ReactNode;
    period: string;
    value: {
        current: number;
        prev: number;
    }
}

const SocialFeatureCard : React.FC<Props> = ({title, icon, period, value}) => {

    const lastPeriod : number = value.prev;
    const currentPeriod : number = value.current;
    const [subtitle, setSubtitle] = useState<string>("Loading...")
    const [color, setColor] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
    const [borderColor, setborderColor] =  useState<string>("");

    useEffect(() => {
        if(lastPeriod > currentPeriod){
            const difference : number = lastPeriod - currentPeriod;
            const percent_change : number = Math.floor((difference / lastPeriod) * 100);
            setPercent(percent_change);
            setSubtitle(`less than last ${period}`)
            setborderColor("#ff000098");
            setColor("#ff350225")
        }else if(currentPeriod > lastPeriod){
            const difference : number = currentPeriod - lastPeriod;
            const percent_change : number = Math.floor((difference / lastPeriod) * 100);
            setPercent(percent_change);
            setSubtitle(`more than last ${period}`);
            setborderColor("#00800098");
            setColor("#02ff0f25");
        }else{
            setSubtitle(`no changes from last ${period}`)
        }
    }, [value])

    const formatNumber = (num: number) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    }
    




  return (
    <div className="social_feature_card_container">
        <div className="social_feature_card_top">
            <div className="social_feature_card_top_icon">{icon}</div>
            <span className="social_feature_card_top_title">{title}</span>
        </div>

        <div className="social_feature_card_bottom">
            <div className="social_feature_card_bottom_top">{formatNumber(value.current)}</div>
            <div className="social_feature_card_bottom_down">
                <div style={{backgroundColor: color, borderColor, color: borderColor}} className="social_feature_card_bottom_down_left">{`${""} ${percent}%`}</div>
                <div className="social_feature_card_bottom_down_right">{subtitle}</div>
            </div>
        </div>
    </div>
  )
}

export default SocialFeatureCard