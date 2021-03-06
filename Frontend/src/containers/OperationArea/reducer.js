import {
    ADD_ANCHOR_FALSE,
    ADD_ANCHOR_TRUE,
    DELETE_ANCHOR_FALSE,
    DELETE_ANCHOR_TRUE,
    GET_ANCHORS,
    HIT_CANCEL_BUTTON,
    LOAD_TEXT,
    SET_ANCHOR_LOCATION_DEFAULT,
    UPDATE_CURRENT_LOCATION,
    UPDATE_CURRENT_TIME,
    HIT_DELETE_SAVE, SET_ANCHOR_TIME_DEFAULT,
} from "./actions";

const initialState = {
    text: "Please upload XML file   ",
    anchors: [],
    isAddingAnchor: false,
    isDeletingAnchor: false,
    currentLocation: -1,
    currentTime: "-0.1s",
    cancelButtonHits: 0,
    deleteConfirmHits: 0,
    currentRealLocation: -1, // :-(
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
                currentRealLocation: action.currentRealLocation,
            };
        case UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime,
            };
        case SET_ANCHOR_LOCATION_DEFAULT:
            return {
                ...state,
                currentLocation: -1,
                currentRealLocation: -1,
            }
        case SET_ANCHOR_TIME_DEFAULT:
            return {
                ...state,
                currentTime: "-0.1s",
            };
        case DELETE_ANCHOR_TRUE:
            return {
                ...state,
                isDeletingAnchor: true,
            };
        case DELETE_ANCHOR_FALSE:
            return {
                ...state,
                isDeletingAnchor: false,
            };
        case HIT_CANCEL_BUTTON:
            return {
                ...state,
                cancelButtonHits: state.cancelButtonHits + 1,
            };
        case HIT_DELETE_SAVE:
            return {
                ...state,
                deleteConfirmHits: state.deleteConfirmHits + 1,
            };
        default:
            return state;
    }
};

export default textareaReducer;
