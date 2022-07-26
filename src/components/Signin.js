import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import baseApiUrl from './baseApiUrl';


export default function Signin() {

  const [errorMsg,setErrorMsg] = useState('')
  const navigate= useNavigate();

  function signInClicked(){
    setErrorMsg("Making a new account for you...")
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    if(name===""){
      setErrorMsg("Name cannot be empty")
      return;
    }
    else if(email===''){
      setErrorMsg("Email cannot be empty")
      return;
    }
    else if(password===''){
      setErrorMsg("Please set a password")
      return;
    }
    else if(password.length<=5){
      setErrorMsg("Password should be more than 5 characters long")
      return;
    }
    else if(password!==confirmPass){
      setErrorMsg("Passwords are not matching")
      return;
    }

    const userSignin = {
      name,
      email,
      password,
      imgUrl:"",
      about:"Nothing to show in About",
      savedBlogs: [],
      myBlogs: [],
      followingUsers: [],
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userSignin),
    };

    fetch(`${baseApiUrl}/user`,requestOptions)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.status){
        navigate("/account/login");
      }else{
        setErrorMsg("The email is already registered")
      }
    })
    .catch(err=>setErrorMsg("Something went wrong!"));
  }

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div>
          <h1>Signin</h1>
          <div>
            <span>Name</span>
            <input id='name' type="text" placeholder="Name" />
          </div>
          <div>
            <span>Email</span>
            <input id='email' type="text" placeholder="E-Mail" />
          </div>
          <div>
            <span>Password</span>
            <input id='password' type="password" placeholder="Password" />
          </div>
          <div>
            <span>Confirm Password</span>
            <input id='confirm-pass' type="password" placeholder="Re-enter Password" />
          </div>
          <button onClick={signInClicked}>Signin</button>
          <span id='signin-error-message'>{errorMsg}</span>
          <div>
            <span style={{ marginRight: 20 }}>Already a existing user?</span>
            <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>

      <div className="login-page-img-div">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="img"
        />
      </div>
    </div>
  );
}
