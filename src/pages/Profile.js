// routes/Profile.js
import { authService } from '../fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName != null ? userObj.displayName : "");
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/');
  };
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      })
      refreshUser();
    }
  };
  return (
    <>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
      <form onSubmit={ onSubmit } className="profileForm">
                <input type="text" placeholder="닉네임" onChange={ onChange } value={ newDisplayName } autoFocus
                       className="formInput"/>
                <input type="submit" value="프로필 수정" className="formBtn" style={{ marginTop: 10 }}/>
            </form>
    </>
  );
};

export default Profile;