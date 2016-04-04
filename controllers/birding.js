(function() {
    'use strict';

    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };

    // closure allows us to set these once and use in the functions exported
    let mysqlDatabase = require('../lib/mysqlDatabase.js');
    let executeSQL = (req, res, sql) => {
        let connection = mysqlDatabase.getConnection();
        connection.query(sql, (err, rows) => {
            if (err) {
                res.json({
                    errors: [err]
                });
            } else {
                res.json(rows[0]);
            }
        });
        connection.end();
    };

    // exported actions for controller
    exports.ordersjson = (req, res) => {
        executeSQL(req, res, "CALL proc_listSpeciesByOrder();");
    };

    exports.monthsjson = (req, res) => {
        executeSQL(req, res, "CALL proc_listSpeciesByMonth();");
    };

    exports.yearsjson = (req, res) => {
        executeSQL(req, res, "CALL proc_listSpeciesByYear();");
    };

    exports.speciesjson = (req, res) => {
        executeSQL(req, res, "CALL proc_listSpeciesAll();");
    };
})();