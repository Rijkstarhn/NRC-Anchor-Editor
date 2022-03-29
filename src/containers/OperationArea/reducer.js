import {LOAD_TEXT} from "./actions";


const initialState = {
    text: ""
}

const textareaReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEXT:
            console.log("hahaha");
            console.log("text", action.text);
            return {
                ...state,
                text: action.text,
            }
        default:
            return state
    }
}

export default textareaReducer;
