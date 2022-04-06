import react, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import actions from "../OperationArea/actions";

function TextArea({text, anchors, getAnchors}) {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    useEffect(() => getAnchors(), [anchors]);

    return (
        <div className="input-group">
            {/*<textarea className="form-control"*/}
            {/*          aria-label="With textarea"*/}
            {/*          style={ text_area_style }*/}
            {/*          defaultValue = { anchors[0].timestamp }*/}
            {/*>*/}
            {/*</textarea>*/}
            <ol className="list-group list-group-numbered">
                {
                    anchors.map((anchor, index) =>
                        <li className="list-group-item d-flex justify-content-between align-items-start" key = {index}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{anchor.timestamp}</div>
                            </div>
                            <span className="badge bg-primary rounded-pill">{anchor.location}</span>
                        </li>
                    )
                }
            </ol>
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

const dtpm = (dispatch) => {
    return {
        getAnchors: () => actions.getAnchors(dispatch),
    }
}


export default connect(stpm, dtpm) (TextArea);
