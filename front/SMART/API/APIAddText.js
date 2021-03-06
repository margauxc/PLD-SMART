import baseUrl from './BaseUrl'
import { depositArtwork } from '../API/APIDeposit'


export function sendText(title, text, name) {

    const APIbaseURL = baseUrl
    var url = APIbaseURL + 'artworks/text'

    return fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": title,
            "author": name,
            "text": text,
        }),
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json.ArtworkId
    }).catch((error) => {
        console.log(error)
    })
    
}