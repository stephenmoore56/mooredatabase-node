# Load the Visualization API and the piechart package.
google.load 'visualization', '1.0', { 'packages' : ['corechart'] }
# function that creates and populates a data table,
# instantiates the column chart, and
# draws it.
drawChartSpeciesByOrder = (dataPoints) ->
	# Create the data table; convert JSON data to ordinary array; numeric
	# elements must be cast to integer
	chartData = []
	for i in [0...dataPoints.length]
		chartData.push([dataPoints[i]['order_name'], parseInt(dataPoints[i]['speciesCount'])])
	data = new google.visualization.DataTable()
	data.addColumn('string', 'Order')
	data.addColumn('number', 'Species')
	data.addRows(chartData)
  # Instantiate and draw our chart, passing in some options.
	chart = new google.visualization.PieChart(document.getElementById('chart_div'))
  # set chart options
	options = 
		width : 800
		height : 400
		title : 'Bird Species Sighted By Order'
	# draw chart
	chart.draw data, options
mooredatabase.drawChartSpeciesByOrder = drawChartSpeciesByOrder