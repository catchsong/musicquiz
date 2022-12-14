import { useEffect, useState, useRef} from "react";
import io from "socket.io-client";
import style from './socket.module.css'
import {connect} from "react-redux";
import { set_ans, set_play_onoff, set_video_idx } from "../reducer/action";


const port = process.env.REACT_APP_PORT;
const ip = process.env.REACT_APP_SOCKET_IP;

const socket = io.connect(`http://${ip}:${port}`);




const Socket_chat = ({ans,set_play_onoff, video_idx, set_video_idx, userObj}) => {
/*      chat : [],
      message : "",
      nickname : "",  
      server_connect : "OFF", */
  //const [nickname, setNickname] = useState("");
  const [chat, setChat] = useState([]); 
  const [message, setMessage] = useState([]); 
  const [server_status,setServer_status] = useState('ON');
  const [answer, setAnswer] = useState('');




  const sendMessageHandler = () => {
    socket.emit("message", [userObj.displayName,message,ans]);
    setMessage('');
    
  };
  const keyHandler = (e) => {
    if(e.key === 'Enter') {
      sendMessageHandler();
    }
  }
  const scrollRef = useRef();

  //렌더링시
  useEffect(() => {
    setAnswer(ans);

  },[]);

  useEffect(() => {
    setAnswer(ans);
  },[ans]);

  // chat 변경시  
  useEffect(() => {
    console.log(ip,port)
    
    if(socket.connected == true)
      setServer_status('ON')
    else
      setServer_status('OFF')

    if(server_status == 'ON')
    {
      setAnswer(ans)
      socket.on("message", (message) => {
        const new_chat = chat.concat([[message[0], message[1]]])
        setChat(new_chat);
        console.log(new_chat)
      });
      socket.on("correct", (message) => {
        const msg = `${message[0]}님이 정답을 맞추셨습니다!`;
        const new_chat = chat.concat([['notice', msg]])
        setChat(new_chat);
        //play.nextVideo();
      });
      socket.on("index", (idx) => {
        set_video_idx(idx);
      });
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  },[chat]);

  return (
    <div className="App">
    <div>
      <h2>서버 연결: {server_status}</h2>
      <h1>Message</h1>
      <button onClick={() => set_play_onoff(true)}>재생</button>
    <button onClick={() => set_play_onoff(false)}>일시정지</button>
    <button onClick={() => set_video_idx(video_idx+1)}>다음영상</button>
    <br></br>
      정답 : {`${answer}`}<br></br>
      nickname: {userObj.displayName}<br></br>
      videoidx: {video_idx}<br></br>

      <div className={style.chatWrap}>
        <ul className={style.msg}>
          {chat.map((data, idx) => {

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

// redux
const mapStateToProps = (state, props) => {
  return {
      play_onoff: state.gameData.play_onoff,
      ans: state.gameData.ans,
      video_idx: state.gameData.video_idx,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      set_play_onoff: play_onoff => dispatch(set_play_onoff(play_onoff)),
      set_ans: ans => dispatch(set_ans(ans)),
      set_video_idx: video_idx => dispatch(set_video_idx(video_idx)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Socket_chat);