// import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

import "trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";


function App() {
  const [text, setText] = useState("")
  // const [html, setHTML] = useState("")

  const handleChange = (html, text) => {
    // setHTML(html)
    setText(text)
  }

  const save = () => {
    console.log(text)
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          Text Editor
        </h1>
      </header>

      <div className="SaveDiv">
        <button className="Save" onClick={save}>Save</button>
      </div>

      <div className="Editor">
        <TrixEditor onChange={handleChange} placeholder="Write here..."/>
      </div>

    </div>
  );
}


export default App;
