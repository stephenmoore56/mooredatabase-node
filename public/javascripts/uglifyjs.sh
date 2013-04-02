#!/bin/bash
uglifyjs jquery.colorbox-min.js mooredatabase.js modernizr-2.6.2.min.js deleteConfirm.js jquery.tablesorter.min.js -c -o mooredatabase.min.js
uglifyjs google_chart_species_by_order.js -c -o google_chart_species_by_order.min.js
uglifyjs google_chart_species_by_month.js -c -o google_chart_species_by_month.min.js
uglifyjs jquery.cycle.lite.js -c -o jquery.cycle.lite.min.js