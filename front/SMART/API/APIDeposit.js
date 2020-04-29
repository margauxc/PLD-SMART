import baseUrl from './BaseUrl'

export function depositArtwork(artworkId, position) {
    const url = baseUrl + 'artworkDeposits'
    return fetch(url, {
        method : 'POST',
        headers : {
            'accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            "artworkId" : artworkId,
            "lat" : position.coords.latitude,
            "long" : position.coords.longitude
        }),
    }).then((response) => {
        return response
    }).catch((error) => console.log(error)) //à gérer 
}