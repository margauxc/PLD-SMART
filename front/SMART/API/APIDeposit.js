import baseUrl from './BaseUrl'

export function depositArtwork(artworkId) {
    const url = baseUrl + 'artworkDeposits'
    return fetch(url, {
        method : 'POST',
        headers : {
            'accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            "artworkId" : artworkId,
            "lat" : "350",
            "long" : "4"
        }),
    }).then((response) => {
        return response
    }).catch((error) => console.log(error)) //à gérer 
}