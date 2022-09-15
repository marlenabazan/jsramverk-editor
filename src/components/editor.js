import "trix";
import "trix/dist/trix.css";
import { useState } from 'react';

import { TrixEditor } from "react-trix";
import '../style/App.css';

import Header from "./header";
import Update from "./update";
import Create from "./create";


function Editor() {
  const [showDoc, setShowDoc] = useState(false);
  const [newDoc, setNewDoc] = useState(false);
  
  const handleCreateDoc = () => {
    setNewDoc(true)
  }

  const handleShowDoc = () => {
    setShowDoc(true)
  }

  // const save = () => {
  //   console.log(text)
  // };

  if (showDoc) {
    return (
      <Update/>
    )
  }
  if (newDoc) {
    return (
      <Create/>
    )
  }

  return (
    <div className="App">
      <Header/>
    
      <div className="SaveDiv">
        <button className="Save" onClick={handleCreateDoc}>Create new document</button>
        <button className="Save" onClick={handleShowDoc}>Choose/Update a document</button>
      </div>

      <div className="Editor">
          <TrixEditor placeholder="Choose new or existing document..."/>
      </div>
    </div>
  );
}

export default Editor;
