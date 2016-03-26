(function () {
    'use strict';
    myApp.factory('ReportCharts', function () {
        return {

            drawChartSpeciesByMonth: function (dataPoints, chart_div) {
                var months, species, trips, data, trace1, trace2, i, layout;
                if (dataPoints.length === 0) {
                    return;
                }

                var d3 = Plotly.d3;

                var WIDTH_IN_PERCENT_OF_PARENT = 90,
                    HEIGHT_IN_PERCENT_OF_PARENT = 90;

                var gd3 = d3.select('#' + chart_div)
                    .style({
                        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh'
                    });

                var gd = gd3.node();

                /* extract data from JSON data */
                months = [];
                species = [];
                trips = [];
                for (i = 0; i < dataPoints.length; i++) {
                    // read species, trips and months into separate arrays
                    months[i] = dataPoints[i].monthName.substring(0, 3);
                    species[i] = dataPoints[i].speciesCount;
                    trips[i] = dataPoints[i].tripCount;
                }

                trace1 = {
                    x: months,
                    y: species,
                    name: 'Species',
                    type: 'bar',
                    marker: {
                        color: '#ff7f0e'
                    }
                };

                trace2 = {
                    x: months,
                    y: trips,
                    name: 'Trips',
                    mode: 'lines+markers',
                    marker: {
                        color: '#3072AB'
                    }
                };

                data = [trace1, trace2];

                layout = {
                    margin: {
                        l: 50,
                        r: 5,
                        b: 50,
                        t: 30,
                        pad: 5
                    },
                    xaxis: {
                        title: 'Month',
                        type: 'category'
                    },
                    yaxis: {
                        title: 'Species / Trips'
                    }
                };

                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                });

                window.onresize = function () {
                    Plotly.Plots.resize(gd);
                };
            },

            drawChartSpeciesByOrder: function (dataPoints, chart_div) {
                var orderNames, speciesCounts, data, trace1, i, layout;
                if (dataPoints.length === 0) {
                    return;
                }

                var d3 = Plotly.d3;

                var WIDTH_IN_PERCENT_OF_PARENT = 90,
                    HEIGHT_IN_PERCENT_OF_PARENT = 90;

                var gd3 = d3.select('#' + chart_div)
                    .style({
                        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh'
                    });

                var gd = gd3.node();

                /* extract data from JSON data */
                orderNames = [];
                speciesCounts = [];
                for (i = 0; i < dataPoints.length; i++) {
                    // read species, trips and months into separate arrays
                    orderNames[i] = dataPoints[i].order_name;
                    speciesCounts[i] = dataPoints[i].speciesCount;
                }

                trace1 = {
                    values: speciesCounts,
                    labels: orderNames,
                    type: 'pie'
                };

                data = [trace1];

                layout = {
                    margin: {
                        l: 50,
                        r: 5,
                        b: 50,
                        t: 30,
                        pad: 5
                    }
                };

                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                })
                ;

                window.onresize = function () {
                    Plotly.Plots.resize(gd);
                };

            }
        };
    });
})();