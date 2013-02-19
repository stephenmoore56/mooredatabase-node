/*
 * For the time being, all routing happens here
 */
exports.index = function(req, res){
	res.render('index', { title: 'Node.js' });
};
exports.mysqltest = function(req, res){
	var mysqlDatabase      = require('../modules/mysqlDatabase.js');
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
	var connection = mysqlDatabase.connect();		
	connection.connect();
	connection.query(sql, function(err, rows) {
		if (err) throw err;
		res.render('mysqltest', { title: 'Amazon RDS Test', orders: rows });	  
	});
	connection.end();
};