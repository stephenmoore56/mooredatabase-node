'use strict';

let frisby = require('frisby');
let baseURL = 'http://localhost:3000';
// let baseURL = 'http://node.moore-database.com';

frisby.create('Clear cache endpoint')
    .get(baseURL + '/birding/clearCache')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('?', {
        message: String
    })
    .expectJSON('?', {
        message: 'Cache cleared.'
    })
    .toss();

frisby.create('Orders JSON endpoint')
    .get(baseURL + '/birding/ordersjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        id: Number,
        order_name: String,
        order_notes: String,
        order_species_count_all: Number,
        speciesCount: Number
    })
    .toss();

frisby.create('Months JSON endpoint')
    .get(baseURL + '/birding/monthsjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        monthNumber: Number,
        monthName: String,
        monthLetter: String,
        speciesCount: Number,
        tripCount: Number
    })
    .toss();

frisby.create('Years JSON endpoint')
    .get(baseURL + '/birding/yearsjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        yearNumber: Number,
        speciesCount: Number,
        tripCount: Number
    })
    .toss();

frisby.create('Species JSON endpoint')
    .get(baseURL + '/birding/speciesjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        id: Number,
        order_name: String,
        order_notes: String,
        common_name: String,
        scientific_name: String,
        family: String,
        subfamily: String,
        order_species_count: Number,
        sightings: Number,
        last_seen: String,
        displayGroupHeader: String
    })
    .toss();

// TODO: complete this test, add missing fields like order_notes, location_notes
frisby.create('All Sightings JSON endpoint')
    .get(baseURL + '/birding/allsightingsjson')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        sighting_id: Number,
        aou_list_id: Number,
        scientific_name: String,
        common_name: String,
        order_name: String,
        order_notes: String,
        family: String,
        subfamily: String,
        trip_id: Number,
        trip_date: String,
        location_id: Number,
        country_code: String,
        state_code: String,
        location_name: String,
        county_name: String,
        location_notes: String,
        latitude: Number,
        longitude: Number,
        subsection_id: Number,
        subsection_name: String,
        subsection_url: String,
        // add section_id
        section_name: String,
        section_url: String,
        // add province_id
        province_name: String,
        province_url: String
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

frisby.create('Detail JSON endpoint / invalid species id')
    .get(baseURL + '/birding/detailjson/9999')
    .expectStatus(404)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .toss();

frisby.create('Detail JSON endpoint / bad param')
    .get(baseURL + '/birding/detailjson/abcd')
    .expectStatus(500)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    // .inspectJSON()
    .expectJSONTypes('*', {
        code: String,
        errno: Number,
        sqlState: String,
        index: Number
    })
    .toss();

frisby.create('Detail Months JSON endpoint')
    .get(baseURL + '/birding/detailmonthsjson/1343')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes('*', {
        common_name: String,
        monthNumber: Number,
        monthName: String,
        sightingCount: Number
    })
    .toss();

frisby.create('Detail Months JSON endpoint / bad param')
    .get(baseURL + '/birding/detailmonthsjson/abcd')
    .expectStatus(500)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    // .inspectJSON()
    .expectJSONTypes('*', {
        code: String,
        errno: Number,
        sqlState: String,
        index: Number
    })
    .toss();

frisby.create('Detail Months JSON endpoint / invalid species id')
    .get(baseURL + '/birding/detailmonthsjson/9999')
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .toss();
