import React from 'react'
import "./css/analyse_insight.css";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface Data {

}

interface Props {
  options?:{
    width?: string;
    accent?: string;
    bgAccent?: string;
  }
  title: string;
  icon: React.ReactNode;

  data: Data[];
}









const AnalyseInsight : React.FC<Props> = ({options, title, icon}) => {
  return (
    <div style={{width: options?.width}} className='analyse_insight_container'>
      <div className="analyse_insight_header">
        <div className="analyse_insight_header_left">
          <div style={{backgroundColor: options?.bgAccent}} className="analyse_insight_header_left_icon">{icon}</div>
          <div className="analyse_insight_header_left_title">{title}</div>
        </div>
        <div className="analyse_insight_header_right">
          <div style={{backgroundColor: options?.bgAccent}} className="analyse_insight_header_right_prev">
            <FaAngleDown color={options?.accent} size={12}/>
          </div>
          <div style={{backgroundColor: options?.bgAccent}} className="analyse_insight_header_right_next">
            <FaAngleUp color={options?.accent} size={12}/>
          </div>
        </div>
      </div>


      <div className="analyse_insight_content_container">

        <div className="analyse_insight_content">
          <div className="analyse_insight_content_left">
            <div className="analyse_insight_content_left_left">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/source/f872d844253649.56076e3578c47.jpg" alt='' className='analyse_insight_content_left_left_thumbnail' />
            </div>
            <div className="analyse_insight_content_left_right">
              <div className="analyse_insight_content_left_right_top">Most visited place in Bangladesh</div>
              <div className="analyse_insight_content_left_right_middle">
                <span className="analyse_insight_content_left_right_middle_left">Posted by:</span>
                <span className="analyse_insight_content_left_right_middle_right">Jerome Cooper</span>
              </div>
              <div className="analyse_insight_content_left_right_bottom">
                <span className="analyse_insight_content_left_right_middle_left">Posted by:</span>
                <span className="analyse_insight_content_left_right_middle_right">Jerome Cooper</span>
              </div>
            </div>
          </div>

          <div className="analyse_insight_content_right">
            <div className="analyse_insight_content_right_top">
              <div className="analyse_insight_content_right_top_item_container">
                <span className="analyse_insight_content_right_top_item">Reach</span>
                <span className="analyse_insight_content_right_top_item_value">25k</span>
              </div>
              <div className="analyse_insight_content_right_top_item_container">
                <span className="analyse_insight_content_right_top_item">Likes</span>
                <span className="analyse_insight_content_right_top_item_value">1k</span>
              </div>
              <div className="analyse_insight_content_right_top_item_container">
                <span className="analyse_insight_content_right_top_item">Comments</span>
                <span className="analyse_insight_content_right_top_item_value">320</span>
              </div>
              <div className="analyse_insight_content_right_top_item_container">
                <span className="analyse_insight_content_right_top_item">Shares</span>
                <span className="analyse_insight_content_right_top_item_value">280</span>
              </div>
            </div>

            <div className="analyse_insight_content_right_bottom">
              <div className="analyse_insight_content_right_bottom_top">
                <div className="analyse_insight_content_right_bottom_top_left">Impression</div>
                <div style={{width: "65%"}} className="analyse_insight_content_right_bottom_top_right"></div>
              </div>
              <div className="analyse_insight_content_right_bottom_top">
                <div className="analyse_insight_content_right_bottom_top_left">Impression</div>
                <div style={{width: "85%"}} className="analyse_insight_content_right_bottom_top_right"></div>
              </div>



            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AnalyseInsight 