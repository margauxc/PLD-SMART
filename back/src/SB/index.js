const artworkSB = require('./artwork')
const musicSB = require('./music')
const freeTextSB = require('./freeText')
const depositSB = require('./deposit')
const movieSB = require('./movie')

module.exports = {
    artwork : artworkSB,
    music : musicSB,
    freeText : freeTextSB,
    movie : movieSB,
    deposit : depositSB
}