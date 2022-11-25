import { Component } from "react";
import ReactPlayer from "react-player";


class App extends Component {
  constructor (props) {
  	super(props)
    this.state = {
    	playing: true
    }
  }
  render(){

    const startTime = 20
    const endTime = 23
    const video_url = "https://www.youtube.com/watch?v=K4OltK36GUo"
    return (
    <div>
      <h1>
      MusicQuiz
      <ReactPlayer 
      
        className="react-player" 
        onPause={() => this.setState({ playing: false })}
        onPlay={() => this.setState({ playing: true })}
        playing={this.state.playing}
        url= {video_url + `#t=${startTime},${endTime}`}
        width="500px" // 둘다 0으로바꾸면 백그라운드재생
        height="500px"     
        controls={true}
        progressInterval={1000}
        pip={true}
        //muted={true}  //크롬에서 muted on이여야 자동재생 ?
        loops={true}

      />
      상태: {this.state.playing ? 'true' : 'false'}

      </h1>
      <button onClick={() => this.setState({ playing: true })}>재생</button>
      <button onClick={() => this.setState({ playing: false })}>일시정지</button>

    </div>
    )
  }
}

export default App;