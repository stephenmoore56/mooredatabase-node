(function () {
    "use strict";
    myApp.factory('reportCharts', function () {
        return {
            drawChartSpeciesByMonth: function(dataPoints, chart_div) {
                google.load('visualization', '1.0', {
                    'packages': ['corechart']
                });
                let chartData = [];
                let i, points;
                for (i = 0, points = dataPoints.length; i < points; i++) {
                    chartData.push([parseInt(dataPoints[i].monthNumber), parseInt(dataPoints[i].speciesCount), parseInt(dataPoints[i].tripCount)]);
                }
                let data = new google.visualization.DataTable();
                data.addColumn('number', 'Month');
                data.addColumn('number', 'Species');
                data.addColumn('number', 'Trips');
                data.addRows(chartData);
                let chart = new google.visualization.LineChart(chart_div);
                let options = {
                    width: 700,
                    height: 240,
                    pointSize: 5,
                    title: 'Bird Species and Trips By Month',
                    hAxis: {
                        title: 'Month',
                        titleTextStyle: {
                            color: '#000'
                        },
                        gridlines: {
                            color: '#CCC',
                            count: dataPoints.length
                        },
                        baselineColor: '#CCC'
                    },
                    vAxis: {
                        title: 'Species/Trips',
                        titleTextStyle: {
                            color: '#000'
                        },
                        baselineColor: '#CCC'
                    }
                };
                chart.draw(data, options);
            }
        };
    });
})();