import {LOAD_TEXT} from "./actions";
import {GET_ANCHORS} from "./actions";


const initialState = {
    text: "Please upload XML file",
    anchors: [],
}

const textareaReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEXT:
            return {
                ...state,
                text: action.text,
            };
        case GET_ANCHORS:
            return {
                ...state,
                anchors: action.anchors,
            }
        default:
            return state;
    }
}

export default textareaReducer;
