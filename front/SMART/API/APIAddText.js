import baseUrl from './BaseUrl'

export function sendText(text, name) {

    const APIbaseURL = baseUrl
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
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json
    }).catch((error) => {
        console.log(error)
    })
    
}