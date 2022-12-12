import Chat from '../component/socket.js';
import Musicplay from "../component/music_play";

const Game = ({userObj}) => {
    return (
      <div>
        <Musicplay/>
        <Chat userObj = {userObj}/>
        
      </div>
    );
  };
  
  export default Game;