import React, { useState,useEffect } from 'react';
import "./FullBlog.css";
import { useParams } from "react-router-dom";
import AuthorProfile from './AuthorProfile';
import CircularProgress from "@material-ui/core/CircularProgress";
import BookMark from "../assests/bookmark.png";
import BookMarkFilled from "../assests/bookmark-filled.png";
import baseApiUrl from './baseApiUrl';


export default function FullBlog() {

  const blogId = useParams().id;
  const [blog,setBlog] = useState(null);
  const [blogSaved,setBlogSaved] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);

  function fetchUsersSavedBlogs() {
    const fetchHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    fetch(`${baseApiUrl}/savedblogs`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setSavedBlogs(data.reqData.savedBlogs);
        }
      });
  }
  

  useState(()=>{
    fetchUsersSavedBlogs();

    async function fetchSingleBlog(){
      await fetch(`${baseApiUrl}/blogs/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
    }

    fetchSingleBlog();
  })

  useEffect(()=>{
    if (savedBlogs.includes(blogId)) {
      setBlogSaved(true);
    }
  },[savedBlogs])

  function bookMarkThisBlog(){
    if(blogSaved) return ;
    
    setBlogSaved(true);
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ blogid:blogId}),
    };

    fetch(`${baseApiUrl}/blog/bookmark/add`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("data changed");
        }
        else{
          setBlogSaved(false);
        }
      });
  }


  return (
    (!blog)?
    <div style={{width:"100vw",marginTop:200,textAlign:"center"}}>
      <CircularProgress />
    </div>:
    <div className='fullblog'>
        <div className='authod-date-div'>
            <span>By: {blog.author}</span>
            <div>
              {
                (blogSaved)?
                <img src={BookMarkFilled} alt="" />:
                <img src={BookMark} onClick={bookMarkThisBlog} alt="" />
              }
              <span>{blog.postDate}</span>
            </div>
        </div>

        <div className='fullblog-div'>
            <img src={blog.imgUrl} alt="" />
            <p className='blog-title'>{blog.title}</p>
            <p className='blog-description'>{blog.description}</p>
        </div>

        <AuthorProfile authorid={blog.authorId}/>
    </div>
  )
}
