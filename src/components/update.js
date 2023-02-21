import { useState, useEffect } from 'react';
import { TrixEditor } from "react-trix";
import { io } from "socket.io-client";

import '../style/App.css';

import docsModel from '../models/documents';
import shareModel from '../models/invite';

import Create from "./create";
import Pdf from "./pdf";


function Documents({userEmail, token}) {
    const [documents, setDocuments] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});
    const [text, setText] = useState("");
    const [socket, setSocket] = useState(null);
    const [newDoc, setNewDoc] = useState(false);
    const [share, setShare] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [pdf, setPdf] = useState(false);

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
            let allDocuments = await docsModel.getAllDocuments(token);
            allDocuments = allDocuments.documents;
            setDocuments(allDocuments.filter(doc => doc.userId === userEmail || (doc.shared && doc.shared.includes(userEmail))));
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
        setContent(oneDocument.text);
        socket.emit("create", oneDocument["_id"]);
        // console.log(socket.emit("create", oneDocument["_id"]));
        setPdf(true);

        if (share) {
            setShowShare(false);
        } else {
            setShowShare(true);
        }
        
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
        const docToUpdate = { _id: currentDoc._id, text: content };
        await docsModel.updateDoc(docToUpdate);
    }

    const handleCreateDoc = () => {
        setNewDoc(true)
    }

    if (newDoc) {
        return (
            <Create userEmail={userEmail} token={token}/>
        )
    }

    const handleShare = () => {
        setShowShare(false);
        setShare(true);
    }

    async function shareWithUser() {
        const userToShare = document.getElementById("userToShare").value;
        await docsModel.shareDoc(currentDoc._id, userToShare);
        await shareModel.sendEmail(token, userToShare, currentDoc.title);
    }

    return (
        <div className="App">

            <div className="SaveDiv">
                <select id="docSelect"
                    onChange={handleChangeSelect}
                >
                    <option value="-99" key="0">Choose a document</option>
                    {documents.map((doc, index) => <option value={doc._id} key={index}>{doc.title}</option>)}
                </select>

                <button className="Save" onClick={updateDoc}>Save</button>
                <button className="Save" onClick={handleCreateDoc}>Create new document instead</button>

                {showShare ? (
                    <button className="Save" onClick={handleShare}>Share document</button>
                ) : (
                    null
                )}

                {share ? (
                    <div>
                        <input id="userToShare" placeholder="Users e-mail"/>
                        <button className="Save" onClick={shareWithUser}>Share and send invite</button>
                    </div>
                ) : (
                    null
                )}

                {pdf ?
                    <Pdf currentDoc={currentDoc}/>
                : 
                null
                }

            </div>

            <div className="Editor">
                <TrixEditor class="trix-content" onChange={handleChangeText} placeholder="Write here..."/>
            </div>
        </div>
    )
};

export default Documents;