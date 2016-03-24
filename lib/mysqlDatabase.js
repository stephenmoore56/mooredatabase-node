(function() {
  exports.connect = function() {
    var connection, mysql;
    mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'mysql57test.cd02yxrr7fxm.us-east-1.rds.amazonaws.com',
      user: 'birding_readonly',
      password: 'dY78vNqP37sS94U',
      database: 'birding'
    });
    return connection;
  };

})();
