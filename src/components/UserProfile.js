import React, { useEffect, useState } from 'react';
import BlogCardForTab from './BlogCardForTab';
import EmptyProfileIcon from "../assests/empty-user.webp";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./MyProfile.css";
import FollowBtn from './FollowBtn';

export default function UserProfile() {

    const userid = useParams().userid;
    const [userData,setUserData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userid}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.status==='ok'){
                setUserData(data.uData);
            }
        })
    },[])

    console.log(userData);

  return (
    (userData===null)?
    <div style={{width:"100vw",marginTop:200,textAlign:"center"}}>
      <CircularProgress />
    </div>:
    <div className="my-profile">
      <div className="my-profile-user-description">
        <div className="my-profile-user-img">
          {!(userData.imgUrl === "") ? (
            <img src={userData.imgUrl} alt="user profile" />
          ) : (
            <img src={EmptyProfileIcon} alt="user profile" />
          )}
        </div>
        <div className="my-profile-user-data">
          <h1>{userData.name}</h1>
          <span>{userData.about}</span>
        </div>
      </div>

      <FollowBtn userid={userData._id}/>

      <div className='users-myblogs'>
        <div>
            <span>Blogs By {userData.name}</span>
        </div>
        <div className='users-blog-cont'>
            {
                (userData.myBlogs.length===0)?
                <h4>{userData.name} have not written any blog yet</h4>:
                userData.myBlogs.map((el,index)=>(
                    <BlogCardForTab blogid={el} showdelbtn = {false}/>
                ))
            }
        </div>
      </div>

    </div>
  );
}
