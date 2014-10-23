var countryList = require("../models/countries.json");

var apiController = {
	search: function (req, res) {
		// Get key value of req which is searched string
		var requestCountry = req.body;
		var key = Object.keys(requestCountry);

		// Create regexp to match that string
		var requested = new RegExp(key[0].toUpperCase(), "g");
		console.log("requested:", requested);
		var matching = [];

		// Loop through all the countries in database
		countryList.map(function(match){
			// Check to see if the string matches any part of the country name
			var matcher = match.name.toUpperCase();
			var regEx = matcher.match(requested);
			if (regEx != null) {
				// If it matches push it to a separate array
				matching.push(match);
			}

		});
		res.send(matching);
	},

	traveled: function (req, res) {
		console.log(req.params.id);
	}
}

module.exports = apiController;