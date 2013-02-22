// static content controller
exports.nodejs = function(req, res){
	res.render('content/nodejs', { title: 'Node.js' });
};