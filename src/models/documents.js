const documents = {
    baseUrl: "https://jsramverk-editor-mabn21.azurewebsites.net",

    getAllDocuments: async function getAllDocuments(token) {
        const response = await fetch(`${documents.baseUrl}/docs`, {
            headers: {
                'x-access-token': token
            },
            method: 'GET'
    });
        const result = await response.json();

        return result.data;
    },
    getOne: async function getOne(id) {
        const docSelect = document.getElementById("docSelect");
        const response = await fetch(`${documents.baseUrl}/docs/${docSelect.value}`);
        const result = await response.json();

        return result.data;
    },
    createDoc: async function createDoc(newDocument) {
        const response = await fetch(`${documents.baseUrl}/docs`, {
            body: JSON.stringify(newDocument),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
    });

        const result = await response.json();
        console.log("Created document: ", result.data);
    },
    updateDoc: async function updateDoc(docToUpdate) {
        const response = await fetch(`${documents.baseUrl}/docs/update`, {
            body: JSON.stringify(docToUpdate),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
    });
        const result = await response.json();
        console.log("Updated document: ", result.data);
    },
    saveDoc: async function saveDoc(content, docToSaveId) {
        console.log("content: ", content);
        console.log("doc to save: ", docToSaveId);
        const response = await fetch(`${documents.baseUrl}/docs`, {
            body: JSON.stringify({
                _id: docToSaveId,
                text: content
              }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
        const result = await response.json();
        console.log("Updated document: ", result.data);
    }
};

export default documents;
