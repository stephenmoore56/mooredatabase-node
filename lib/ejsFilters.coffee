module.exports = (ejs) ->
  # some filters for use in ejs views
  moment = require('moment')
  ejs.filters.dateFormatLong = (date) ->
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  return