import React, { useEffect, useState } from 'react';
import "./BlogCardForTab.css";
import DeleteIcon from "../assests/delete.png";
import {useNavigate} from 'react-router-dom';
import baseApiUrl from "./baseApiUrl";


export default function BlogCardForTab(props) {

  const [blogData,setBlogData] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{

    fetch(`${baseApiUrl}/blogs/${props.blogid}`)
    .then(res=>res.json())
    .then(data=>setBlogData(data));

  },[])

  function removeFromSavedBlog(){
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ blogid: props.blogid }),
    };

    fetch(`${baseApiUrl}/blog/bookmark/remove`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("blog removed from saved");
          props.fetchUsersSavedBlogs();
        }
      });
  }

  function deleteBlog(){
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ blogid: props.blogid }),
    };

    fetch(`${baseApiUrl}/blogs/delete`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("blog deleted");
          props.fecthUsersMyBlogs();
        }
      });
  }

  return !blogData ? (
    <></>
  ) : (
    <div className="blog-card-for-tab">
      <div className="blog-card-img-for-tab">
        <img src={blogData.imgUrl} alt=""  onClick={()=>navigate(`/blog/${blogData._id}`)}/>
      </div>
      <div className="blog-card-texts-for-tab">
        <h2 onClick={()=>navigate(`/blog/${blogData._id}`)}>{(blogData.title.length>25)?blogData.title.substring(0, 25) + "...":blogData.title}</h2>
        <span>{blogData.description.substring(0, 160) + "..."}</span>
      </div>
      {
        (props.showdelbtn)?
        <div className="tab-blogcard-delete-div" onClick={()=>{
          if(props.blogType==="MyBlog"){
            deleteBlog();
          }else if ((props.blogType === "SavedBlog")) {
            removeFromSavedBlog();
          }
        }}>
        <img src={DeleteIcon} alt="" />
        </div>:<></>
      }
    </div>
  );
}
