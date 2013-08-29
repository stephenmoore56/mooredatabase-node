window.mooredatabase = {}

$ ->
  $("#photoCarousel").carousel(
    interval: 5000
  ).show();
  $("#slideshow").show();
  $('#toolsNav a').on('click', ->
    $('#toolsNav li').each( ->
      $(this).removeClass('active')
      return
    )
    $(this).parent().addClass('active')
    return
  )
  # on page load, set the active menu item based on hash in URL
  $('#toolsNav li').each( ->
    $(this).removeClass('active')
    return
  )
  myHash = window.location.hash.split("/")
  # birding pages
  if ($.inArray("orders", myHash) isnt -1)
    $('#ordersNavPill').addClass('active')
  if ($.inArray("months", myHash) isnt -1)
    $('#monthsNavPill').addClass('active')
  if ($.inArray("species", myHash) isnt -1)
    $('#speciesNavPill').addClass('active') 
  # tools pages
  if ($.inArray("nodejs", myHash) isnt -1 or window.location.hash is "")
    $('#nodejsNavPill').addClass('active')
  if ($.inArray("angularjs", myHash) isnt -1)
    $('#angularjsNavPill').addClass('active')
  if ($.inArray("bootstrap", myHash) isnt -1)
    $('#bootstrapNavPill').addClass('active')            
    
  return
  