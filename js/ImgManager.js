/**
 * 图片自适应centerCrop
 */
 
 var ImgManager = (function(){
	 var imgManager = function(s_cls, s_attr){
		/**自定义class**/
		this.scls = s_cls || "s_img_wrap";
		/**未加载属性**/
		this.sattr = s_attr || "s_img_load_src";
		this.sdone = "sdone";
		this.img_wraps=[];
		this.sWhole = "s_whole";
	 };
	 
	 imgManager.prototype.init = function(){
		var _self = this;
		var _divs = document.all;
		for (var i=0;i<_divs.length;i++) {
			if (_self.hasClass(_divs[i], _self.scls) && _divs[i].hasAttribute(_self.sattr)) {
				_self.img_wraps.push(_divs[i]);
			}
		}
		_self.go();
		
	 }
	 
	 imgManager.prototype.hasClass = function(obj, cls){
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	 };
	 
	 // 缩略图
	 imgManager.prototype.go = function(){
		var _self = this;
		for (var i=0;i<_self.img_wraps.length;i++) {
			(function(){
				var _obj = _self.img_wraps[i];
				if (_obj.hasAttribute(_self.sattr)) {
					var _img = _obj.children[0];
					var oh = _obj.clientHeight, ow = _obj.clientWidth;
					var _image = new Image();
					_image.src = _obj.getAttribute(_self.sattr);
					_image.onload = function(){
						var rawh = _image.height, raww = _image.width; // 图片原始大小
						if (oh/ow > rawh/raww) { // 图片过宽
							if (!_obj.getAttribute(_self.sWhole)) { // 缩略图
								_img.height = oh;
								_img.width = (oh/rawh) * raww;
								_img.style.left = ((ow - _img.width) / 2) + "px";
							} else { // 原图
								oh = GC.h;
								ow = GC.w;
								_img.width = ow;
								_img.height = (ow/raww) * rawh;
								_img.style.top = ((oh - _img.height) / 2) + "px";
							}
							
						} else { // 图片过长或比例正好
							if (!_obj.getAttribute(_self.sWhole)) {
								_img.width = ow;
								_img.height = (ow/raww) * rawh;
								_img.style.top = ((oh - _img.height) / 2) + "px";
							} else {
								oh = GC.h;
								ow = GC.w;
								_img.height = oh;
								_img.width = (oh/rawh) * raww;
								_img.style.left = ((ow - _img.width) / 2) + "px";
							}
						}
						_img.src = _obj.getAttribute(_self.sattr);
						_obj.setAttribute(_self.sdone, 1)
					};
				}
			})(i);
		}
	 };

	 
	 // 整张图
	 imgManager.prototype.goWhole = function(){
			var _self = this;
			for (var i=0;i<_self.img_wraps.length;i++) {
				(function(){
					var _obj = _self.img_wraps[i];
					if (_obj.hasAttribute(_self.sattr)) {
						var _img = _obj.children[0];
						var oh = _obj.clientHeight, ow = _obj.clientWidth;
						var _image = new Image();
						_image.src = _obj.getAttribute(_self.sattr);
						_image.onload = function(){
							var rawh = _image.height, raww = _image.width; // 图片原始大小
							if (oh/ow > rawh/raww) { // 图片过宽
								_img.width = ow;
								_img.height = (ow/raww) * rawh;
								_img.style.top = ((oh - _img.height) / 2) + "px";
							} else { // 图片过长或比例正好
								_img.height = oh;
								_img.width = (oh/rawh) * raww;
								_img.style.left = ((ow - _img.width) / 2) + "px";
							}
							_img.src = _obj.getAttribute(_self.sattr);
							_obj.setAttribute(_self.sdone, 1)
						};
					}
				})(i);
			}
		 };
	 
	 return imgManager;
 })();

        

