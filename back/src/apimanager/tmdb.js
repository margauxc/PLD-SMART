// doc at https://github.com/dezitter/tmdb-v3 & https://developers.themoviedb.org/3/getting-started/introduction 
const { ErrorHandler } = require('../helpers')
var Logger = require('../loaders/logger');
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
    resMovie.pictureLink = movie.poster_path

    // movie fields
    // todo deal with no description
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
        return new Promise((resolve,reject) => {
            tmdb.searchMovie(query.rawQuery, { page : 1 }).then((data) => {
                const response = JSON.parse(data.body)
                resolve(response.results.map((movie) => convertMovie(movie)))
            }).catch((err) => {
                Logger.error(err)
                reject(err)
            })
        })
    },
}