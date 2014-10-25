// var countryList = require("../models/countries.json");
var Country = require("../models/schema.js");
var _ = require("underscore");

var indexController = {
	index: function(req, res) {
		res.render('index');
	},

	countries: function (req, res) {
		Country.find({}, function(err, results){
			// send back each item in list
			_.sortBy(results.name.en, function(name) {
				return name;
			})
			res.send(results);
		})
	}

};

module.exports = indexController;