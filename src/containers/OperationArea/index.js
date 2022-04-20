import react, { useEffect, useState } from "react";
import actions, {hitCancelButton} from "./actions";
import { connect } from "react-redux";

function OperationArea({
    loadText,
    uploadXML,
    getAnchors,
    updateAnchor,
    deleteAnchor,
    postAnchor,
    getAnchorByTimestamp,
    getAnchorByLocation,
    getXMLFile,
    setAddingAnchorToTrue,
    setAddingAnchorToFalse,
    setDeletingAnchorToTrue,
    setDeletingAnchorToFalse,
    isAddingAnchor,
    isDeletingAnchor,
    currentTime,
    currentLocation,
    setAnchorLocationToDefault,
    hitCancelButton,
}) {
    useEffect(() => {
        document
            .getElementById("inputGroupFile04")
            .addEventListener("change", handleFileSelect, false);
    }, []);

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
    // const [deletedAnchor, setDeletedAnchor] = useState({
    //     timestamp: "7.2s",
    //     location: 72,
    // });
    // const [postedAnchor, setPostedAnchor] = useState({
    //     timestamp: "8.8s",
    //     location: 88,
    // });

    const [timestamp, setTimestamp] = useState("1.62s");

    const [location, setLocation] = useState(88);

    const loadTextFromServer = () => {
        loadText();
    };

    const handleFileSelect = (event) => {
        setXMLFile(event.target.files);
    };

    const getXMLFileText = () => {
        console.log("read XML");
        const reader = new FileReader();
        reader.readAsText(xmlFile[0]);
        reader.onload = () => {
            console.log("reader", reader.result);
            console.log("reader type", typeof reader.result);
            setXMLData(reader.result);
        };
    };

    const uploadXMLFile = () => {
        console.log("upload file");
        uploadXML(xmlData);
    };

    const getAnchorsFromServer = () => {
        console.log("get anchors");
        getAnchors();
    };

    const updateAnchorToServer = (originalAnchor, destinationAnchor) => {
        console.log("update anchor");
        updateAnchor(originalAnchor, destinationAnchor);
    };

    const deleteAnchorToServer = (deletedAnchor) => {
        console.log("delete anchor");
        deleteAnchor(deletedAnchor);
    };

    const postAnchorToServer = (postedAnchor) => {
        console.log("post anchor");
        postAnchor(postedAnchor);
    };

    const getAnchorByTimestampFromServer = (timestamp) => {
        console.log("Get anchor by timestamp");
        getAnchorByTimestamp(timestamp);
    };

    const getAnchorByLocationFromServer = (location) => {
        console.log("Get Anchor By Location");
        getAnchorByLocation(location);
    };

    const getXMLFileFromServer = () => {
        console.log("Get XML File");
        getXMLFile();
    };

    const setAddingAnchorToTrueStatus = () => {
        setAddingAnchorToTrue();
    };

    const handleSave = () => {
        if (isAddingAnchor && !isDeletingAnchor) {
            // post anchor
            postAnchor({
                timestamp: currentTime,
                location: currentLocation,
            });
            // set isAddingAnchor to false
            setAddingAnchorToFalse();
            setAnchorLocationToDefault();
        } else if (!isAddingAnchor && isDeletingAnchor) {
        } else if (!isAddingAnchor && !isDeletingAnchor) {
        } else {
        }
    };

    const handleCancel = () => {
        // cancel current selected span's background color
        setAddingAnchorToFalse();
        setDeletingAnchorToFalse();
        hitCancelButton(); // trigger the useEffect to cancel previous selected span background color
        setAnchorLocationToDefault();
    };

    return (
        <div>
            {/*<h1>{currentLocation}</h1>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-primary post-anchor-button"*/}
            {/*    onClick={() => postAnchorToServer(postedAnchor)}*/}
            {/*>*/}
            {/*    Post Anchors*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-primary delete-anchor-button"*/}
            {/*    onClick={() => deleteAnchorToServer(deletedAnchor)}*/}
            {/*>*/}
            {/*    Delete Anchors*/}
            {/*</button>*/}
            <button
                type="button"
                className="btn btn-primary get-anchors-button"
                onClick={() => getAnchorsFromServer()}
            >
                Get Anchors
            </button>
            <button
                type="button"
                className="btn btn-primary update-anchor-button"
                onClick={() =>
                    updateAnchorToServer(originalAnchor, destinationAnchor)
                }
            >
                Update Anchor
            </button>
            <button
                type="button"
                className="btn btn-primary get-text-button"
                onClick={() => loadTextFromServer()}
            >
                Get Text
            </button>
            <button
                type="button"
                className="btn btn-primary upload-text-button"
                onClick={() => uploadXMLFile()}
            >
                Upload Text
            </button>
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-primary"*/}
            {/*    onClick={() => getAnchorByTimestampFromServer(timestamp)}*/}
            {/*>*/}
            {/*    Get Anchor by Timestamp*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-primary"*/}
            {/*    onClick={() => getAnchorByLocationFromServer(location)}*/}
            {/*>*/}
            {/*    Get Anchor by Location*/}
            {/*</button>*/}
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => getXMLFileFromServer()}
            >
                Get XML File
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setAddingAnchorToTrueStatus()}
            >
                Add Anchor
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSave()}
            >
                Save
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleCancel()}
            >
                Cancel
            </button>
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                />
                <button
                    className="btn btn-outline-secondary upload-file-button"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={() => getXMLFileText()}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
}

const stpm = (state) => {
    return {
        isAddingAnchor: state.textareaReducer.isAddingAnchor,
        currentTime: state.textareaReducer.currentTime,
        currentLocation: state.textareaReducer.currentLocation,
    };
};

const dtpm = (dispatch) => {
    return {
        loadText: () => actions.loadText(dispatch),
        uploadXML: (xmlData) => actions.uploadXML(dispatch, xmlData),
        getAnchors: () => actions.getAnchors(dispatch),
        updateAnchor: (originalAnchor, destinationAnchor) =>
            actions.updateAnchor(dispatch, originalAnchor, destinationAnchor),
        deleteAnchor: (deletedAnchor) =>
            actions.deleteAnchor(dispatch, deletedAnchor),
        postAnchor: (postedAnchor) =>
            actions.postAnchor(dispatch, postedAnchor),
        getAnchorByTimestamp: (timestamp) =>
            actions.getAnchorByTimestamp(dispatch, timestamp),
        getAnchorByLocation: (location) =>
            actions.getAnchorByLocation(dispatch, location),
        getXMLFile: () => actions.getXMLFile(dispatch),
        setAddingAnchorToTrue: () => actions.setAddingAnchorToTrue(dispatch),
        setAddingAnchorToFalse: () => actions.setAddingAnchorToFalse(dispatch),
        setDeletingAnchorToTrue: () =>
            actions.setDeletingAnchorToTrue(dispatch),
        setDeletingAnchorToFalse: () =>
            actions.setDeletingAnchorToFalse(dispatch),
        setAnchorLocationToDefault: () =>
            actions.setAnchorLocationToDefault(dispatch),
        hitCancelButton: () => actions.hitCancelButton(dispatch),
    };
};

export default connect(stpm, dtpm)(OperationArea);
