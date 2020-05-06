import baseUrl from './BaseUrl'

export function reportDeposit(depositId, name) {
    const url = baseUrl + 'artworkDeposits/reportDeposit'
    return fetch(url, {
        method : 'POST',
        headers : {
            'accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            "depositId" : depositId,
            "nameReporter" : name,
        }),
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error)
    }) //à gérer 
}