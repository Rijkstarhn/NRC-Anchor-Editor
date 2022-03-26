import services from './services'

export const LOAD_TEXT = 'LOAD_TEXT'

export const loadText = (dispatch) => services.loadPlainText().then(
    plainText => dispatch({type: LOAD_TEXT, text: plainText})
)

const actions = {
    loadText,
}

export default actions;
