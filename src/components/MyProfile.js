import React, { useState,useEffect } from 'react';
import "./MyProfile.css";
import Tabs from "./Tabs";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import EmptyProfileIcon from "../assests/empty-user.webp";
import "./Tabs.css";
import baseApiUrl from "./baseApiUrl"


export default function MyProfile() {

  const navigate = useNavigate();
  const userData = useSelector(state=>state.userReducer);
  const [changeDataComp,setChangeDataComp] = useState(false);
  const [userAbout,setUserAbout] = useState("");  // state for change popover
  const [about,setAbout] = useState("");
  const [image,setImage] = useState("");

  function fetchUserImageAbout(){
    const fetchHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    fetch(`${baseApiUrl}/user/image/about`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setImage(data.reqData.imgUrl)
          setAbout(data.reqData.about);
        }
      });
  }

  useEffect(()=>{
    if(!userData){
      localStorage.removeItem('token');
      navigate("/account/login");
    }
    fetchUserImageAbout();
  },[])

  
  function saveChangesToUserData(){
    const imgUrl=document.getElementById('changed-img-url');

    const changedData = {
      imgUrl:imgUrl.value,
      about:userAbout
    }

    console.log(changedData);

    const fetchHeader = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify(changedData)
    }

    fetch(`${baseApiUrl}/userdatachange`,fetchHeader)
    .then(res=>res.json())
    .then(data=>{
      if(data.status==='ok'){
        console.log("data changed")
        fetchUserImageAbout();
      }
    })
  }

  return (
    <div className="my-profile">
      <div className="my-profile-user-description">
        <div className="my-profile-user-img">
          {
            (!(image===""))?
            <img
              src={image}
              alt="user profile"
            />:
            <img
              src={EmptyProfileIcon}
              alt="user profile"
            />

          }
        </div>
        <div className="my-profile-user-data">
          <h1>{userData.name}</h1>
          <span>{about}</span>
          <span
            className="my-profile-user-edit"
            onClick={() => {setChangeDataComp(true); setUserAbout(about)}}
          >
            Edit
          </span>
        </div>
      </div>

      <Tabs />

      {/* Change user data modal */}
      {changeDataComp ? (
        <div
          className="change-data-modal-div"
          onClick={(e) => {
            if (e.target === e.currentTarget) setChangeDataComp(false);
          }}
        >
          <div className="change-data-modal-div-container">
            <h1>Up for some changes!!!</h1>
            <div>
              <span>Profile Image Url</span>
              <input type="text" placeholder="Profile Image Url" id='changed-img-url' value={image} />
            </div>
            <div>
              <span>Tell us about yourself in less than 200 characters</span>
              <textarea
                type="text"
                id='changed-about'
                placeholder="Tell us about yourself in less than 200 characters"
                value={userAbout}
                onChange={(e)=>{if(!(e.target.value.length>200))setUserAbout(e.target.value)}}
              />
            </div>
            <button onClick={saveChangesToUserData}>Save changes</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
