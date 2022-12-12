const init ={
    ans : 'null',
    play_onoff: 'false'
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

        default:
            return state;
    }
};

export default gameData;