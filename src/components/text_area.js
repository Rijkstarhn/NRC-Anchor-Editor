import react, {useState} from 'react';

function TextArea() {
    const text_area_style = {
        height: "500px",
        width: "300px",
    };

    return (
        <div className="input-group">
            <textarea className="form-control" aria-label="With textarea" style={ text_area_style } defaultValue = "Place holder text.">

            </textarea>
        </div>
    );
}

export default TextArea;
