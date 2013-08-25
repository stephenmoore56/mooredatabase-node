window.mooredatabase = {}

$ ->
  $("#photoCarousel").carousel(
    interval: 5000
  )
  $('#toolsNav a').on('click', ->
    $('#toolsNav li').each( ->
      $(this).removeClass('active')
      return
    )
    $(this).parent().addClass('active')
    return
  )
  return
  