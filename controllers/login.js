'use-strict'
app.controller('loginCTRL', [
	'$scope', '$http', '$mdSidenav',
	function($scope, $http, $mdSidenav) {
		
		$scope.defaults = {
			"login": [],
			"user": {
				"name": "",
				"pass": ""
			},
			"error": {
				"status": false,
				"message": ""
			}
		};

		var getAllUsers = function () {
			$http.get("https://spreadsheets.google.com/feeds/list/1v9yWK9_acCZKPyTKkP2epX3JokJfsLVFMJXFnVLQ12c/od6/public/values?alt=json")
				.success(function(response) {
					var users = response.feed.entry;
					for (var i = users.length - 1; i >= 0; i--) {
						$scope.defaults.login.push({"name": users[i].gsx$username.$t, "pass": users[i].gsx$password.$t, "type": users[i].gsx$usertype.$t});
					}
			});	    	
	    }

	    $scope.validateUser = function() {
	    	for (var i = $scope.defaults.login.length - 1; i >= 0; i--) {
	    		var user = $scope.defaults.login[i];
	    		if( user.name==$scope.defaults.user.name ) {
	    			if ( user.pass==$scope.defaults.user.pass ) {
	    				console.log("SUCCESS");
	    			} else {
		    			$scope.defaults.error.status = true;
		    			$scope.defaults.error.message = "Invalid Password";
	    			}
	    			break;
	    		} else {
	    			$scope.defaults.error.status = true;
	    			$scope.defaults.error.message = "User not found...";
	    		}
	    	}
	    }

	    $scope.toggleList = function() {
	    	printText("Toggle Clicked");
			$mdSidenav('left').toggle();
		}

		getAllUsers();
		console.log("Loaded");

		$scope.printText = function() {
			printText("TEST");
			$scope.toggleList();
		}

		var printText = function (msg) {
			console.log("INFO: "+msg);
		}
	}
]);