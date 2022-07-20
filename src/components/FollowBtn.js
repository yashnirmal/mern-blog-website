import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FollowBtn(props) {
  const loggedUser = useSelector((state) => state.userReducer);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [buttonText, setButtonText] = useState("+ Follow");

  function fetchLoggedUsersFollowing() {
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

  function addToFollowings() {
    if (buttonText === "Following") {
      console.log("Already Following");
      return;
    }

    setButtonText("Following");

    const fetchHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ authorid: props.userid}),
    };

    fetch("http://localhost:5000/add/following", fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("user added to followings");
        } else {
          setButtonText("+ Follow");
          console.log("Something went wrong!!!");
        }
      });
  }

  useEffect(() => {
    fetchLoggedUsersFollowing();
  },[loggedUser]);

  useEffect(() => {
    if (followingUsers.includes(props.userid)) setButtonText("Following");
  }, [followingUsers]);

  return (
    <button
      className={buttonText === "Following" ? "deactivated-button" : ""}
      onClick={addToFollowings}
    >
      {buttonText}
    </button>
  );
}
