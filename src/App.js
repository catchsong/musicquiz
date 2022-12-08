import React, { useState, useEffect } from 'react';
import AppRouter from './component/Router.js'
import { authService } from "./fbase";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


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
      
    </>
  );
}

export default App;