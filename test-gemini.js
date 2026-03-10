const api_key = "AIzaSyDehS5Z-iz7-vKq7VCIVAuzTpP4BPrO8EE";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents: [{
            parts: [{ text: 'Hello' }]
        }]
    })
})
    .then(res => res.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("Error:", err);
    });
