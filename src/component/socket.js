import React, { Component } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

class Chatting_socket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat : [],
      message : "",
      nickname : "",  
    }
  }

  //message[0] = nickname message[1] = 내용
  componentDidMount(){
    socket.on("message", (message) => {
      this.setState((state) => {
        const new_chat = state.chat.concat([[message[0], message[1]]])
        console.log(this.state.chat)
        this.setState({chat : new_chat})
      });
    });
  }

  render() {
    
    const sendMessageHandler = () => {
      socket.emit("message", [this.state.nickname,this.state.message]);
    };
    
    
    
      return (
        <div className="App">
        <div>
          <h1>Message</h1>
          <ul>
            {this.state.chat.map((data, idx) => {
              return <li key={idx}>
                {`${data[0]}: ${data[1]}`}
                </li>
            })}
          </ul>
        </div>
  
        <div>
          nickname:
          <input value={this.state.nickname}
          onChange={(e) => this.setState({nickname : e.target.value})}
          />
          <br></br>
          <input value={this.state.Message} 
          onChange={(e) => this.setState({message : e.target.value})} 
          />
          <button onClick={sendMessageHandler}>Send</button>
        </div>
      </div>
      );
  }
}

export default Chatting_socket;
