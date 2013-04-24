window.mooredatabase = {}
			
# document ready calls to initialize jQuery controls
$ ->
	$("#accordion").accordion
		heightStyle: "content"
		collapsible: true
	$("#accordionFixedHeight").accordion
		heightStyle: "content"
		collapsible: true
	$("#tabs").tabs()
	$("#slideshow").cycle()
	$("input:submit,input:reset").button()
	$("#datepicker").datepicker
		dateFormat : 'yy-mm-dd'
		defaultDate : null
	$(".colorboxLink").colorbox
		height : "100%"
	$('a[href^=http]').click ->
		window.open(this.href)
		return false	
	$(".myFigure").animate { opacity: 1.0 }, 2000
	$("table.striped tr:even").addClass("even_row")
	return