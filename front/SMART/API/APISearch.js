
export function searchRequest(query, category = null) {

    const APIbaseURL = 'http://192.168.1.26:3000/api/'
    query = encodeURIComponent(query)
    var url = APIbaseURL + 'artworks?rawQuery='+query
    if(category.length>0) {
        url+='&category='+ encodeURIComponent(category)
    }

    return fetch(url, {
        headers : {
            'accept' : 'application/json'
        }
    })
    .then((response) => {return response.json()})
    .then((json) => {
        return json})
    .catch((error) => {console.log(error)})
    
}