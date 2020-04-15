
var { Router } = require('express');
var oneRouter = require('./routes/oneRouter')
// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	oneRouter(app)
	return app
}
