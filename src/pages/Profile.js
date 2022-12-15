// routes/Profile.js
import React from 'react';
import { useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName != null ? userObj.displayName : "");
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
      <form onSubmit={ onSubmit } className="profileForm">
                <input type="text" placeholder="닉네임" onChange={ onChange } maxlength='10' value={ newDisplayName } autoFocus
                       className="formInput"/>
                <input type="submit" value="프로필 수정" className="formBtn" style={{ marginTop: 10 }}/>
            </form>
    </>
  );
};

export default Profile;