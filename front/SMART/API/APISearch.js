
export function searchRequest(query, category = null) {

    const APIbaseURL = 'http://127.0.0.1:3000/api/'
    query = encodeURIComponent(query)
    var url = APIbaseURL + 'artworks?rawQuery='+query
    if(category != 'all') {
        url+='&category='+ encodeURIComponent(category)
    }

    console.log(url)

    fetch(url)
    .then((response) => response.json())
    .then((json) => {return json})
    .catch((error) => {console.log(error)})
    
}