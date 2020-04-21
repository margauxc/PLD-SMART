const artworkSB = require('./artwork')
const musicSB = require('./music')
const freeTextSB = require('./freeText')
const depositSB = require('./deposit')

module.exports = {
    artwork : artworkSB,
    music : musicSB,
    freeText : freeTextSB,
    deposit : depositSB
}