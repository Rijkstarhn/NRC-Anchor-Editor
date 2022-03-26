const SERVER_URL = "https://localhost:5001/api"

export const loadPlainText = () => {
    return (
        fetch (`${SERVER_URL}/PlainText`).then(
            res => res.json()
        ))
}

const services = {
    loadPlainText,
}

export default services;
