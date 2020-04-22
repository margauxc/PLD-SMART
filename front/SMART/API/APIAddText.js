export function sendText(text, name) {
    const APIbaseURL = 'http://192.168.0.22:3000/api/'
    var url = APIbaseURL + 'artworks/text'
    return fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": "anonymous",
            "author": name,
            "text": text,
        }),
    })
        .then((response) => { return response.json() })
        .then((json) => {
            console.log("envoyé")

            return json
        })
        .catch((error) => { console.log(error) })
}