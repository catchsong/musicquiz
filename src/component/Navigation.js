// /components/Navigation.js
import React from 'react';
import {Link} from 'react-router-dom'

const Navigation = ({userObj}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/profile">{userObj?.displayName
            ? `${userObj.displayName}의 프로필`
            : "프로필"}
            </Link>
        </li>
        <li>
            <Link to="/plus">Music Plus</Link>
        </li>
        <li>
            <Link to="/game">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;