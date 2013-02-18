/*
 * For the time being, all routing happens here
 */
exports.index = function(req, res){
	res.render('index', { title: 'Node.js' });
};
exports.mysqltest = function(req, res){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'mooredatabase.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
	  user     : 'smoore',
	  password : 'gsnyder56',
	  database : 'birding'
	});		
	connection.connect();
	connection.query('SELECT COUNT(*) AS speciesCount FROM aou_list;', function(err, rows, fields) {
		if (err) throw err;
		var speciesCount = rows[0].speciesCount;
		res.render('mysqltest', { title: 'MySQL Test', speciesCount: speciesCount });	  
	});
	connection.end();
};