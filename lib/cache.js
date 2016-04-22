(function() {
    'use strict';

    let nodeCache = require('node-cache');

    // constants
    const CACHE_TTL_DEFAULT = 3600;
    const CACHE_CHECK_PERIOD = 600;

    exports.createCache = () => {
        // simple in-memory caching
        let myCache = new nodeCache({
            stdTTL: CACHE_TTL_DEFAULT,
            checkperiod: CACHE_CHECK_PERIOD
        });
        return myCache;
    };

})();