_ = require('underscore');
module.exports = function(app) {
	// controllers
	var controllers = require('../controllers');
	var content = _.extend(require('../controllers/static-content'));
	controllers.content = content;
	var birding = _.extend(require('../controllers/birding'));
	controllers.birding = birding;
	
	// routes to controllers
	app.get('/', controllers.content.nodejs);
	app.get('/content', controllers.content.nodejs);
	app.get('/content/nodejs', controllers.content.nodejs);
	app.get('/birding', controllers.birding.orders);
	app.get('/birding/orders', controllers.birding.orders);
}