// configure winston error logging; add file transport
winston = require('winston')
exports.factory = function() {
	var logger = new winston.Logger({
	  transports: [
	    new winston.transports.File({
	      filename: './error.log',
	      handleExceptions: true,
	      json: true
	    })
	  ]
	});
	return logger;
};