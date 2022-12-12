import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from 'axios';
import { connect } from "react-redux";
import { set_ans, set_play_onoff, set_video_idx } from "../reducer/action";
// redux
const mapDispatchToProps = dispatch => {
    return {
        set_play_onoff: play_onoff => dispatch(set_play_onoff(play_onoff)),
        set_ans: ans => dispatch(set_ans(ans)),
        set_video_idx: video_idx => dispatch(set_video_idx(video_idx)),
    };
};
const mapStateToProps = (state, props) => {
    console.log(props.indexProp)
    return {
        play_onoff: state.gameData.play_onoff,
        ans: state.gameData.ans,
        video_idx: state.gameData.video_idx,
    };
};


//
const Musicplay = ({ set_ans, ans, play_onoff, video_idx, set_video_idx }) => {

    const [index, setIndex] = useState(0);
    const [play, setPlay] = useState(true);
    const [quizdb, setQuizdb] = useState([]);

    const nextVideo = () => {
        if (video_idx < quizdb.length - 1) {
            console.log(`idx:${video_idx}`);
            setIndex(video_idx+1);
        } else {
            setIndex(0);
        }
      };

    const playHandler = (param) => {
        setPlay(param);
    }

    //초기화


    // 인덱스 변경시
    useEffect(() => {
        set_video_idx(index);
        axios.get('http://localhost:4000/quizdb')
        .then((result) => {
            setQuizdb(result.data);  
            set_ans(quizdb[index]?.ans);
        })
        .catch();
    },[index]);

    // 외부 재생/일시정지 호출
    useEffect(() => {
        setPlay(play_onoff);

    },[play_onoff]);

    //외부 인덱스 변경
    useEffect(() => {
        setIndex(video_idx);
    },[video_idx]);
    

    
    

    return (
        <div>
            <ReactPlayer 
                className="react-player" 
                playing={play}
                url= {quizdb[index]?.url}
                width="0px" // 둘다 0으로바꾸면 백그라운드재생
                height="0px"     
                controls={true}
                progressInterval={1000}
                pip={true}
                //muted={true}  //크롬에서 muted on이여야 자동재생 
                loops={true}
                onEnded={() => nextVideo()} 
            />  
        재생중 : {`${play}`}<br></br>
        정답 : {`${quizdb[index]?.ans}`}<br></br>

        <button onClick={() => playHandler(true)}>재생</button>
        <button onClick={() => playHandler(false)}>일시정지</button>
        <button onClick={nextVideo}>다음 영상</button>
        <br></br>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Musicplay);