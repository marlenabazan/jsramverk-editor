const documents = {
    baseUrl: "https://jsramverk-editor-mabn21.azurewebsites.net",

    getAllDocuments: async function getAllDocuments(token) {
        const response = await fetch(`${documents.baseUrl}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({ query: `{ documents { _id title text userId shared } }` })
    });
        const result = await response.json();

        return result.data;
    },
    // getAllDocuments: async function getAllDocuments(token) {
    //     const response = await fetch(`${documents.baseUrl}/docs`, {
    //         headers: {
    //             'x-access-token': token
    //         },
    //         method: 'GET'
    // });
    //     const result = await response.json();

    //     return result.data;
    // },
    getOne: async function getOne(id) {
        const response = await fetch(`${documents.baseUrl}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: `{ document(id: "${id}") { _id title text userId shared } }` })
    });
        const result = await response.json();

        return result.data.document;
    },
    // getOne: async function getOne(id) {
    //     const response = await fetch(`${documents.baseUrl}/docs/${id}`);
    //     const result = await response.json();

    //     return result.data;
    // },
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
    shareDoc: async function shareDoc(docToShare, userToShare) {
        const response = await fetch(`${documents.baseUrl}/docs/share`, {
            body: JSON.stringify({
                _id: docToShare,
                user: userToShare
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
    });
        const result = await response.json();
        console.log("Shared document: ", result.data);
    }
};

export default documents;
