import baseUrl from './BaseUrl'

export function searchRequest(query, category = null) {

    const APIbaseURL = baseUrl
    query = encodeURIComponent(query)
    var url = APIbaseURL + 'artworks?rawQuery=' + query

    if(category.length>0) {
        url += '&category=' + encodeURIComponent(category)
    }

    return fetch(url, {
        headers : {
            'accept' : 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json
    }).catch((error) => {
        console.log(error)
    })

}