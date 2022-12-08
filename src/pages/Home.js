
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Musicplay from '../component/music_play.js';
const Home = () => {
    return (
        <Switch>
            <Route><Musicplay/></Route>
      </Switch>
      
    );
};
export default Home;