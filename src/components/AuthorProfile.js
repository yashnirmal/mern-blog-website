import React from 'react';
import "./AuthoreProfile.css";

export default function AuthorProfile() {
  return (
    <div className="author-profile">
      <img
        src="https://yash-nirmal.netlify.app/static/media/me.657695d83be923e0a5d5.png"
        alt=""
      />
      <p>Yash Nirmal</p>
      <button>+ Follow</button>
      <button className='view-profile-btn'>View Profile</button>
    </div>
  );
}
