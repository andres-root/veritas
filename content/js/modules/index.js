define([
	'jquery',
	'knockout'
	], function(
		$,
		ko
	){

		var indexData;

		$.ajax({
			"url": "../../content/json/index.json",
			"method": "GET"
		}).done(function(response){
			console.log(response);
			indexData = response;
			ko.applyBindings(indexData);
		}).fail(function(error){
			console.log(error);
		});

});