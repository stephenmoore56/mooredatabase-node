$(document).ready ->
  if ($('#chart_div').length)
    # see if SVG is supported by browser
    if (Modernizr.svg)
      # make an AJAX call for the chart data
      $.ajax
        url : '/birding/ordersajax'
        cache: false
        dataType : 'json'
        success : (data) ->
          mooredatabase.drawChartSpeciesByOrder(data)
          return
    else
      $("#chart_div").html('<p>Your browser cannot display Google charts. Try using Chrome or Firefox.</p>')
  return
  
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
		width : 700
		height : 400
		title : 'Bird Species Sighted By Order'
	# draw chart
	chart.draw data, options
	return
mooredatabase.drawChartSpeciesByOrder = drawChartSpeciesByOrder