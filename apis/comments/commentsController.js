var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var Comment = function() {
    return {
        commentId: 0,
        comment: null,
        userId: 0,
        postId: 0,
        dateCreated: 0,
        status: null
    }
};

function CommentsAPI(commentRecord) {
    var comment = new Comment();
    console.log('commentRecord :: ' + JSON.stringify(commentRecord));
    console.log('comment :: ' + JSON.stringify(comment));

    comment.getCommentId = function() {
        return this.commentId;
    }
    comment.setCommentId = function(commentId) {
        if(commentId) {
            if (validate.isInteger(commentId + '')) {
                this.commentId = commentId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, commentId, 'commentId')
                };
            }
        }
    }    
    comment.getComment = function() {
        return this.comment;
    };
    comment.setComment = function(comment) {
        if (comment) {
            if (comment.length <= 350) {
                this.comment = comment;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, comment, 'comment')
                };
            }
        }
    };
    comment.getUserId = function() {
        return this.userId;
    };
    comment.setUserId = function(userId) {
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
    comment.getPostId = function() {
        return this.postId;
    };
    comment.setPostId = function(postId) {
        if (postId) {
            this.postId = postId;
        }
    };
    comment.getDateCreated = function() {
        return this.dateCreated;
    }
    comment.setDateCreated = function(dateCreated) {
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
    comment.getStatus = function() {
        return this.status;
    }
    comment.setStatus = function(status) {
        if (status) {
            this.status = status;
        }
    }

    if (commentRecord) {
        var errorList = [];
        try {
            comment.setCommentId(commentRecord.commentId);
        } catch (e) {
            console.log(' 1 :: ' );
            errorList.push(e);
        }
        try {
            comment.setComment(commentRecord.comment);
        } catch(e) {
            console.log(' 2 :: ' );
            errorList.push(e);
        }
        try {
            comment.setUserId(commentRecord.userId);
        } catch(e) {
            console.log(' 3 :: ' );
            errorList.push(e);
        }
        try {
            comment.setPostId(commentRecord.postId);
        } catch(e) {
            console.log(' 4 :: ' );
            errorList.push(e);
        }
        try {
            comment.setDateCreated(commentRecord.dateCreated);
        } catch(e) {
            console.log(' 5 :: ' );
            errorList.push(e);
        }
        try {
            comment.setStatus(commentRecord.status);
        } catch(e) {
            console.log(' 6 :: ' );
            errorList.push(e);
        }
        if (errorList.length) {
            console.log(' errorList :: ' + JSON.stringify(errorList));
            throw {
                status: REQUEST_CODES.FAIL,
                error: errorList
            };
        }
    }
    return comment;
}

module.exports.CommentsAPI = CommentsAPI;