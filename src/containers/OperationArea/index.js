import react, {useEffect, useState} from 'react';
import actions from "./actions";
import {connect} from "react-redux";

function OperationArea({loadText, uploadXML, getAnchors, updateAnchor, deleteAnchor}) {

    useEffect(() => {
        document.getElementById('inputGroupFile04').addEventListener('change', handleFileSelect, false);
    }, [])

    const [xmlFile, setXMLFile] = useState({});
    const [xmlData, setXMLData] = useState("");
    const [originalAnchor, setOriginalAnchor] = useState({
        timestamp: "3.6s",
        location: 55,
    });
    const [destinationAnchor, setDestinationAnchor] = useState({
        timestamp: "7.2s",
        location: 72,
    });
    const [deletedAnchor, setDeletedAnchor] = useState({
        timestamp: "7.2s",
        location: 72,
    })

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

    const getAnchorsFromServer = () => {
        console.log("get anchors");
        getAnchors();
    }

    const updateAnchorToServer = (originalAnchor, destinationAnchor) => {
        console.log("update anchors");
        updateAnchor(originalAnchor, destinationAnchor);
    }

    const deleteAnchorToServer = (deletedAnchor) => {
        console.log("delete anchors");
        deleteAnchor(deletedAnchor);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => deleteAnchorToServer(deletedAnchor)}>Delete Anchors</button>
            <button type="button" className="btn btn-primary" onClick = {() => getAnchorsFromServer()}>Get Anchors</button>
            <button type="button" className="btn btn-primary" onClick = {() => updateAnchorToServer(originalAnchor, destinationAnchor)}>Update Anchor</button>
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
        getAnchors: () => actions.getAnchors(dispatch),
        updateAnchor: (originalAnchor, destinationAnchor) => actions.updateAnchor(dispatch, originalAnchor, destinationAnchor),
        deleteAnchor: (deletedAnchor) => actions.deleteAnchor(dispatch, deletedAnchor),
    }
}


export default connect(null, dtpm) (OperationArea);
