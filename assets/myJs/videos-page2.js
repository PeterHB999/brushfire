angular.module('brushfire_videosPage', [])
.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'*://www.youtube.com/**'
	]);
});

angular.module('brushfire_videosPage').controller('PageCtrl', [
	'$scope', '$http',
	function($scope, $http) {

		$scope.videosLoading = true;

		 $scope.submitVideosError = false;

		// $http.get('/video?sort=id desc')
		// .then(function onSuccess(sailsResponse) {
		// 	$scope.videos = sailsResponse.data;
		// })
		// .catch(function onError(sailsResponse) {
		// 	if (sailsResponse.data.status == '404') {
		// 		return;
		// 	}
		// 	console.log("An unexpected error occured: " + sailsResponse.data.statusText);
		// })
		// .finally(function eitherWay() {
		// 	$scope.videosLoading = false;
		// });

		io.socket.get('/video?sort=id desc', function whenServerResponds(data, JWR) {
			$scope.videosLoading = false;

			if (JWR.statusCode >= 400) {
				$scope.submitVideosError = true;
				console.log('something bad happened');
				return;
			}
			$scope.videos = data;

			$scope.$apply();

			io.socket.on('video', function whenAVideoIsCreatedUpdatedOrDestroyed(event) {

        // Add the new video to the DOM
        $scope.videos.unshift({
          title: event.data.title,
          src: event.data.src,

        });

        // Apply the changes to the DOM
        // (we have to do this since `io.socket.get` is not a
        // angular-specific magical promisy-thing)
        $scope.$apply();
      });
		});

		$scope.submitNewVideo = function() {

			if ($scope.busySubmittingVideo) {
				return;
			}

			var _newVideo = {
				title: $scope.newVideoTitle + "!!!",
				src: $scope.newVideoSrc
			};

			var parser = document.createElement('a');
			parser.href = _newVideo.src;
			var youtubeID = parser.search.substring(parser.search.indexOf("=") + 1, parser.search.length);

			_newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

			$scope.busySubmittingVideo = true;

			// $http.post('/video', {
			// 	title: _newVideo.title,
			// 	src: _newVideo.src
			// })
			// .then(function onSuccess(sailsResponse) {
			// 	$scope.videos.unshift(_newVideo);
			// })
			// .catch(function onError(sailsResponse) {
			// 	console.log("An unexpected error occurred: " + sailsResponse.data.statusText);
			// })
			// .finally(function eitherWay() {
			// 	$scope.busySubmittingVideo = false;
			// 	$scope.newVideoTitle = '';
			// 	$scope.newVideoSrc = '';
			// });

			io.socket.post('/video', {
				title: _newVideo.title,
				src: _newVideo.src
			}, function whenServerResponds(data, JWR) {

				$scope.videosLoading = false;

				if (JWR.statusCode >= 400) {
					$scope.submitVideosError = true;
					console.log('something bad happened');
					return;
				}

				$scope.videos.unshift(_newVideo);

				$scope.busySubmittingVideo = false;

				$scope.newVideoTitle = '';
				$scope.newVideoSrc = '';

				$scope.$apply();
			});

		};
	}
]);
