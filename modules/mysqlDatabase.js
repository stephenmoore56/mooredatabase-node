exports.connect = function() {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'mooredatabase.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
	  user     : 'birding_readonly',
	  password : 'dY78vNqP37sS94U',
	  database : 'birding'
	});		
	return connection;
};