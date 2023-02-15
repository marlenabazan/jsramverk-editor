import { useState } from 'react';
import { TrixEditor } from "react-trix";
import '../style/App.css';

import docsModel from '../models/documents';

import Header from "./header";
import Update from "./update";


function Create({userEmail}) {
    const [text, setText] = useState("");
    const [showDoc, setShowDoc] = useState(false);
    console.log("userEmail create", userEmail);

    const handleChange = (html, text) => {
        setText(text);
    }

    async function createDocument() {
        const title = document.getElementById("title");
        let newDocument = {};
        newDocument.title = title.value;
        newDocument.text = text;
        newDocument.userId = userEmail;

        await docsModel.createDoc(newDocument);
   }

//    function refreshPage() {
//     window.location.reload();
//   }

    const handleShowDoc = () => {
        setShowDoc(true)
    }

    if (showDoc) {
        console.log("if show doc user", userEmail);
        return (
        <Update userEmail={userEmail}/>
        )
    }

    return (
        <div className="App">
            <Header/>

        <div className="SaveDiv">
            <input onChange={handleChange} id="title" placeholder="Title"/>
            <button className="Save" onClick={createDocument}>Create</button>
            <button className="Save" onClick={handleShowDoc}>Choose a document instead</button>
            {/* <button className="Save Back" onClick={refreshPage}>Go back</button> */}
        </div>

        <div className="Editor">
            <TrixEditor onChange={handleChange} placeholder="Write here..."/>
        </div>

        </div>
    );
}

export default Create;