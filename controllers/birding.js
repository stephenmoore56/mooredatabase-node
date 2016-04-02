(function() {
    'use strict';
    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };

    // closure allows us to set this once and use in the functions exported
    let mysqlDatabase = require('../lib/mysqlDatabase.js');

    exports.ordersjson = (req, res) => {
        let connection = mysqlDatabase.getConnection();
        let sql = "CALL proc_listSpeciesByOrder();";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                // stored procedure calls return an extra array with metadata
                // we're interested in the first array
                res.json(rows[0]);
            }
        });
        connection.end();
    };

    exports.monthsjson = (req, res) => {
        let connection = mysqlDatabase.getConnection();
        let sql = "CALL proc_listSpeciesByMonth();";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows[0]);
            }
        });
        connection.end();
    };

    exports.yearsjson = (req, res) => {
        let connection = mysqlDatabase.getConnection();
        let sql = "CALL proc_listSpeciesByYear();";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows[0]);
            }
        });
        connection.end();
    };

    exports.speciesjson = (req, res) => {
        let connection = mysqlDatabase.getConnection();
        let sql = "CALL proc_listSpeciesAll();";
        connection.query(sql, (err, rows) => {
            if (err) {
                res.render('error', {
                    title: 'Database Error',
                    description: 'A database error occurred: ' + err.message
                });
            } else {
                res.json(rows[0]);
            }
        });
        connection.end();
    };
})();