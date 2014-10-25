var createElement = function (country) {
	var el = $("<li>");

	// Get id of database object and attach it to
	// LI element
	el.attr("data-id", country._id);

	// Attach countries to DOM
	el.append("<strong>" + country.name + "</strong>");
	el.append("<p><em>" + country.region + "</em></p>");
	el.append("<p>French Name: " + country.frenchName + "</p>");
	el.append("<p>Local Name: " + country.localName + "</p>");

	// Append "has traveled" toggle icon
	el
	.append("<span class='not-traveled fa-stack fa-lg'><i class='fa fa-circle-o fa-stack-2x'></i><i class='fa fa-stack-1x fa-plane'></i></span>")

	return el;
}

$(function(){

	$("#load-countries").on("click", function(e) {
		// Clear any remaining entries from the search box
		$("#search").find("[name=country]").val("");

		$.get("/countries", {}, function (responseData) {
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

		$.post("/search", findCountry, function (responseData) {
			$("#list").empty();
			console.log(responseData);

			$('#list').append("<h2>Search Results</h2>");
			$('#list').append("<div class='country-container'><ul class='countries' id='country-list'></ul></div>");

			if (responseData.length === 0) {
				$("#country-list").append("<strong class='not-found'>Country not found</strong>");
			}

			for (var i = 0; i < responseData.length; i++) {
				var country = createElement(responseData[i]);

				$("#country-list").append(country);
			};
			findCountry.val("");
			// var searchResult = createElement(responseData);

			// $('#list').append("<h2>Search Result</h2>");
			// $('#list').append("<div class='country-container'><ul class='countries' id='country-list'></ul></div>");
			// $("#country-list").append(searchResult);
		})
	});

	// Change color of travel icon to green on hover
	$(document).on("mouseover", ".not-traveled", function() {
		$(this).css("color", "#5e9e5f");
	});
	$(document).on("mouseleave", ".not-traveled", function() {
		$(this).css("color", "#666666");
	});

	// Change class of not-travel element when clicked
	$(document).on("click", ".not-traveled", function() {

		var icon = $(this);
		var countryId = icon.closest("li").attr("data-id");
		console.log("id", countryId);

		$.get("/api/traveled", {id: countryId}, function(responseData){
			console.log(responseData);
			// If the attempt to add "traveled" key was successful
			// then change the class of its element
			if (responseData.success) {
				icon.removeClass("not-traveled").addClass("traveled");
			}
		})
	});

	// Change class of traveled element
	$(document).on("click", ".traveled", function() {
		var icon = $(this);
		var countryId = icon.closest("li").attr("data-id");

		$.get("/api/untraveled", {id: countryId}, function(responseData){
			console.log(responseData);
			// If the attempt to add "traveled" key was successful
			// then change the class of its element
			if (responseData.success) {
				icon.removeClass("traveled").addClass("not-traveled");
			}
		})
	});

})





