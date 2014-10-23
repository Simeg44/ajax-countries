var countryList = require("../models/countries.json");
var _ = require("underscore");

var indexController = {
	index: function(req, res) {
		res.render('index');
	},

	countries: function (req, res) {
		res.send(countryList);
	},

	search: function (req, res) {
		var requestCountry = req.body;
		var requested = Object.keys(requestCountry);

		var found = _.find(countryList, function(match){
			if (match.name.toUpperCase() === requested[0].toUpperCase()) {
				return match;
			}
		})
		res.send(found);
	}
};

module.exports = indexController;