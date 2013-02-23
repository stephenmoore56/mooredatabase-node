// index or root controller
exports.index = function(req, res){
	res.render('static-content/nodejs', { title: 'Node.js' });
};