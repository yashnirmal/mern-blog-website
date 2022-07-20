import React, { useEffect, useState } from 'react';
import "./AuthoreProfile.css";
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FollowBtn from './FollowBtn';
import baseApiUrl from "./baseApiUrl";

export default function AuthorProfile(props) {

  const userData = useSelector(state=>state.userReducer);
  const [author,setAuthor] = useState(null);
  const [followingUsers,setFollowingUsers] = useState([]);
  const navigate= useNavigate();


  useEffect(()=>{

    async function fetchAuthorDetails(){
      await fetch(`${baseApiUrl}/user/${props.authorid}`)
      .then((res) => res.json())
      .then((data) =>{
        setAuthor(data.uData);
      });
    }

    fetchAuthorDetails()
  },[userData])


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
        <FollowBtn userid={author._id} />
        <button className='view-profile-btn' onClick={()=>navigate(`/account/user/${props.authorid}`)}>View Profile</button>
      </>
    }
    </div>
  );
}
