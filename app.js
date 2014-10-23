var express = require('express');
var bodyParser = require('body-parser');

var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Index controller
app.get('/', indexController.index);
app.get("/countries", indexController.countries);

// Api controller
app.post("/search", apiController.search);
app.get("/api/traveled", apiController.traveled);

var server = app.listen(5484, function() {
	console.log('Express server listening on port ' + server.address().port);
});
