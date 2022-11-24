import { Component } from "react";
import YoutubeBackground from "react-youtube-background";


class App extends Component {
  video_pause = () => {
    console.log('Click happened');
  };
  render(){
    const vdid = 'K4OltK36GUo'
    return (
    <div>
      <h1>
      MusicQuiz
        <YoutubeBackground
        className="yt"
        videoId= {vdid} // 0trXUYYeNHY
        playerOptions={{ mute: 0, loop: 1 }}
        >
    </YoutubeBackground>
      </h1>

    </div>
    )
  }
}

export default App;