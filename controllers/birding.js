// Generated by CoffeeScript 1.6.1
(function() {
  var auth;

  auth = require('../lib/auth');

  exports.orders = function(req, res) {
    var connection, mysqlDatabase, sql;
    auth.ssl_required(req, res, false);
    mysqlDatabase = require('../lib/mysqlDatabase.js');
    connection = mysqlDatabase.connect();
    connection.connect();
    sql = "SELECT \			  aou_order.order_name, \			  aou_order.notes AS order_notes, \			  ( SELECT COUNT(*) \                FROM \                aou_list aol2 \                WHERE \                aol2.order = aou_order.order_name) AS totalSpecies, \              COUNT(DISTINCT aou_list.id) AS speciesCount \              FROM \			  sighting \			  INNER JOIN aou_list ON sighting.aou_list_id = aou_list.id \			  INNER JOIN aou_order ON aou_list.order = aou_order.order_name \			  GROUP BY aou_order.order_name, aou_order.notes \			  ORDER BY COUNT(DISTINCT aou_list.id) DESC";
    connection.query(sql, function(err, rows) {
      if (err) {
        res.render('error', {
          title: 'Database Error',
          description: 'A database error occurred: ' + err.message
        });
      } else {
        res.render('birding/orders', {
          title: 'Species and Sightings By Order',
          orders: rows
        });
      }
    });
    connection.end();
  };

  exports.ordersajax = function(req, res) {
    var connection, mysqlDatabase, sql;
    auth.ssl_required(req, res, false);
    mysqlDatabase = require('../lib/mysqlDatabase.js');
    connection = mysqlDatabase.connect();
    connection.connect();
    sql = "SELECT \			  aou_order.order_name, \              COUNT(DISTINCT aou_list.id) AS speciesCount \              FROM \			  sighting \			  INNER JOIN aou_list ON sighting.aou_list_id = aou_list.id \			  INNER JOIN aou_order ON aou_list.order = aou_order.order_name \			  GROUP BY aou_order.order_name \			  ORDER BY COUNT(DISTINCT aou_list.id) DESC";
    connection.query(sql, function(err, rows) {
      if (err) {
        res.render('error', {
          title: 'Database Error',
          description: 'A database error occurred: ' + err.message
        });
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(rows));
      }
    });
    connection.end();
  };

  exports.months = function(req, res) {
    auth.ssl_required(req, res, false);
    res.render('birding/months', {
      title: 'Bird Species and Sightings by Month'
    });
  };

}).call(this);
