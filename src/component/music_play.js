import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from 'axios';
import { connect } from "react-redux";
import { set_ans, set_play_onoff, set_video_idx } from "../reducer/action";

const Musicplay = ({ set_ans, ans, set_play_onoff, play_onoff, video_idx, set_video_idx }) => {

    const [quizdb, setQuizdb] = useState([]);

    const nextVideo = () => {
        if (video_idx < quizdb.length - 1) {
            console.log(`idx:${video_idx}`);
            set_video_idx(video_idx+1);
        
        } else {
            set_video_idx(0);
        }
    };
    
    const playHandler = (param) => {

        set_play_onoff(param);
    }
    

    //초기화
    //렌더링시
    useEffect(() => {
        if(video_idx === undefined)
            set_video_idx(0);
        if(play_onoff === undefined)
            set_play_onoff(true)
        if(ans === undefined)
            set_ans(null);
        console.log(video_idx,ans,play_onoff);
    

    },[]);



    // 인덱스 변경시
    useEffect(() => {
        set_video_idx(video_idx);
        axios.get('http://localhost:4000/quizdb')
        .then((result) => {
            setQuizdb(result.data);  
            set_ans(quizdb[video_idx]?.ans);
        })
        .catch();
        console.log(video_idx,ans,play_onoff)
    },[video_idx]);

    useEffect(() => {
        if(play_onoff === undefined)
            set_play_onoff(true);
    },[play_onoff]);


    return (
        <div>
            <ReactPlayer 
                className="react-player" 
                playing={play_onoff}
                url= {quizdb[video_idx]?.url}
                width="0px" // 둘다 0으로바꾸면 백그라운드재생
                height="0px"     
                controls={true}
                progressInterval={1000}
                pip={true}
                //muted={true}  //크롬에서 muted on이여야 자동재생 
                loops={true}
                onEnded={() => nextVideo()} 
            />  
        재생중 : {`${play_onoff}`}<br></br>
        정답 : {`${quizdb[video_idx]?.ans}`}<br></br>
        idx : {video_idx}<br></br>

        <button onClick={() => playHandler(true)}>재생</button>
        <button onClick={() => playHandler(false)}>일시정지</button>
        <button onClick={nextVideo}>다음 영상</button>
        <br></br>
        </div>
    )
};

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


//

export default connect(mapStateToProps, mapDispatchToProps)(Musicplay);