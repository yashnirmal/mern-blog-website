import React, { useState } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";


export default function Signin() {

  const [errorMsg,setErrorMsg] = useState('')

  function signInClicked(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    if(name===""){
      setErrorMsg("Name cannot be empty")
    }
    else if(email===''){
      setErrorMsg("Email cannot be empty")
    }
    else if(password===''){
      setErrorMsg("Please set a password")
    }
    else if(password.length<=5){
      setErrorMsg("Password should be more than 5 characters long")
    }
    else if(password!==confirmPass){
      setErrorMsg("Passwords are not matching")
    }
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
            <input id='password' type="text" placeholder="Password" />
          </div>
          <div>
            <span>Confirm Password</span>
            <input id='confirm-pass' type="text" placeholder="Re-enter Password" />
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
