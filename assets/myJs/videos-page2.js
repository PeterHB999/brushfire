angular.module('brushfire_videosPage', [])
.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'*://www.youtube.com/**'
	]);
});

angular.module('brushfire_videosPage').controller('PageCtrl', [
	'$scope', '$timeout',
	function($scope, $timeout ){
		$scope.videosLoading = true;
		$timeout(function afterRetrievingVideos() {
			var _videos = [{
				title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
				src: 'https://www.youtube.com/embed/9bZkp7q19f0'
			}, {
				title: 'Justin Bieber - Baby ft. Ludacris',
				src: 'https://www.youtube.com/embed/kffacxfA7G4'
			}, {
				title: 'Charlie bit my finger - again !',
				src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
			}];

			$scope.videosLoading = false;

			$scope.videos = _videos;
		}, 750);

		$scope.submitNewVideo = function() {

			if ($scope.busySubmittingVideo) {
				return;
			}

			var _newVideo = {
				title: $scope.newVideoTitle,
				src: $scope.newVideoSrc
			};

			var parser = document.createElement('a');
			parser.href = _newVideo.src;
			var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);

			_newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

			$scope.busySubmittingVideo = true;

			$timeout(function() {
				$scope.videos.unshift(_newVideo);
				$scope.busySubmittingVideo = false;
				$scope.newVideoTitle = '';
				$scope.newVideoSrc = '';
			}, 750);
		};
	}
]);
