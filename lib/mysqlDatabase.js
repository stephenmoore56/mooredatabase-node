(function() {
    'use strict';
    exports.getConnection = () => {
        let mysql = require('mysql');
        let connection = mysql.createConnection({
            host: 'mysql57test.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
            user: 'birding_readonly',
            password: 'dY78vNqP37sS94U',
            database: 'birding'
        });
        return connection;
    };
})();