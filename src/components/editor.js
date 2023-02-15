import "trix";
import "trix/dist/trix.css";
import { useState } from 'react';

import { TrixEditor } from "react-trix";
import '../style/App.css';

import Update from "./update";
import Create from "./create";


function Editor({token, userEmail}) {
  const [showDoc, setShowDoc] = useState(false);
  const [newDoc, setNewDoc] = useState(false);
  
  const handleCreateDoc = () => {
    setNewDoc(true)
  }

  const handleShowDoc = () => {
    setShowDoc(true)
  }

  if (showDoc) {
    return (
      <Update userEmail={userEmail} token={token}/>
    )
  }
  if (newDoc) {
    return (
      <Create userEmail={userEmail} token={token}/>
    )
  }

  return (
    <div className="App">
    
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
