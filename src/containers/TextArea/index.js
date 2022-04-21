import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import actions from "../OperationArea/actions";

function TextArea({
    text,
    anchors,
    isAddingAnchor,
    isDeletingAnchor,
    currentLocation,
    updateCurrentAnchorLocation,
    cancelButtonHits,
}) {
    /* -------------------------------------------------------------------------- */
    /*                               TextArea Set Up                              */
    /* -------------------------------------------------------------------------- */

    // Convert plain text to html elements, and add them in text content.
    useEffect(() => {
        let textContent = document.getElementById("text-content");
        console.log(text);
        textContent.innerHTML = "";
        // Iterate the plain text and create element in text content
        let position = 0;
        // Iterate without the last three char, which are "\n".
        for (let i = 0; i < text.length - 3; i++) {
            if (text[i] === " ") {
                // Space -> Anchor Holder
                position++;
                if (i > 0 && text[i - 1] === " ") {
                    // previous space is an anchor holder.
                    let tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position - 1}`);
                    tag.classList.add("anchor-holder");
                    // let content = document.createTextNode(" ");
                    tag.innerHTML = "\u00A0";
                    textContent.appendChild(tag);
                } else {
                    let tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position}`);
                    tag.classList.add("anchor-holder");
                    let content = document.createTextNode(" ");
                    tag.appendChild(content);
                    textContent.appendChild(tag);
                }
            } else if (text[i] === "\n") {
                // \n
                position++;
                let tag = document.createElement("p");
                let content = document.createTextNode(" ");
                tag.appendChild(content);
                textContent.appendChild(tag);
            } else {
                // Character
                // If the charcter is the first one in a paragraph, add an anchor holder before it.
                if (position === 0 || text[i - 1] === "\n") {
                    let tag = document.createElement("span");
                    tag.classList.add(`location-${position}`);
                    tag.classList.add("anchor-holder");
                    let content = document.createTextNode("\u00A0");
                    tag.appendChild(content);
                    textContent.appendChild(tag);
                }
                // Add charcter element.
                position++;
                let tag = document.createElement("span");
                let content = document.createTextNode(`${text[i]}`);
                tag.appendChild(content);
                textContent.appendChild(tag);
            }
        }
        // Add an anchor holder at the end of text.
        position++;
        let tag = document.createElement("span");
        tag.classList.add(`location-${position}`);
        tag.classList.add("anchor-holder");
        let content = document.createTextNode("\u00A0");
        tag.appendChild(content);
        textContent.appendChild(tag);
    }, [text]);

    // Change existing anchor color. Add 'anchor' and 'timestamp' class to anchor element.
    useEffect(() => {
        console.log(anchors);
        for (let anchor of anchors) {
            let anchorElements = document.getElementsByClassName(
                `location-${anchor.location}`
            );
            for (let anchorElement of anchorElements) {
                if (!anchorElement.classList.contains("anchor")) {
                    anchorElement.style.backgroundColor = "red";
                    anchorElement.classList.add("anchor");
                    anchorElement.classList.add(
                        `timestamp-${anchor.timestamp}`
                    );
                    break;
                }
            }
        }
    }, [anchors]);

    /* -------------------------------------------------------------------------- */
    /*                                 Adding Mode                                */
    /* -------------------------------------------------------------------------- */

    // Set up onclick attribute for span in adding mode
    //once clicked, default currentLocaten will change from -1 to selected location
    useEffect(() => {
        let spanElements = document.getElementsByClassName("anchor-holder");
        if (isAddingAnchor) {
            for (let spanElement of spanElements) {
                if (!spanElement.classList.contains("anchor")) {
                    spanElement.onclick = function () {
                        let thisLocation = this.classList[0].substring(9);
                        updateCurrentAnchorLocation(thisLocation);
                    };
                }
            }
        } else {
            for (let spanElement of spanElements) {
                if (!spanElement.classList.contains("anchor")) {
                    spanElement.onclick = null;
                }
            }
        }
    }, [isAddingAnchor]);

    const prevCurrentLocation = usePrevious(currentLocation);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    }

    // Change adding anchor color.
    useEffect(() => {
        if (isAddingAnchor) {
            if (currentLocation >= 0) {
                // Cancel previous currentLocation span.
                if (prevCurrentLocation >= 0) {
                    let prevElement = document.getElementsByClassName(
                        `location-${prevCurrentLocation}`
                    )[0];
                    prevElement.style.backgroundColor = null;
                }
                // Change new current span color
                let spanElement = document.getElementsByClassName(
                    `location-${currentLocation}`
                )[0];
                spanElement.style.backgroundColor = "red";
            }
        }
        if (isDeletingAnchor) {
            if (currentLocation >= 0) {
                // Cancel previous currentLocation span.
                if (prevCurrentLocation >= 0) {
                    let prevElement = document.getElementsByClassName(
                        `location-${prevCurrentLocation}`
                    )[0];
                    prevElement.style.backgroundColor = "red";
                }
                // Change new current span color
                let spanElement = document.getElementsByClassName(
                    `location-${currentLocation}`
                )[0];
                spanElement.style.backgroundColor = "green";
            }
        }
    }, [currentLocation, prevCurrentLocation]);

    /* -------------------------------------------------------------------------- */
    /*                                Deleting Mode                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        let spanElements = document.getElementsByClassName("anchor");
        if (isDeletingAnchor) {
            for (let spanElement of spanElements) {
                spanElement.onclick = function () {
                    let thisLocation = this.classList[0].substring(9);
                    updateCurrentAnchorLocation(thisLocation);
                    this.style.backgroundColor = 'green';
                };
            }
        } else {
            for (let spanElement of spanElements) {
                spanElement.onclick = null;
            }
        }
    }, [isDeletingAnchor]);
    /* -------------------------------------------------------------------------- */
    /*                            Cancel / Default Mode                           */
    /* -------------------------------------------------------------------------- */

    // Change the background color of current selected anchor to white after clicking cancel
    useEffect(() => {
        if (!isAddingAnchor && !isDeletingAnchor) {
            // Cancel previous currentLocation span.
            let currentAnchor = document.getElementsByClassName(
                `location-${prevCurrentLocation}`
            )[0];
            if (currentAnchor) {
                currentAnchor.style.backgroundColor = null;
            }
        }
    }, [cancelButtonHits]);

    return (
        <div className="input-group">
            {/*<div>{isAddingAnchor && <h3>Adding Anchor</h3>}</div>*/}
            {/*<textarea className="form-control"*/}
            {/*          aria-label="With textarea"*/}
            {/*          style={ text_area_style }*/}
            {/*          defaultValue = { anchors[0].timestamp }*/}
            {/*>*/}
            {/*</textarea>*/}
            <ol className="list-group list-group-numbered anchors-list">
                {anchors.map((anchor, index) => (
                    <li
                        className="list-group-item d-flex justify-content-between align-items-start"
                        key={index}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold anchor-timestamp-info">
                                {anchor.timestamp}
                            </div>
                        </div>
                        <span className="badge bg-primary rounded-pill anchor-location-info">
                            {anchor.location}
                        </span>
                    </li>
                ))}
            </ol>
            <h4 className="text-content" id="text-content">
                {" "}
            </h4>
        </div>
    );
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text,
        anchors: state.textareaReducer.anchors,
        isAddingAnchor: state.textareaReducer.isAddingAnchor,
        isDeletingAnchor: state.textareaReducer.isDeletingAnchor,
        currentLocation: state.textareaReducer.currentLocation,
        cancelButtonHits: state.textareaReducer.cancelButtonHits,
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentAnchorLocation: (currentLocation) =>
            actions.updateCurrentAnchorLocation(dispatch, currentLocation),
    };
};

export default connect(stpm, dtpm)(TextArea);
