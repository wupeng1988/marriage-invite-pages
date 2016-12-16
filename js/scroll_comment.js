// 封面评论滚动
var ss = document.getElementById("cover_comment_inner");
var vcount = 5;
var scrollTotop = 30;

function comment_scroll() {
	
	// 滚动评论
	var _totalHeight = scrollTotop * commentArr.length * 2;
	var _visibleHeight = scrollTotop * vcount;
	var _point = (scrollTotop * commentArr.length) - _visibleHeight;
	var _pointtop = _totalHeight - _visibleHeight;
	
//	alert("scrollTotop=" + scrollTotop);
//	alert("_visibleHeight=" + _visibleHeight);
//	alert("_point=" + _point);
//	alert("_pointtop=" + _pointtop);
	
	var _nowTop = $(ss).css("top") || 0;
	var _newTop = Math.abs(parseInt(_nowTop)) + scrollTotop;
	var _newTopStr = "-" + _newTop + "px";
	$(ss).animate({
		'top' : _newTopStr
	}, 300, function(){
		var _t = $(ss).css("top") || 0;
		if (Math.abs(parseInt(_t)) >= _pointtop) {
			$(ss).css({"top" : -_point + "px"});
		}
	});
	
	
};