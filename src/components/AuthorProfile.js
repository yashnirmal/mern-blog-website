import React, { useEffect, useState } from 'react';
import "./AuthoreProfile.css";
import { useSelector} from 'react-redux';

export default function AuthorProfile(props) {

  const userData = useSelector(state=>state.userReducer);
  const [author,setAuthor] = useState(null);
  const [buttonText,setButtonText] = useState("+ Follow");
  const [followingUsers,setFollowingUsers] = useState([]);

  function fetchUsersFollowing() {
    const fetchHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    fetch("http://localhost:5000/followings", fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setFollowingUsers(data.reqData.followingUsers);
        }
      });
  }


  useEffect(()=>{
    fetchUsersFollowing();

    async function fetchAuthorDetails(){
      await fetch(`http://localhost:5000/user/${props.authorid}`)
      .then((res) => res.json())
      .then((data) =>{
        setAuthor(data);
      });
    }

    fetchAuthorDetails()
  },[userData])

  useEffect(()=>{
    if (followingUsers.includes(props.authorid)) setButtonText("Following");
  },[followingUsers])

  function addToFollowings(){

    if(buttonText==="Following"){
      console.log("Following")
      return ;
    }
    
    setButtonText("Following")

    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({authorid:author._id}),
    };

    fetch("http://localhost:5000/following/add", fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("user added to followings");
        }
        else{
          setButtonText("+ Follow");
          console.log("Something went wrong!!!")
        }
      });

  }


  return (
    <div className="author-profile">
      {
      (!author)?<span>Loding...</span>:
      <>
        <img
        src={author.imgUrl}
          alt=""
        />
        <p>{author.name}</p>
        <button className={(buttonText==="Following")?"deactivated-button":""} onClick={addToFollowings}>{buttonText}</button>
        <button className='view-profile-btn'>View Profile</button>
      </>
    }
    </div>
  );
}
