import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Post_db from './component/db_post.js';
import * as Get_db from './component/db_get.js';
import Musicplay from './component/music_play';

function App() {
  return (
    <div className="App">
      <h1>
        hi
      </h1>
      <Post_db/>
      <Musicplay/>
    </div>
  );
}
export default App;