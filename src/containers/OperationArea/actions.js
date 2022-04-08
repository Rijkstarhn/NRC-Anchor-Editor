import services from './services'

export const LOAD_TEXT = 'LOAD_TEXT';
export const GET_ANCHORS = 'GET_ANCHORS';

export const loadText = (dispatch) => services.loadPlainText().then(
    plainText => dispatch({type: LOAD_TEXT, text: plainText})
)

export const uploadXML = (dispatch, xmlData) => services.uploadXMLFile(xmlData)

export const getAnchors = (dispatch) => services.getAnchors().then(
    response => dispatch({type: GET_ANCHORS, anchors: response})
)

export const getAnchorByTimestamp = (dispatch, timestamp) => services.getAnchorByTimestamp(timestamp).then(
    response => console.log(response)
)

export const updateAnchor = (dispatch, originalAnchor, destinationAnchor) => services.updateAnchor(originalAnchor, destinationAnchor)

export const deleteAnchor = (dispatch, deleteAnchor) => services.deleteAnchor(deleteAnchor)

export const postAnchor = (dispatch, postAnchor) => services.postAnchor(postAnchor)

const actions = {
    loadText,
    uploadXML,
    getAnchors,
    updateAnchor,
    deleteAnchor,
    postAnchor,
    getAnchorByTimestamp,
}

export default actions;
