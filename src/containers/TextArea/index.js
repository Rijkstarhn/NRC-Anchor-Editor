import react, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import actions, { UPDATE_CURRENT_LOCATION } from "../OperationArea/actions";

function TextArea({
    text,
    anchors,
    isAddingAnchor,
    currentLocation,
    updateCurrentAnchorLocation,
}) {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    const [anchorList, setAnchorList] = useState(anchors);

    const handleAddingAnchorClick = () => {
        console.log(this.classList);
        // updateCurrentAnchorLocation()
    };

    // Convert plain text to html elements, and add them in text content.
    useEffect(() => {
        var textContent = document.getElementById("text-content");
        // let handleAddingAnchorClick = document.createElement("script");
        // let handleAddingAnchorClickTextForm = "function handleAddingAnchorClick(){ \n";
        // handleAddingAnchorClickTextForm += "console.log(this.classList);}\n";
        // handleAddingAnchorClick.innerHTML = handleAddingAnchorClickTextForm;
        // textContent.appendChild(handleAddingAnchorClick);
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
                    // tag.setAttribute("onclick","handleAddingAnchorClick()");
                    tag.onclick = function () {
                        console.log(this.classList[0]);
                        let thisLocation = this.classList[0].substring(9);
                        console.log(thisLocation);
                        updateCurrentAnchorLocation(thisLocation);
                    };
                    var content = document.createTextNode(" ");
                    tag.innerHTML = "\u00A0";
                    textContent.appendChild(tag);
                } else {
                    tag = document.createElement("span");
                    // Set anchor id and class
                    tag.classList.add(`location-${position}`);
                    tag.classList.add("anchor-holder");
                    tag.onclick = function () {
                        let thisLocation = this.classList[0].substring(9);
                        console.log(thisLocation);
                        updateCurrentAnchorLocation(thisLocation);
                    };
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
    }, [text, updateCurrentAnchorLocation]);

    // Set up exsiting anchor to anchor list.
    useEffect(() => {
        // update anchorList
        setAnchorList(anchors);
    }, [anchors]);

    // Change exsiting anchor color.
    useEffect(() => {
        console.log(anchorList);
        for (var anchor of anchorList) {
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
    }, [anchorList]);

    const prevCurrentLocation = useRef();
    useEffect(
        (currentLocation) => {
            prevCurrentLocation.current = currentLocation;
            console.log(prevCurrentLocation.current);
        },
        [currentLocation]
    );

    // Change adding anchor color.
    useEffect(() => {
        console.log(currentLocation);
        if (currentLocation > 0) {
            var spanElement = document.getElementsByClassName(
                `location-${currentLocation}`
            )[0];
            console.log(spanElement);
            spanElement.style.backgroundColor = "red";
        }
    }, [currentLocation]);

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
