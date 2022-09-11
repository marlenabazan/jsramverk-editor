import { useState, useEffect } from 'react';

import docsModel from '../models/documents';



function Documents() {
    const [documents, setDocuments] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});

    useEffect(() => {
        (async () => {
            const allDocuments = await docsModel.getAllDocuments();
            setDocuments(allDocuments);
        })([currentDoc]);
    }, []);

    return (
        <select
            // onChange={fetchDoc}
        >
            <option value="-99" key="0">Choose a document</option>
            {documents.map((doc, index) => <option value={index} key={index}>{doc.title}</option>)}
        </select>
    )
};

export default Documents;