import react, {useEffect, useState} from 'react';
import actions, {postAnchor} from "./actions";
import {connect} from "react-redux";

function OperationArea({loadText, uploadXML, getAnchors, updateAnchor, deleteAnchor, postAnchor, getAnchorByTimestamp, getAnchorByLocation}) {

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
    const [postedAnchor, setPostedAnchor] = useState({
        timestamp: "8.8s",
        location: 88,
    })

    const [timestamp, setTimestamp] = useState("1.62s")

    const [location, setLocation] = useState(88)

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
        console.log("update anchor");
        updateAnchor(originalAnchor, destinationAnchor);
    }

    const deleteAnchorToServer = (deletedAnchor) => {
        console.log("delete anchor");
        deleteAnchor(deletedAnchor);
    }

    const postAnchorToServer = (postedAnchor) => {
        console.log("post anchor");
        postAnchor(postedAnchor);
    }

    const getAnchorByTimestampFromServer = (timestamp) => {
        console.log("Get anchor by timestamp");
        getAnchorByTimestamp(timestamp);
    }

    const getAnchorByLocationFromServer = (location) => {
        console.log("Get Anchor By Location");
        getAnchorByLocation(location);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => postAnchorToServer(postedAnchor)}>Post Anchors</button>
            <button type="button" className="btn btn-primary" onClick = {() => deleteAnchorToServer(deletedAnchor)}>Delete Anchors</button>
            <button type="button" className="btn btn-primary" onClick = {() => getAnchorsFromServer()}>Get Anchors</button>
            <button type="button" className="btn btn-primary" onClick = {() => updateAnchorToServer(originalAnchor, destinationAnchor)}>Update Anchor</button>
            <button type="button" className="btn btn-primary" onClick = {() => loadTextFromServer()}>Get Text</button>
            <button type="button" className="btn btn-primary" onClick = {() => uploadXMLFile()}>Upload Text</button>
            <button type="button" className="btn btn-primary" onClick = {() => getAnchorByTimestampFromServer(timestamp)}>Get Anchor by Timestamp</button>
            <button type="button" className="btn btn-primary" onClick = {() => getAnchorByLocationFromServer(location)}>Get Anchor by Location</button>
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
        postAnchor: (postedAnchor) => actions.postAnchor(dispatch, postedAnchor),
        getAnchorByTimestamp: (timestamp) => actions.getAnchorByTimestamp(dispatch, timestamp),
        getAnchorByLocation: (location) => actions.getAnchorByLocation(dispatch, location),
    }
}


export default connect(null, dtpm) (OperationArea);
