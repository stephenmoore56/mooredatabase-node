(function() {
    'use strict';
    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };
    exports.ordersjson = (req, res) => {
        let mysqlDatabase = require('../lib/mysqlDatabase.js');
        let connection = mysqlDatabase.connect();
        connection.connect();
        let sql = "SELECT \        aou_order.order_name, \        aou_order.notes AS order_notes, \        ( SELECT COUNT(*) \          FROM \          aou_list aol2 \          WHERE \          aol2.order = aou_order.order_name) AS totalSpecies, \        COUNT(DISTINCT aou_list.id) AS speciesCount \        FROM \        sighting \        INNER JOIN aou_list ON sighting.aou_list_id = aou_list.id \        INNER JOIN aou_order ON aou_list.order = aou_order.order_name \        GROUP BY aou_order.order_name, aou_order.notes \        ORDER BY COUNT(DISTINCT aou_list.id) DESC";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows);
            }
        });
        connection.end();
    };
    exports.monthsjson = (req, res) => {
        let mysqlDatabase = require('../lib/mysqlDatabase.js');
        let connection = mysqlDatabase.connect();
        connection.connect();
        let sql = "SELECT \         MONTH(t.trip_date) AS monthNumber, \         MONTHNAME(t.trip_date) AS monthName, \         COUNT(DISTINCT l.id) AS speciesCount, \         COUNT(DISTINCT t.id) AS tripCount \         FROM \         aou_list l \         INNER JOIN sighting s \            ON l.id = s.aou_list_id \         INNER JOIN trip t \            ON s.trip_id = t.id \         GROUP BY \         MONTH(t.trip_date) \         ORDER BY 1";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows);
            }
        });
        connection.end();
    };
    exports.speciesjson = (req, res) => {
        let mysqlDatabase = require('../lib/mysqlDatabase.js');
        let connection = mysqlDatabase.connect();
        connection.connect();
        let sql = "SELECT \        aou_list.id, \        aou_order.order_name, \        aou_list.common_name, \        aou_list.scientific_name, \        aou_list.family, \        aou_list.subfamily, \        COUNT(*) AS sightings, \        MAX(trip.trip_date) AS last_seen, \        MIN(RIGHT(MAKEDATE(YEAR(trip.trip_date),DAYOFYEAR(trip.trip_date)),5)) AS earliestSighting, \        MAX(RIGHT(MAKEDATE(YEAR(trip.trip_date),DAYOFYEAR(trip.trip_date)),5)) AS latestSighting \        FROM \        trip \        INNER JOIN sighting \          ON trip.id = sighting.trip_id \        INNER JOIN aou_list \          ON sighting.aou_list_id = aou_list.id \        INNER JOIN aou_order \          ON aou_list.order = aou_order.order_name \        GROUP BY \        aou_list.id, \        aou_order.order_name, \        aou_list.common_name, \        aou_list.scientific_name, \        aou_list.order, \        aou_list.family, \        aou_list.subfamily";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows);
            }
        });
        connection.end();
    };
})();