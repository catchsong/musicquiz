// components/Router.js
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Navigation from './Navigation';
import Profile from "../pages/Profile";
import Plus from '../pages/Plus';
import Game from '../pages/Game';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route> 
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/plus">
              <Plus />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : ( 
          <>
            <Route exact path="/">
              <Auth />
            </Route> 
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter;