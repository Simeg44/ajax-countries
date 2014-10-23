var mongoose = require("mongoose");

var countrySchema = mongoose.Schema({
	name: String,
	frenchName: String,
	localName: String,
	region: String
});

module.exports = mongoose.model("countries", countrySchema);