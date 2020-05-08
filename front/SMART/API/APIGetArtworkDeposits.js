import baseUrl from './BaseUrl'

export function getArtworkDeposits(lat, long, distance) {

    const url = baseUrl + "artworkDeposits"

    return fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        parameters: JSON.stringify({
            "lat": lat,
            "long": long,
            "distance": distance
        })
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json
    }).catch((error) => {
        console.log(error)
    })

}

export function getArtworkDeposit(id) {

    const url = baseUrl + "artworkDeposits/" + id

    return fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json
    }).catch((error) => {
        console.log(error)
    })

}