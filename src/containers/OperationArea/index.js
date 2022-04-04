import react, {useEffect, useState} from 'react';
import actions, {uploadXML} from "./actions";
import {connect} from "react-redux";

function OperationArea({loadText, uploadXML}) {

    useEffect(() => {
        document.getElementById('inputGroupFile04').addEventListener('change', handleFileSelect, false);
    }, [])

    const [xmlFile, setXMLFile] = useState({});
    const [xmlData, setXMLData] = useState("");

    const loadTextFromServer = () => {
        loadText();
    }

    const handleFileSelect = (event) => {
        setXMLFile(event.target.files);
    }

    const getXMLFileText = () => {
        console.log("read XML");
        const reader = new FileReader();
        reader.readAsText(xmlFile[0]);
        reader.onload = () => {
            console.log("reader", reader.result);
            console.log("reader type", typeof (reader.result));
            setXMLData(reader.result);
        }

    }

    const uploadXMLFile = () => {
        console.log("upload file");
        uploadXML(xmlData);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => loadTextFromServer()}>Get Text</button>
            <button type="button" className="btn btn-primary" onClick = {() => uploadXMLFile()}>Upload Text</button>
            <div className="input-group">
                <input type="file" className="form-control" id="inputGroupFile04"
                       aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={() => getXMLFileText()}>Upload File</button>
            </div>
        </div>
    );
}

const dtpm = (dispatch) => {
    return {
        loadText: () => actions.loadText(dispatch),
        uploadXML: (xmlData) => actions.uploadXML(dispatch, xmlData),
    }
}


export default connect(null, dtpm) (OperationArea);
