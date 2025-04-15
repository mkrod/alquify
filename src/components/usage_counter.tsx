import React from 'react'
import "./css/usage_counter.css";



interface Props {
    title:  string;
    info: string;
    icon: React.ReactNode;
    data: {
        total:  string;
        remaining: string;
    }
    canUpgrade: boolean;
}

const UsageCounter : React.FC<Props> = ({title, info, icon, data, canUpgrade}) => {
    let used = (Number(data.total) - Number(data.remaining))

  return (
    <div className='feature_usage_counter_container'>
        <div className="feature_usage_counter_left">{icon}</div>
        <div className="feature_usage_counter_right">{`${used} / ${data.total}`}</div>
        <div className="feature_usage_counter_details_container">
            <span className="feature_usage_counter_details_header">{title}</span>
            <span className="feature_usage_counter_details_info">{info}</span>

            {canUpgrade && <button className="feature_usage_counter_details_button">Go Pro</button>}
        </div>
    </div>
  )
}

export default UsageCounter