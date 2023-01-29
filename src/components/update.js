import { useState, useEffect, useRef } from 'react';
import { TrixEditor } from "react-trix";
import { io } from "socket.io-client";

import '../style/App.css';

import docsModel from '../models/documents';

import Header from "./header";


function Documents() {
    const [documents, setDocuments] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});
    const [text, setText] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // setSocket(io("http://localhost:1337"));
        setSocket(io("https://jsramverk-editor-mabn21.azurewebsites.net"));

      return () => {
          if (socket) {
            socket.disconnect();
          }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function fetchData() {
            const allDocuments = await docsModel.getAllDocuments();
            setDocuments(allDocuments);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let data = {
            _id: currentDoc._id,
            text: text
        };

        if (socket) {
            socket.on("doc", (data) => {
                setContent(data.html, false);
                setContent(data.text);
            });
        }

        if (socket) {
            socket.emit("doc", data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);
    
      function setContent(content) {
        let element = document.querySelector("trix-editor");
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        element.editor.insertHTML(content);
      }

    async function handleChangeSelect(event) {
        const oneDocument = await docsModel.getOne(event.target.value);
        setCurrentDoc(oneDocument);
        // let element = document.querySelector("trix-editor");
        // element.value = "";
        // element.editor.insertHTML(oneDocument.text);
        setContent(oneDocument.text);
        socket.emit("create", oneDocument["_id"]);
        console.log(socket.emit("create", oneDocument["_id"]));
        return (
            oneDocument
        )
    }

    const handleChangeText = (html, text) => {
        setText(text);
    }

    async function updateDoc() {
        const editor = document.querySelector('trix-editor');
        let content = editor.innerHTML;
        await docsModel.saveDoc(content, currentDoc);
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
                <TrixEditor class="trix-content" onChange={handleChangeText} placeholder="Write here..."/>
            </div>
        </div>
    )
};

export default Documents;