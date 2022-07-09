import React,{useEffect,useState} from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";



export default function Navbar() {

  const navigate = useNavigate();
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
        {/* <button onClick={()=>navigate("/account/login")}>Login / Sign In</button> */}
        <div className="navbar-profile-image-div">
          <img
            src="https://yash-nirmal.netlify.app/static/media/me.657695d83be923e0a5d5.png"
            alt=""
            onClick={handleProfileClick}
          />
          {/* Popover */}
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
                <span>Profile</span>
              </ListItem>
              <Divider />
              <ListItem button >
                <span className='popover-logout-btn'>Logout</span>
              </ListItem>
            </List>
          </Popover>
        </div>
      </div>

    </div>
  );
}
