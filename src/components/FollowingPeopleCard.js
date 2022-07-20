import React, { useEffect,useState } from 'react';
import "./FollowingPeopleCard.css";
import {useNavigate} from 'react-router-dom';
import baseApiUrl from "./baseApiUrl";


export default function FollowingPeopleCard(props) {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${baseApiUrl}/user/${props.userid}`)
        .then((res) => res.json())
        .then((data) => setUserData(data.uData));
    },[]);

  function removeFromFollowings(){
    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({authorid:userData._id}),
    };

    fetch(`${baseApiUrl}/remove/following`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("user removed from followings");
          props.fetchUsersFollowing();
        }
      });
  }


  return !userData ? (
    <></>
  ) : (
    <div className="following-people-card">
      <div>
        <img
          src={userData.imgUrl}
          alt=""
          onClick={() => navigate(`/account/user/${userData._id}`)}
        />
        <h3 onClick={() => navigate(`/account/user/${userData._id}`)}>
          {userData.name}
        </h3>
      </div>
      <button onClick={removeFromFollowings}>Unfollow</button>
    </div>
  );
}
