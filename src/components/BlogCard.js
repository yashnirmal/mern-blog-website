import React from 'react';
import "./BlogCard.css";
import {useNavigate} from "react-router-dom";

export default function BlogCard(props) {

  const {_id,title,description,imgUrl,postDate} = props.el;
  const navigate = useNavigate();

  return (
    <div className="blogcard">
      <img className="thumbnail" src={imgUrl} alt="img" />
      <div className="blog-card-data">
        <p className="heading">{(title.length>25)?title.substring(0, 30) + "...":title}</p>
        <div className="description">
          <span>{description.substring(0,220) + "..."}</span>
          <button onClick={() => navigate("/blog/"+_id)}>read more</button>
        </div>
        <p className="date">{postDate}</p>
      </div>
    </div>
  );
}
