const CONSTANTS = {
					
					"EVENT": {
						"CREATE_SUCCESS": "Event added successfully with eventId {0}",
						"CREATE_FAIL": "Failed in adding",
						"UPDATE_SUCCESS": "Event updated successfully with eventId {0}",
						"DELETE_SUCCESS": "Event with eventId {0} removed successfully"
					},
					"POST": {
						"CREATE_SUCCESS": "Post added successfully with postId {0}",
						"CREATE_FAIL": "Failed in adding",
						"UPDATE_SUCCESS": "Post with postId {0} updated successfully",
						"UPDATE_FAIL": "Post with postId {0} not updated successfully",
						"DELETE_SUCCESS": "Post with postId {0} removed successfully"
					},
					"COMMENT": {
						"CREATE_SUCCESS": "Comment added successfully with commentId {0}",
						"CREATE_FAIL": "Failed in adding",
						"UPDATE_SUCCESS": "Comment with commentId {0} updated successfully",
						"UPDATE_FAIL": "Comment with commentId {0} not updated successfully",
						"DELETE_SUCCESS": "Comment with commentId {0} removed successfully"
					},
					"DATABASE_CODES": {
						"FAIL": "Error in Database"
					},					
					"GENDER_TYPES": ['male', 'female'],
					"LANGUAGE": ['English', 'French'],
					"REQUEST_CODES": {
										"SUCCESS": "Success",
										"FAIL": "Error",
										"WARNING": "Warning"
									 },
					"USERS": {
							"CREATE_SUCCESS": "User created successfully with Email {0} Please Activate Your Account",
							"LOGIN_FAIL": "The credential associated with Email : {0} are incorrect (OR) Your account is not activated Yet",
							"DELETE_SUCCESS": "User with userId {0} removed successfully",
							"UPDATE_SUCCESS": "User with userId {0} updated successfully",
							"UPDATE_FAIL": "User with userId {0} not updated successfully",						
							"INVITATION_SUCCESS": "Invitation sended successfully to your friend {0}",
							"SET_PASSWORD_RESETTOKEN_FAIL": "No Account Matched With Your Email Address: '{0}'",
							"SET_PASSWORD_RESETTOKEN_SUCCESS": "Password Reset request sended successfully To: '{0}'",
							"PASSWORD_RESET_FAIL": "Password reset is failed, Your passwordResetToken '{0}' is wrong or expired",
							"PASSWORD_RESET_SUCCESS": "User with userId {0} password reset successfully",
							"RESET_SUCCESS": "User collection data reset successfully",
							"ACTIVATE_SUCCESS":"Your Account '{0}' Activated Successfully",
							"ACTIVATE_FAIL": "Your Account Activation Code: {0} is incorrect",
							"PASSWORD_UPDATE_SUCCESS": "User with userId {0} password updated successfully",
							"PASSWORD_UPDATE_FAIL": "User with userId {0} password updated failed your previous password is invalid"
					},
					"VALIDATE": {
									"DUPLICATE_PATIENT": "patient already exists with the same '{0}', '{1}', '{2}', '{3}' values.",
									"FAIL": "Validation Error",
									"FIELD_VALUE_INVALID": "field {0} value is invalid",
									"REQUIRED": "field '{0}' is required.",
									"IS_NOT_MATCHED": "field '{0}' is not matched with '{1}'.",
									"NOT_A_DATE": "field {0} is incorrect UTC Date",
									"NOT_AN_EMAIL": "field '{0}' is invalid email address",
									"NOT_A_PHONE": "field {0} is invalid phone value",
									"NOT_A_MOBILE_PHONE": "{0} is not a valid mobile phone value for field {1}",
									"NOT_A_INTEGER": "{0} is not a valid integer value for field {1}",
									"NOT_A_NUMBER": "field {0} is invalid number value",
									"NOT_A_VALUE": "field {0} can't be empty.",
									"NOT_A_VALID_GENDER":  "{0} is not a valid gender type.",
									"VALUE_TOO_BIG": "field {0} data is too large"									
								},
					"MIN_VALUE": "1000",
					"MAX_VALUE": "9999",
					"ALLOWED_FILE_DOWNLOAD_DOMAINS": ['http://localhost:3003/', 'http://lucidact.edvenswa.com:3003/', 'http://carelity:3003/']
				  };

module.exports.CONSTANTS = CONSTANTS;