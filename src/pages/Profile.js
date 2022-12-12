// routes/Profile.js
import { authService } from '../fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import refreshUser from '../App.js'

const Profile = ({ userObj }) => {
  const [post, setPost] = useState("");
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/');
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== post) {
      await userObj.updateProfile({
        displayName: post
      })
      refreshUser();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };  
  return (
    <>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="new nickname"
          maxLength={10}
        />
        <input type="submit" value="Profilename" />
        nickname{userObj.displayName}
      </form>
    </>
  );
};

export default Profile;