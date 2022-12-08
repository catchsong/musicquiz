import React, { useState, useEffect } from 'react';
import AppRouter from './component/Router.js'
import { authService } from "./fbase";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Post_db from './component/db_post.js';
import * as Get_db from './component/db_get.js';
import Musicplay from './component/music_play';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login.js';
import Plus_music from './pages/Plus.js';
import Categories from './component/Categories.js';
import Home from './pages/Home.js';
import Game from './pages/Game.js';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing." }
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;