import { useState, useEffect } from 'react';
import { TrixEditor } from "react-trix";

import '../style/App.css';

import docsModel from '../models/documents';

import Header from "./header";


function Documents() {
    const [documents, setDocuments] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});
    const [text, setText] = useState("");

    useEffect(() => {
        (async () => {
            const allDocuments = await docsModel.getAllDocuments();
            setDocuments(allDocuments);
        })();
    }, [currentDoc]);

    async function handleChangeSelect(event) {
        const oneDocument = await docsModel.getOne();
        setCurrentDoc(oneDocument);
        let element = document.querySelector("trix-editor");
        element.value = "";
        element.editor.insertHTML(oneDocument.text);

        return (
            oneDocument
        )
    }

    const handleChangeText = (html, text) => {
        setText(text)
    }

    async function updateDoc(docToUpdate) {
        setText(text);
        currentDoc.text = text;
        await docsModel.updateDoc(currentDoc);
    }

    function refreshPage() {
        window.location.reload();
      }

    return (
        <div className="App">
            <Header/>

            <div className="SaveDiv">
                <select id="docSelect"
                    onChange={handleChangeSelect}
                >
                    <option value="-99" key="0">Choose a document</option>
                    {documents.map((doc, index) => <option value={doc._id} key={index}>{doc.title}</option>)}
                </select>

                <button className="Save" onClick={updateDoc}>Save</button>
                <button className="Save Back" onClick={refreshPage}>Go back</button>
            </div>

            <div className="Editor">
                <TrixEditor onChange={handleChangeText} placeholder="Write here..."/>
            </div>
        </div>
    )
};

export default Documents;