var mongoose = require('mongoose'),
config = require('../libs/config'),
db = mongoose.connect('mongodb://'+config.get('mongoose:host')+'/'+config.get('mongoose:dbName'), {server: {auto_reconnect: true}});
//db.on('erroror', console.erroror.bind(console, 'connection erroror:')),

//db.open();
/*
db.on('open', function (ref) {
  console.log('Connected to mongo server.-Connection Open');
});

db.on('close', function (ref) {
  console.log('Connection to mongo server has been closed. -Connection Closed');
});
*/
var onerror = function(error,callback){
 mongoose.connection.close();
 callback(error);
};

module.exports.db = db;