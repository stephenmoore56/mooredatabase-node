(function() {
    'use strict';

    let config = require('config'),
        dbConfig = config.dbConfig;
    let nodeCache = require('node-cache');
    let mysql = require('mysql');

    // constants
    const CACHE_TTL_DEFAULT = 600;
    const CACHE_CHECK_PERIOD = 600;
    const HTTP_STATUS_OK = 200;
    const HTTP_STATUS_NOT_FOUND = 404;
    const HTTP_STATUS_ERROR = 500;

    // simple in-memory caching
    let myCache = new nodeCache({
        stdTTL: CACHE_TTL_DEFAULT,
        checkperiod: CACHE_CHECK_PERIOD
    });

    // use a connection pool
    let pool = mysql.createPool({
        connectionLimit: dbConfig.connectionLimit,
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        debug: dbConfig.debug
    });

    exports.executeSQL = (req, res, sql, cacheTtl) => {
        myCache.get(sql, (err, value) => {
            if (value === undefined) {
                pool.getConnection(function(err, connection) {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            res.status(HTTP_STATUS_ERROR)
                                .json([err]);
                        } else {
                            let data = rows[0];
                            if (data.length === 0) {
                                res.status(HTTP_STATUS_NOT_FOUND)
                                    .json([]);
                            } else {
                                if (cacheTtl === undefined) {
                                    cacheTtl = CACHE_TTL_DEFAULT;
                                }
                                myCache.set(sql, data, cacheTtl);
                                res.status(HTTP_STATUS_OK)
                                    .json(data);
                            }
                        }
                        connection.release();
                    });
                });

            } else {
                res.status(HTTP_STATUS_OK)
                    .json(value);
            }
        });
    };

})();
