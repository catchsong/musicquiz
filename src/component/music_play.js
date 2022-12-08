import { useEffect, useState } from "react";
import * as Get_db from '../component/db_get.js'
import ReactPlayer from "react-player";
import axios from 'axios';
import { connect } from 'react-redux';


function Musicplay(){
    const [index, setIndex] = useState(0);
    const [play, setPlay] = useState(true);
    const [quizdb, setQuizdb] = useState([]);
    useEffect(() => {
       axios.get('http://localhost:4000/quizdb')
      .then((result) => {
            setQuizdb(result.data)  
        })
      .catch();
    },[index]);
    
    const nextVideo = () => {
        if (index < quizdb.length - 1) {
            setIndex(index+1);
        } else {
            setIndex(0);
        }
      };
    // 전역변수 관리
    //const getStore = state => ({
    //    ans = state.;
    //    return ans;
    //});
    //
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
        정답 : {quizdb[index]?.ans}<br></br>

        <button onClick={() => setPlay(true)}>재생</button>
        <button onClick={() => setPlay(false)}>일시정지</button>
        <button onClick={nextVideo}>다음 영상</button>
        <br></br>
        </div>
    )
};

export default Musicplay;