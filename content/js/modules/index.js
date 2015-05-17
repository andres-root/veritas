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
			$usersCont = $('.user-list__user'),
			$qualifyBtn = $('.userid'),
			$finderUsers = $('.user-list'),
			$qualifySec = $('.section-qualify'),
			$closeUser = $('.section-qualify__close'),
			$removeUser = $('.remove-user'),
			$mainFrame = $('.veritas-main'),
			userQualify = ko.observable(),
			loadUserUrl = $mainFrame.attr('data-load-user'),
			calcUserUrl = $mainFrame.attr('data-calc-user'),
			$userForm = $('.userForm');


		$userForm.on('submit', function(form){
			var userName = $(this).find('.input-username');
			showLoader();
			$.ajax({
				"url": loadUserUrl+userName.val(),
				"crossDomain": true,
				"contentType": 'application/json',
			}).done(function(response){
				hideLoader();
				response.indexData = true;

				// console.log(mycallback)
				if(typeof indexData() !== "object"){
					indexData(response);
					//console.log(indexData())
					ko.applyBindings(indexData, $finderUsers[0]);
				}else{
					indexData(response);
					indexData.valueHasMutated();
				}
			}).fail(function(error){
				hideLoader();
				console.log(error);
				$('.default-errors').fadeIn().delay(2500).fadeOut();
			});

			return false;

		});
		

		$usersCont.on("click", $qualifyBtn, function(evt){
			showLoader();
			var userId = $(this).find('.userid').attr('data-userid');

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
				
				var userName = userId;
				$.ajax({
					"url": calcUserUrl+userName,
					"method": "GET"
				}).done(function(response) {
					hideLoader();
					var errors = _.valuesIn(response.codeMetrics.errorTypes);
					
					response.userData = indexData();
					response.Linespercentage = ((errors.length*100)/13);

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
					hideLoader();
					console.log(error);
				});
			}
			
		});
		
		function showLoader(){
			$('.mask').addClass('active');
		}

		function hideLoader(){
			$('.mask').removeClass('active');
		}

		$closeUser.on("click", function(){
			$qualifySec.removeClass('active');
		});
	
});