const init ={
    ans : 'null'
};

const gameData = (state = init, action) => {
    switch (action.type) {
        case "NEW_ANS":
            return {
                ...state,
                ans: action.payload,
            };

        default:
            return state;
    }
};

export default gameData;