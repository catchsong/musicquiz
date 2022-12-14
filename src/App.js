import React, { useState, useEffect, useRef } from "react";
import AppRouter from "./component/Router";
import { authService } from "./fbase";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    console.log("작동중 ㅋ")
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  };
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/>
      ) : (
        "Initializing."
      )}
    </>
  );
}
export default App;