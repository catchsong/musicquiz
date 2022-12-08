import Chat from '../component/socket.js';
import Musicplay from "../component/music_play";

const Game = () => {
    return (
      <div>
        <Musicplay/>
        <Chat/>
        
      </div>
    );
  };
  
  export default Game;