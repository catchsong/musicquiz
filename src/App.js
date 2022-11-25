import { Component } from "react";
import ReactPlayer from "react-player";


class App extends Component {
  video_pause = () => {
    console.log('Click happened');
  };
  render(){
    const vdid = 'K4OltK36GUo'
    const startTime = 20
    const endTime = 30
    const video_url = "https://www.youtube.com/watch?v=K4OltK36GUo"
    return (
    <div>
      <h1>
      MusicQuiz
      <ReactPlayer 
        className="react-player" 
        url= {video_url + "#t=${startTime},${endTime}"}
        width="1000px" // 둘다 0으로바꾸면 백그라운드재생
        height="1000px" 
        playing={true}     
        controls
        //muted={true}  //크롬에서 muted on이여야 자동재생 ?
        loops={true}
      />
      </h1>

    </div>
    )
  }
}

export default App;