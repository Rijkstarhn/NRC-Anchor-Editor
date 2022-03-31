import react from 'react';
import actions, {uploadXML} from "./actions";
import {connect} from "react-redux";

function OperationArea({loadText}) {

    const loadTextFromServer = () => {
        console.log("get text string");
        loadText();
    }

    const uploadXMLFile = () => {
        console.log("upload file");
        // read the XML file
        const xmlData = "<?xml version='1.0' encoding='utf-8'?>\n" +
            "                <TEI>\n" +
            "                    <text xml:lang=\"fra\">\n" +
            "                        <anchor time=\".5s\"/>\n" +
            "                        <body>\n" +
            "                            <div type=\"page\">\n" +
            "                                <p>\n" +
            "                                    <s>Bonjour.</s>\n" +
            "                                    <anchor time=\"1.2s\"/>\n" +
            "                                    <s>Je m&#x27;appelle Éric Joanis.</s>\n" +
            "                                    <s>Je suis programmeur <anchor time=\"3.6s\"/> <anchor time=\"3.9s\"/> au sein de l&#x27;équipe des technologies pour les langues autochtones au CNRC.</s>\n" +
            "                                </p>\n" +
            "                            </div>\n" +
            "                            <anchor time=\"7s\"/>\n" +
            "                            <div type=\"page\">\n" +
            "                                <p>\n" +
            "                                    <s>J&#x27;ai fait une bonne partie de ma carrière en traduction automatique statistique, mais maintenant cette approche est déclassée par l&#x27;apprentissage profond.</s>\n" +
            "                                    <s>En ce moment je travaille à l&#x27;alignement du hansard du Nunavut pour produire un corpus bilingue anglais-inuktitut.</s>\n" +
            "                                    <s>Ce corpus permettra d&#x27;entraîner la TA, neuronale ou statistique, ainsi que d&#x27;autres applications de traitement du langage naturel.</s>\n" +
            "                                </p>\n" +
            "                                <p>\n" +
            "                                    <s>En parallèle, j&#x27;aide à écrire des tests pour rendre le ReadAlong-Studio plus robuste.</s>\n" +
            "                                    <anchor time=\"33.2s\"/>\n" +
            "                                </p>\n" +
            "                            </div>\n" +
            "                        </body>\n" +
            "                    </text>\n" +
            "                </TEI>"

        // upload the file
        uploadXML(xmlData);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick = {() => loadTextFromServer()}>Get Text</button>
            <button type="button" className="btn btn-primary" onClick = {() => uploadXMLFile()}>Upload File</button>
        </div>
    );
}

const dtpm = (dispatch) => {
    return {
        loadText: () => actions.loadText(dispatch),
        uploadXML: () => actions.uploadXML(dispatch),
    }
}


export default connect(null, dtpm) (OperationArea);
