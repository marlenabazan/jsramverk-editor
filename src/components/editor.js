import "trix";
import "trix/dist/trix.css";
import { useState } from 'react';

import { TrixEditor } from "react-trix";
import '../style/App.css';

import Header from "./header";
import Update from "./update";
import Create from "./create";


function Editor({token, userEmail, onLogout}) {
  const [showDoc, setShowDoc] = useState(false);
  const [newDoc, setNewDoc] = useState(false);
  console.log("user email", userEmail);
  
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
    console.log("editor if show doc userEmail", userEmail);
    return (
      <Update userEmail={userEmail}/>
    )
  }
  if (newDoc) {
    console.log("editor if new doc userEmail", userEmail);
    return (
      <Create userEmail={userEmail}/>
    )
  }

  return (
    <div className="App">
      <Header/>
    
      <div className="SaveDiv">
        <button className="Save" onClick={handleCreateDoc}>Create new document</button>
        <button className="Save" onClick={handleShowDoc}>Choose/Update a document</button>
        Logged in as {userEmail}
        <button className="Save Logout" onClick={handleCreateDoc}>Logout</button>
      </div>

      <div className="Editor">
          <TrixEditor placeholder="Choose new or existing document..."/>
      </div>
    </div>
  );
}

export default Editor;
