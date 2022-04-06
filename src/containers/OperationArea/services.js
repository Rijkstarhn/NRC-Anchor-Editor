const SERVER_URL = "https://localhost:5001/api"

export const loadPlainText = () => {
    return (
        fetch (`${SERVER_URL}/PlainText`,
            {
                    headers: {'Accept': 'application/json'}
                }
            ).then(
                res => res.json()
            )
    );
}

export const uploadXMLFile = (xmlData) => {
    return (
        fetch (`${SERVER_URL}/XMLFiles`,
        {
                method: 'POST',
                body: xmlData,
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept' : '*/*',
                },
            }
        )
    );
}

export const getAnchors = () => {
    return (
        fetch(`${SERVER_URL}/Anchors`, {
            headers: {'Accept': 'application/json'}
        }).then(
            res => res.json()
        )
    );
}

export const updateAnchor = (originalAnchor, destinationAnchor) => {
    console.log(originalAnchor);
    console.log(destinationAnchor);
    return (
        fetch(`${SERVER_URL}/Anchors?originalTimestamp=${originalAnchor.timestamp}&originalLocation=${originalAnchor.location}&destinationTimestamp=${destinationAnchor.timestamp}&destinationLocation=${destinationAnchor.location}`,
        {
                method: 'PUT',
                headers: {'Accept': 'application/json'}
            }
        ).then(
            res => res.json()
        )
    );
}

const services = {
    loadPlainText,
    uploadXMLFile,
    getAnchors,
    updateAnchor,
}

export default services;
