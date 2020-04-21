// doc at https://github.com/dezitter/tmdb-v3 & https://developers.themoviedb.org/3/getting-started/introduction 
const { ErrorHandler } = require('../helpers')
var Logger = require('../loaders/logger');
const {TYPES} = require('../config')
const Tmdb = require('tmdb-v3');
const tmdb = new Tmdb({ apiKey: process.env.TMDB_SECRET });
const API_TYPE = TYPES.MOVIE
const POSTER_BASE = "https://image.tmdb.org/t/p/original"
function convertMovie (movie) {
    var resMovie = {}
    // artwork fields
    resMovie.name = movie.title
    resMovie.database = "tmdb"
    resMovie.category = API_TYPE
    if (movie.poster_path != null) {
        resMovie.pictureLink = POSTER_BASE+movie.poster_path

    }
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
        return new Promise((resolve,reject) => {
            tmdb.searchMovie(query.rawQuery, {
                 language : 'fr',
                 page : 1 }
                 ).then((data) => {
                const response = JSON.parse(data.body)
                resolve(response.results.map((movie) => convertMovie(movie)))
            }).catch((err) => {
                Logger.error(err)
                reject(err)
            })
        })
    },
}