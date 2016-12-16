/**屏幕尺寸**/
var GC = {
	w:document.documentElement.clientWidth,
	h:document.documentElement.clientHeight,
};
document.getElementsByTagName("html")[0].style.fontSize=GC.w/16+'px';

//var ctx = "http://192.168.6.51/views/Coder/";
var ctx = "";

var init = {};
init.isCanMove = false;

var PERFIX = "img/"
/**w文件前缀**/
var MEDIA_PERFIX = {
	"album_photos" : PERFIX + "album_photos/",
	"comment_bg" : PERFIX + "comment_bg/",
	"cover_photo" : PERFIX + "cover_photo/",
	"iPhone_img" : PERFIX + "iPhone_img/",
	"time_logo" : PERFIX + "time_logo/"
}

/**多媒体文件**/
var M = {
	// 相册图片	
	"album_photos" : ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", 
	                  "img8.jpg", "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg", "img13.jpg", 
	                  "img14.jpg", "img15.jpg", "img16.jpg", "img17.jpg","img18.jpg","img19.jpg","img20.jpg",
			  "img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg", "img25.jpg", "img26.jpg", "img27.jpg",
			  "img28.jpg", "img29.jpg", "img30.jpg"], 
	// 评论2张背景图
	"comment_bg" : ["img1.jpg", "img2.jpg"],
	// 封面图，要长方形
	"cover_photo" : "img1.jpg",
	// 微信头像
	"iPhone_img" : ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", 
	                  "img8.jpg", "img9.jpg"],
	// 时间地址头像
	"time_logo" : "img1.jpg",
	// 音频文件
	"css_img" : ["bg.png","body_bg.jpg" , "common_header_return_black.png", "danpin_showme_music.png", "hangup.png", "heart.png" ,
	             "swipe.png", "huadong01.png","huadong02.png","huadong03.png","huadong04.png","huadong05.png","huadong06.png","huadong07.png","huadong08.png","huadong09.png","huadong10.png",
	             "map_marker.png", "mess_footer.png", "message_bg.png", "page1_bg.png", "page2_bg.png", "page3_bg2.png", "page4_bg.png", "toAnser.png", 
	             "call.mp3", "dudu.mp3", "unlock.mp3", "voice.mp3", "message.mp3", "song.mp3"],
};

/**文字信息**/
var TI = {
	"xl" : {"name" : "吴鹏", "phone" : "15311612804"},	
	"xn" : {"name" : "燕俊霞", "phone" : "15947185583"},	
	"location" : {"name" : "男方： 大名县张铁集乡北刘店村", "address": "女方：包头天外天酒店"},
	"time" : "男方： 2016-01-24 11：00<br /> 女方：2016-01-31 11：00",
	"iPhone_nickname" : "燕俊霞"
}

// 预加载数组
var PerLoadArr = [];

for (var i=0; i<M.css_img.length; i++) {
	PerLoadArr.push(PERFIX + M.css_img[i]);
}
PerLoadArr.push(MEDIA_PERFIX.cover_photo + M.cover_photo);
PerLoadArr.push(MEDIA_PERFIX.time_logo + M.time_logo);
for (var i=0; i<M.album_photos.length; i++) {
	PerLoadArr.push(MEDIA_PERFIX.album_photos + M.album_photos[i]);
}
for (var i=0; i<M.iPhone_img.length; i++) {
	PerLoadArr.push(MEDIA_PERFIX.iPhone_img + M.iPhone_img[i]);
}

PerLoadArr.push(MEDIA_PERFIX.comment_bg + M.comment_bg[0]);
PerLoadArr.push(MEDIA_PERFIX.comment_bg + M.comment_bg[1]);










