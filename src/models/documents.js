const documents = {
    getAllDocuments: async function getAllDocuments() {
        const response = await fetch(`http://localhost:1337/docs`);
        const result = await response.json();

        return result.data;
    },
};

export default documents;