import React from 'react';
import html2pdf from 'html2pdf.js';

function Pdf({ currentDoc }) {

    function createPdf() {
        const title = currentDoc.title;
        const text = currentDoc.text;
        const plainText = document.createElement('div');
        plainText.innerHTML = text;

        const content = `
            <html>
                <body>
                    <div class="pdf-title">${title}</div>
                    <div class="pdf-text">${text}</div>
                </body>
            </html>
        `;

        html2pdf()
        .from(content)
        .output('dataurlnewwindow');
    }

    return (
        <button className="Save" onClick={createPdf}>
            Create PDF
        </button>
    );
}

export default Pdf;
