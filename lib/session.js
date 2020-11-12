(function() {
    'use strict';

    let sessionConfig = require('config')
        .sessionConfig;
    let url = require('url');
    let session = require('express-session'),
        redisStore = require('connect-redis')(session),
        redis = require('redis'),
        client = redis.createClient();

    module.exports = (app) => {
        if (process.env.REDISTOGO_URL) {
            // we're in production environment
            let redisUrl = url.parse(process.env.REDISTOGO_URL);
            let client = redis.createClient(redisUrl.port, redisUrl.hostname);
            console.log(redisUrl.auth.split(":")[1]);
            client.auth(redisUrl.auth.split(":")[1]);
        } else {
            // in dev, we can read config information from default.json
            console.log("Using local Redis instance...");
        }

        // in production, redis configuration should be parsed at startup
        // from environment variable REDISTOGO_URL
        if (process.env.REDISTOGO_URL) {
            // we're in production environment
            app.set('redisHost', redisUrl.hostname);
            app.set('redisPort', redisUrl.port);
        } else {
            // in dev, we can read config information from default.json
            app.set('redisHost', sessionConfig.redisConfig.host);
            app.set('redisPort', sessionConfig.redisConfig.port);
        }

        // start storing sessions in Redis
        app.use(session({
            secret: sessionConfig.secret,
            store: new redisStore({
                host: app.set('redisHost'),
                port: app.set('redisPort'),
                client: client,
                ttl: sessionConfig.redisConfig.ttl
            }),
            saveUninitialized: sessionConfig.saveUninitialized,
            resave: sessionConfig.resave,
            cookie: {
                maxAge: sessionConfig.cookie.maxAge
            }
        }));

    };
})();
