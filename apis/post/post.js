module.exports = function(app) {
	app.post('/ui/post', function(req, res) {
		try {
			create(req.body, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.get('/ui/query/post', function(req, res) {
		try {
			getList(req.query, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.get('/ui/post/:postId', function(req, res) {
		try {
			getDetails(req.params.postId, function(response) {
				res.json(response);
			});
		} catch(e) {
			res.json(e);
		}
	});
	app.put('/ui/post', function(req, res) {
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

var PostSchema = new Schema(require('./postSchema').postSchema, {collection: 'post'});
var PostModel = mongoose.model('post', PostSchema);
var PostController = require('./postController');


var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var DB_CODES = CONSTANTS.DATABASE_CODES;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var POST_CODES = utils.CONSTANTS.POST;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var mongoUtils = utils.mongoUtils;
var apiModule = 'post';

function getDetails(postId, callback) {
	PostModel.find({"postId": postId}, function(error, postRecords) {
		if (error) {
			callback({
					  status: DB_CODES.FAIL,
					  error: error
			});
			return;
		} else {
			postRecords = postRecords.map(function(postRecord) {
				var postRecordObj = new PostController.PostAPI(postRecord);
				delete postRecordObj.postOwner
				return postRecordObj;
			});
            callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: postRecords
			});
			return;		
		}
	});
}

function create(post, callback) {
	console.log('begining :: ' + JSON.stringify(post));
	var postAPI = PostController.PostAPI(post);
	console.log('after controller :: ');
	var errorList = [];
    if (! postAPI.getpostName()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'postName')
		};
		errorList.push(e);
    } 
    if (! postAPI.getAuthor()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'authour')
		};
		errorList.push(e);
    }
    if (! postAPI.getCategory()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'category')
		};
		errorList.push(e);
    }
    if (! postAPI.getContent()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'content')
		};
		errorList.push(e);
    }
    if (! postAPI.getpostOwner()) {
    	var e = {
					status: VALIDATE.FAIL,
					error: utils.formatText(VALIDATE.REQUIRED, 'postOwner')
		};
		errorList.push(e);
    }
   
   	if (errorList.length) {
		throw {
		    status: REQUEST_CODES.FAIL,
		    error: errorList
		};
	}  else {
	   	postAPI.setStatus('active');
	   	postAPI.setDateCreated(utils.getSystemTime());
	   	var postModel = new PostModel(postAPI);
	   	mongoUtils.getNextSequence('postId', function(oSeq) {
			postModel.postId = oSeq;
			postModel.save(function(error) {
				if (error) {
					callback({
							  status: DB_CODES.FAIL,
							  error: error
					});
					return;
				} else {
					callback({
							  status: REQUEST_CODES.SUCCESS,
							  result: utils.formatText(POST_CODES.CREATE_SUCCESS, postModel.postId)
					});
					return;
				}
			});
		});
	}
}

function update(post, callback) {
	PostModel.update({ postId: post.postId },{ $set: post}, function(error) {
   		if(error) {
   			callback({
   					  status: DB_CODES.FAIL,
   					  error: error
   			});
   		return;
   		} else {
			callback({
					  status: REQUEST_CODES.SUCCESS,
					  result: utils.formatText(POST_CODES.UPDATE_SUCCESS, post.postId)
			});
			return;
		}
   });
}

function getList(query, callback) {
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");
	console.log("THe Query Requested Is:");
	console.log(query);
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");
	console.log("***************************************");

	if (query.limit) {
		console.log("limit ==" + " " + query.limit);
		var postReqQuery = {};
		console.log("postReqQuery ==");
		console.log(postReqQuery);

		console.log("***************************************");
		console.log("***************************************");
		console.log("***************************************");
		var limitColl = query.limit;
		console.log(limitColl);

		console.log("***************************************");
		console.log("***************************************");
		console.log("***************************************");

		PostModel.find(postReqQuery, function(error, postRecords) {
			if (error) {
				callback({
						  status: DB_CODES.FAIL,
						  error: error
				});
				return;
			} else {
				postRecords = postRecords.map(function(postRecord) {
					var postRecordObj = new PostController.PostAPI(postRecord);
					delete postRecordObj.postOwner
					return postRecordObj;
				});
	            callback({
						  status: REQUEST_CODES.SUCCESS,
						  result: postRecords
				});
				return;		
			}
		}).limit(2);
		console.log("***************************************");
		console.log("***************************************");
		console.log("***************************************");
		console.log(limitColl);
		console.log("***************************************");
		console.log("***************************************");
		console.log("***************************************");
	} else {
		console.log("Query without limit");

		PostModel.find(query, function(error, postRecords) {
			if (error) {
				callback({
						  status: DB_CODES.FAIL,
						  error: error
				});
				return;
			} else {
				postRecords = postRecords.map(function(postRecord) {
					var postRecordObj = new PostController.PostAPI(postRecord);
					delete postRecordObj.postOwner
					return postRecordObj;
				});
	            callback({
						  status: REQUEST_CODES.SUCCESS,
						  result: postRecords
				});
				return;		
			}
		}).sort({postId: -1});
	}	
}


module.exports.getDetails = getDetails;
module.exports.create = create;
module.exports.update = update;
module.exports.getList = getList;
