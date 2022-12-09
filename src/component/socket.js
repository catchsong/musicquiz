import { useEffect, useState, useRef} from "react";
import io from "socket.io-client";
import style from './socket.module.css'

const port = 5000;
const socket = io.connect(`http://121.155.53.218:${port}`);

function Socket_chat(){
/*      chat : [],
      message : "",
      nickname : "",  
      server_connect : "OFF", */
  const [chat, setChat] = useState([]); 
  const [message, setMessage] = useState([]); 
  const [nickname, setNickname] = useState("");
  const [server_status,setServer_status] = useState('ON');

  const sendMessageHandler = () => {
    socket.emit("message", [nickname,message]);
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
      socket.on("message", (message) => {
        const new_chat = chat.concat([[message[0], message[1]]])
        console.log(chat)
        setChat(new_chat)
      });
    }
  })

  return (
    <div className="App">
    <div>
      <h2>서버 연결: {server_status}</h2>
      <h1>Message</h1>
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
        </ul>
        <div ref={scrollRef}/> 
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

export default Socket_chat;