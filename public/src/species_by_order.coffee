$(document).ready ->
  # see if SVG is supported by browser
  if (Modernizr.svg)
    # make an AJAX call for the chart data
    $.ajax
      url : '/birding/ordersajax'
      cache: false
      dataType : 'json'
      success : (data) ->
        mooredatabase.drawChartSpeciesByOrder(data)
        true
  else
    $("#chart_div").html('<p>Your browser cannot display Google charts.</p>')
  
  true