import "trix";
import "trix/dist/trix.css";
import { useState } from 'react';

import { TrixEditor } from "react-trix";
import '../style/App.css';

import Documents from "./documents";

function Editor() {
  const [text, setText] = useState("")

  const handleChange = (html, text) => {
    setText(text)
  }

  const save = () => {
    console.log(text)
  };

  return (

    <div className="App">
      <header className="App-header">
        <h1>
            Text Editor
        </h1>
      </header>

      <Documents/>

      <div className="SaveDiv">
          <button className="Save" onClick={save}>Save</button>
      </div>

      <div className="Editor">
          <TrixEditor onChange={handleChange} placeholder="Write here..."/>
      </div>
    </div>

  );
}

export default Editor;