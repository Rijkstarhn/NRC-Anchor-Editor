import react, {useState} from 'react';
import {connect} from "react-redux";

import actions from "../OperationArea/actions";

function TextArea(shownText = "123") {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    return (
        <div className="input-group">
            <textarea className="form-control" aria-label="With textarea" style={ text_area_style } defaultValue = { shownText.shownText }>

            </textarea>
            <div>
                <h1>{ shownText.shownText }</h1>
            </div>
        </div>
    );
}

const stpm = (state) => {
    return {
        shownText: state.textareaReducer.text,
    }
}

export default connect(stpm) (TextArea);
