(function () {
    'use strict';

    let MongoClient = require('../lib/mongodb').MongoClient;
    let MongoUrl = require('../lib/mongodb').MongoUrl;
    let MongoDatabase = require('../lib/mongodb').MongoDatabase;
    let HttpStatus = require('http-status-codes');
    const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

    let executeAndReturnJSONResponse = (res, startCollection, pipeline) => {
        MongoClient.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            let db = client.db(MongoDatabase);
            db.collection(startCollection).aggregate(pipeline).toArray(function (err, docs) {
                res.status(HttpStatus.OK)
                    .set('Content-Type', CONTENT_TYPE_JSON)
                    .json(docs);
            });
        });
    };

    exports.ordersjson = (req, res) => {
        executeAndReturnJSONResponse(res, 'bird', [
            {
                '$lookup': {
                    'from': 'sighting',
                    'localField': 'aou_list_id',
                    'foreignField': 'aou_list_id',
                    'as': 'sighting'
                }
            },
            {'$unwind': '$sighting'},
            {
                '$group': {
                    '_id': '$order_id',
                    'species': {'$addToSet': '$sighting.aou_list_id'},
                    'sightingCount': {'$sum': 1}
                }
            },
            {
                '$lookup': {
                    'from': 'order',
                    'localField': '_id',
                    'foreignField': 'id',
                    'as': 'order'
                }
            },
            {'$unwind': '$order'},
            {
                '$project': {
                    '_id': 0,
                    'id': '$_id',
                    'order_name': '$order.order_name',
                    'order_notes': '$order.notes',
                    'order_species_count_all': '$order.order_species_count_all',
                    'speciesCount': {'$size': '$species'},
                    'sightingCount': '$sightingCount'
                }
            },
            {'$sort': {speciesCount: -1}}
        ]);
    };

    exports.monthsjson = (req, res) => {
        executeAndReturnJSONResponse(res, 'time', [
            {
                '$lookup': {
                    'from': 'sighting',
                    'localField': 'sighting_date',
                    'foreignField': 'sighting_date',
                    'as': 'sighting'
                }
            },
            {'$unwind': '$sighting'},
            {
                '$group': {
                    '_id': '$monthNumber',
                    'species': {'$addToSet': '$sighting.aou_list_id'},
                    'trips': {'$addToSet': '$sighting.trip_id'},
                    'sightingCount': {'$sum': 1}
                }
            },
            {
                '$lookup': {
                    'from': 'month',
                    'localField': '_id',
                    'foreignField': 'monthNumber',
                    'as': 'month'
                }
            },
            {'$unwind': '$month'},
            {
                '$project': {
                    '_id': 0,
                    'monthNumber': '$_id',
                    'monthName': '$month.monthName',
                    'monthLetter': '$month.monthLetter',
                    'speciesCount': {'$size': '$species'},
                    'tripCount': {'$size': '$trips'},
                    'sightingCount': '$sightingCount'
                }
            },
            {'$sort': {monthNumber: 1}}
        ]);
    };

    exports.speciesjson = (req, res) => {
        executeAndReturnJSONResponse(res, 'sighting', [
            {
                '$group': {
                    '_id': '$aou_list_id',
                    'last_seen': {'$max': '$sighting_date'},
                    'sightings': {'$sum': 1}
                }
            },
            {
                '$lookup': {
                    'from': 'bird',
                    'localField': '_id',
                    'foreignField': 'aou_list_id',
                    'as': 'bird'
                }
            },
            {'$unwind': '$bird'},
            {
                '$project': {
                    '_id': 0,
                    'id': '$_id',
                    'sightings': '$sightings',
                    'order_id': '$bird.order_id',
                    'order_name': '$bird.order_name',
                    'order_notes': '$bird.order_notes',
                    'common_name': '$bird.common_name',
                    'scientific_name': '$bird.scientific_name',
                    'family': '$bird.family',
                    'subfamily': '$bird.subfamily',
                    'last_seen': '$last_seen',
                }
            },
            {'$sort': {common_name: 1}}
        ]);
    };

    exports.detailjson = (req, res) => {
        let id = parseInt(req.params.id);
        executeAndReturnJSONResponse(res, 'bird', [
            {'$match': {'aou_list_id': {'$eq': id}}},
            {
                '$lookup': {
                    'from': 'sighting',
                    'localField': 'aou_list_id',
                    'foreignField': 'aou_list_id',
                    'as': 'sighting'
                }
            },
            {
                '$unwind': {
                    'path': '$sighting',
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$group': {
                    '_id': '$aou_list_id',
                    'earliestSighting': {'$max': {'$substr': ['$sighting.sighting_date', 5, 5]}},
                    'latestSighting': {'$max': {'$substr': ['$sighting.sighting_date', 5, 5]}},
                    'first_seen': {'$min': '$sighting.sighting_date'},
                    'last_seen': {'$max': '$sighting.sighting_date'},
                    'trips': {'$addToSet': '$sighting.trip_id'},
                }
            },
            {
                '$lookup': {
                    'from': 'bird',
                    'localField': '_id',
                    'foreignField': 'aou_list_id',
                    'as': 'bird'
                }
            },
            {'$unwind': '$bird'},
            {
                '$project': {
                    '_id': 0,
                    'id': '$_id',
                    'sightings': {'$size': '$trips'},
                    'order_name': '$bird.order_name',
                    'order_notes': '$bird.order_notes',
                    'common_name': '$bird.common_name',
                    'scientific_name': '$bird.scientific_name',
                    'family': '$bird.family',
                    'subfamily': '$bird.subfamily',
                    'first_seen': '$first_seen',
                    'last_seen': '$last_seen',
                    'earliestSighting': '$earliestSighting',
                    'latestSighting': '$latestSighting'
                }
            }
        ]);
    };

    exports.detailmonthsjson = (req, res) => {
        let id = parseInt(req.params.id);
        executeAndReturnJSONResponse(res, 'sighting', [
            {'$match': {'aou_list_id': {'$eq': id}}},
            {
                '$lookup': {
                    'from': 'time',
                    'localField': 'sighting_date',
                    'foreignField': 'sighting_date',
                    'as': 'time'
                }
            },
            {'$unwind': '$time'},
            {
                '$group': {
                    '_id': '$time.monthNumber',
                    'monthName': {'$first': '$time.monthName'},
                    'aou_list_id': {'$first': '$aou_list_id'},
                    'sightingCount': {'$sum': 1}
                }
            },
            {
                '$lookup': {
                    'from': 'bird',
                    'localField': 'aou_list_id',
                    'foreignField': 'aou_list_id',
                    'as': 'bird'
                }
            },
            {'$unwind': '$bird'},
            {
                '$project': {
                    '_id': 0,
                    'common_name': '$bird.common_name',
                    'monthNumber': '$_id',
                    'monthName': '$monthName',
                    'sightingCount': '$sightingCount'
                }
            },
            {'$sort': {'monthNumber': 1}}
        ]);
    };

    exports.yearsjson = (req, res) => {
        executeAndReturnJSONResponse(res, 'time', [
            {
                '$lookup': {
                    'from': 'sighting',
                    'localField': 'sighting_date',
                    'foreignField': 'sighting_date',
                    'as': 'sighting'
                }
            },
            {'$unwind': '$sighting'},
            {
                '$group': {
                    '_id': '$yearNumber',
                    'species': {'$addToSet': '$sighting.aou_list_id'},
                    'trips': {'$addToSet': '$sighting.trip_id'},
                    'sightingCount': {'$sum': 1}
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'yearNumber': '$_id',
                    'speciesCount': {'$size': '$species'},
                    'tripCount': {'$size': '$trips'},
                    'sightingCount': '$sightingCount'
                }
            },
            {'$sort': {yearNumber: 1}}
        ]);
    };

})();
