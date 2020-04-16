
var { Router } = require('express');
var artworks = require('./routes/artworks')
// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	artworks(app)
	return app
}
