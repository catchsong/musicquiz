// /components/Navigation.js
import React from 'react';
import {Link} from 'react-router-dom'
import './menu.css'
import { useHistory } from 'react-router-dom';
import { authService } from '../fbase';
const Navigation = ({userObj}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/');
  };
  return (
    <nav>
      <br></br>
      <ul>
        <li>
          <Link to="/" style={{textDecoration: 'none', color: "black"}}>Home</Link>
        </li>
        <li>
            <Link to="/profile" style={{textDecoration: 'none', color: "black"}}>{userObj?.displayName
            ? `${userObj.displayName}의 프로필`
            : "프로필"}
            </Link>
        </li>
        <li>
            <Link to="/plus" style={{textDecoration: 'none', color: "black"}}>Music Plus</Link>
        </li>
        <li>
            <Link to="/game" style={{textDecoration: 'none', color: "black"}}>Chat</Link>
        </li>
        <button class ="LogOut" onClick={onLogOutClick}>
        Log Out
        </button>
      </ul>
      <br></br>
    </nav>
  );
};

export default Navigation;