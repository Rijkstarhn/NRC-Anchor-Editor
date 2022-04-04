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
    )
}

const services = {
    loadPlainText,
    uploadXMLFile,
}

export default services;
