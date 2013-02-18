/*
 * GET home page.
 */
exports.index = function(req, res){
	res.render('index', { title: 'Node.js' });
};
exports.mysqltest = function(req, res){
	var express	   = require('express');
	var mysql      = require('mysql');
	var app		   = express();
	if (app.settings.env === 'development') {
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'gsnyder56',
		  database : 'birding'
		});		
	} else {
		// production system
		var connection = mysql.createConnection({
		  host     : 'mooredatabase.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
		  user     : 'smoore',
		  password : 'gsnyder56'
		});				
	}
	connection.connect();
	connection.query('SELECT COUNT(*) AS speciesCount FROM aou_list;', function(err, rows, fields) {
		if (err) throw err;
		var speciesCount = rows[0].speciesCount;
		res.render('mysqltest', { title: 'MySQL Test', speciesCount: speciesCount });	  
	});
	connection.end();
};