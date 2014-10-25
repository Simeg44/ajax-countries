var Country = require("../models/schema.js");

var match = function(requested, results){
	var matching = [];
	// Loop through all the countries in database
	results.map(function(match){
		// Check to see if the string matches any part of the country name
		var matcher = match.name.toUpperCase();
		var regEx = matcher.match(requested);
		if (regEx != null) {
			// If it matches push it to a separate array
			matching.push(match);
		}

	});
	return matching;
}

var apiController = {
	search: function (req, res) {
		// Get key value of req which is searched string
		var requestCountry = req.body;
		var key = Object.keys(requestCountry);

		// Create regexp to match that string
		var requested = new RegExp(key[0].toUpperCase(), "g");
		console.log("requested:", requested);
		var matching = [];
		var array = [];

		Country.find({}, function(err, results){
			// call match function and send it everything
			// from the db and user requested regEx string
			// to find every item matching it
			var matching = match(requested, results);
			res.send(matching);

		})
	},

	traveled: function (req, res) {
		var id = req.query.id;
		
		Country.update({_id: id}, {$set: {traveled: true}}, function(err, results) {
			
			res.send({
				err: err,
				results: results,
				success: err === null
			})
		})
	},

	untraveled: function(req, res) {
		var id = req.query.id;

		Country.update({_id: id}, {$set: {traveled: null}}, function(err, results) {
			
			res.send({
				err: err,
				results: results,
				success: err === null
			})
		})
	}
}

module.exports = apiController;