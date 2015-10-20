(function(){
	var app = angular.module('starter', ['ionic','angularMoment'])
	
	app.controller('RedditCtrl', function($scope, $http){
		$scope.posts = [];
		$http.get('https://www.reddit.com/new/.json').success(function(posts){
			//console.log(posts);
			angular.forEach(posts.data.children,function(post){
				$scope.posts.push(post.data);
			});
		});
		$scope.cargarNuevos = function(){
			var params2 = {};
			if($scope.posts.length > 0){
				params2['after'] = $scope.posts[$scope.posts.length - 1].name;
			}
			$http.get('https://www.reddit.com/new/.json',{params:params2}).success(function(posts){
			//console.log(posts);
			angular.forEach(posts.data.children,function(post){
				$scope.posts.push(post.data);
			});
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});	
			
		};
		$scope.cargarPost = function(){
			if($scope.posts.length > 0){
			var params2 = {'before':$scope.posts[0].name};
			}else{
				return;
			}
			$http.get('https://www.reddit.com/new/.json',{params:params2}).success(function(posts){
			//console.log(posts);
				var newPosts = [];
			angular.forEach(posts.data.children,function(post){
				newPosts.push(post.data);
			});
				$scope.posts = newPosts.concat($scope.posts);
				$scope.$broadcast('scroll.refreshComplete');
			});	
		};
		$scope.openLink = function(url){
			window.open(url, '_blank');
		}
	});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
	  if(window.cordova && window.cordova.InAppBrowser){
		  window.open = window.cordova.InAppBrowser.open;
	  }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
