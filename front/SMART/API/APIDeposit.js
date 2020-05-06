import baseUrl from './BaseUrl'
import DefaultPreferences from 'react-native-default-preference'

export function depositArtwork(artworkId, position) {
    const url = baseUrl + 'artworkDeposits'
    return new Promise((resolve,reject) => {
        DefaultPreferences.get('username').then((username) => {
            fetch(url, {
                method : 'POST',
                headers : {
                    'accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    "artworkId" : artworkId,
                    "lat" : position.coords.latitude,
                    "long" : position.coords.longitude,
                    "owner" : username
                }),
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                console.log(error)
            })
        })
    }) 
}