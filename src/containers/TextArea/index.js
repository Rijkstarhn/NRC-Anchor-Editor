import react, {useState} from 'react';
import {connect} from "react-redux";
import textareaReducer from "../OperationArea/reducer";
import actions from "../OperationArea/actions";

function TextArea(text = "This is text placeholder...") {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    return (
        <div className="input-group">
            <textarea className="form-control" aria-label="With textarea" style={ text_area_style } defaultValue ={ text }>

            </textarea>
        </div>
    );
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text
    }
}

export default connect(stpm) (TextArea);
