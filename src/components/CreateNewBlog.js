import React, { useState } from 'react';
import "./CreateNewBlog.css";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


export default function CreateNewBlog() {

  const [isError,setIsError] = useState(0);
  const navigate = useNavigate();
  const author = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!author){
      console.log(author)
      navigate("/account/login");
    }
  },[])

  
  function postNewBlog(){
    const title = document.querySelector('.new-title').value;
    const tags = document.querySelector(".new-tags").value.split(',');
    const description = document.querySelector(".new-description").value;
    const imgUrl = document.querySelector(".new-url").value;
    const date = new Date();
    const postDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();


    const blog = {
      title,
      description,
      imgUrl,
      author:author.name,
      authorId:author.userid,
      postDate,
      tags
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    };

    fetch("http://localhost:5000/blogs", requestOptions)
      .then((res) => res.json())
      .then((data) => addBlogToUsersMyBlog(data._id));
  }

  function addBlogToUsersMyBlog(blogid){
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({blogid}),
    };

    fetch("http://localhost:5000/myblog/add", fetchHeader)
      .then((res) => {
        if (res.ok == true) setIsError(1);
        else setIsError(-1);
        return res.json()})
      .then((data) => {
        if (data.status === "ok") {
          console.log("data changed");
        }
      });
  }


  return (
    <div className='create-new-blog'>
        <p>Write new blog</p>
        <div>
          <input type="text" className='new-title' placeholder='Title' />
          <input type="text" className='new-url' placeholder='Thumbnail Image URL' />
        </div>
        <input type="text" className='new-tags' placeholder='Enter 5 tags realted to the blog'/>
        <br />
        <textarea type="text" className='new-description' placeholder='Description' />
        <button onClick={postNewBlog} >POST</button>

        {/* Success div */
        (isError===1)?(<div className='post-success-div'>
          <span>New Blog Created</span>
          <Link to="/">Go Home</Link>
        </div>) : <></>
        }

        {/* Error Div */
        (isError===-1)?(<div className='post-error-div'>
          <span>Failed to create new blog</span>
          <div>
            <Link to="/">Go Home</Link>
            <span onClick={postNewBlog}>Retry</span>
          </div>
        </div>) : <></>
        }
    </div>
  )
}
