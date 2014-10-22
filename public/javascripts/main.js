var createElement = function (country) {
	var el = $("<li>");
	el.append("<strong>" + country.name + "</strong>");
	el.append("<p>" + country.region + "</p>");

	return el;
}

$(function(){

	$("#load-countries").on("click", function() {
		$.get("/countries", {}, function (responseData) {
			console.log(responseData);

			$('#list').append("<h2>Country List</h2>");
			$('#list').append("<div class='country-container'><ul class='countries' id='country-list'></ul></div>");

			for (var i = 0; i < responseData.length; i++) {
				var country = createElement(responseData[i]);

				$("#country-list").append(country);
			};
		})
	});
})