// routes/Profile.js
import { authService } from '../fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/');
  };
  
  return (
    <>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
      <div>로그아웃 페이지</div>
    </>
  );
};

export default Profile;