import baseUrl from './BaseUrl'

export function getArtworkDeposits() {

    const url = baseUrl + "artworkDeposits"

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