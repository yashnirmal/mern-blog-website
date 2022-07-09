import React, { useEffect } from 'react';
import "./Login.css";
import {Link} from 'react-router-dom';

export default function Login() {

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div>
          <h1>Login</h1>
          <div>
            <span>Email</span>
            <input type="text" placeholder="E-Mail" />
          </div>
          <div>
            <span>Password</span>
            <input type="text" placeholder="Password" />
          </div>
          <button>Login</button>
          <div>
            <span style={{marginRight:20}}>Not a registered user?</span>
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
