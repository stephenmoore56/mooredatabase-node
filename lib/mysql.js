(function() {
    'use strict';

    let config = require('config'),
        dbConfig = config.dbConfig;
    let mysql = require('mysql');

    // use a connection pool
    let pool = mysql.createPool({
        connectionLimit: dbConfig.connectionLimit,
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        debug: dbConfig.debug
    });

    exports.executeSQL = (sql, cb) => {
        pool.getConnection(function(err, connection) {
            connection.query(sql, (err, rows) => {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, rows[0]);
                }
                connection.release();
            });
        });
    };

})();