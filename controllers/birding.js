// birding controller
exports.orders = function(req, res){
	var mysqlDatabase = require('../lib/mysqlDatabase.js');
	var connection = mysqlDatabase.connect();		
	connection.connect();	
	var	sql = "SELECT \
			  aou_order.order_name, \
			  aou_order.notes AS order_notes, \
			  ( SELECT COUNT(*) \
                FROM \
                aou_list aol2 \
                WHERE \
                aol2.order = aou_order.order_name) AS totalSpecies, \
              COUNT(DISTINCT aou_list.id) AS speciesCount \
              FROM \
			  sighting \
			  INNER JOIN aou_list ON sighting.aou_list_id = aou_list.id \
			  INNER JOIN aou_order ON aou_list.order = aou_order.order_name \
			  GROUP BY aou_order.order_name, aou_order.notes \
			  ORDER BY COUNT(DISTINCT aou_list.id) DESC";
	connection.query(sql, function(err, rows) {
		if (err) {
			res.render('error', { title: 'Database Error', description: 'A database error occurred: ' + err.message });
		} else {
			res.render('birding/orders', { title: 'Species and Sightings By Order', orders: rows });			
		}
	});
	connection.end();
};