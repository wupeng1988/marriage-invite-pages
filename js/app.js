var res_test = [{"name":"吴鹏","attentNum":1,"content":"结婚快乐！","createTime":"2015-12-23 13:24:18"},{"name":"沙云","attentNum":2,"content":"敬祝百年好合永结同心!","createTime":"2015-12-23 13:50:49"},{"name":"哈哈哈哈","attentNum":2,"content":"新婚快乐，早生贵子!","createTime":"2015-12-23 13:52:08"},{"name":"lll","attentNum":2,"content":"","createTime":"2015-12-23 14:07:30"},{"name":"xxxxxxx","attentNum":2,"content":"ddddddd","createTime":"2015-12-23 15:55:09"},{"name":"水水水水水水水","attentNum":2,"content":"敬祝百年好合永结同心!","createTime":"2015-12-23 18:15:44"},{"name":"特殊特色汤","attentNum":2,"content":"敬祝百年好合永结同心!","createTime":"2015-12-23 18:15:50"},{"name":"aaaaaa","attentNum":2,"content":"敬祝百年好合永结同心!","createTime":"2015-12-23 18:15:54"}];

var GC = {
        w:document.documentElement.clientWidth,
        h:document.documentElement.clientHeight
    };

var ADD = "http://marriage.singledog.org/marriage/comments/add";
var FIND = "http://marriage.singledog.org/marriage/comments/find";

var b = "img/loading.gif";
var c = function() {
	$('.page').css({width:GC.w,height:GC.h});
	$('.page1 .content').css({width:GC.w,height:GC.h});
	$('.page1').removeClass('hidden');
	$("#phone_cover").removeClass('hidden');


	init.page1Play();  // 播放音乐
	
	// 评论轮播
	$.ajax({
		type:"POST",
		url:FIND,
		success:function(res){
			//res = res_test;
			if(res && res.length > 0) {
				commentArr = res;
				for (var i=0; i<res.length; i++) {
					
					// 祝福页列表
					$("#back_list").append(comment_template({item: res[i]})); 
					
					// 首页评论滚动
					var divs = '<div><span><em class="red_text">' + res[i].name + '：</em>' + res[i].content + '</span></div>'
					$("#cover_comment1").append(divs);
				}
				if (res.length > 5) {
					for (var i=0; i<res.length; i++) {
						var divs = '<div><span><em class="red_text">' + res[i].name + '：</em>' + res[i].content + '</span></div>'
						$("#cover_comment1").append(divs);
					}
					window.setInterval(comment_scroll, 2000);
				}
				
			}
		}
	});
	
	
};
var Img_Manager = new ImgManager();
var commentArr = [];
var comment_template = _.template($("#back_template").html());

