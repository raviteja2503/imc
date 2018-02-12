		module.exports = function(app) {
			app.post('/ui/user', function(req, res) {
				try {
					create(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.post('/ui/inviteFriend', function(req, res) {
				try {
					inviteFriend(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.get('/ui/query/user', function(req, res) {
				try {
					getList(req.query, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.get('/ui/user/:userId', function(req, res) {
				try {
					getDetails(req.params.userId, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.post('/ui/user/login', function(req, res) {
				try {
					login(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.put('/ui/user/activate', function(req, res) {
				try {
					activateUser(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.put('/ui/user', function(req, res) {
				try {
					update(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.put('/ui/user/updatePassword', function(req, res) {
				try {
					updatePassword(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
			app.put('/ui/user/forgotPassword', function(req, res) {
				try {
					setPasswordToken(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});

			app.post('/ui/user/resetPassword', function(req, res) {
				try {
					resetPassword(req.body, function(response) {
						res.json(response);
					});
				} catch(e) {
					res.json(e);
				}
			});
					
		}
		var mongoose = require('mongoose'),
		    Schema = mongoose.Schema;

		var UsersSchema = new Schema(require('./usersSchema').usersSchema, {collection: 'users'});
		var UsersModel = mongoose.model('users', UsersSchema);
		var UsersController = require('./usersController');

		var crypto = require('crypto');

		var utils = require('../../assets/utils').utils;
		var mailHelper = require('../mailHelper/mailHelper');
		var CONSTANTS = utils.CONSTANTS;
		var DB_CODES = CONSTANTS.DATABASE_CODES;
		var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
		var USER_CODES = utils.CONSTANTS.USERS;
		var VALIDATE = utils.CONSTANTS.VALIDATE;
		var validate = utils.validate;
		var mongoUtils = utils.mongoUtils;
		var apiModule = 'users';
		var nodemailer = require('nodemailer');

		function getDetails(userId, callback) {
			UsersModel.find({"userId": userId}, function(error, userRecords) {
				if (error) {
					callback({
						status: DB_CODES.FAIL,
						error: error
					});
					return;
				} else {
					userRecords = userRecords.map(function(userRecord) {
						var userRecordObj = new UsersController.UserAPI(userRecord);
						delete userRecordObj.password
						delete userRecordObj.passwordResetToken
						delete userRecordObj.passwordResetExpires
						delete userRecordObj.activationCode
						return userRecordObj;
					});
		            callback({
						status: REQUEST_CODES.SUCCESS,
						result: userRecords
					});
					return;		
				}
			});
		}

		function create(user, callback) {
			var userAPI = UsersController.UserAPI(user);
			
			var errorList = [];
		    if (! userAPI.getFirstName()) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'firstName')
				};
				errorList.push(e);
		    } 
		    if (! userAPI.getLastName()) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'lastName')
				};
				errorList.push(e);
		    }
		    if (! userAPI.getEmail()) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'email')
				};
				errorList.push(e);
		    }
		    if (! userAPI.getMobile()) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'mobile')
				};
				errorList.push(e);
		    }
		    if (! userAPI.getPassword()) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'password')
				};
				errorList.push(e);
		    }
		    		   
		   	if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			}  else {
				var activationCode = utils.encryptText(utils.getRandomNumber());
				userAPI.setPassword(utils.encryptText(userAPI.getPassword()));
				userAPI.setActivationCode(activationCode);
				userAPI.setIsAdmin('false');
			   	userAPI.setStatus('active');
			   	userAPI.setDateCreated(utils.getSystemTime());
			   	var usersModel = new UsersModel(userAPI);
			   	mongoUtils.getNextSequence('userId', function(oSeq) {
					usersModel.userId = oSeq;
					usersModel.save(function(error) {
						if (error) {
							callback({
									  status: DB_CODES.FAIL,
									  error: error
							});
							return;
						} else {
							var mailData = {
								toAddress : user.email,
								subject   : 'Your IOTMENTORCLUB Account is Successfully created',
								message   : '<html> <head> <link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Pacifico" rel="stylesheet"> </head> <style type="text/css">body{ background-color: linen;font-family: "Droid Sans Mono", monospace;}.center-block {padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;}#btn {background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;}img{max-width: 100%;width: 50%;min-width: 400px;height: 50%} #logo { margin: auto;font-family: "Pacifico", cursive;}.row {display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;}</style><body style="background-color: linen;font-family: &quot;Droid Sans Mono&quot;, monospace;"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;"><h1 id="logo" style="margin: auto;font-family: &quot;Pacifico&quot;, cursive;">IOTMENTORCLUB</h1> </div><div class="center-block" style="padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;"><h4>This is a confirmation that your IOTMENTORCLUB account is just created.</h4><p>Please use the following activation code to complete the activation process of your IOTMENTORCLUB Account</p><p id="btn" style="background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;">' + activationCode + '</p><p><h4>Thank You for Your interest in IOTMENTORCLUB.</h4></p></div></body></html>',
								successStatus   : REQUEST_CODES.SUCCESS,
								errorStatus     : REQUEST_CODES.FAIL,
								successMessage  : utils.formatText(USER_CODES.CREATE_SUCCESS, usersModel.email) 
							}
							mailHelper.sendMail(mailData, function(response) {
								callback(response);
							});
						}
					});
				});
			}
		}

		function inviteFriend(friend, callback) {
			var errorList = [];
		    if (! friend.userId) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'UserId')
				};
				errorList.push(e);
		    }
		    if (! friend.emailAddress) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'emailAddress')
				};
				errorList.push(e);
		    }
		    if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			}  else {
				getDetails(friend.userId, function(response) {
					if (response.error) {
						callback(response);
					} else {
						var user = response.result[0];
						var mailData = {
							toAddress : friend.emailAddress,
							user      : user,
							subject   : 'Invitation From ' + user.firstName + ' ' + user.lastName,
							message   : '<html> <head> <link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Pacifico" rel="stylesheet"> </head> <style type="text/css">body{ background-color: linen;font-family: "Droid Sans Mono", monospace;}.center-block {padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;}#btn {background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;}img{max-width: 100%;width: 50%;min-width: 400px;height: 50%} #logo { margin: auto;font-family: "Pacifico", cursive;}.row {display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;}</style><body style="background-color: linen;font-family: &quot;Droid Sans Mono&quot;, monospace;"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;"><h1 id="logo" style="margin: auto;font-family: &quot;Pacifico&quot;, cursive;">IOTMENTORCLUB</h1> </div><h4 style="padding-left: 5px;">Greetings from IOTMENTORCLUB,</h4><div class="center-block" style="padding-top: 4px;display: block;margin-left: auto;margin-right: auto;text-align: center;"><p>You are invited to join in an exiting readers social networking app by your friend:<b>' + user.firstName + ' ' + user.lastName + '</b></p><p id="btn" style="background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;">' + user.firstName + '</p><p><h4>Use the above link to Join in IOTMENTORCLUB.</h4></p></div></body></html>',
							successStatus   : REQUEST_CODES.SUCCESS,
							errorStatus     : REQUEST_CODES.FAIL,
							successMessage  : utils.formatText(USER_CODES.INVITATION_SUCCESS, friend.emailAddress) 
						}
						mailHelper.sendMail(mailData, function(response) {
							callback(response);
						});
					}
				});
			}
		}

		function login(user, callback) {
			var errorList = [];
		    if (! user.email) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'email')
				};
				errorList.push(e);
		    }
		    if (! user.password) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'Password')
				};
				errorList.push(e);
		    }
		    if(user.email) {
		    	console.log(user.email);
		    	console.log(validate.isEmail(user.email));
		    	if (validate.isEmail(user.email) == false) {
		    		console.log("fasls");
		    		var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.NOT_AN_EMAIL, 'email')
					};
					errorList.push(e)
		    	}
		    }
		    if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			}  else {
					var password = utils.encryptText(user.password);
					var a = utils.encryptText(user.email);
					var aCode = "active"+a;
					UsersModel.findOne({"email":  user.email, "password": password, "activationCode": aCode }, function(error, userRecords) {
						if(error) {
							callback({
								status: DB_CODES.FAIL,
								error:error
							});
							return;
						} else {
							if(! userRecords) {
								callback({
							    	status: REQUEST_CODES.FAIL,
							    	result: utils.formatText(USER_CODES.LOGIN_FAIL, user.email)
							    });
							} else {
								getDetails(userRecords.userId, function(response) {
									if (response.error) {
										callback(response);
									} else {
										callback(response);
									}
								});
								
							}
						}
					});
			}

		}

		function update(user, callback) {
			var errorList = [];
		    if (! user.userId) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'userId')
				};
				errorList.push(e);
		    }
		    if (! user.firstName) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'firstName')
				};
				errorList.push(e);
		    }
		    if (! user.lastName) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'lastName')
				};
				errorList.push(e);
		    }
		    if (! user.email) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'email')
				};
				errorList.push(e);
		    }
		    if (! user.mobile) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'Mobile')
				};
				errorList.push(e);
		    }
		   
		   	if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			} else {
				if(user.password) {
					user['password'] = utils.encryptText(user.password);		
				} 
				UsersModel.update({ userId: user.userId },{ $set: user}, function(error) {
			   		if(error) {
			   			callback({
			   					  status: DB_CODES.FAIL,
			   					  error: error
			   			});
			   		return;
			   		} else {
						callback({
								  status: REQUEST_CODES.SUCCESS,
								  result: utils.formatText(USER_CODES.UPDATE_SUCCESS, user.userId)
						});
						return;
					}
			   });
			}
			
		}

		function activateUser(user, callback) {
			var errorList = [];
		    if (! user.activationCode) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'activationCode')
				};
				errorList.push(e);
		    }
		    if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			}  else {
				UsersModel.find({"activationCode": user.activationCode}, function(error, userRecords) {
					if(error) {
						callback({
							status: DB_CODES.FAIL,
							error: error
						});
						return;
					} else {
						if(userRecords.length == 0) {
							callback({
						    	status: REQUEST_CODES.FAIL,
						    	result: utils.formatText(USER_CODES.ACTIVATE_FAIL, user.activationCode)
						    });
						} else {
							userRecords = userRecords.map(function(userRecord) {
								var userRecordObj = new UsersController.UserAPI(userRecord);
								return userRecordObj.email;
							});
							var email = userRecords;
							user['activationCode'] = "active"+utils.encryptText(email);
							UsersModel.update({ email: email },{ $set: { activationCode: user.activationCode } }, function(error) {
								if(error) {
									callback({
					  						  status: DB_CODES.FAIL,
					  						  error: error
					  				});
					  				return;
								} else {
									var mailData = {
										toAddress : email,
										subject   : 'Your IOTMENTORCLUB Account is Activated Successfully',
										message   : '<html> <head> <link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Pacifico" rel="stylesheet"> </head> <style type="text/css">body{ background-color: linen;font-family: "Droid Sans Mono", monospace;}.center-block {padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;}#btn {background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;}img{max-width: 100%;width: 50%;min-width: 400px;height: 50%} #logo { margin: auto;font-family: "Pacifico", cursive;}.row {display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;}</style><body style="background-color: linen;font-family: &quot;Droid Sans Mono&quot;, monospace;"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;"><h1 id="logo" style="margin: auto;font-family: &quot;Pacifico&quot;, cursive;">IOTMENTORCLUB</h1> </div><div class="center-block" style="padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;"><h4>This is a confirmation that your IOTMENTORCLUB account:</h4><p id="btn" style="background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;">' + email + '</p><p><h4>is activated Succesfully.<br>Thank You for Your interest in IOTMENTORCLUB.</h4></p></div></body></html>',
										successStatus   : REQUEST_CODES.SUCCESS,
										errorStatus     : REQUEST_CODES.FAIL,
										successMessage  : utils.formatText(USER_CODES.ACTIVATE_SUCCESS, email) 
									}
									mailHelper.sendMail(mailData, function(response) {
										callback(response);
									});
								}
							});
						}
					}
				});
			}
		}

		function updatePassword(user, callback) {
			var errorList = [];
		    if (! user.userId) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'UserId')
				};
				errorList.push(e);
		    }
		    if (! user.oldPassword) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'Old Password')
				};
				errorList.push(e);
		    }
		    if (! user.newPassword) {
		    	var e = {
							status: VALIDATE.FAIL,
							error: utils.formatText(VALIDATE.REQUIRED, 'New Password')
				};
				errorList.push(e);
		    }
		   
		   	if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			} else {
				user['oldPassword'] = utils.encryptText(user.oldPassword);
				UsersModel.findOne({ userId: user.userId })
				  .where({password: user.oldPassword})
				  .exec(function(error, userRecords) {
					if (error) {
						callback({
								  status: DB_CODES.FAIL,
								  error: error
						});
						return;
					} else {
						if(! userRecords) {
							callback({
						    	status: REQUEST_CODES.FAIL,
						    	result: utils.formatText(USER_CODES.PASSWORD_UPDATE_FAIL, user.userId)
						    });
						} else {
							var newPassword = utils.encryptText(user.newPassword);
								UsersModel.update({ userId: user.userId },{ $set: { password: newPassword } }, function(error) {
							   		if(error) {
							   			callback({
							   					  status: DB_CODES.FAIL,
							   					  error: error
							   			});
							   			return;
							   		} else {
										callback({
												  status: REQUEST_CODES.SUCCESS,
												  result: utils.formatText(USER_CODES.PASSWORD_UPDATE_SUCCESS, user.userId)
										});
										return;
									}
							   });
						}
					}
				});
			}
		}

		function setPasswordToken(user, callback) {
			var errorList = [];
		    if (! user.email) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'email')
				};
				errorList.push(e);
		    }
			if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			}  else {
				var random = utils.getRandomNumber();
				var passwordResetToken = utils.encryptText(random);
				UsersModel.find({"email": user.email}, function(error, userRecords) {
					if (error) {
						console.log('Error In Retriving Data');
						callback({
								  status: DB_CODES.FAIL,
								  error: error
						});
						return;
					} else {
						if(userRecords.length == 0) {
							callback({
						    	status: REQUEST_CODES.FAIL,
						    	result: utils.formatText(USER_CODES.SET_PASSWORD_RESETTOKEN_FAIL, user.email)
						    });
						} else {
								var passwordResetExpires = Date.now() + 3600000;
								UsersModel.update({ email: user.email },{ $set: { passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires } }, function(error) {
						  			if(error) {
						  				callback({
						  						  status: DB_CODES.FAIL,
						  						  error: error
						  				});
						  				return;
						  			} else {
						  				var mailData = {
						  					toAddress : user.email,
						  					subject   : 'Password Reset Request From IOTMENTORCLUB',
						  					message   : '<html> <head> <link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Pacifico" rel="stylesheet"> </head> <style type="text/css">body{ background-color: linen;font-family: "Droid Sans Mono", monospace;}.center-block {padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;}#btn {background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;}img{max-width: 100%;width: 50%;min-width: 400px;height: 50%} #logo { margin: auto;font-family: "Pacifico", cursive;}.row {display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;}</style><body style="background-color: linen;font-family: &quot;Droid Sans Mono&quot;, monospace;"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;"><h1 id="logo" style="margin: auto;font-family: &quot;Pacifico&quot;, cursive;">IOTMENTORCLUB</h1> </div><span style="padding-left: 5px;">Dear'+ ' ' + user.email + '</span>,<div class="center-block" style="padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;"><h4>As per Your Request, The password reset request for your IOTMENTORCLUB account.</h4><p>Please use the following Reset Token to reset the password of your IOTMENTORCLUB Account</p><p id="btn" style="background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;">' + passwordResetToken + '</p><p><h4>If The request is not from you, then please ignore it.</h4></p></div></body></html>',
						  					successStatus   : REQUEST_CODES.SUCCESS,
						  					errorStatus     : REQUEST_CODES.FAIL,
						  					successMessage  : utils.formatText(USER_CODES.SET_PASSWORD_RESETTOKEN_SUCCESS, user.email)
						  				}
						  				mailHelper.sendMail(mailData, function(response) {
						  					callback(response);
						  				});
						  			}
						  		});
						}
					}
				});
			}
		}

		function resetPassword(user, callback) {
			var errorList = [];
		    if (! user.passwordResetToken) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'passwordResetToken')
				};
				errorList.push(e);
		    }
		    if (! user.password) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'Password')
				};
				errorList.push(e);
		    }
		    if (! user.confirmPassword) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'confirmPassword')
				};
				errorList.push(e);
		    }
		    if (user.password != user.confirmPassword) {
		    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.IS_NOT_MATCHED, 'password', 'confirmPassword')
				};
				errorList.push(e);
		    }    
			if (errorList.length) {
				throw {
				    status: REQUEST_CODES.FAIL,
				    error: errorList
				};
			} else {
					UsersModel.findOne({ passwordResetToken: user.passwordResetToken })
					  .where('passwordResetExpires').gt(Date.now())
					  .exec(function(error, userRecords) {
					  	if(error) {
					  		callback({
					  				  status: DB_CODES.FAIL,
					  				  error: error
					  		});
					  		return;
					  	} else {
					  		if(! userRecords) {
					  			callback({
					  		    	status: REQUEST_CODES.FAIL,
					  		    	result: utils.formatText(USER_CODES.PASSWORD_RESET_FAIL, user.passwordResetToken)
					  		    });
					  		} else {
						  		password = utils.encryptText(user.password);
						  		passwordResetToken = undefined;
						  		passwordResetExpires = null;
						  		var email = userRecords.email;
						  		UsersModel.update({ email: email },{ $set: { password: password, passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires } }, function(error) {
						  			if(error) {
				  						callback({
						  						  status: DB_CODES.FAIL,
						  						  error: error
						  				});
						  				return;
								  	} else {
								  		var mailData = {
						  					toAddress : email,
						  					subject   : 'Your IOTMENTORCLUB Password Successfully Changed',
						  					message   : '<html> <head> <link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Pacifico" rel="stylesheet"> </head> <style type="text/css">body{ background-color: linen;font-family: "Droid Sans Mono", monospace;}.center-block {padding-top: 5px;display: block;margin-left: auto;margin-right: auto;text-align: center;}#btn {background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;}img{max-width: 100%;width: 50%;min-width: 400px;height: 50%} #logo { margin: auto;font-family: "Pacifico", cursive;}.row {display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;}</style><body style="background-color: linen;font-family: &quot;Droid Sans Mono&quot;, monospace;"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;padding-right: 20px;margin-left: 15px;"><h1 id="logo" style="margin: auto;font-family: &quot;Pacifico&quot;, cursive;">IOTMENTORCLUB</h1> </div><span style="padding-left: 5px;">Dear'+ ' ' + email + '</span>,<div class="center-block" style="padding-top: 3px;display: block;margin-left: auto;margin-right: auto;text-align: center;"><h4>This is a confirmation that the password for your IOTMENTORCLUB account:</h4><p id="btn" style="background-color: #5ad3e6;border-left: 3px solid #2b6cce;border-right: 3px solid #2b6cce;padding: 10px;width: 50%;margin: auto;">' + email + '</p><p><h4>Resetted Succsfully.</h4></p></div></body></html>',
						  					successStatus   : REQUEST_CODES.SUCCESS,
						  					errorStatus     : REQUEST_CODES.FAIL,
						  					successMessage  : utils.formatText(USER_CODES.PASSWORD_RESET_SUCCESS, userRecords.email)
						  				}
						  				mailHelper.sendMail(mailData, function(response) {
						  					callback(response);
						  				});
								  	}
						  		});
						  	}
					  	}
					});
			}  
		}

		function getList(query, callback) {
			UsersModel.find(query, function(error, userRecords) {
				if(error) {
					callback({
						status: DB_CODES.FAIL,
						error: error
					});
					return;
				} else {
					userRecords = userRecords.map(function(userRecord) {
						var userRecordObj = new UsersController.UserAPI(userRecord);
						delete userRecordObj.password
						delete userRecordObj.isAdmin
						delete userRecordObj.passwordResetToken
						delete userRecordObj.passwordResetExpires
						delete userRecordObj.activationCode
						return userRecordObj;
					});
					callback({
						status: REQUEST_CODES.SUCCESS,
						result: userRecords
					});
					return;
				}
			});
		}		

		function getMissingUsers(taskRecords, callback) {
			var key = {
				'userId': 0
			};
			var userIds = [].concat.apply([], utils.formatResponse(taskRecords, key));

			UsersModel.find({"userId": { $nin: userIds } }, function(error, userRecords) {
				if (error) {
					callback({
						status: DB_CODES.FAIL,
						error: error
					});
					return;
				} else {
					userRecords = userRecords.map(function(userRecord) {
						var userRecordObj = new UsersController.UserAPI(userRecord);
						delete userRecordObj.password						
						delete userRecordObj.isAdmin
						delete userRecordObj.passwordResetToken
						delete userRecordObj.passwordResetExpires
						delete userRecordObj.activationCode
						return userRecordObj;
					});
					callback({
						status: REQUEST_CODES.SUCCESS,
						result: userRecords
					});
					return;		
				}
			});
		}

		module.exports.getDetails = getDetails;
		module.exports.create = create;
		module.exports.getList = getList;
		module.exports.update = update;
		module.exports.login = login;
		module.exports.updatePassword = updatePassword;
		module.exports.setPasswordToken = setPasswordToken;
		module.exports.resetPassword = resetPassword;
		module.exports.activateUser = activateUser;
		module.exports.getMissingUsers = getMissingUsers;