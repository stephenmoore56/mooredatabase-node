// static content controller
exports.nodejs = function(req, res){
	res.render('static-content/nodejs', { title: 'Node.js' });
};