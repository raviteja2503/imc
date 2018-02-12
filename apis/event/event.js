module.exports = function(app) {
	app.post('/ui/event', function(req, res) {
		try {
			create(req.body, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.get('/ui/query/event', function(req, res) {
		try {
			getList(req.query, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.get('/ui/event/:eventId', function(req, res) {
		try {
			getDetails(req.params.eventId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.put('/ui/event', function(req, res) {
		try {
			update(req.body, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
}
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema(require('./eventSchema').eventSchema, {collection: 'event'});
var EventModel = mongoose.model('event', EventSchema);
var EventController = require('./eventController');


var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var EVENT_CODES = utils.CONSTANTS.EVENT;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;
var apiModule = 'event';

function getDetails(eventId, callback) {
	EventModel.find({"eventId": eventId}, function(error, eventRecords) {
		if (error) {
			callback({
					  status: DB_CODES.FAIL,
					  error: error
			});
			return;
		} else {
			eventRecords = eventRecords.map(function(eventRecord) {
				return new EventController.EventAPI(eventRecord);
			});
            callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: eventRecords
			});
			return;		
		}
	});
}

function create(event, callback) {
	console.log('begining :: ' + JSON.stringify(event));
	var EventAPI = EventController.EventAPI(event);
	console.log('after controller :: ');
	var errorList = [];
    if (! EventAPI.getEventName()) {
    	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'eventName')
		};
		errorList.push(e);
    } 
    if (! EventAPI.getDescription()) {
    	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'description')
		};
		errorList.push(e);
    }
    if (! EventAPI.getPlace()) {
    	var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'place')
		};
		errorList.push(e);
    }
    if (! EventAPI.getTime()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'time')
		};
		errorList.push(e);
    }
    if (! EventAPI.getGuests()) {
    	var e = {
    			status: VALIDATE.FAIL,
    			error: utils.formatText(VALIDATE.REQUIRED, 'guests')
    	};
    	errorList.push(e);
    }
    if (! EventAPI.getUserId()) {
    	var e = {
    			status: VALIDATE.FAIL,
    			error: utils.formatText(VALIDATE.REQUIRED, 'userId')
    	};
    	errorList.push(e);
    }
   
   	if (errorList.length) {
		throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	}  else {
	   	EventAPI.setStatus('active');
	   	EventAPI.setDateCreated(utils.getSystemTime());
	   	var eventModel = new EventModel(EventAPI);
	   	mongoUtils.getNextSequence('eventId', function(oSeq) {
			eventModel.eventId = oSeq;
			eventModel.save(function(error) {
				if (error) {
					callback({
							  status: DB_CODES.FAIL,
							  error: error
					});
					return;
				} else {
					callback({
							  status: REQUEST_CODES.SUCCESS,
							  result: utils.formatText(EVENT_CODES.CREATE_SUCCESS, eventModel.eventId)
					});
					return;
				}
			});
		});
	}
}

function update(event, callback) {
	var errorList = [];
	if (! event.eventId) {
		var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.REQUIRED, 'eventId')
		};
		errorList.push(e);
	}
   	if (errorList.length) {
		throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	}  else {
		EventModel.update({ eventId: event.eventId}, { $set: event}, function (error) {
			if (error) {
				callback({
					status: DB_CODES.FAIL,
					error: error
				});
				return;
			} else {
				callback({
					status: REQUEST_CODES.SUCCESS,
					result: utils.formatText(EVENT_CODES.UPDATE_SUCCESS, event.eventId)
				});
				return;
			}
		});
	}
}

function getList(query, callback) {
	EventModel.find(query, function(error, eventRecords) {
		if (error) {
			callback({
					  status: DB_CODES.FAIL,
					  error: error
			});
			return;
		} else {
			eventRecords = eventRecords.map(function(postRecord) {
				return new EventController.EventAPI(postRecord);
			});
            callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: eventRecords
			});
			return;		
		}
	}).sort({eventId: -1});
}

module.exports.getDetails = getDetails;
module.exports.create     = create;
module.exports.update     = update;
module.exports.getList    = getList;
