import React, { useEffect, useState } from 'react'
import  "./css/social_recent_post_card.css";
import { FaRegNoteSticky } from 'react-icons/fa6';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

type Prop = {
    data: Record<string, any>[];
    platformShowing: string;
    cardTitle: string;
}

const SocialRecentPostCard: React.FC<Prop> = ({ data, platformShowing, cardTitle }) => {

    


    interface Cards  {
        thumbnail: string;
        title: string;
        date:  string;
        tags: [string];
    }
    const Card : React.FC<Cards> = ({thumbnail,  title, date, tags}) => {
        return(
            <div className="social_post_card_container">
                {thumbnail !== "" && <div className="social_post_card_thumbnail_container">
                    <img src={thumbnail} alt={`${title} thumbnail`} className='social_post_card_thumbnail' />
                </div>}
                {tags && tags.length > 0 && <div className="social_post_card_tags_container">
                    {tags.length > 0 && tags.slice(0, 3).map((item: string, index: number) => (<div key={index} className='social_post_card_tag'>{"#"+item}</div>))}
                </div> /* render only if there are tag(s)*/}
                {title !== "" && <div className="social_post_card_title_container">
                       {title}
                </div>}
                {date !== "" && <div className="social_post_card_date_container">{date}</div>}
            </div>
        );
    }

    const [navigate, setNavigate] = useState<{
        prev:  boolean, 
        next: boolean
    }>({
        prev: false,
        next: false,
    })


    useEffect(() => {
        setNavigate({
            prev: false,
            next: false,
        });
    }, [])


  return (
    <div className='social_recent_post_cards_container'>
        <div className="social_recent_post_cards_top">
            <div className="social_recent_post_cards_top_left">
                <FaRegNoteSticky style={{backgroundColor: "#02ff0f25"}} className="social_recent_post_cards_top_left_icon" color="green" size={20} />
                <span className='social_recent_post_cards_top_left_title'>{cardTitle}</span>
            </div>
            <div className="social_recent_post_cards_top_right">
                <button disabled={!navigate.prev} className="social_recent_post_cards_top_right_navigate">
                    <IoMdArrowDropleft color='green' size={20} className='social_recent_post_cards_top_right_navigate_prev' />
                </button>
                <button disabled={!navigate.next} className="social_recent_post_cards_top_right_navigate">
                    <IoMdArrowDropright color='green' size={20} className='social_recent_post_cards_top_right_navigate_prev' />
                </button>
            </div>
        </div>
        <div className="social_recent_post_cards_down">
        {data.map((item: any, index: number) => (
            <Card
            key={index}
            thumbnail={item.thumbnail}
            title={item.title}
            date={item.date}
            tags={item.tags}
            />
        ))}
        </div>
    </div>
  )
}

export default SocialRecentPostCard