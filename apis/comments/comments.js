module.exports = function(app) {
	app.post('/ui/comment', function(req, res) {
		try {
			create(req.body, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.get('/ui/query/comment', function(req, res) {
			try {
				getList(req.query, function(response) {
					res.json(response);
				});
			} catch(e) {
				res.json(e);
			}
		});
	app.get('/ui/comment/:commentId', function(req, res) {
		try {
			getDetails(req.params.commentId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.put('/ui/comment', function(req, res) {
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

var CommentsSchema = new Schema(require('./commentsSchema').commentsSchema, {collection: 'comments'});
var CommentsModel = mongoose.model('comments', CommentsSchema);
var CommentsController = require('./commentsController');


var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var COMMENT_CODES = utils.CONSTANTS.COMMENT;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;
var apiModule = 'comments';

function getDetails(commentId, callback) {
	CommentsModel.find({"commentId": commentId}, function(error, commentRecords) {
		if (error) {
			callback({
					  status: DB_CODES.FAIL,
					  error: error
			});
			return;
		} else {
			commentRecords = commentRecords.map(function(commentRecord) {
				return new CommentsController.CommentsAPI(commentRecord);
			});
            callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: commentRecords
			});
			return;		
		}
	});
}

function create(comment, callback) {
	console.log('begining :: ' + JSON.stringify(comment));
	var CommentsAPI = CommentsController.CommentsAPI(comment);
	console.log('after controller :: ');
	var errorList = [];
    if (! CommentsAPI.getComment()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'comment')
		};
		errorList.push(e);
    } 
    if (! CommentsAPI.getUserId()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'userId')
		};
		errorList.push(e);
    }
    if (! CommentsAPI.getPostId()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'postId')
		};
		errorList.push(e);
    }
   	if (errorList.length) {
		throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	}  else {
	   	CommentsAPI.setStatus('active');
	   	CommentsAPI.setDateCreated(utils.getSystemTime());
	   	var commentsModel = new CommentsModel(CommentsAPI);
	   	mongoUtils.getNextSequence('commentId', function(oSeq) {
			commentsModel.commentId = oSeq;
			commentsModel.save(function(error) {
				if (error) {
					callback({
							  status: DB_CODES.FAIL,
							  error: error
					});
					return;
				} else {
					callback({
							  status: REQUEST_CODES.SUCCESS,
							  result: utils.formatText(COMMENT_CODES.CREATE_SUCCESS, commentsModel.commentId)
					});
					return;
				}
			});
		});
	}
}

function update(comment, callback) {
	var errorList = [];
    if (! comment.commentId) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'commentId')
		};
		errorList.push(e);
    } 
    if (! comment.comment) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'comment')
		};
		errorList.push(e);
    } 
    /*if (! comment.userId) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'userId')
		};
		errorList.push(e);
    }
    if (! comment.postId) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'postId')
		};
		errorList.push(e);
    }*/
   	if (errorList.length) {
		throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	} else {
		CommentsModel.update({ commentId: comment.commentId },{ $set: comment}, function(error) {
	   		if(error) {
	   			callback({
	   					  status: DB_CODES.FAIL,
	   					  error: error
	   			});
	   		return;
	   		} else {
				callback({
						  status: REQUEST_CODES.SUCCESS,
						  result: utils.formatText(COMMENT_CODES.UPDATE_SUCCESS, comment.commentId)
				});
				return;
			}
	   });
	}
}

function getList(query, callback) {
	CommentsModel.find(query, function(error, commentRecords) {
		if (error) {
			callback({
					  status: DB_CODES.FAIL,
					  error: error
			});
			return;
		} else {
			commentRecords = commentRecords.map(function(commentRecord) {
				return new CommentsController.CommentsAPI(commentRecord);
			});
            callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: commentRecords
			});
			return;		
		}
	});
}


module.exports.getDetails = getDetails;
module.exports.create = create;
module.exports.update = update;
module.exports.getList = getList;
