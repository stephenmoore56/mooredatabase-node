(function() {
    'use strict';

    let db = require('../lib/mysql');
    let cache = require('../lib/cache');
    let myCache = cache.createCache();
    let HttpStatus = require('http-status-codes');

    let executeGET = (res, req, sql) => {
        myCache.get(sql, (err, cachedValue) => {
            if (!cachedValue) {
                db.executeSQL(sql, (err, response) => {
                    if (err) {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json([err]);
                    } else {
                        if (!response.length) {
                            res.status(HttpStatus.NOT_FOUND)
                                .json([]);
                        } else {
                            myCache.set(sql, response);
                            res.status(HttpStatus.OK)
                                .json(response);
                        }
                    }
                });
            } else {
                res.status(HttpStatus.OK)
                    .json(cachedValue);
            }
        });
    };

    // exported actions for controller
    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };

    exports.ordersjson = (req, res) => {
        executeGET(res, req, "CALL proc_listSpeciesByOrder();");
    };

    exports.monthsjson = (req, res) => {
        executeGET(res, req, "CALL proc_listSpeciesByMonth();");
    };

    exports.yearsjson = (req, res) => {
        executeGET(res, req, "CALL proc_listSpeciesByYear();");
    };

    exports.speciesjson = (req, res) => {
        executeGET(res, req, "CALL proc_listSpeciesAll();");
    };

    exports.allsightingsjson = (req, res) => {
        executeGET(res, req, "CALL proc_extractAllSightings();");
    };

    exports.detailjson = (req, res) => {
        // note template string
        let id = parseInt(req.params.id);
        executeGET(res, req, `CALL proc_getSpecies2(${id});`);
    };

    exports.detailmonthsjson = (req, res) => {
        // TODO: modify procedure to return no result for invalid id
        // note template string
        let id = parseInt(req.params.id);
        executeGET(res, req, `CALL proc_listMonthsForSpecies2(${id});`);
    };

})();