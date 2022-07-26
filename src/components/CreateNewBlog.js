import React, { useState } from 'react';
import "./CreateNewBlog.css";
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import baseApiUrl from "./baseApiUrl";
import ReactMarkdown from "react-markdown";



export default function CreateNewBlog() {

  const [isError,setIsError] = useState(0);
  const [previewModal,setPreviewModal] = useState(false);
  const navigate = useNavigate();
  const author = useSelector(state=>state.userReducer);

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
      headers: { 
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(blog)
    };

    fetch(`${baseApiUrl}/blogs`, requestOptions)
      .then((res) => res.json())
      .then((data) => addBlogToUsersMyBlog(data._id));
  }

  function addBlogToUsersMyBlog(blogid){
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({blogid}),
    };

    fetch(`${baseApiUrl}/myblog/add`, fetchHeader)
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3>Write new blog</h3>
          <span style={{opacity:0.8}}>Use <a target="_blank" href="https://www.markdownguide.org/basic-syntax/">Markdown</a> syntax to write the blog</span>
        </div>
        <div>
          <input type="text" className='new-title' placeholder='Title' />
          <input type="text" className='new-url' placeholder='Thumbnail Image URL' />
        </div>
        <input type="text" className='new-tags' placeholder='Enter 5 tags realted to the blog'/>
        <br />
        <textarea type="text" className='new-description' placeholder='Description' />
        <div className="post-preview-btn-container">
          <button className='post-new-blog' onClick={postNewBlog} >POST</button>
          <button className='preview-blog-btn' onClick={()=>setPreviewModal(true)}>Preview</button>
        </div>

        {/* Preview Modal */
          (previewModal)?
          <div className='blog-preview-modal' onClick={(e)=>(e.target==e.currentTarget)?setPreviewModal(false):setPreviewModal(previewModal)}>
            <div>
            <h1 style={{marginBottom:30}}>{document.querySelector(".new-title").value}</h1>
              <ReactMarkdown>
                {document.querySelector(".new-description").value}
              </ReactMarkdown>
            </div>
          </div>
          :<></>
        }

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
