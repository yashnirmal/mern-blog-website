import React, { useState } from 'react';
import "./FullBlog.css";
import { useParams } from "react-router-dom";
import AuthorProfile from './AuthorProfile';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function FullBlog() {

  const blogId = useParams().id;
  const [blog,setBlog] = useState(null);

  useState(()=>{
    console.log(blogId);

    async function fetchSingleBlog(){
      await fetch("https://mern-blog-webapp.herokuapp.com/blogs/"+blogId)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        console.log(data);
      });
    }

    fetchSingleBlog();
  })

  return (
    (!blog)?
    <div style={{width:"100vw",marginTop:200,textAlign:"center"}}>
      <CircularProgress />
    </div>:
    <div className='fullblog'>
        <div className='authod-date-div'>
            <span>By: {blog.author}</span>
            <span>7 days ago</span>
        </div>

        <div className='fullblog-div'>
            <img src={blog.imgUrl} alt="" />
            <p className='blog-title'>{blog.title}</p>
            <p className='blog-description'>{blog.description}</p>
        </div>

        <AuthorProfile />
    </div>
  )
}
