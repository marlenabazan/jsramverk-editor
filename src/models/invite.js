// const baseUrl = "https://jsramverk-editor-mabn21.azurewebsites.net";
const baseUrl = "http://localhost:1337";

const invite = {
    sendEmail: async function sendEmail(token, userToShare, docTitle) {
        const response = await fetch(`${baseUrl}/invite`, {
            body: JSON.stringify({
                recipient: userToShare,
                title: docTitle
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            method: 'POST'
    });
        const result = await response.json();
        console.log("Result: ", result.message);
    }
};

export default invite;
