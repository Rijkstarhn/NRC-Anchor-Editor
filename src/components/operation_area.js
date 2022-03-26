import react from 'react';

function OperationArea() {

    const uploadTextFile = () => {
        console.log("upload file");
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => uploadTextFile()}>Upload File</button>
        </div>
    );
}

export default OperationArea;
