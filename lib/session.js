(function() {
    'use strict';

    let sessionConfig = require('config')
        .sessionConfig;
    let url = require('url');
    let session = require('express-session'),
        redisStore = require('connect-redis')(session);

        if (process.env.REDISTOGO_URL) {
            // we're in production environment
            let redisUrl = url.parse(process.env.REDISTOGO_URL);
            let client = require("redis").createClient(redisUrl.port, redisUrl.hostname);
            client.auth(redisUrl.auth.split(":")[1]);
        } else {
            // in dev, we can read config information from default.json
            console.log("Using local Redis instance...");
            let client = require("redis").createClient();
        }

    module.exports = (app) => {

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
