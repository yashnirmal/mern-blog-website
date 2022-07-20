import React, { useEffect, useState } from 'react';
import "./Login.css";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {login,logout} from "../redux/actions/action.js";
import jwt from 'jsonwebtoken';
import baseApiUrl from './baseApiUrl';



export default function Login() {

  const navigate = useNavigate();
  const [loginErrMsg,setLoginErrMsg] = useState('')
  const loggedUser = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  function loginBtnClicked(){
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;
    const userLogin ={
      email,
      password
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    };

    fetch(`${baseApiUrl}/login`, requestOptions)
      .then((res) => {console.log(res); return res.json()})
      .then((data) => {
        console.log(data);
        if (data.status==='ok' && data.user) {
          dispatch(login(jwt.decode(data.user)))
          localStorage.setItem('token',data.user)
          navigate("/");
        } else {
          setLoginErrMsg("Email or password is wrong!");
        }
      })
      .catch((err) => setLoginErrMsg("Something went wrong!"));
  }

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div>
          <h1>Login</h1>
          <div>
            <span>Email</span>
            <input id="login-email" type="email" placeholder="E-Mail" />
          </div>
          <div>
            <span>Password</span>
            <input id="login-pass" type="password" placeholder="Password" />
          </div>
          <button onClick={loginBtnClicked}>Login</button>
          <span id="signin-error-message">{loginErrMsg}</span>
          <div>
            <span style={{ marginRight: 20 }}>Not a registered user?</span>
            <Link to="/account/signin">Signin</Link>
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
