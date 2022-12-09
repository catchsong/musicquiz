import { useEffect, useState, useRef} from "react";
import io from "socket.io-client";
import style from './socket.module.css'
import {connect} from "react-redux";
import * as play from './music_play.js';

const port = process.env.REACT_APP_PORT;
const ip = process.env.REACT_APP_SOCKET_IP;

const socket = io.connect(`http://${ip}:${port}`);


// redux
const mapStateToProps = (state, props) => {
  console.log(props.indexProp)
    return {
        ans: state.gameData.ans,
    };
};
//


const Socket_chat = ({ans}) => {
/*      chat : [],
      message : "",
      nickname : "",  
      server_connect : "OFF", */
  const [chat, setChat] = useState([]); 
  const [message, setMessage] = useState([]); 
  const [nickname, setNickname] = useState("");
  const [server_status,setServer_status] = useState('ON');
  const [answer, setAnswer] = useState('');
  

  const sendMessageHandler = () => {
    socket.emit("message", [nickname,message,ans]);
    setMessage('');
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  };
  const keyHandler = (e) => {
    if(e.key === 'Enter') {
      sendMessageHandler();
    }
  }
  const scrollRef = useRef();

  useEffect(() => {
    
    if(socket.connected == true)
      setServer_status('ON')
    else
      setServer_status('OFF')

    if(server_status == 'ON')
    {
      setAnswer(ans)
      socket.on("message", (message) => {
        const new_chat = chat.concat([[message[0], message[1]]])
        console.log(chat);
        setChat(new_chat);
      });
      socket.on("correct", (message) => {
        
        const msg = `${message[0]}님이 정답을 맞추셨습니다!`;
        const new_chat = chat.concat([['notice', msg]])
        console.log(chat);
        setChat(new_chat);
        play.nextVideo();
      });
    }
  },[message]);

  return (
    <div className="App">
    <div>
      <h2>서버 연결: {server_status}</h2>
      <h1>Message</h1>
      정답 : {`${answer}`}<br></br>
      nickname:
      
      <input className={style.input} value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      />
      <br></br>
      <div className={style.chatWrap}>
        <ul className={style.msg}>
          {chat.map((data, idx) => {
            console.log(data, idx)
            return <li className={style.msg} key={idx}>
              {`${data[0]}: ${data[1]}`}
              </li>
              
          })}
          <div ref={scrollRef}/> 
        </ul>
      </div>
      
    </div>
    
    <div>
      <div className={style.chatLog}>
        <input className={style.input} onKeyPress={keyHandler} value={message} 
        onChange={(e) => setMessage((e.target.value))} 
        />
        <button className={style.btn} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  </div>
  );
  }

export default connect(mapStateToProps)(Socket_chat);