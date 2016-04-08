$(function() {
	$("form#get-address").submit(function() {
		$("ul#legislators li").remove();
 		$("h2").remove();
 		$("span.text-danger").addClass('hidden');
 		var submitted_street = $("input#street").val();
 		var submitted_citystate = $("input#citystate").val();
		var address = submitted_citystate + submitted_street;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK)
			{
				var latitude = results[0].geometry.location.lat();
    			var longitude = results[0].geometry.location.lng();
    			$.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=784bd7ba096644f588b91c2e918e6786&latitude=" + latitude + "&longitude=" + longitude)
				.done(function(responseJSON) {
	      		responseJSON.results.forEach(function(legislator) {
	      			if (legislator.chamber === "senate") {
	      				var title = "Senator";
	      				var legislator_class = "senate"
	      			} else {
	      				var title = "Representative";
	      				var legislator_class = "house"
	      			}
	      			if (legislator.party === "D") {
	      				var legislator_party_class = "democrat"
	      			} else if (legislator.party === "I") {
	      				var legislator_party_class = "independent"
	      			} else {
	      				var legislator_party_class = "republican"
	      			}
	        		$("ul#legislators").append("<li class='" + legislator_class + " " + legislator_party_class + "'>" + title + " " + legislator.first_name + " " + legislator.last_name + "," + " " + "(" + legislator.party + ")" + " " + "<a href='" + legislator.contact_form + "' class='btn btn-default contact'>Contact</a>" + "</li>");
				});
				$("ul#legislators").prepend("<h2>YOUR LEGISLATORS ARE:</h2>");

			});
			} else {
				$("span.text-danger").removeClass('hidden');
			}
		});

		return false;
	});
});
