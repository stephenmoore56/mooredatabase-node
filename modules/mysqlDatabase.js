exports.connect = function() {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'mooredatabase.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
	  user     : 'smoore',
	  password : 'gsnyder56',
	  database : 'birding'
	});		
	return connection;
};