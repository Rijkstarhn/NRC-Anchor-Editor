import react from 'react';
import actions from "./actions";
import {connect} from "react-redux";

function OperationArea({loadText}) {

    const uploadTextFile = () => {
        console.log("upload file");
        loadText();
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => uploadTextFile()}>Upload File</button>
        </div>
    );
}

const dtpm = (dispatch) => {
    return {
        loadText: () => actions.loadText(dispatch),
    }
}


export default connect(dtpm) (OperationArea);
