var crypto = require('crypto');
var pdf = require('html-pdf');

var calendarConstants = {
	mon: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

module.exports.utils = {
	CONSTANTS: require('./constants').CONSTANTS,
	filters: require('./filter').filters,
	mongoUtils: require('./mongoUtils').mongoUtils,
	validate: require('./validate').validate,
	cloneObject: function(object) {
						 var cloneObject = {};
						 Object.keys(object).forEach(function(key) {
						 	cloneObject[key] = object[key];
						 });	
			    		return cloneObject;
					},
	encryptText: function(text) {
		return crypto.createHash('md5').update(text+'').digest("hex");
	},
	formatText: function(text) {
		var result = text;
		for (var i = 1; i < arguments.length; i += 1) {
			var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
			result = result.replace(re, arguments[i]);
		}
		return result;
	},
	getFullName: function(object) {
		var fullName = 'NA';
		try {
			fullName = object.getLastName() + ' ' + object.getFirstName();
		} catch(e) {
			try {
				fullName = object.lastName + ' ' + object.firstName;
			} catch(e) {}
		}
		return fullName;
	},
	getSystemTime: function() {
		return new Date().getTime();
	},
	deriveIdFromSuccessMessage: function(message) {
		//parseInt(response.result[0].match(/\d+/),10);
		return message.substr(message.lastIndexOf(' ') + 1);
	},
	formatQueryForMongo: function(query) {
		if (query && typeof query === 'object') {
			Object.keys(query).forEach(function(key) {
				var myQueryItem = {};
				if (Array.isArray(query[key])) {
					query[key] = {'$in': query[key]};
				} else {
					query[key] = query[key];
				}
			});
			return query;
		} else {
			return query;
		}
	},
	addDaysToUTC: function(utc, noOfDays) {
		if (utc && noOfDays || (utc == 0 || noOfDays == 0)) {
			/*if (validate.isInteger(noOfDays) && validate.isInteger(utc)) {*/
				return utc + (noOfDays * 86400 * 1000);
			/*}*/
		}
	},
	getRandomNumber: function() {
		//generates 8 digit random integer as string
		return Math.floor((Math.random() * 100000000) + 9999999).toString();
	},
	generatePdf: function(content, options, callback) {
		var fileName = new Date().getTime() + Math.random() + '.pdf';
		pdf.create(content, options).toFile('../uploads/' + fileName, function(error, response) {
		  if (error) {
		  	callback(error);
		  } else {
		  	callback({
			  	fileName: fileName,
			  	filePath: response.filename
			});
		  }								 
		});
	},
	utcToDate: function(pUTCString) {
		return new Date(pUTCString)
	},
	formatDate: function(pDate, pFormat) {
		if (!pDate) {
			return;
		} else {
			var formattedValue = '';
			switch(pFormat) {
				case 'MMM-DD':
					formattedValue = calendarConstants.mon[pDate.getMonth()] + '-' +
						((pDate.getDate() < 10) ? '0' + pDate.getDate() : pDate.getDate());
					break;
				case 'YYYYMMDDHHMI': 
					var date = new Date(pDate);
					var year = date.getFullYear();
				    var month = ("0" + (date.getMonth() + 1)).slice(-2);
				    var day = date.getDate();
				    var hours = date.getHours();
				    var minutes = date.getMinutes();
				    formattedValue = year+month+day+hours+minutes;
					break;
				default:
					var month = pDate.getMonth() + 1;
					month = (month < 10) ? '0' + month : month;
					var date = pDate.getDate();
					date = (date < 10) ? '0' + date : date;
					var year = pDate.getFullYear();
					formattedValue = month + '/' + date + '/' + year;
			}
			return formattedValue;
		}
	},
	utcToIsoDate: function(utcDate) {
		if (utcDate) {
			return new Date(utcDate).toISOString();
		}
	},
	IsoToUtcDate: function(isoDate) {
		if (isoDate) {
			return new Date(isoDate).getTime();
		}
	},
	isNumber: function(n) { 
		return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
	},

	formatResponse: function (responseArray, keys) {
		var finalResponse = [];
	  responseArray.forEach(function(responseObj) {
	  	subArray = []
	  	Object.keys(keys).forEach(function(key) {
	      subArray.push(responseObj[key]);
	    });
	    finalResponse.push(subArray);
	  });
		return finalResponse;
	}
};
