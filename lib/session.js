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
        console.log(process.env.REDISTOGO_URL);
        if (process.env.REDISTOGO_URL) {
            // we're in production environment
            let redisUrl = url.parse(process.env.REDISTOGO_URL),
                redisAuth = redisUrl.auth.split(':')[1];
            app.set('redisHost', redisUrl.hostname);
            app.set('redisPort', redisUrl.port);
            app.set('redisPass', redisAuth);
        } else {
            // in dev, we can read config information from default.json
            console.log("Using local Redis instance...");
            app.set('redisHost', sessionConfig.redisConfig.host);
            app.set('redisPort', sessionConfig.redisConfig.port);
            app.set('redisDb', sessionConfig.redisConfig.db);
            app.set('redisPass', sessionConfig.redisConfig.pass);
        }

        // start storing sessions in Redis
        app.use(session({
            secret: sessionConfig.secret,
            store: new redisStore({
                host: app.set('redisHost'),
                port: app.set('redisPort'),
                pass: app.set('redisPass'),
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
