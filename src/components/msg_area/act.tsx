import React from 'react'
import { defaultMsgDp } from '../../constant';

interface Props {
    act: string;
    time: string;
}

const Act : React.FC<Props> = ({ act, time }) => {
  return (
    <div className="chat_widget_main_activity_container">
    <img src={defaultMsgDp} id="chat_widget_main_activity_dp" />
    <span className="chat_widget_main_activity">{`${act} ${time}` }</span>
  </div>
  )
}

export default Act