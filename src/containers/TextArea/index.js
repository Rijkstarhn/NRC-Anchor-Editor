import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../OperationArea/actions";

function TextArea({ text, anchors }) {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    const [anchorList, setAnchorList] = useState(anchors);

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
                var tag = document.createElement("span");
                // Set anchor id and class
                tag.setAttribute("id", `${position}`);
                tag.setAttribute("class", "anchor-holder");
                var content = document.createTextNode(" ");
                tag.appendChild(content);
                textContent.appendChild(tag);
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
                    tag.setAttribute("id", `${position}`);
                    tag.setAttribute("class", "anchor-holder");
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
        tag.setAttribute("id", `${position}`);
        tag.setAttribute("class", "anchor-holder");
        content = document.createTextNode("\u00A0");
        tag.appendChild(content);
        textContent.appendChild(tag);
    }, [text]);

    // Set up exsiting anchor to anchor list.
    useEffect(() => {
        // update anchorList
        setAnchorList(anchors);
    }, [anchors]);

    // Change exsiting anchor color.
    useEffect(() => {
        console.log(anchorList);
        for (var anchor of anchorList) {
            var anchorElement = document.getElementById(`${anchor.location}`);
            anchorElement.style.backgroundColor = "red";
        }
    }, [anchorList]);

    return (
        <div className="input-group">
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
                {/* {text} */}
            </h1>
        </div>
    );
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text,
        anchors: state.textareaReducer.anchors,
    };
};

export default connect(stpm)(TextArea);
