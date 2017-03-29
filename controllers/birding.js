(function () {
    'use strict';

    let db = require('../lib/mysql');
    // let MongoClient = require('../lib/mongodb').MongoClient;
    // let MongoUrl = require('../lib/mongodb').MongoUrl;
    // let assert = require('assert');
    let cache = require('../lib/cache');
    let myCache = cache.createCache();
    let HttpStatus = require('http-status-codes');
    const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

    let executeGET = (res, req, sql) => {
        myCache.get(sql, (err, cachedValue) => {
            if (!cachedValue) {
                db.executeSQL(sql, (err, response) => {
                    if (err) {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .set('Content-Type', CONTENT_TYPE_JSON)
                            .json([err]);
                    } else {
                        if (!response.length) {
                            res.status(HttpStatus.NOT_FOUND)
                                .set('Content-Type', CONTENT_TYPE_JSON)
                                .json([]);
                        } else {
                            myCache.set(sql, response);
                            res.status(HttpStatus.OK)
                                .set('Content-Type', CONTENT_TYPE_JSON)
                                .json(response);
                        }
                    }
                });
            } else {
                res.status(HttpStatus.OK)
                    .set('Content-Type', CONTENT_TYPE_JSON)
                    .json(cachedValue);
            }
        });
    };

    exports.clearCache = (req, res) => {
        myCache.flushAll();
        res.status(HttpStatus.OK)
            .set('Content-Type', CONTENT_TYPE_JSON)
            .json([{
                'message': 'Cache cleared.'
            }]);
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

    // exports.testMongoConnect = (req, res) => {
    //     MongoClient.connect(MongoUrl, function (err, db) {
    //         assert.equal(null, err);
    //         console.log("Successfully connected to MongoDB.");
    //     });
    // };

})();
