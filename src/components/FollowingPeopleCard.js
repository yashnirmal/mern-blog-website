import React, { useEffect,useState } from 'react';
import "./FollowingPeopleCard.css";

export default function FollowingPeopleCard(props) {

    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:5000/user/${props.userid}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
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

    fetch("http://localhost:5000/following/remove", fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("user removed from followings");
          props.fetchUsersFollowing();
        }
      });
  }


  return (
    (!userData)?<></>:
    <div className="following-people-card">
      <div>
        <img
          src={userData.imgUrl}
          alt=""
        />
        <h3>{userData.name}</h3>
      </div>
      <button onClick={removeFromFollowings}>Unfollow</button>
    </div>
  );
}
