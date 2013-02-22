// index or root controller
exports.index = function(req, res){
	res.render('content/nodejs', { title: 'Node.js' });
};