import React,{useEffect, useState} from 'react';
import "./Tabs.css";
import BlogCardForTab from './BlogCardForTab';
import FollowingPeopleCard from './FollowingPeopleCard';

export default function Tabs(props) {

    const [toggleState, setToggleState] = useState(1);
    const [followingUsers,setFollowingUsers] = useState([]);
    const [myBlogs,setMyBlogs] = useState([])
    const [savedBlogs,setSavedBlogs] = useState([])

    function fetchUsersFollowing(){
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

    function fecthUsersMyBlogs(){
      const fetchHeader = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      };

      fetch("http://localhost:5000/myblogs", fetchHeader)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setMyBlogs(data.reqData.myBlogs);
          }
        });
    }

    function fetchUsersSavedBlogs(){
      const fetchHeader = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      };

      fetch("http://localhost:5000/savedblogs", fetchHeader)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setSavedBlogs(data.reqData.savedBlogs)
          }
        });
    }

    useEffect(()=>{
      console.log("Mounted tabs")
      fetchUsersFollowing();
      fecthUsersMyBlogs();
      fetchUsersSavedBlogs();
    },[])

    
    const toggleTab = (index) => {
      setToggleState(index);
    };

  return (
    <div className="tabs-container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Following
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          My Blogs
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Saved Blogs
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {followingUsers.length === 0 ? (
            <h4>You are not following anyone</h4>
          ) : (
            followingUsers.map((el, index) => (
              <FollowingPeopleCard userid={el} fetchUsersFollowing={fetchUsersFollowing}/>
            ))
          )}
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {myBlogs.length === 0 ? (
            <h4>You haven't written any blog yet</h4>
          ) : (
            myBlogs.map((el, index) => (
              <BlogCardForTab blogid={el} showdelbtn = {true} fecthUsersMyBlogs={fecthUsersMyBlogs} />
            ))
          )}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {savedBlogs.length === 0 ? (
            <h4>You don't have any saved blogs yet</h4>
          ) : (
            savedBlogs.map((el, index) => (
              <BlogCardForTab blogid={el} showdelbtn={true} fetchUsersSavedBlogs={fetchUsersSavedBlogs} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
