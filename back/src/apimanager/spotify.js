const https = require("https")

const baseUrl = "https://api.spotify.com/v1";
const accessToken = "myToken";
const nbreLimit = 1;

var res = {
    id : null,
    name : null,
    uri : null,
    preview_url: null,
    artist : null,
    album : null,
    description : null
}

var options = {
    hostname: baseUrl,
    path: null,
    method: null,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
    }
}

module.exports = {
    type : 'music',

    getTrack : (id) => {
        return new Promise(async (resolve, reject) => {
            options.path = "/tracks/{"+id+"}"
            options.method="GET"
            https.request(options, (responseJson) => {
                
                responseJson.on('end', () => {
                    //renvoyer les data ici
                    let response = JSON.parse(data);
                    res.name = response.name;
                    res.uri = response.uri;
                    res.preview_url = response.preview_url;
                    res.album = response.album.name;
                    res.artist = response.artist.name;
                    resolve(res);
                });
            }).on("error", (err) => {
                reject(err.message);
                })
        })
    },

// GET https://api.spotify.com/v1/search --> search
//! Encode spaces with the hex code %20 or +
    getSearch : (query, type) => {
        return new Promise(async (resolve, reject) => {
            options.path = "/search?q="+query+"&type=track,album,artist&limit="+nbreLimit
            options.method="GET"
            https.request(options, (responseJson) => {
                responseJson.on('end', () => {
                    //TODO : renvoyer les data ici --> array ? forEach ?
                    // For each type provided in the type parameter, the response body contains an array of  : 
                    //artist objects / simplified album objects / track objects / simplified show objects / simplified episode objects wrapped in a paging object in JSON.
                    var response = JSON.parse(data);
                    resolve(response)
                });
            }).on("error", (err) => {
                reject(err.message);
                })
       })
    }
}