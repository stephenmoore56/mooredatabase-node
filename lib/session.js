(function() {
    'use strict';

    let config = require('config'),
        sessionConfig = config.sessionConfig;
    let url = require('url');
    let redis = require("redis"),
        session = require('express-session'),
        redisStore = require('connect-redis')(session),
        client = redis.createClient();

    module.exports = (app) => {

        // in production, redis configuration should be parsed at startup
        // from environment variable REDISTOGO_URL
        if (process.env.REDISTOGO_URL) {
            // we're in production environment
            let redisUrl = url.parse(process.env.REDISTOGO_URL);
            app.set('redisHost', redisUrl.hostname);
            app.set('redisPort', redisUrl.port);
        } else {
            // in dev, we can read config information from default.json
            console.log("Using local Redis instance...");
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
