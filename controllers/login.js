'use-strict'
app.controller('loginCTRL', [
	'$scope', '$http',
	function($scope, $http) {
		$http.get("https://spreadsheets.google.com/feeds/list/1v9yWK9_acCZKPyTKkP2epX3JokJfsLVFMJXFnVLQ12c/od6/public/values?alt=json")
	    	.success(function(response) {
	    		console.log(response.feed.entry[0].gsx$usertype.$t);
	    });
	}
]);