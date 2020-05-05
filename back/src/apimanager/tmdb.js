// doc at https://github.com/dezitter/tmdb-v3 & https://developers.themoviedb.org/3/getting-started/introduction 
const { ErrorHandler } = require('../helpers')
var Logger = require('../loaders/logger');
const {TYPES} = require('../config')
const MovieDB = require('node-themoviedb');
const tmdb = new MovieDB(process.env.TMDB_SECRET);
const API_TYPE = TYPES.MOVIE
const POSTER_BASE = "https://image.tmdb.org/t/p/original"
function convertMovie (movie) {
    console.log(movie)
    var resMovie = {}
    // artwork fields
    resMovie.name = movie.title
    resMovie.database = "tmdb"
    resMovie.category = API_TYPE
    if (movie.release_date != null && movie.release_date.length != 0){
        resMovie.date = movie.release_date
    }
    if (movie.poster_path != null) {
        resMovie.pictureLink = POSTER_BASE+movie.poster_path

    }
    // MOVIE TYEP
    if( movie.overview) {
        resMovie.description = movie.overview
    }
    return resMovie
}
/*
Recherche : titre, realisateur
Detail :
*/

module.exports = {
    type : API_TYPE,
    search : (query)=> {
        return new Promise((resolve,reject) => {
            const params = {
                query : query.rawQuery,
                language : 'en',
                page : 1 
            }
            tmdb.search.movies(params).then((data) => {
                const response = JSON.parse(data.body)
                resolve(response.results.map((movie) => convertMovie(movie)))
            }).catch((err) => {
                Logger.error(err)
                reject(err)
            })
        })
    },
}