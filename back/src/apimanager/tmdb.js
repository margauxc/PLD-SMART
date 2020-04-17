// doc at https://github.com/dezitter/tmdb-v3 & https://developers.themoviedb.org/3/getting-started/introduction 
const { ErrorHandler } = require('../helpers')
const {TYPES} = require('../config')
const Tmdb = require('tmdb-v3');
const tmdb = new Tmdb({ apiKey: process.env.TMDB_SECRET });

const API_TYPE = TYPES.MOVIE

function convertMovie (movie) {
    var resMovie = {}
    // artwork fields
    resMovie.name = movie.title
    resMovie.database = "tmdb"
    resMovie.category = API_TYPE

    // movie fields
    resMovie.image = movie.poster_path
    resMovie.description = movie.overview
    return resMovie
}
/*
Recherche : titre, realisateur
Detail :
*/

module.exports = {
    type : API_TYPE,
    getMovie : (id) => {
        return new Promise((resolve,reject) => {
            tmdb
                .movieDetails(id)
                .then((data) => {
                    console.log(data)
                    //TODO read and select
                    resolve(data)
                })
                .error((err) => {
                    console.log(err.message)
                })
        })
    },
    search : (query)=> {
        return new Promise(async (resolve,reject) => {
            const data = await tmdb
                                    .searchMovie(query, {page : 3})
                                    .then(response => {
                                        console.log(response.body);
                                        //TODO do the response
                                    });;
            resolve(data.movies.items.map((movie) => convertMovie(movie)))
        })
    },
}