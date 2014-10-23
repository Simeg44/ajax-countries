var createElement = function (country) {
	var el = $("<li>");
	el.append("<strong>" + country.name + "</strong>");
	el.append("<p>" + country.region + "</p>");

	return el;
}

$(function(){

	$("#load-countries").on("click", function(e) {
		$.get("/countries", {}, function (responseData) {
			console.log(responseData);
			$("#list").empty();

			$('#list').append("<h2>Country List</h2>");
			$('#list').append("<div class='country-container'><ul class='countries' id='country-list'></ul></div>");

			for (var i = 0; i < responseData.length; i++) {
				var country = createElement(responseData[i]);

				$("#country-list").append(country);
			};
		})
	});

	$("#search").on("submit", function(e) {
		e.preventDefault();
		var findCountry = $(this).find("[name=country]").val();
		// var searched = Object.keys(findCountry)

		$.post("/search", findCountry, function (responseData) {
			$("#list").empty();
			var searchResult = createElement(responseData);

			$('#list').append("<h2>Search Result</h2>");
			$('#list').append("<div class='country-container'><ul class='countries' id='country-list'></ul></div>");
			$("#country-list").append(searchResult);
		})
	})
})