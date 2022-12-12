export const set_ans = newans => ({
    type: "NEW_ANS",
    payload: newans,
});

export const set_user = newobj => ({
    type: "NEW_OBJ",
    payload: newobj,
});