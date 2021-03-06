var validator = require('validator');
var CONSTANTS = require('../assets/constants').CONSTANTS;

module.exports.validate = {
						isInteger: function(value) {
							return validator.isInt(value);
						},
						isNumber: function(value) {
							//number validation ...
							return true;
						},
						isUTC: function(value) {
							//checking utc date between 1900 to 2100.
							if (value && value < 4102425000000 && value > -2209008600000) {
								return true;
							} else {
								return false;
							}
						},
						isMobilePhone: function(value) {
							return validator.isMobilePhone(value, ['en-US','en-IN']);
						},
						isEmail: function(value) {
							return validator.isEmail(value);
						},
						isExist: function(value) {
							return (value != undefined && value != null && value != 0);
						},
						isGender: function(value) {
							return CONSTANTS.GENDER_TYPES.some(function(gender) {
								return gender == value;
							});
						},
						isEquals: function(value1, value2) {
							return validator.equals(value1, value2);
						},
						teamStatus: {
							isStatus: function(value) {
								return CONSTANTS.TEAM_STATUS.some(function(status) {
									return status == value;
								});
							}
						}
					};