import { useState } from 'react';
import { TrixEditor } from "react-trix";
import '../style/App.css';

import docsModel from '../models/documents';

import Header from "./header";


function Create() {
    const [text, setText] = useState("");

    const handleChange = (html, text) => {
        setText(text);
    }

    async function createDocument() {
        const title = document.getElementById("title");
        let newDocument = {};
        newDocument.title = title.value;
        newDocument.text = text;

        await docsModel.createDoc(newDocument);
   }

   function refreshPage() {
    window.location.reload();
  }

    return (
        <div className="App">
            <Header/>

        <div className="SaveDiv">
            <input onChange={handleChange} id="title" placeholder="Title"/>
            <button className="Save" onClick={createDocument}>Create</button>
            <button className="Save Back" onClick={refreshPage}>Go back</button>
        </div>

        <div className="Editor">
            <TrixEditor onChange={handleChange} placeholder="Write here..."/>
        </div>

        </div>
    );
}

export default Create;