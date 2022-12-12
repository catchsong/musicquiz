import {} from "./gameData"; 

export const set_ans = newans => ({
    type: "NEW_ANS",
    payload: newans,
});

export const set_play_onoff = new_play_onoff => ({
    type: "PLAY_ONOFF",
    payload: new_play_onoff,
});

export const set_video_idx = new_video_idx => ({
    type: "NEXT_VIDEO",
    payload: new_video_idx,
});

