var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var User = function() {
    return {
        userId: 0,
        firstName: null,
        lastName: null,
        gender: null,
        email: null,
        password: null,
        isAdmin: null,
        passwordResetToken: null,
        passwordResetExpires: null,
        activationCode: null,
        dateCreated: 0,
        profilePictureId: 0,
        mobile: null,
        status: null
    }
};

function UserAPI(userRecord) {
    var user = new User();
    user.getUserId = function() {
        return this.userId;
    };
    user.setUserId = function(userId) {
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
    user.getFirstName = function() {
        return this.firstName;
    };
    user.setFirstName = function(firstName) {
        if (firstName) {
            if (firstName.length <= 50) {
                this.firstName = firstName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, firstName, 'firstName')
                };
            }
        }
    };
    user.getLastName = function() {
        return this.lastName;
    };
    user.setLastName = function(lastName) {
        if (lastName) {
            if (lastName.length <= 50) {
                this.lastName = lastName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, lastName, 'lastName')
                };
            }
        }
    };
    user.getGender = function() {
        return this.gender;
    };
    user.setGender = function(gender) {
        if (gender) {
            this.gender = gender;
        }
    };
    user.getEmail = function() {
        return this.email;
    };
    user.setEmail = function(email) {
        if (email && email.length) {
            if (email.length <= 100) {
                if (validate.isEmail(email)) {
                    console.log(validate.isEmail(email));
                    this.email = email;
                } else {
                    throw {
                        status: VALIDATE.FAIL,
                        error: utils.formatText(VALIDATE.NOT_AN_EMAIL, 'email')
                    };
                }
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, email, 'email')
                };
            }
        }
    };
    user.getPassword = function() {
        return this.password;
    };
    user.setPassword = function(password) {
        if (password) {
            this.password = password;
        }
    };
    user.getIsAdmin = function() {
        return this.isAdmin;
    };
    user.setIsAdmin = function(isAdmin) {
        if (isAdmin) {
            this.isAdmin = isAdmin;
        }
    };
    user.getPasswordResetToken = function() {
        return this.passwordResetToken;
    };
    user.setPasswordResetToken = function(passwordResetToken) {
        if (passwordResetToken) {
            this.passwordResetToken = passwordResetToken;
        }
    };        
    user.getPasswordResetExpires = function() {
        return this.passwordResetExpires;
    }
    user.setPasswordResetExpires = function(passwordResetExpires) {
        if (passwordResetExpires) {
            if (validate.isInteger(passwordResetExpires + '')) {
                this.passwordResetExpires = passwordResetExpires;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, passwordResetExpires, 'passwordResetExpires')
                };
            }
        }
    }
    user.getActivationCode = function() {
        return this.activationCode;
    };
    user.setActivationCode = function(activationCode) {
        if (activationCode) {
            this.activationCode = activationCode;
        }
    };
    user.getDateCreated = function() {
        return this.dateCreated;
    }
    user.setDateCreated = function(dateCreated) {
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
    user.getProfilePictureId = function() {
        return this.profilePictureId;
    }
    user.setProfilePictureId = function(profilePictureId) {
        if (profilePictureId) {
            if (validate.isInteger(profilePictureId)) {
                this.profilePictureId = profilePictureId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, profilePictureId, 'profilePictureId')
                };
            }
        }
    }
    user.getMobile = function() {
        return this.mobile;
    }
    user.setMobile = function(mobile) {
        if (mobile) {
            this.mobile = mobile;
        }
    }
    user.getStatus = function() {
        return this.status;
    }
    user.setStatus = function(status) {
        if (status) {
            this.status = status;
        }
    }

    if (userRecord) {
        var errorList = [];
        try {
            user.setUserId(userRecord.userId);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setFirstName(userRecord.firstName);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setLastName(userRecord.lastName);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setGender(userRecord.gender);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setEmail(userRecord.email);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setPassword(userRecord.password);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setIsAdmin(userRecord.isAdmin);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setPasswordResetToken(userRecord.passwordResetToken);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setPasswordResetExpires(userRecord.passwordResetExpires);
        } catch(e) {
            errorList.push(e);
        }
        try {
            user.setActivationCode(userRecord.activationCode);
        } catch (e) {
            errorList.push(e);
        }
        try {
            user.setDateCreated(userRecord.dateCreated);
        } catch(e) {
            errorList.push(e);
        }
        try {
            user.setProfilePictureId(userRecord.profilePictureId);
        } catch(e) {
            errorList.push(e);
        }
        try {
            user.setMobile(userRecord.mobile);
        } catch(e) {
            errorList.push(e);
        }
        try {
            user.setStatus(userRecord.status);
        } catch(e) {
            errorList.push(e);
        }
        if (errorList.length) {
            throw {
                status: REQUEST_CODES.FAIL,
                error: errorList
            };
        }
    }
    return user;
}

module.exports.UserAPI = UserAPI;