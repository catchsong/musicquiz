// routes/Auth.js
import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';
import './Auth.css'
import imgA from '../google.png'
import imgB from '../github.png'
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value)
    } else if (name === "password"){
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data)
    } catch(error){
      console.log(error);
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {target:{ name }} = event;
    let provider;
    if(name === "google"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === "github"){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (

    <div>
    <div class="block" style={{height: "300px"}}>
      <div class="centered">
        <div>
          <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            {error}
          </form>
          <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
          <div>
            <button name="google" onClick={onSocialClick}><img src={ imgA }width='35' height='35' alt='testA'></img>Google</button>
            <button name="github" onClick={onSocialClick}><img src={ imgB }width='35' height='35' alt='testA'></img>Github</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    
  );
};

export default Auth;