$(document).ready(function() {
	$("script[type='text/lryic']").each(function(index, value) {

		var $elem = $(value);
		var lrcFormat = $elem.text().trim(),
			lrcArray = lrcFormat.split("\n"),
			lrcTimeline = new Array();
		var lrcTitle, lrcAuthor, lrcMaxtime = 0,
			lrcGaptime = 5;
		var html = '',
			htmlHeader = '',
			htmlBody = '';
		var reg_header = /\[(\w*)\:(.*?)\]/g,
			reg_body = /\[(\d*):(\d*)([\.|\:]\d*)\](.*)/g;
		var lryHeader = {
			'ti': 'Title',
			'ar': 'Author',
			'al': 'Album',
			'by': 'Creator',
			'au': '',
			'length': '',
			'offset': '',
		};
		for (var i in lrcArray) {
			lrcArray[i].replace(reg_header, function() {
				htmlHeader += '<span class="mr15">' + lryHeader[arguments[1]] + ' : ' + arguments[2] + '</span>';
			});
			lrcArray[i].replace(reg_body, function() {
				var min = arguments[1] | 0,
					sec = arguments[2] | 0,
					realMin = min * 60 + sec;
				lrcMaxtime = Math.max(lrcMaxtime, realMin + lrcGaptime);
				lrcTimeline.push(realMin);
				htmlBody += '<p class="lrc-line animated" data-timeLine="' + realMin + '" style="display: none;">' + arguments[4] + '</p>';
			});
		}
		htmlHeader = '<p class="lrc-line" data-timeLine="0">' + htmlHeader + '</p>';
		html = htmlHeader + htmlBody;
		html = '<div class="lrc-block">' + html + '</div>';
		html = '<div class="lrc-wrap">' + html + '</div>';
		$elem.after(html);
		var current_time = 0;
		var timer = setInterval(function() {
			current_time++;
			current_time %= lrcMaxtime;
			lrcMove(lrcMaxtime, current_time);
		}, 1000);
	});

	function lrcMove(time_all, current_time) {
		var lrcBox = $(".lrc-block"),
			timer,
			index,
			s = -1,
			m = 0;
		lrcBox.find('p').each(function(i, value) {
			var dataTimeLine = parseInt($(value).attr("data-timeLine"));
			if (dataTimeLine >= 0 && dataTimeLine == current_time) {
				index = i;
				if (s != i) {
					s = i;
					lrcBox.find('p').each(function(index, value) {
						$(value).css({
							'display': 'none'
						});
						$(value).removeClass('fadeInUp');
					});
					if (index > 0) {
						$(value).css({
							'display': 'block'
						});
						$(value).addClass('fadeInUp');
					}
				}
			}
		});
	}
});
//
(function($) {
	var makeup = function(elem, options) {
		console.log(options.url);
		$.get(options.url, function(data) {
			alert(data);
		});
		// $.ajax({
		// 	type: 'GET',
		// 	url: options.url,
		// 	dataType: 'text',
		// 	success: function(data) {
		// 		console.log(data.responseText);
		// 		var lrcFormat = data.trim(),
		// 			lrcArray = lrcFormat.split("\n"),
		// 			lrcTimeline = new Array();
		// 		var lrcTitle, lrcAuthor, lrcMaxtime = 0,
		// 			lrcGaptime = 5;
		// 		var html = '',
		// 			htmlHeader = '',
		// 			htmlBody = '';
		// 		var reg_header = /\[(\w*)\:(.*?)\]/g,
		// 			reg_body = /\[(\d*):(\d*)([\.|\:]\d*)\](.*)/g;
		// 		var lryHeader = {
		// 			'ti': 'Title',
		// 			'ar': 'Author',
		// 			'al': 'Album',
		// 			'by': 'Creator',
		// 			'au': '',
		// 			'length': '',
		// 			'offset': '',
		// 		};
		// 		for (var i in lrcArray) {
		// 			lrcArray[i].replace(reg_header, function() {
		// 				htmlHeader += '<span class="mr15">' + lryHeader[arguments[1]] + ' : ' + arguments[2] + '</span>';
		// 			});
		// 			lrcArray[i].replace(reg_body, function() {
		// 				var min = arguments[1] | 0,
		// 					sec = arguments[2] | 0,
		// 					realMin = min * 60 + sec;
		// 				lrcMaxtime = Math.max(lrcMaxtime, realMin + lrcGaptime);
		// 				lrcTimeline.push(realMin);
		// 				htmlBody += '<p class="lrc-line animated" data-timeLine="' + realMin + '" style="display: none;">' + arguments[4] + '</p>';
		// 			});
		// 		}
		// 		htmlHeader = '<p class="lrc-line" data-timeLine="0">' + htmlHeader + '</p>';
		// 		html = htmlHeader + htmlBody;
		// 		html = '<div class="lrc-block">' + html + '</div>';
		// 		html = '<div class="lrc-wrap">' + html + '</div>';
		// 		elem.after(html);
		// 	}
		// });
	}

	var defaults = {
		current_time: 0,
		url: 'music/文乃的幸福理論.lrc'
	};
	var methods = {
		init: function() {
			var options = $.extend(defaults, options);
			return $(this).each(function() {
				makeup($(this), options);
			});
		},

		update: function(options) {

			var options = $.extend(defaults, options);

			return this.each(function() {
				makeup($(this), options);
			});
		}
	};

	$.fn.lyric = function(method) {
		// Method calling logic
		if (method && methods[method]) {
			return methods[method].apply(this, [].slice.call(arguments, 1));
		} else if (method === 'test' || !method) {
			return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
		}
		$.error('Method ' + method + ' does not exist on jQuery.magic.square.js');
		return this;
	};

})(jQuery);

$(document).ready(function() {
	$('.ctrl-block').lyric('init');
});