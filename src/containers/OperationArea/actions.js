import services from './services'

export const LOAD_TEXT = 'LOAD_TEXT';
export const GET_ANCHORS = 'GET_ANCHORS';

export const loadText = (dispatch) => services.loadPlainText().then(
    plainText => dispatch({type: LOAD_TEXT, text: plainText})
)

export const getAnchors = (dispatch) => services.getAnchors().then(
    response => dispatch({type: GET_ANCHORS, anchors: response})
)

export const uploadXML = (dispatch, xmlData) => services.uploadXMLFile(xmlData)

const actions = {
    loadText,
    uploadXML,
    getAnchors,
}

export default actions;
