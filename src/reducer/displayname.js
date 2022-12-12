const init ={
    userObj : 'null'
};

const displayName = (state = init, action) => {
    switch (action.type) {
        case "NEW_OBJ":
            console.log(action.payload)
            return {
                ...state,
                userObj: action.payload,
            };

        default:
            return state;
    }
};

export default displayName;