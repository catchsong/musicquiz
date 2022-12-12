const init ={
    ans : null,
    play_onoff: 'false',
    vid_idx : 0
};

const gameData = (state = init, action) => {
    switch (action.type) {
        case "NEW_ANS":
            return {
                ...state,
                ans: action.payload,
            };
        case "PLAY_ONOFF":
            return {
                ...state,
                play_onoff: action.payload,
            }
        case "NEXT_VIDEO":
            return {
                vid_idx: action.payload,
            }

        default:
            return{ 
                ...state,
            };
    }
};

export default gameData;