
var { Router } = require('express');
var artworks = require('./routes/artworks')
var deposits = require('./routes/deposits')
// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	artworks(app)
	deposits(app)
	return app
}
