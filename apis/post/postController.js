var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

var Post = function() {
    return {
        postId: 0,
        postName: null,
        author: null,
        category: null,
        content: null,
        postType: null,
        postOwner: 0,
        dateCreated: 0,
        status: null
    }
};

function PostAPI(postRecord) { 
    var post = new Post();
    /*console.log('postRecord :: ' + JSON.stringify(postRecord));
    console.log('post :: ' + JSON.stringify(post));*/
    post.getpostId = function() {
        return this.postId;
    };
    post.setpostId = function(postId) {
        if (postId) {
            if (validate.isInteger(postId + '')) {
                this.postId = postId;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.NOT_A_INTEGER, postId, 'postId')
                };
            }
        }
    };
    post.getpostName = function() {
        return this.postName;
    };
    post.setpostName = function(postName) {
        if (postName) {
            if (postName.length <= 50) {
                this.postName = postName;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, postName, 'postName')
                };
            }
        }
    };
    post.getAuthor = function() {
        return this.author;
    };
    post.setAuthor = function(author) {
        if (author) {
            if (author.length <= 50) {
                this.author = author;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, author, 'author')
                };
            }
        }
    };
    post.getCategory = function() {
        return this.category;
    };
    post.setCategory = function(category) {
        if (category) {
            this.category = category;
        }
    };
    post.getContent = function() {
        return this.content;
    };
    post.setContent = function(content) {
        if (content) {
            if (content.length <= 5000) {
                this.content = content;
            } else {
                throw {
                    status: VALIDATE.FAIL,
                    error: utils.formatText(VALIDATE.VALUE_TOO_BIG, content, 'content')
                };
            }
        }
    };
    post.getpostType = function() {
        return this.category;
    };
    post.setpostType = function(postType) {
        if (postType) {
            this.postType = postType;
        }
    };
    post.getpostOwner = function() {
        return this.postOwner;
    };
    post.setpostOwner = function(postOwner) {
        if (postOwner) {
            this.postOwner = postOwner;
        }
    };
    post.getDateCreated = function() {
        return this.dateCreated;
    }
    post.setDateCreated = function(dateCreated) {
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
    post.getStatus = function() {
        return this.status;
    }
    post.setStatus = function(status) {
        if (status) {
            this.status = status;
        }
    }

    if (postRecord) {
        var errorList = [];
        try {
            post.setpostId(postRecord.postId);
        } catch (e) {
            console.log(' 1 :: ' );
            errorList.push(e);
        }
        try {
            post.setpostName(postRecord.postName);
        } catch (e) {
            console.log(' 2 :: ' );
            errorList.push(e);
        }
        try {
            post.setAuthor(postRecord.author);
        } catch (e) {
            console.log(' 3 :: ' );
            errorList.push(e);
        }
        try {
            post.setCategory(postRecord.category);
        } catch (e) {
            console.log(' 4 :: ' );
            errorList.push(e);
        }
        try {
            post.setContent(postRecord.content);
        } catch (e) {
            console.log(' 3 :: ' );
            errorList.push(e);
        }
        try {
            post.setpostType(postRecord.postType);
        } catch (e) {
            console.log(' 5 :: ' );
            errorList.push(e);
        }
        try {
            post.setpostOwner(postRecord.postOwner);
        } catch (e) {
            console.log(' 6 :: ' );
            errorList.push(e);
        }
        try {
            post.setDateCreated(postRecord.dateCreated);
        } catch(e) {
            console.log(' 7 :: ' );
            errorList.push(e);
        }
        try {
            post.setStatus(postRecord.status);
        } catch(e) {
            console.log(' 8 :: ' );
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
    return post;
}

module.exports.PostAPI = PostAPI;