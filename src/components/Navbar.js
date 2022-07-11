import React,{useEffect,useState} from 'react';
import "./Navbar.css";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {useSelector,useDispatch} from 'react-redux';
import { logout } from '../redux/actions/action';


export default function Navbar() {

  const navigate = useNavigate();
  const loggedUser = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  function myProfileBtnClicked(){
    const token = localStorage.getItem('token');
    if(token){
      const user = jwt.decode(token)
      if(!user){
        localStorage.removeItem('token');
      }
      else{
        // populate code or something redux-state
        navigate("/myprofile")
      }
    }
  }

  // Popover stuff
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "simple-popover" : undefined;


  return (
    <div className="navbar">
      <Link to="/" className="title">
        Blogger
      </Link>
      <div className="navbar-login-signin-div">
        <Link to="/write-new-blog">Write a blog</Link>

      {(!loggedUser)?
        (<>
          <Link to="/account/login">Login</Link>
          <button onClick={()=>navigate("/account/signin")}>Sign In</button>
        </>):
        <div className="navbar-profile-image-div">
          <img
            src="https://yash-nirmal.netlify.app/static/media/me.657695d83be923e0a5d5.png"
            alt=""
            onClick={handleProfileClick}
          />
          
          
          <Popover
            id={id}
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List
              component="nav"
              aria-label="mailbox folders"
              className='profile-popover-list'
            >
              <ListItem button>
                <span onClick={myProfileBtnClicked}>Profile</span>
              </ListItem>
              <Divider />
              <ListItem button >
                <span className='popover-logout-btn' onClick={()=>dispatch(logout())}>Logout</span>
              </ListItem>
            </List>
          </Popover>
        </div> 
      }   
       
      </div>

    </div>
  );
}
