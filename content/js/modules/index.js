define([
	'jquery',
	'knockout',
	'lodash'
	], function(
		$,
		ko,
		_
	){
		var indexData = ko.observable(),
			$usersCont = $('.user-list__main-list'),
			$qualifyBtn = $('.userid'),
			$finderUsers = $('.user-list'),
			$qualifySec = $('.section-qualify'),
			$closeUser = $('.section-qualify__close'),
			$removeUser = $('.remove-user'),
			userQualify = ko.observable();

		$.ajax({
			"url": "../../content/json/index.json",
			"method": "GET"
		}).done(function(response){
			if(typeof indexData() !== "object"){
				indexData(response);
				ko.applyBindings(indexData, $finderUsers[0]);
			}else{
				indexData(response);
				indexData.valueHasMutated();
			}
		}).fail(function(error){
			console.log(error);
		});

		$usersCont.on("click", $qualifyBtn, function(evt){
			var userId = parseInt($(event.target).attr('data-userid'), 10);
			if($(event.target).hasClass('remove-user')){

				var cands = indexData(),
					newCandidates;
					newCandidates = _.reject(cands.candidates, function(candidate) {
						
					if(candidate.id === userId){
						
						return candidate;
					}
				});

				indexData().candidates = newCandidates;
				
				indexData.valueHasMutated();

				return false;
			}else{

				$.ajax({
					"url": "../../content/json/qualifyUser.json",
					"method": "GET",
					"data": {userid: userId}
				}).done(function(response) {
					var winHeight = $('body').height();
					if(typeof userQualify() !== "object"){
						
						userQualify(response);
						$qualifySec.css({'height': winHeight});
						ko.applyBindings(userQualify, $qualifySec[0]);
					}else{
						userQualify(response);
						userQualify.valueHasMutated();
					}
					window.scrollTo(0, 0);

				}).fail(function(error) {
					console.log(error);
				});
			}
			
		});

		$closeUser.on("click", function(){
			$qualifySec.removeClass('active');
		});
	
});