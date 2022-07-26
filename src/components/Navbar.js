import React,{useEffect,useState} from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {useSelector,useDispatch} from 'react-redux';
import { login, logout } from '../redux/actions/action';
import EmptyProfileIcon from "../assests/empty-user.webp";
import baseApiUrl from './baseApiUrl';


export default function Navbar() {
  // Popover stuff
  const [popoverOpen,setPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [image,setImage] = useState(null);

  function fetchUserImageAbout() {
    const fetchHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    fetch(`${baseApiUrl}/user/image/about`, fetchHeader)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setImage(data.reqData.imgUrl);
        }
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwt.decode(token);
      if (!userData) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        dispatch(login(userData));
        fetchUserImageAbout();
      }
    }
  }, []);


  function myProfileBtnClicked() {
    setPopoverOpen(false)
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwt.decode(token);
      if (!userData) {
        localStorage.removeItem("token");
      } else {
        // populate code or something redux-state
        navigate(`account/myprofile/${userData.userid}`);
      }
    }
  }


  return (
    <div className="navbar">
      <Link to="/" className="title">
        BlogGator
      </Link>
      <div className="navbar-login-signin-div">
        <Link to="/write-new-blog">Write a blog</Link>

        {!userData ? (
          <>
            <Link to="/account/login">Login</Link>
            <button onClick={() => navigate("/account/signin")}>Sign In</button>
          </>
        ) : (
          <div
            className="navbar-profile-image-div"
            onClick={()=>setPopoverOpen(!popoverOpen)}
          >
            {(image !== null) ? (
              <img src={image} alt="user profile" />
            ) : (
              <img src={EmptyProfileIcon} alt="user profile" />
            )}

              {/* Popover */}
            {
              (popoverOpen)?
            <div className="profile-popover">
              <div
                button
                onClick={() => {
                  myProfileBtnClicked();
                }}
              >
                <span>Profile</span>
              </div>
              <div
                button
                onClick={() => {
                  setPopoverOpen(false);
                  localStorage.removeItem("token");
                  dispatch(logout());
                  navigate("/");
                }}
                className="popover-logout-btn"
              >
                <span>Logout</span>
              </div>
            </div>:<></>
              }
          </div>
        )}
      </div>
    </div>
  );
}
