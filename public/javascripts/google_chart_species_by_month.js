// Generated by CoffeeScript 1.6.3
(function() {
  var drawChartSpeciesByMonth;

  $(document).ready(function() {
    if ($('#chart_div').length) {
      if (!Modernizr.svg) {
        $("#chart_div").html('<p>Your browser cannot display Google charts. Try using Chrome or Firefox.</p>');
      }
    }
  });

  window.mooredatabase = mooredatabase || {};

  google.load('visualization', '1.0', {
    'packages': ['corechart']
  });

  drawChartSpeciesByMonth = function(dataPoints) {
    var chart, chartData, data, i, options, _i, _ref;
    chartData = [];
    for (i = _i = 0, _ref = dataPoints.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      chartData.push([parseInt(dataPoints[i]['monthNumber']), parseInt(dataPoints[i]['speciesCount']), parseInt(dataPoints[i]['tripCount'])]);
    }
    data = new google.visualization.DataTable();
    data.addColumn('number', 'Month');
    data.addColumn('number', 'Species');
    data.addColumn('number', 'Trips');
    data.addRows(chartData);
    chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    options = {
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
  };

  mooredatabase.drawChartSpeciesByMonth = drawChartSpeciesByMonth;

}).call(this);
