import { useState } from 'react';
import { TrixEditor } from "react-trix";
import '../style/App.css';

import docsModel from '../models/documents';

import Update from "./update";


function Create({userEmail, token}) {
    // const [text, setText] = useState("");
    const [showDoc, setShowDoc] = useState(false);

    // const handleChange = (html, text) => {
    //     setText(text);
    // }

    async function createDocument() {
        const editor = document.querySelector('trix-editor');
        let content = editor.innerHTML;
        const title = document.getElementById("title");
        let newDocument = {};
        newDocument.title = title.value;
        newDocument.text = content;
        newDocument.userId = userEmail;
        newDocument.shared = [];

        await docsModel.createDoc(newDocument);
   }

    const handleShowDoc = () => {
        setShowDoc(true)
    }

    if (showDoc) {
        return (
        <Update userEmail={userEmail} token={token}/>
        )
    }

    return (
        <div className="App">

        <div className="SaveDiv">
            <input id="title" placeholder="Title"/>
            <button className="Save" onClick={createDocument}>Create</button>
            <button className="Save" onClick={handleShowDoc}>Choose a document instead</button>
        </div>

        <div className="Editor">
            <TrixEditor placeholder="Write here..."/>
        </div>

        </div>
    );
}

export default Create;