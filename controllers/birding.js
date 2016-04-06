(function() {
    'use strict';

    // closure allows us to set these once and use in the functions exported
    let mysqlDatabase = require('../lib/mysqlDatabase.js');
    let NodeCache = require('node-cache');
    let myCache = new NodeCache({
        stdTTL: 3600,
        checkperiod: 120
    });
    let executeSQL = (req, res, sql) => {
        let connection = mysqlDatabase.getConnection();
        myCache.get(sql, (err, value) => {
            if (value === undefined) {
                // key not found; execute query and put
                // result in cache
                connection.query(sql, (err, rows) => {
                    if (err) {
                        res.json({
                            errors: [err]
                        });
                    } else {
                        myCache.set(sql, rows);
                        res.json(rows[0]);
                    }
                });
            } else {
                res.json(value[0]);
            }
        });
        connection.end();
    };

    // exported actions for controller
    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };

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

    exports.detailjson = (req, res) => {
        let id = req.params.id;
        executeSQL(req, res, "CALL proc_getSpecies2(" + id + ");");
    };

    exports.detailmonthsjson = (req, res) => {
        let id = req.params.id;
        executeSQL(req, res, "CALL proc_listMonthsForSpecies2(" + id + ");");
    };
})();