import services from './services'

export const LOAD_TEXT = 'LOAD_TEXT';
export const GET_ANCHORS = 'GET_ANCHORS';
export const ADD_ANCHOR_TRUE = 'ADD_ANCHOR_TRUE';
export const ADD_ANCHOR_FALSE = 'ADD_ANCHOR_FALSE';
export const UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION';
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';
export const SET_ANCHOR_LOCATION_DEFAULT = 'SET_ANCHOR_LOCATION_DEFAULT';
export const DELETE_ANCHOR_FALSE = 'DELETE_ANCHOR_FALSE';
export const DELETE_ANCHOR_TRUE = 'DELETE_ANCHOR_TRUE';
export const HIT_CANCEL_BUTTON = 'HIT_CANCEL_BUTTON';
export const HIT_DELETE_SAVE = 'HIT_DELETE_SAVE';

export const loadText = (dispatch) => services.loadPlainText().then(
    plainText => dispatch({ type: LOAD_TEXT, text: plainText })
)

export const uploadXML = (dispatch, xmlData) => services.uploadXMLFile(xmlData)

export const getAnchors = (dispatch) => services.getAnchors().then(
    response => dispatch({ type: GET_ANCHORS, anchors: response })
)

export const getAnchorByTimestamp = (dispatch, timestamp) => services.getAnchorByTimestamp(timestamp)

export const getAnchorByLocation = (dispatch, location) => services.getAnchorByLocation(location)

export const updateAnchor = (dispatch, originalAnchor, destinationAnchor) => services.updateAnchor(originalAnchor, destinationAnchor).then(
    response => dispatch({ type: GET_ANCHORS, anchors: response })
)

export const deleteAnchor = (dispatch, deleteAnchor) => services.deleteAnchor(deleteAnchor).then(
    response => dispatch({ type: GET_ANCHORS, anchors: response })
)

export const postAnchor = (dispatch, postAnchor) => services.postAnchor(postAnchor).then(
    function processRes(response) {
        if (response) {
            dispatch({ type: GET_ANCHORS, anchors: response })
        } else {
            alert("anchor is illegal because time and location doesn't match");
        }
    }
)

export const getXMLFile = (dispatch) => services.getXMLFile()

export const setAddingAnchorToTrue = (dispatch) => dispatch({ type: ADD_ANCHOR_TRUE })

export const setAddingAnchorToFalse = (dispatch) => dispatch({ type: ADD_ANCHOR_FALSE })

export const setAnchorLocationToDefault = (dispatch) => dispatch({ type: SET_ANCHOR_LOCATION_DEFAULT })

export const setDeletingAnchorToFalse = (dispatch) => dispatch({ type: DELETE_ANCHOR_FALSE })

export const setDeletingAnchorToTrue = (dispatch) => dispatch({ type: DELETE_ANCHOR_TRUE })

export const updateCurrentAnchorLocation = (dispatch, currentLocation) => dispatch({ type: UPDATE_CURRENT_LOCATION, currentLocation: currentLocation })

export const updateCurrentAnchorTime = (dispatch, currentTime) => dispatch({ type: UPDATE_CURRENT_TIME, currentTime: currentTime })


export const deleteConfirm = (dispatch) => dispatch({ type: HIT_DELETE_SAVE })

const actions = {
    loadText,
    uploadXML,
    getAnchors,
    updateAnchor,
    deleteAnchor,
    postAnchor,
    getAnchorByTimestamp,
    getAnchorByLocation,
    getXMLFile,
    setAddingAnchorToTrue,
    setAddingAnchorToFalse,
    setAnchorLocationToDefault,
    setDeletingAnchorToFalse,
    setDeletingAnchorToTrue,
    updateCurrentAnchorLocation,
    updateCurrentAnchorTime,
    // hitCancelButton,
    deleteConfirm,
}

export default actions;
