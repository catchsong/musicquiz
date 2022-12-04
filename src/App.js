import { Component } from "react";
import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Chatting_socket from './component/socket.js'
import Add_music from './component/db_post.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      idx: 0,
      text : "정답 입력",
      res : "fail", 
    }
  }
  render(){
    //chatsocket.Chat_socket();
    const { idx } = this.state;
    const video_url = [
      {
        index: 1,
        ans : '츠나각성',
        url: "https://www.youtube.com/watch?v=K4OltK36GUo"
      },
      {
        index: 2,
        ans : 'antifragile',
        url: "https://www.youtube.com/watch?v=ZNEuWldWPD4"
      },
    ]

    const nextVideo = () => {
      if (idx< video_url.length - 1) {
        this.setState({ idx: this.state.idx+1 })
      } else {
        this.setState({ idx: 0 })
      }
    };
    const onTextChange = (e) => {
      this.setState({
        text: e.target.value
      });
      if (e.target.value == video_url[idx].ans)
      {
        this.setState({ res: 'succ' })
        nextVideo()
      }
      else
      {
        this.setState({ res: 'fail' })
      }
    }

    return (
    <div className="musicquiz">
      <div>
        <h1>
        MusicQuiz
        <ReactPlayer 
          className="react-player" 
          onPause={() => this.setState({ playing: false })}
          onPlay={() => this.setState({ playing: true })}
          playing={this.state.playing}

          url= {video_url[idx].url}
          width="0px" // 둘다 0으로바꾸면 백그라운드재생
          height="0px"     
          controls={true}
          progressInterval={1000}
          pip={true}
          //muted={true}  //크롬에서 muted on이여야 자동재생 
          loops={true}
          onEnded={() => nextVideo()} 

        />
        상태: {this.state.playing ? 'true' : 'false'}
        <br></br>
        idx: {this.state.idx}

        </h1>
        <button onClick={() => this.setState({ playing: true })}>재생</button>
        <button onClick={() => this.setState({ playing: false })}>일시정지</button>
        <button onClick={nextVideo}>다음 영상</button>
        <br></br>
        <input 
          type="text"
          onChange={onTextChange}
          value = {this.state.text}
        />
        <h3>
          실시간 입력: {this.state.text}
          <br></br>
          정답 : {video_url[idx].ans} 
          <br></br>
          결과 : {this.state.res}     
        </h3>
      </div>
      
      <Chatting_socket/>
      <Add_music/>

    </div>
    )
  }
}

export default App;