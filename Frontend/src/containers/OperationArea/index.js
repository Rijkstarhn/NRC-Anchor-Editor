import react, { useEffect, useState } from "react";
import actions, { deleteConfirm, hitCancelButton } from "./actions";
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
    setAnchorTimeToDefault,
    hitCancelButton,
    deleteConfirm,
}) {
    const [xmlFile, setXMLFile] = useState({});
    const [xmlData, setXMLData] = useState("");

    useEffect(() => {
        document
            .getElementById("inputGroupFile04")
            .addEventListener("change", handleFileSelect, false);
    }, []);

    useEffect(() => {
        if (xmlData.length > 0) {
            uploadThenGetXMLData(xmlData);
        }
    }, [xmlData]);

    async function uploadThenGetXMLData(xmlData) {
        const responseOfUploadXML = await uploadXML(xmlData);
        if (responseOfUploadXML.ok) {
            const responseOfLoadText = await loadText();
            if (responseOfLoadText !== null) {
                const responseOfGetAnchors = await getAnchors();
                if (responseOfGetAnchors === null) {
                    alert("get anchors failed!");
                }
            }
        } else {
            alert("upload file failed!");
        }
    }

    const handleFileSelect = (event) => {
        setXMLFile(event.target.files);
    };

    const getXMLFileText = () => {
        console.log("read XML");
        const reader = new FileReader();
        reader.readAsText(xmlFile[0]);
        reader.onload = () => {
            setXMLData(reader.result);
        };
    };

    const getXMLFileFromServer = () => {
        console.log("Get XML File");
        getXMLFile();
    };

    const setAddingAnchorToTrueStatus = () => {
        setAddingAnchorToTrue();
    };

    const setDeletingAnchorToTrueStatus = () => {
        setDeletingAnchorToTrue();
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
            setAnchorTimeToDefault();
        } else if (!isAddingAnchor && isDeletingAnchor) {
            // delete anchor
            let toBeDeleteAnchor = document.getElementsByClassName(`location-${currentLocation} anchor-holder anchor timestamp-${currentTime}`)[0]
            if (toBeDeleteAnchor) {
                toBeDeleteAnchor.classList.remove(`anchor`);
                toBeDeleteAnchor.classList.remove(`timestamp-${currentTime}`);
                toBeDeleteAnchor.removeAttribute("style");
            }
            deleteAnchor({
                timestamp: currentTime,
                location: currentLocation,
            });
            // set isDeletingAnchor to false
            setDeletingAnchorToFalse();
            setAnchorLocationToDefault();
            setAnchorTimeToDefault();
            deleteConfirm();
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
        <div className="operation-area-style">
            <div className="control-buttons-area">
                <button
                    type="button"
                    className="btn btn-success btn-space"
                    onClick={() => getXMLFileFromServer()}
                >
                    Download
                </button>
                {isDeletingAnchor ? (
                    <button
                        type="button"
                        className="btn btn-secondary btn-space"
                        onClick={() => {}}
                    >
                        Add Anchor
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary btn-space"
                        id="add_anchor_button"
                        onClick={() => setAddingAnchorToTrueStatus()}
                    >
                        Add Anchor
                    </button>
                )}
                {isAddingAnchor ? (
                    <button
                        type="button"
                        className="btn btn-secondary delete-anchor-button btn-space"
                        onClick={() => {}}
                    >
                        Delete Anchor
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary delete-anchor-button btn-space"
                        id="delete_anchor_button"
                        onClick={() => setDeletingAnchorToTrueStatus()}
                    >
                        Delete Anchor
                    </button>
                )}
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    id="save-button"
                    onClick={() => handleSave()}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
            </div>
            <div className="input-group custom-file-button">
                <label className="input-group-text" htmlFor="inputGroupFile04">
                    Choose XML Text File
                </label>
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
                    Upload
                </button>
            </div>
        </div>
    );
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text,
        isAddingAnchor: state.textareaReducer.isAddingAnchor,
        isDeletingAnchor: state.textareaReducer.isDeletingAnchor,
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
        setAnchorTimeToDefault: () => actions.setAnchorTimeToDefault(dispatch),
        hitCancelButton: () => actions.hitCancelButton(dispatch),
        deleteConfirm: () => actions.deleteConfirm(dispatch),
    };
};

export default connect(stpm, dtpm)(OperationArea);
