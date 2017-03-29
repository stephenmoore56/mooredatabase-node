/**
 * Created by stephen on 3/28/17.
 */
(function () {
    'use strict';

    let mongoConfig = require('config').mongoConfig;
    let MongoClient = require('mongodb').MongoClient;
    let MongoUrl = 'mongodb://' +
        mongoConfig.user + ':' +
        mongoConfig.password + '@' +
        mongoConfig.host + ':' +
        mongoConfig.port + '/' +
        mongoConfig.database;

    module.exports = {
        'MongoClient': MongoClient,
        'MongoUrl': MongoUrl
    };

})();