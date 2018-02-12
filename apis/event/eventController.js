var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var Event = function() {
    return {
        eventId: 0,
        eventName: null,
        description: null,
        place: null,
        time: null, 
        userId: 0,
        guests: null,
        dateCreated: 0,
        status: null
    }
};

function EventAPI(eventRecord) {
    var event = Event();
    console.log('eventRecord :: ' + JSON.stringify(eventRecord));
    console.log('event :: ' + JSON.stringify(event));

    event.getEventId = function() {
        return this.eventId;
    };
    event.setEventId = function(eventId) {
        if(eventId) {
            if (validate.isInteger(eventId + '')) {
                this.eventId = eventId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, eventId, 'eventId')
                };
            }
        }
    };

    event.getEventName = function() {
        return this.eventName;
    };
    event.setEventName = function(eventName) {
        if (eventName) {
            if (eventName.length <= 50) {
                this.eventName = eventName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, eventName, 'eventName')
                };
            }
        }
    };

    event.getDescription = function() {
        return this.description;
    };
    event.setDescription = function(description) {
        if(description) {
            if(description.length <= 500) {
                this.description = description;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, description, 'description')
                }
            }
        }
    };

    event.getPlace = function() {
        return this.place;
    };
    event.setPlace = function(place) {
        if (place) {
            if (place.length <= 50) {
                this.place = place;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, place, 'place')
                };
            }
        }
    };

    event.getTime = function() {
        return this.time;
    };
    event.setTIme = function(time) {
        if (time) {
            this.time = time;
        }        
    };

    event.getUserId = function() {
        return this.userId;
    };
    event.setUserId = function(userId) {
        if (userId) {
            if (validate.isInteger(userId + '')) {
                this.userId = userId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, userId, 'userId')
                };
            }
        }
    };

    event.getGuests = function() {
        return this.guests;
    };
    event.setGuests = function(guests) {
        if(guests) {
            if(guests.length <= 500) {
                this.guests = guests;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, guests, 'guests')
                }
            }
        }
    };

    event.getDateCreated = function() {
        return this.dateCreated;
    }
    event.setDateCreated = function(dateCreated) {
        if (dateCreated) {
            if (validate.isInteger(dateCreated + '')) {
                this.dateCreated = dateCreated;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, dateCreated, 'dateCreated')
                };
            }
        }
    }
    event.getStatus = function() {
        return this.status;
    }
    event.setStatus = function(status) {
        if (status) {
            this.status = status;
        }
    }

    if (eventRecord) {
        var errorList = [];
        try {
            event.setEventId(eventRecord.eventId);
        } catch (e) {
            console.log(' 1 :: ' );
            errorList.push(e);
        }

        try {
            event.setEventName(eventRecord.eventName);
        } catch (e) {
            console.log(' 2 :: ' );
            errorList.push(e);
        }

        try {
            event.setDescription(eventRecord.description);
        } catch (e) {
            console.log(' 3 :: ' );
            errorList.push(e);
        }

        try {
            event.setPlace(eventRecord.place);
        } catch (e) {
            console.log(' 4 :: ' );
            errorList.push(e);
        }

        try {
            event.setTIme(eventRecord.time);
        } catch (e) {
            console.log(' 5 :: ' );
            errorList.push(e);
        }

        try {
            event.setUserId(eventRecord.userId);
        } catch (e) {
            console.log(' 6 :: ' );
            errorList.push(e);
        }

        try {
            event.setGuests(eventRecord.guests);
        } catch (e) {
            console.log(' 7 :: ' );
            errorList.push(e);
        }

        try {
            event.setDateCreated(eventRecord.dateCreated);
        } catch (e) {
            console.log(' 8 :: ' );
            errorList.push(e);
        }

        try {
            event.setStatus(eventRecord.status);
        } catch (e) {
            console.log(' 9 :: ' );
            errorList.push(e);
        }
    }
    return event;
}

module.exports.EventAPI = EventAPI;
