/*
 * GET home page.
 */
exports.mysqltest = function(req, res){
  res.render('mysqltest', { title: 'MySQL Test' });
};