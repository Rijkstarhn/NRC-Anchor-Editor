import { LOAD_TEXT } from "./actions";
import { GET_ANCHORS } from "./actions";
import { ADD_ANCHOR_TRUE } from "./actions";
import { ADD_ANCHOR_FALSE } from "./actions";
import { UPDATE_CURRENT_LOCATION } from "./actions";
import { UPDATE_CURRENT_TIME } from "./actions";

const initialState = {
    text: "Please upload XML file",
    anchors: [],
    isAddingAnchor: false,
    currentLocation: -1,
    currentTime: -0.1,
};

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
            };
        case ADD_ANCHOR_TRUE:
            return {
                ...state,
                isAddingAnchor: true,
            };
        case ADD_ANCHOR_FALSE:
            return {
                ...state,
                isAddingAnchor: false,
            };
        case UPDATE_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.currentLocation,
            };
        case UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime,
            };
        default:
            return state;
    }
};

export default textareaReducer;
