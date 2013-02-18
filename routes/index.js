/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Node.js' });
};
exports.mysqltest = function(req, res){
  res.render('mysqltest', { title: 'MySQL Test' });
};