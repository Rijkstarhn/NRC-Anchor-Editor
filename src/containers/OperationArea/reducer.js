import {LOAD_TEXT} from "./actions";


const initialState = {
    text: "Please upload XML file"
}

const textareaReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEXT:
            let text = {
                ...state,
                text: action.text,
            };
            return text;
        default:
            return state
    }
}

export default textareaReducer;
