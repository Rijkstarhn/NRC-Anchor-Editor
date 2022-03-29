import services from './services'

export const LOAD_TEXT = 'LOAD_TEXT'

export const loadText = (dispatch) => services.loadPlainText().then(
    plainText => dispatch({type: LOAD_TEXT, text: plainText})
)

export const uploadXML = (dispatch, xmlData) => services.uploadXMLFile(xmlData).then(
    status => console.log(status)
)

const actions = {
    loadText,
    uploadXML,
}

export default actions;
