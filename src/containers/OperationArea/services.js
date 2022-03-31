const SERVER_URL = "https://localhost:5001/api"

export const loadPlainText = () => {
    return (
        fetch (`${SERVER_URL}/PlainText`, {headers: {'Accept': 'application/json'}}).then(res => res.json())
    )
}

export const uploadXMLFile = (xmlData) => {
    return (
        fetch (`${SERVER_URL}/XMLFiles`), {
            method: 'POST',
            body: xmlData,
            headers: {
                'Content-Type': 'text/plain',
                'Accept': '*/*',
            },
        })
        // .then(
        //     res => {
        //         console.log(res);
        //     }
        // ).catch((error) => {
        //     console.error('Error:', error);
        // }
    // )
}

const services = {
    loadPlainText,
    uploadXMLFile,
}

export default services;
