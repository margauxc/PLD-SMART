const artworkSB = require('./artwork')
const musicSB = require('./music')
const depositSB = require('./deposit')
const movieSB = require('./movie')

module.exports = {
    artwork : artworkSB,
    music : musicSB,
    movie : movieSB,
    deposit : depositSB
}