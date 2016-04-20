(function() {
    'use strict';
    let db = require('../lib/mysqlDatabase.js');

    // exported actions for controller
    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };

    exports.ordersjson = (req, res) => {
        db.executeSQL(req, res, "CALL proc_listSpeciesByOrder();");
    };

    exports.monthsjson = (req, res) => {
        db.executeSQL(req, res, "CALL proc_listSpeciesByMonth();");
    };

    exports.yearsjson = (req, res) => {
        db.executeSQL(req, res, "CALL proc_listSpeciesByYear();");
    };

    exports.speciesjson = (req, res) => {
        db.executeSQL(req, res, "CALL proc_listSpeciesAll();");
    };

    exports.detailjson = (req, res) => {
        // note template string
        let id = parseInt(req.params.id);
        db.executeSQL(req, res, `CALL proc_getSpecies2(${id});`);
    };

    exports.detailmonthsjson = (req, res) => {
        // note template string
        let id = parseInt(req.params.id);
        db.executeSQL(req, res, `CALL proc_listMonthsForSpecies2(${id});`);
    };
})();