(function() {
    'use strict';

    // closure allows us to use these in the functions exported later
    let mysqlDatabase = require('../lib/mysqlDatabase.js');
    let NodeCache = require('node-cache');
    const CACHE_TTL_DEFAULT = 3600;
    const CACHE_CHECK_PERIOD = 600;
    let myCache = new NodeCache({
        stdTTL: CACHE_TTL_DEFAULT,
        checkperiod: CACHE_CHECK_PERIOD
    });
    let executeSQL = (req, res, sql, cacheTtl) => {
        let connection = mysqlDatabase.getConnection();
        myCache.get(sql, (err, value) => {
            if (value === undefined) {
                connection.query(sql, (err, rows) => {
                    if (err) {
                        res.json({
                            errors: [err]
                        });
                    } else {
                        myCache.set(sql, rows, cacheTtl || CACHE_TTL_DEFAULT);
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
        executeSQL(req, res, "CALL proc_getSpecies2(" + parseInt(id) + ");");
    };

    exports.detailmonthsjson = (req, res) => {
        let id = req.params.id;
        executeSQL(req, res, "CALL proc_listMonthsForSpecies2(" + parseInt(id) + ");");
    };
})();