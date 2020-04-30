import baseUrl from './BaseUrl'
import { depositArtwork } from '../API/APIDeposit'


export function sendText(title, text, name, nav, position) {

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
        depositArtwork(json.ArtworkId, position).then(nav.navigate('Home'))
        //return json
    }).catch((error) => {
        console.log(error)
    })
    
}