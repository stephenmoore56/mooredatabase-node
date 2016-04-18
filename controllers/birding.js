(function() {
    'use strict';

    // closure allows us to use these in the functions exported later
    let mysqlDatabase = require('../lib/mysqlDatabase.js');
    let NodeCache = require('node-cache');

    // constants
    const CACHE_TTL_DEFAULT = 3600;
    const CACHE_CHECK_PERIOD = 600;
    const HTTP_STATUS_OK = 200;
    const HTTP_STATUS_NOT_FOUND = 404;
    const HTTP_STATUS_ERROR = 500;

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
                        res.status(HTTP_STATUS_ERROR)
                            .json([err]);
                    } else {
                        let data = rows[0];
                        if (data.length === 0) {
                            // no data returned
                            res.status(HTTP_STATUS_NOT_FOUND)
                                .json([]);
                        } else {
                            myCache.set(sql, data, cacheTtl || CACHE_TTL_DEFAULT);
                            res.status(HTTP_STATUS_OK)
                                .json(data);
                        }
                    }
                });
            } else {
                res.status(HTTP_STATUS_OK)
                    .json(value);
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
        let id = parseInt(req.params.id);
        executeSQL(req, res, `CALL proc_getSpecies2(${id});`);
    };

    exports.detailmonthsjson = (req, res) => {
        let id = parseInt(req.params.id);
        executeSQL(req, res, `CALL proc_listMonthsForSpecies2(${id});`);
    };
})();