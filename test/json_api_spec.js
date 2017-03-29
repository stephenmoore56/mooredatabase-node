'use strict';

let frisby = require('frisby');
let baseURL = 'http://localhost:3000';
// let baseURL = 'http://node.moore-database.com';

frisby.create('Orders JSON endpoint')
    .get(baseURL + '/birding/ordersjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        id: Number,
        order_name: String,
        order_notes: String,
        order_species_count_all: Number,
        speciesCount: Number,
        sightingCount: Number
    })
    .toss();

frisby.create('Months JSON endpoint')
    .get(baseURL + '/birding/monthsjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        monthNumber: Number,
        monthName: String,
        monthLetter: String,
        speciesCount: Number,
        tripCount: Number,
        sightingCount: Number
    })
    .toss();

frisby.create('Years JSON endpoint')
    .get(baseURL + '/birding/yearsjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        yearNumber: Number,
        speciesCount: Number,
        tripCount: Number,
        sightingCount: Number
    })
    .toss();

frisby.create('Species JSON endpoint')
    .get(baseURL + '/birding/speciesjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        id: Number,
        order_name: String,
        order_notes: String,
        common_name: String,
        scientific_name: String,
        family: String,
        subfamily: String,
        sightings: Number,
        last_seen: String
    })
    .toss();

frisby.create('Detail JSON endpoint')
    .get(baseURL + '/birding/detailjson/1343')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        id: Number,
        order_name: String,
        order_notes: String,
        common_name: String,
        scientific_name: String,
        family: String,
        subfamily: String,
        sightings: Number,
        last_seen: String,
        earliestSighting: String,
        latestSighting: String
    })
    .toss();

frisby.create('Detail Months JSON endpoint')
    .get(baseURL + '/birding/detailmonthsjson/1343')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        common_name: String,
        monthNumber: Number,
        monthName: String,
        sightingCount: Number
    })
    .toss();