$(function(){
	
	
	
	//  预加载
	var _p = new PerLoad(PerLoadArr,b,c);
	_p.goLoad();
	
//	// 加载评论
//
//	if(res && res.length > 0) {
//		commentArr = res;
//		for (var i=0; i<res.length; i++) {
//			var divs = '<div><span><em class="red_text">' + res[i].name + '：</em>' + res[i].content + '</span></div>'
//			$("#cover_comment1").append(divs);
//			
//		}
//		if (res.length > 5) {
//			for (var i=0; i<res.length; i++) {
//				var divs = '<div><span><em class="red_text">' + res[i].name + '：</em>' + res[i].content + '</span></div>'
//				$("#cover_comment1").append(divs);
//			}
//			window.setInterval(comment_scroll, 2000);
//		}	
//	}
	
	// _p.removeLoading();
	
	/**组装数据**/
	// 文字信息
	$(".iphone_nickname").text(TI.iPhone_nickname);
	$("#s_time_xinlang").text(TI.xl.name);
	$("#s_time_xinniang").text(TI.xn.name);
	$("#s_time_time").html(TI.time);
	$("#location").text(TI.location.name);
	$("#location_address").text(TI.location.address);
	$("#s_comment_xl_tel").text(TI.xl.phone);
	$("#s_comment_xn_tel").text(TI.xn.phone);
	// 图片
	$("#s_cover_photo").attr("s_img_load_src", MEDIA_PERFIX.cover_photo + M.cover_photo);
	$("#s_time_banner").find(".s_img_wrap").attr("s_img_load_src", MEDIA_PERFIX.time_logo + M.time_logo);
	for (var i=0; i<M.album_photos.length; i++) {
		var lis = '<li class="s_img_wrap" s_img_load_src="'+ MEDIA_PERFIX.album_photos + M.album_photos[i] +'"><img /></li>'
		$("#s_album_ul").append(lis);
		
		var slide_div = '<div s_whole="1" class="s_img_wrap" s_img_load_src="'+ MEDIA_PERFIX.album_photos + M.album_photos[i] +'"><img /></div>'
		$("#swipe_wrap").append(slide_div);
	}
	$("#s_comment_xl").attr("s_img_load_src", MEDIA_PERFIX.comment_bg + M.comment_bg[0]);
	$("#s_comment_xn").attr("s_img_load_src", MEDIA_PERFIX.comment_bg + M.comment_bg[1]);
	
	// 相册自适应
	var album_width = (GC.w-20) / 3;
	$("#s_album .s_img_wrap").css({"width":album_width, "height":album_width});
	Img_Manager.init();
	$("#s_main_menu>li").tap(function(){
		var _index = $(this).index();
		$("#s_main_content").find(".cur").removeClass("cur").hide();
		$("#s_main_content>div").eq(_index).addClass("cur").show();
		$("#s_main_menu").find(".cur").removeClass("cur");
		Img_Manager.init();
		map.centerAndZoom(point, 12);
		map1.centerAndZoom(point1, 12);
		$(this).addClass("cur");
	});	
	
	// 祝福语选择
	var J_content_select = document.getElementById("J_content_select");
	var J_content = document.getElementById("J_content");
	J_content_select.addEventListener("change", function(){
		J_content.value = this.value;
		
	});
	
	/*****************************祝福评论**************************************/
	
//	if (commentArr.length > 0) {
//		for (var i=0; i<res.length; i++) {
//			$("#back_list").append(comment_template({item: commentArr[i]})); 
//		}
//	} else {
//		$.ajax({
//			type:"POST",
//			url:FIND,
//			success:function(res){
//				if(res && res.length > 0) {
//					commentArr = res;
//					for (var i=0; i<res.length; i++) {
//						$("#back_list").append(comment_template({item: res[i]})); 
//					}
//				}
//			}
//		});
//	}
	
	
	// 发表祝福，log为1不可发送
	$("#comment_add_btn").tap(function(){
		if ($("#comment_add_btn").attr("log") == 1) {
			showAlert.alert("正在发送祝福……");
		} else {
			$("#comment_add_btn").attr("log", 1);
			var _g = document.getElementById("guestname");
			var _reply = document.getElementById("reply");
			var _J_content = document.getElementById("J_content");
			
			if (_g.value) {
				var _comment = {};
				_comment.name = _g.value;
				_comment.attentNum = _reply.value;
				_comment.content = _J_content.value;
				
				$.ajax({
					type:"POST",
					data:JSON.stringify(_comment), 
					contentType:"application/json",
					url:ADD,
					success:function(result){
						showAlert.alert("祝福发送成功！");
						$("#comment_add_btn").attr("log", 0);
						$("#back_list").prepend(comment_template({item: _comment}));  
					},
					error:function(){
						$("#comment_add_btn").attr("log", 0);
						showAlert.alert("网络请求失败了～，请把bug反馈给新郎");
					}
				});
			} else {
				$("#comment_add_btn").attr("log", 0);
				showAlert.alert("请您填写姓名");
			}
		}
	});
	
	
	$("#audio_player").tap(function () {
		var audio = document.getElementById('audio_main_bg');  
        if(audio!==null){             
            if(!audio.paused)  
            {        
            	$(this).addClass("audio_player_onpause");        
                audio.pause();
            }  else {
            	$(this).removeClass("audio_player_onpause");      
            	audio.play();
            } 
        }  
	});
	
	/*********************百度地图API功能**************************************/
	// 新郎115.419825， 36.324338      新娘109.886515， 40.66104
	
	var myIcon = new BMap.Icon("img/map_marker.png", new BMap.Size(34,34));
	// 百度地图API功能
	var map = new BMap.Map("s_map_xl");
	var point = new BMap.Point(115.419825,36.324338);
	map.centerAndZoom(point, 12);
	var marker = new BMap.Marker(point, {icon:myIcon});  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中

	
	var map1 = new BMap.Map("s_map_xn");
	var point1 = new BMap.Point(109.886515,40.66104);
	map1.centerAndZoom(point1, 12);
	var marker1 = new BMap.Marker(point1, {icon:myIcon});  // 创建标注
	map1.addOverlay(marker1);              // 将标注添加到地图中

	var label = new BMap.Label("大名县张铁集乡北刘店村",{offset:new BMap.Size(20,-10)});
	var label1 = new BMap.Label("包头天外天酒店",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);
	marker1.setLabel(label1);
	
	// 一键导航
	function ZoomControl(t, l){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	  this.defaultOffset = new BMap.Size(10, 10);
	  this._t = t;
	  this._l = l;
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
	ZoomControl.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
	ZoomControl.prototype.initialize = function(map){
		var _self = this;
	  // 创建一个DOM元素
	  var div = document.createElement("div");
	  // 添加文字说明
	  div.appendChild(document.createTextNode(_self._t));
	  // 设置样式
	  div.style.cursor = "pointer";
	  div.style.border = "1px solid gray";
	  div.style.backgroundColor = "white";
	  div.style.fontSize = "13px";
	  div.style.padding = "3px";
	  // 导航
	  div.addEventListener("tap", function() {
		  window.location.href = _self._l;
	  });
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
	}
	// 创建控件
	var myZoomCtrl = new ZoomControl("去新郎家","http://map.baidu.com/mobile/webapp/search/search/qt=s&wd="+"大名县张铁集乡北刘店村"+"/vt=map");
	var myZoomCtr2 = new ZoomControl("去新娘家","http://map.baidu.com/mobile/webapp/search/search/qt=s&wd="+"包头天外天酒店"+"/vt=map");
	// 添加到地图当中
	map.addControl(myZoomCtrl);
	map1.addControl(myZoomCtr2);
	
	
	// 相册看大图
//	window.mySwipe = new Swipe(document.getElementById('slider'), {
//		  startSlide: s_startSlide,
//		  continuous: true,
//		  disableScroll: false,
//		  stopPropagation: false,
//		});
	
	$("#slider_close").tap(function(){
		$("#slider").css({"visibility" : "hidden"});
	});
	
	$("#s_album_ul>li").tap(function(){
		var s_startSlide = $(this).index();
		Img_Manager.init();
		if (window.mySwipe == null) {
			window.mySwipe = new Swipe(document.getElementById('slider'), {
				  startSlide: s_startSlide,
				  continuous: true,
				  disableScroll: false,
				  stopPropagation: true
				});
		} else {
			window.mySwipe.slide(s_startSlide);
		}
		$("#slider").css({"visibility" : "visible"});
	});
});








