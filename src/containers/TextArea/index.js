import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import actions from "../OperationArea/actions";
import usePrevious from "../../usePrevious";

function TextArea({
    text,
    anchors,
    isAddingAnchor,
    isDeletingAnchor,
    currentLocation,
    currentRealLocation,
    currentTime,
    updateCurrentAnchorLocation,
    updateCurrentAnchorTime,
    cancelButtonHits,
}) {
    /* -------------------------------------------------------------------------- */
    /*                               TextArea Set Up                              */
    /* -------------------------------------------------------------------------- */

    // Convert plain text to html elements, and add them in text content.
    useEffect(() => {
        console.log("TextArea Set Up");
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
                    let prevElement = document.getElementsByClassName(
                        `real-position-${position - 1}`
                    )[0];
                    let tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`${prevElement.classList[0]}`);
                    tag.classList.add(`real-position-${position}`);
                    tag.classList.add("anchor-holder");
                    // let content = document.createTextNode(" ");
                    tag.innerHTML = "\u00A0";
                    textContent.appendChild(tag);
                } else {
                    let tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position}`);
                    tag.classList.add(`real-position-${position}`);
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
                    tag.classList.add(`real-position-${position}`);
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
        tag.classList.add(`real-position-${position}`);
        tag.classList.add("anchor-holder");
        let content = document.createTextNode("\u00A0");
        tag.appendChild(content);
        textContent.appendChild(tag);
    }, [text]);

    // const [isInitial, setIsInitial] = useState(true);

    // Change existing anchor color. Add 'anchor' and 'timestamp' class to anchor element.
    useEffect(() => {
        console.log("Change existing anchor color. Add 'anch");
        console.log(anchors);
        for (let anchor of anchors) {
            let anchorElements = document.getElementsByClassName(
                `location-${anchor.location}`
            );
            if (
                document.getElementsByClassName(`timestamp-${anchor.timestamp}`)
                    .length === 0
            ) {
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
        }
    }, [anchors]);

    /* -------------------------------------------------------------------------- */
    /*                                 Adding Mode                                */
    /* -------------------------------------------------------------------------- */

    // Set up onclick attribute for span in adding mode
    //once clicked, default currentLocaten will change from -1 to selected location
    useEffect(() => {
        console.log("isAddingAnchor called!", isAddingAnchor);
        let spanElements = document.getElementsByClassName("anchor-holder");
        if (isAddingAnchor) {
            for (let spanElement of spanElements) {
                if (!spanElement.classList.contains("anchor")) {
                    spanElement.onclick = function () {
                        // console.log("executed");
                        let thisLocation = this.classList[0].substring(9);
                        let thisRealLocation = this.classList[1].substring(14);
                        updateCurrentAnchorLocation(
                            thisLocation,
                            thisRealLocation
                        );
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

    // const prevCurrentLocation = usePrevious(currentLocation);
    const prevCurrentTime = usePrevious(currentTime);
    // Change adding anchor color.
    useEffect(() => {
        console.log("Change adding anchor color");
        // if (isAddingAnchor) {
        //     if (currentTime.charAt(0) !== '-') { // judge if it's minus string
        //         // Cancel previous currentTime span.
        //         console.log("prevCurrentTime", prevCurrentTime);
        //         if (prevCurrentTime.charAt(0) !== '-') {
        //             let prevElement = document.getElementsByClassName(
        //                 `timestamp-${prevCurrentTime}`
        //             )[0];
        //             prevElement.style.backgroundColor = null;
        //         }
        //         // Change new current span color
        //         let spanElement = document.getElementsByClassName(
        //             `timestamp-${currentTime}`
        //         )[0];
        //         spanElement.style.backgroundColor = "red";
        //     }
        // }
        if (isDeletingAnchor) {
            if (currentTime.charAt(0) !== "-") {
                console.log("currentLocation", currentLocation);
                console.log("prevCurrentTime", prevCurrentTime);
                console.log("currentTime", currentTime);
                // Cancel previous prevCurrentTime span.
                if (prevCurrentTime.charAt(0) !== "-") {
                    let prevElement = document.getElementsByClassName(
                        `timestamp-${prevCurrentTime}`
                    )[0];
                    prevElement.style.backgroundColor = "red";
                }
                // Change new current span color
                let spanElement = document.getElementsByClassName(
                    `timestamp-${currentTime}`
                )[0];
                spanElement.style.backgroundColor = "green";
                // for (let i = 0; i < spanElements; i++) {
                //     if (!spanElements[i].className.includes(`timestamp-${currentTime}`)) {
                //         spanElements[i].style.backgroundColor = "green";
                //     }
                // }
            }
        }
    }, [currentTime, prevCurrentTime]);

    const prevRealCurrentLocation = usePrevious(currentRealLocation);

    useEffect(() => {
        if (isAddingAnchor) {
            if (currentRealLocation >= 0) {
                // Cancel previous currentLocation span.
                if (prevRealCurrentLocation >= 0) {
                    let prevElement = document.getElementsByClassName(
                        `real-position-${prevRealCurrentLocation}`
                    )[0];
                    prevElement.style.backgroundColor = null;
                }
                // Change new current span color
                let spanElement = document.getElementsByClassName(
                    `real-position-${currentRealLocation}`
                )[0];
                spanElement.style.backgroundColor = "red";
            }
        }
    }, [currentRealLocation]);

    /* -------------------------------------------------------------------------- */
    /*                                Deleting Mode                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        console.log("Deleting Mode");
        let spanElements = document.getElementsByClassName("anchor");
        if (isDeletingAnchor) {
            for (let spanElement of spanElements) {
                spanElement.onclick = function () {
                    let thisLocation = this.classList[0].substring(9);
                    let thisRealLocation = this.classList[1].substring(14);
                    let thisTime = this.classList[4].substring(10);
                    updateCurrentAnchorLocation(thisLocation, thisRealLocation);
                    updateCurrentAnchorTime(thisTime);
                    this.style.backgroundColor = "green";
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
        console.log(
            "Change the background color of current selected anchor to white after clicking cancel"
        );
        if (!isAddingAnchor && !isDeletingAnchor) {
            // Cancel previous currentTime span.
            let currentAnchor = document.getElementsByClassName(
                `timestamp-${prevCurrentTime}`
            )[0];
            if (currentAnchor) {
                // if it's deleting anchor
                if (currentAnchor.style.backgroundColor === "green") {
                    currentAnchor.style.backgroundColor = "red";
                } else if (currentAnchor.style.backgroundColor === "red") {
                    // if it's adding anchors
                    currentAnchor.style.backgroundColor = null;
                }
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
            {/*<ol className="list-group list-group-numbered anchors-list">*/}
            {/*    {anchors.map((anchor, index) => (*/}
            {/*        <li*/}
            {/*            className="list-group-item d-flex justify-content-between align-items-start"*/}
            {/*            key={index}*/}
            {/*        >*/}
            {/*            <div className="ms-2 me-auto">*/}
            {/*                <div className="fw-bold anchor-timestamp-info">*/}
            {/*                    {anchor.timestamp}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <span className="badge bg-primary rounded-pill anchor-location-info">*/}
            {/*                {anchor.location}*/}
            {/*            </span>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ol>*/}
            <div className="text-area-style">
                <h5 className="text-content text-style" id="text-content">
                    {" "}
                </h5>
            </div>
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
        currentRealLocation: state.textareaReducer.currentRealLocation,
        currentTime: state.textareaReducer.currentTime,
        cancelButtonHits: state.textareaReducer.cancelButtonHits,
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentAnchorLocation: (currentLocation, currentRealLocation) =>
            actions.updateCurrentAnchorLocation(
                dispatch,
                currentLocation,
                currentRealLocation
            ),
        updateCurrentAnchorTime: (currentTime) => {
            actions.updateCurrentAnchorTime(dispatch, currentTime);
        },
    };
};

export default connect(stpm, dtpm)(TextArea);
