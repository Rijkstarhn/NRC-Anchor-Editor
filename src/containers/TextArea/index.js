import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { UPDATE_CURRENT_LOCATION } from "../OperationArea/actions";

function TextArea({
    text,
    anchors,
    isAddingAnchor,
    isDeletingAnchor,
    currentLocation,
    updateCurrentAnchorLocation,
}) {
    // Convert plain text to html elements, and add them in text content.
    useEffect(() => {
        var textContent = document.getElementById("text-content");
        console.log(text);
        textContent.innerHTML = "";
        // Iterate the plain text and create element in text content
        var position = 0;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                // Space -> Anchor Holder
                position++;
                if (i > 0 && text[i - 1] === " ") {
                    // previous space is an anchor holder.
                    var tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position - 1}`);
                    tag.classList.add("anchor-holder");
                    var content = document.createTextNode(" ");
                    tag.innerHTML = "\u00A0";
                    textContent.appendChild(tag);
                } else {
                    tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position}`);
                    tag.classList.add("anchor-holder");
                    content = document.createTextNode(" ");
                    tag.appendChild(content);
                    textContent.appendChild(tag);
                }
            } else if (text[i] === "\n") {
                // \n
                position++;
                tag = document.createElement("p");
                content = document.createTextNode(" ");
                tag.appendChild(content);
                textContent.appendChild(tag);
            } else {
                // Character
                // If the charcter is the first one in a paragraph, add an anchor holder before it.
                if (position === 0 || text[i - 1] === "\n") {
                    tag = document.createElement("span");
                    tag.classList.add(`location-${position}`);
                    tag.classList.add("anchor-holder");
                    content = document.createTextNode("\u00A0");
                    tag.appendChild(content);
                    textContent.appendChild(tag);
                }
                // Add charcter element.
                position++;
                tag = document.createElement("span");
                content = document.createTextNode(`${text[i]}`);
                tag.appendChild(content);
                textContent.appendChild(tag);
            }
        }
        // Add an anchor holder at the end of text.
        position++;
        tag = document.createElement("span");
        tag.classList.add(`location-${position}`);
        tag.classList.add("anchor-holder");
        content = document.createTextNode("\u00A0");
        tag.appendChild(content);
        textContent.appendChild(tag);
    }, [text]);

    // Change existing anchor color.
    useEffect(() => {
        console.log(anchors);
        for (var anchor of anchors) {
            var anchorElements = document.getElementsByClassName(
                `location-${anchor.location}`
            );
            for (var anchorElement of anchorElements) {
                if (!anchorElement.classList.contains("anchor")) {
                    console.log(anchorElement);
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

    // Set up onclick attribute for span in adding mode
    useEffect(() => {
        var spanElements = document.getElementsByClassName("anchor-holder");
        if (isAddingAnchor) {
            for (var spanElement of spanElements) {
                if (!spanElement.classList.contains("anchor")) {
                    spanElement.onclick = function () {
                        let thisLocation = this.classList[0].substring(9);
                        console.log(thisLocation);
                        updateCurrentAnchorLocation(thisLocation);
                    };
                }
            }
        } else {
            for (spanElement of spanElements) {
                if (!spanElement.classList.contains("anchor")) {
                    spanElement.onclick = null;
                }
            }
        }
    }, [isAddingAnchor, updateCurrentAnchorLocation]);

    // Change the background color of current selected anchor to white after clicking cancel
    useEffect(() => {
        if (!isDeletingAnchor && !isDeletingAnchor) {
            let currentAnchor = document.getElementsByClassName(`location-${currentLocation} anchor-holder`)[0]
            if (currentAnchor) {
                console.log("currentAnchor",currentAnchor);
                currentAnchor.style.backgroundColor = null;
                console.log("currentAnchor",currentAnchor);
            }
        }
    }, [isAddingAnchor, isDeletingAnchor])

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
        if (currentLocation > 0) {
            // Cancel previous currentLocation span.
            console.log("prevCurrentLocation.current", prevCurrentLocation);
            if (prevCurrentLocation > 0) {
                var prevElement = document.getElementsByClassName(
                    `location-${prevCurrentLocation}`
                )[0];
                prevElement.style.backgroundColor = null;
            }
            // Change new current span color
            var spanElement = document.getElementsByClassName(
                `location-${currentLocation}`
            )[0];
            spanElement.style.backgroundColor = "red";
        }
    }, [currentLocation, prevCurrentLocation]);

    return (
        <div className="input-group">
            <div>{isAddingAnchor && <h3>Adding Anchor</h3>}</div>
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
            <h1 className="text-content" id="text-content">
                {" "}
            </h1>
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
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentAnchorLocation: (currentLocation) =>
            dispatch({
                type: UPDATE_CURRENT_LOCATION,
                currentLocation: currentLocation,
            }),
    };
};

export default connect(stpm, dtpm)(TextArea);
