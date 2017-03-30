(function () {
    'use strict';
    myApp.factory('ReportCharts', function () {
        var resizeChart = function (chart_div) {
            var d3 = Plotly.d3;
            var WIDTH_IN_PERCENT_OF_PARENT = 95,
                HEIGHT_IN_PERCENT_OF_PARENT = 95;
            var gd3 = d3.select('#' + chart_div)
                .style({
                    width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                    height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh'
                });
            var gd = gd3.node();
            window.addEventListener('resize', function () {
                Plotly.Plots.resize(gd);
            });
        };
        return {
            drawChartSpeciesByMonth: function (dataPoints, chart_div) {
                var months, species, trips, data, trace1, trace2, i, layout;
                if (dataPoints.length === 0) {
                    return;
                }
                resizeChart(chart_div);
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
                        l: 30,
                        r: 5,
                        b: 50,
                        t: 30,
                        pad: 5
                    },
                    xaxis: {
                        type: 'category'
                    },
                    legend: {
                        x: 0,
                        y: 1,
                        traceorder: 'normal',
                        font: {
                            family: 'sans-serif',
                            size: 12,
                            color: '#000'
                        },
                        bgcolor: '#ECECEC',
                        bordercolor: '#FFFFFF',
                        borderwidth: 2
                    }
                };
                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                });
            },
            drawChartSpeciesByYear: function (dataPoints, chart_div) {
                var years, species, trips, data, trace1, trace2, i, layout;
                if (dataPoints.length === 0) {
                    return;
                }
                resizeChart(chart_div);
                years = [];
                species = [];
                trips = [];
                for (i = 0; i < dataPoints.length; i++) {
                    // read species, trips and months into separate arrays
                    years[i] = dataPoints[i].yearNumber;
                    species[i] = dataPoints[i].speciesCount;
                    trips[i] = dataPoints[i].tripCount;
                }
                trace1 = {
                    x: years,
                    y: species,
                    name: 'Species',
                    type: 'bar',
                    marker: {
                        color: '#ae00f9'
                    }
                };
                trace2 = {
                    x: years,
                    y: trips,
                    name: 'Trips',
                    mode: 'lines+markers',
                    marker: {
                        color: 'green'
                    }
                };
                data = [trace1, trace2];
                layout = {
                    margin: {
                        l: 30,
                        r: 5,
                        b: 50,
                        t: 30,
                        pad: 5
                    },
                    xaxis: {
                        type: 'category'
                    },
                    legend: {
                        x: 0,
                        y: 1,
                        traceorder: 'normal',
                        font: {
                            family: 'sans-serif',
                            size: 12,
                            color: '#000'
                        },
                        bgcolor: '#ECECEC',
                        bordercolor: '#FFFFFF',
                        borderwidth: 2
                    }
                };
                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                });
            },
            drawChartSpeciesByOrder: function (dataPoints, chart_div) {
                var orderNames, speciesCounts, data, trace1, i, layout;
                if (dataPoints.length === 0) {
                    return;
                }
                resizeChart(chart_div);
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
                        l: 30,
                        r: 5,
                        b: 100,
                        t: 30,
                        pad: 5
                    }
                };
                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                });
            },
            drawChartMonthsForSpecies: function (dataPoints, chart_div) {
                var MONTHS, sightings, i, trace1, data, layout;
                if (dataPoints.length === 0) {
                    return;
                }
                MONTHS = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ];
                resizeChart(chart_div);
                sightings = [];
                for (i = 0; i < MONTHS.length; i++) {
                    sightings[i] = 0;
                }
                // update with sightings for months that have them
                for (i = 0; i < dataPoints.length; i++) {
                    sightings[dataPoints[i].monthNumber - 1] = dataPoints[i].sightingCount;
                }
                trace1 = {
                    x: MONTHS,
                    y: sightings,
                    name: 'Sightings',
                    type: 'bar',
                    marker: {
                        color: '#423ffc'
                    }
                };
                data = [trace1];
                layout = {
                    legend: {
                        xanchor: "center",
                        yanchor: "top",
                        y: -0.3,
                        x: 0.5
                    },
                    margin: {
                        l: 30,
                        r: 5,
                        b: 50,
                        t: 30,
                        pad: 5
                    },
                    xaxis: {
                        type: 'category'
                    }
                };
                Plotly.newPlot(chart_div, data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud']
                });
            }
        };
    });
})();