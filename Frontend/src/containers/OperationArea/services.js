const SERVER_URL = "https://localhost:5001/api";

export const loadPlainText = () => {
    return fetch(`${SERVER_URL}/PlainText`, {
        headers: { Accept: "application/json" },
    }).then((res) => res.json());
};

export const uploadXMLFile = (xmlData) => {
    return fetch(`${SERVER_URL}/XMLFiles`, {
        method: "POST",
        body: xmlData,
        headers: {
            "Content-Type": "application/xml",
            Accept: "*/*",
        },
    });
};

export const getAnchors = () => {
    return fetch(`${SERVER_URL}/Anchors`, {
        headers: { Accept: "application/json" },
    }).then((res) => res.json());
};

export const getAnchorByTimestamp = (timestamp) => {
    return fetch(`${SERVER_URL}/Anchors/${timestamp}`, {
        headers: { Accept: "application/json" },
    }).then((res) => res.json());
};

export const getAnchorByLocation = (location) => {
    return fetch(`${SERVER_URL}/Anchors/${location}`, {
        headers: { Accept: "application/json" },
    }).then((res) => res.json());
};

export const updateAnchor = (originalAnchor, destinationAnchor) => {
    return fetch(
        `${SERVER_URL}/Anchors?originalTimestamp=${originalAnchor.timestamp}&originalLocation=${originalAnchor.location}&destinationTimestamp=${destinationAnchor.timestamp}&destinationLocation=${destinationAnchor.location}`,
        {
            method: "PUT",
            headers: { Accept: "application/json" },
        }
    ).then((res) => res.json());
};

export const deleteAnchor = (deleteAnchor) => {
    return fetch(`${SERVER_URL}/Anchors/${deleteAnchor.timestamp}`, {
        method: "DELETE",
    }).then((res) => res.json());
};

export async function postAnchor(postAnchor) {
    const res = await fetch(
        `${SERVER_URL}/Anchors?destinationTimestamp=${postAnchor.timestamp}&destinationLocation=${postAnchor.location}`,
        {
            method: "POST",
            headers: { Accept: "application/json" },
        }
    );
    if (res.ok) {
        return res.json();
    }
    return null;
};


export const getXMLFile = () => {
    return fetch(`${SERVER_URL}/XMLFiles`, {
        headers: {
            "Content-Type": "application/xml",
            Accept: "*/*",
        },
    }).then((res) => res.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "NewFile.xml";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
};

const services = {
    loadPlainText,
    uploadXMLFile,
    getAnchors,
    updateAnchor,
    deleteAnchor,
    postAnchor,
    getAnchorByTimestamp,
    getAnchorByLocation,
    getXMLFile,
};

export default services;
