const artworkSB = require('./artwork')
const musicSB = require('./music')
const freeTextSB = require('./freeText')
const depositSB = require('./deposit')
const museumSB = require('./museum')
const movieSB = require('./movie')

module.exports = {
    artwork : artworkSB,
    music : musicSB,
    freeText : freeTextSB,
    deposit : depositSB,
    museum : museumSB,
    movie : movieSB,
}