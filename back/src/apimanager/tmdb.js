// doc at https://github.com/dezitter/tmdb-v3 & https://developers.themoviedb.org/3/getting-started/introduction 
const { ErrorHandler } = require('../helpers')
var Logger = require('../loaders/logger');
const {TYPES} = require('../config')
const tmdb = require('moviedb')(process.env.TMDB_SECRET);
const API_TYPE = TYPES.MOVIE
const POSTER_BASE = "https://image.tmdb.org/t/p/original"
function convertMovie (movie) {
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
    // MOVIE TYPE
    var director = movie.crew.filter((item) => {
        return (item.job == "Director")
    })
    if (director.length != 0){
        resMovie.director = director[0].name
    }
    var selectedVideosResults = movie.resultsVideos.filter((item) => {
        return (item.site=="YouTube" && (item.type=="Teaser" || item.type == "Trailer"))
    })
    if (selectedVideosResults.length != 0){
        resMovie.url = "https://www.youtube.com/watch?v=:key".replace(":key",selectedVideosResults[0].key)
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
    search : (query)=> {
        return new Promise((resolve,reject) => {
            const params = {
                query : query.rawQuery,
                language : 'en',
                page : 1 
            }
            tmdb.searchMovie(params, async (err,data) => {
                const interResults = data.results.slice(0,5)
                const res =  await Promise.all(interResults.map((movie) => {
                    return new Promise( (resolveIn,rejectIn) => {
                        tmdb.movieCredits({id : movie.id}, (err, credits) => {
                            var fullMovie = {...movie,...credits}
                            tmdb.movieVideos({id : movie.id}, (err, videos) => {
                                fullMovie.resultsVideos = videos.results
                                resolveIn(convertMovie(fullMovie))
                            })
                        })
                    })
                }))
                resolve(res)
            })
        })
    },
}