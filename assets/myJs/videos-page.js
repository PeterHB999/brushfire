$(function whenDomIsReady(){

	$('.the-submit-video-form').submit(function(e) {
		e.preventDefault();

		var newVideo = {
			title: $('.the-submit-video-form input[name="title"]').val(),
			src: $('.the-submit-video-form input[name="src"]').val()
		};

		$('.the-submit-video-form input').val('');
		$('.the-submit-video-form button').text('Submitting...');
		$('.the-submit-video-form button').prop('disabled', true);

		// /var parser = document.createElement('a');
		// parser.href = newVideo.src;
		// var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);
		var youtubeID = newVideo.src.substring(newVideo.src.indexOf("=") + 1, newVideo.src.length);
		newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

		setTimeout(function() {
			var newVideoHtml ='<li class="video">' +
			'  <h2>' + newVideo.title + '</h2>' +
			'  <iframe width="640" height="390" src="' + newVideo.src +
			'" frameborder="0" allowfullscreen></iframe>' + '</li>';

			$('.the-list-of-videos').prepend(newVideoHtml);
			$('.the-submit-video-form button').text('Submit Video');
			$('.the-submit-video-form button').prop('disabled', false);
		}, 750);
	});

	$('.the-list-of-videos .loading').show();
	setTimeout(function afterRetrievingVideos() {
		var videos = [{
			title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
			src: 'https://www.youtube.com/embed/9bZkp7q19f0'
		}, {
			title: 'Justin Bieber - Baby ft. Ludacris',
			src: 'https://www.youtube.com/embed/kffacxfA7G4'
		}, {
			title: 'Charlie bit my finger - again !',
			src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
		}];

		$('.the-list-of-videos .loading').hide();

		var videosHtml = _.reduce(videos, function(html, video) {
			html += '<li class="video">'+
			' <h2>' + video.title + '</h2>'+
			' <iframe width="640" height="390" src="' + video.src +'" frameborder="0" allowfullscreen></iframe>' +
			' </li>';
			return html;
		}, '');

		$('.the-list-of-videos ul').replaceWith(videosHtml);
	}, 750);
});
