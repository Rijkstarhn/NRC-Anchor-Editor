import react, {useState} from 'react';
import {connect} from "react-redux";

import actions from "../OperationArea/actions";
import textareaReducer from "../OperationArea/reducer";

function TextArea({text, anchors}) {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    return (
        <div className="input-group">
            {/*<textarea className="form-control"*/}
            {/*          aria-label="With textarea"*/}
            {/*          style={ text_area_style }*/}
            {/*          defaultValue = { anchors[0].timestamp }*/}
            {/*>*/}
            {/*</textarea>*/}
            <ul className="list-group">
                {
                    anchors.map((anchor) =>
                        <li className="list-group-item">{anchor.timestamp}</li>
                    )
                }
            </ul>
            <h1>
                {text}
            </h1>
        </div>
    );
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text,
        anchors: state.textareaReducer.anchors,
    }
}

export default connect(stpm) (TextArea);
