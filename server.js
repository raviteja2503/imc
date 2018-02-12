var express = require('express'),
	multer = require('multer'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    fs = require('fs'),
	db = require('./db/mongoose-data').db,
	_ = require('underscore');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

	app = express();

var CONSTANTS = require('./assets/utils').utils.CONSTANTS;

app.use('/', express.static(path.join(__dirname, '/')));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.set('view' , __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(errorhandler());
app.use(multer({ dest: './uploads/',
		rename: function (fieldname, filename) {
			return Math.random()+Date.now();
		},
		onFileUploadStart: function (file) {
			console.log(file.originalname + ' is starting ...')
		},
		onFileUploadComplete: function (file) {
			console.log(file.fieldname + ' uploaded to  ' + file.path)
			done=true;
		}
	}).single('fileToUpload')
);
//app.use('/', express.static(path.join(__dirname, '/')));

app.use(function(req, res, next){
	next();
});

var routes = require('./apis/routes');
routes(app);

//Start Server

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	app.listen(5050, function(){
	    console.log(app.settings.env + ';__dirname:' + __dirname + ';');
	    console.log('IOTMentor Club API Server started @ Port : ' + this.address().port);
	}); 
  	console.log(`Worker ${process.pid} started`);
}

