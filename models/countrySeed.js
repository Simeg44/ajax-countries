var mongoose = require("mongoose");
var Country = require("./schema.js");
var countryList = require("./countries.json");

Country.find({}, function(err, results){

	if(results.length < countryList.length){
		// Cycle through json file and create mongoose
		// schema of each entry
		countryList.map(function(country) {
			var newCountry = new Country({
				name: country.name,
				frenchName: country.frenchName,
				localName: country.localName,
				region: country.region
			})

			// Save country to mongo db
			newCountry.save();
		});
	}

});
