export function searchRequest(query, category = null) {
    query = encodeURIComponent(query)
    var url = 'http://localhost:3000/api/artworks?rawQuery='+query
    if(category != 'all') {
        url+='&category='+ encodeURIComponent(category)
    }
    fetch(url, {
        method : 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((json) => {return json})
    .catch((error) => {console.log(error)})
    
}