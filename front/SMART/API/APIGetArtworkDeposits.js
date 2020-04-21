export function getArtworkDeposits() {
    return fetch('http://10.0.2.2:3000/api/artworkDeposits', {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json
    }).catch((error) => {
        console.error(error)
    })
}