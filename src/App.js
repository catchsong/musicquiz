import { Component } from "react";
import ReactPlayer from "react-player";
import videoplay from "./video_play"

class App extends Component {
  state = {
    playing: true,
    idx: 0
  }
  render(){
    const { idx } = this.state;
    const video_url = [
      "https://www.youtube.com/watch?v=K4OltK36GUo",
      "https://www.youtube.com/watch?v=ZNEuWldWPD4",
    ]

    const nextVideo = () => {
      if (idx< video_url.length - 1) {
        this.setState({ idx: this.state.idx+1 })
      } else {
        this.setState({ idx: 0 })
      }
    };
    return (
    <div>
      <h1>
      MusicQuiz
      <ReactPlayer 
      
        className="react-player" 
        onPause={() => this.setState({ playing: false })}
        onPlay={() => this.setState({ playing: true })}
        playing={this.state.playing}

        url= {video_url[idx]}
        width="0px" // 둘다 0으로바꾸면 백그라운드재생
        height="0px"     
        controls={true}
        progressInterval={1000}
        pip={true}
        //muted={true}  //크롬에서 muted on이여야 자동재생 ?
        loops={true}

      />
      상태: {this.state.playing ? 'true' : 'false'}
      <br></br>
      idx: {this.state.idx}

      </h1>
      <button onClick={() => this.setState({ playing: true })}>재생</button>
      <button onClick={() => this.setState({ playing: false })}>일시정지</button>
      <button onClick={nextVideo}>다음 영상</button>
    </div>
    )
  }
}

export default App;