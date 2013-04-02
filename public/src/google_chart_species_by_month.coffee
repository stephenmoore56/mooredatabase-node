$(document).ready ->
  if $('#chart_div').length
    # see if SVG is supported by browser
    if (Modernizr.svg)
      # make an AJAX/JSONP call for the chart data
      $.getScript("http://moore-database.com/zend/public/sighting/monthsjsonp");
    else
      $("#chart_div").html('<p>Your browser cannot display Google charts.</p>')
  
  true
  
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
		chartData.push([parseInt(dataPoints[i][0]), parseInt(dataPoints[i][1]), parseInt(dataPoints[i][2])])
	data = new google.visualization.DataTable()
	data.addColumn('number', 'Month')
	data.addColumn('number', 'Species')
	data.addColumn('number', 'Trips')
	data.addRows(chartData)

	# Instantiate and draw our chart, passing in some options.
	chart = new google.visualization.LineChart(document.getElementById('chart_div'))

	# Listen for the 'select' event, and call my function selectHandler() when
	# the user selects something on the chart.
	google.visualization.events.addListener chart, 'select', ->
    selectedItem = chart.getSelection()[0]
    # column in graph is selected
    if selectedItem.row isnt null and selectedItem.column isnt null
      value = data.getValue(selectedItem.row, 0)
      myDate = new Date(value + " 01, 1900")
      monthNumber = myDate.getMonth() + 1
      # species selected
      if selectedItem.column is 1
        window.location = "/zend/public/sighting/month/monthnumber/" + monthNumber
        # trips selected
      else if selectedItem.column is 2
        window.location = "/zend/public/trip/month/monthnumber/" + monthNumber
    else
      # go to other pages if legends are selected
      if selectedItem.column is 1
        window.location = "/zend/public/sighting"
      else
        window.location = "/zend/public/location"
        
	# set chart options
	options = 
		width : 600
		height : 240
		pointSize : 5
		title : 'Bird Species and Trips By Month'
		hAxis : 
			title : 'Month'
			titleTextStyle : 
				color : '#000'
			gridlines : 
				color : '#CCC'
				count : 12
			baselineColor : '#CCC'
		vAxis : 
			title : 'Species/Trips'
			titleTextStyle : 
				color : '#000'
			baselineColor : '#CCC'
	# draw chart
	chart.draw(data, options)
mooredatabase.drawChartSpeciesByMonth = drawChartSpeciesByMonth