$(document).ready ->
  if $('#chart_div').length
    # see if SVG is supported by browser
    if (! Modernizr.svg)
      $("#chart_div").html('<p>Your browser cannot display Google charts. Try using Chrome or Firefox.</p>')
  return
  
window.mooredatabase = mooredatabase || {}

# Load the Visualization API and the piechart package.
google.load 'visualization', '1.0', { 'packages' : ['corechart'] }

# function that creates and populates a data table,
# instantiates the line chart, and draws it.
drawChartSpeciesByMonth = (dataPoints) ->
	# Create the data table; convert JSON data to ordinary array; numeric
	# elements
	# must be cast to integer
	chartData = []
	for i in [0...dataPoints.length]
		chartData.push([parseInt(dataPoints[i]['monthNumber']), parseInt(dataPoints[i]['speciesCount']), parseInt(dataPoints[i]['tripCount'])])
	data = new google.visualization.DataTable()
	data.addColumn('number', 'Month')
	data.addColumn('number', 'Species')
	data.addColumn('number', 'Trips')
	data.addRows(chartData)

	# Instantiate and draw our chart, passing in some options.
	chart = new google.visualization.LineChart(document.getElementById('chart_div'))
        
	# set chart options
	options = 
		width : 700
		height : 240
		pointSize : 5
		title : 'Bird Species and Trips By Month'
		hAxis : 
			title : 'Month'
			titleTextStyle : 
				color : '#000'
			gridlines : 
				color : '#CCC'
				count : dataPoints.length
			baselineColor : '#CCC'
		vAxis : 
			title : 'Species/Trips'
			titleTextStyle : 
				color : '#000'
			baselineColor : '#CCC'
	# draw chart
	chart.draw(data, options)
	return
mooredatabase.drawChartSpeciesByMonth = drawChartSpeciesByMonth