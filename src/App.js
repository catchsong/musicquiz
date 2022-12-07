import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Post_db from './component/db_post.js';
import * as Get_db from './component/db_get.js';
import Musicplay from './component/music_play';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login.js';
import Plus_music from './pages/Plus.js';
import Categories from './component/Categories.js';
import Home from './pages/Home.js';


const App = () => {
  return(
    <Routes>
      <Route element={<Categories />}>
        <Route path="/" element={<Home />} />
        <Route path="/plus" element={<Plus_music />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
    
  );
};

export default App;