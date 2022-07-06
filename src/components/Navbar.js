import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <div className="navbar">
        <Link to="/" className='title'>Blogger</Link>
        <Link to="/write-new-blog">Write a blog</Link>
    </div>
  )
}
