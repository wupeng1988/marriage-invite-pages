/**
 * 多媒体文件预加载
 */

var PerLoad = (function(){
	function PerLoad(ma, li, s) {
		/**多媒体文件路径**/
		this.mediaArray = ma;
		/**预加载loading图片**/
		this.loadingImg = li;
		/**加载成功回调**/
		this.loaded = s;
		/**loading元素id**/
		this.loadingImgId = "loadingImgId";
		/**已下载的数量**/
		this._loadCount = 0;
	}
	
	PerLoad.prototype.checkimgSufix = function(s){
		if (s == "jpg") return true;
		if (s == "png") return true;
		if (s == "gif") return true;
		
		return false;
	}

	/**加载所有多媒体文件**/
	PerLoad.prototype.loadMedias = function() {
		var _self = this;
		if (!_self.mediaArray) return; 
		var _lll = _self.mediaArray.length;
		for (var j=0; j<_lll; j++) {
			(function(i){
				var sufix = (_self.mediaArray[i].substring(_self.mediaArray[i].indexOf(".") + 1)).toLocaleLowerCase();
				if (_self.checkimgSufix(sufix)) {
					var _img = new Image();
					_img.onload = function(){
						_self.checkLoadCount(_self.mediaArray[i]);
					};
					_img.onerror = function(){
						_self.checkLoadCount(_self.mediaArray[i]);
					};
					_img.src = ctx + _self.mediaArray[i];
				} else { // 下载非图片文件
					$.ajax({
						type: 'get',
						url:ctx + _self.mediaArray[i],
						data: {},
						async:true,   // false 同步  true  异步
						success: function (data) {
							_self.checkLoadCount(_self.mediaArray[i]);
						},
						error: function (xhr, type)  {
							//loaded++;
							_self.checkLoadCount(_self.mediaArray[i]);
						}
					})
				}
			})(j);
		}
	};
	
	/**加载loading图后开始下载多媒体文件**/
	PerLoad.prototype.goLoad = function(){
		var _self = this;
		_self.loadMedias();
//		var _self = this;
//		var loading = new Image();
//		loading.id = _self.loadingImgId;
//		loading.onload = function(){
//			document.body.appendChild(this);
//			_self.loadMedias();
//		};
//		
//		loading.onerror = function(){
//			_self.loadMedias();
//		};
//		loading.width = document.documentElement.clientWidth;
//		loading.height = document.documentElement.clientHeight;
//		loading.style.position = "fixed";
//		loading.style.top = "0";
//		loading.style.left = "0";
//		loading.style.zIndex = 200000;
//		loading.src = _self.loadingImg;
	}
	
	PerLoad.prototype.checkLoadCount = function(src) {
		var _self = this;
		if (++_self._loadCount >= _self.mediaArray.length) { // 加载完毕
//			var _loadingImg = document.getElementById(_self.loadingImgId);
//			_loadingImg.parentNode.removeChild(_loadingImg);
			if (_self.loaded) {
				_self.loaded();
				_self.removeLoading();
			}
		} 
		
	}
	
	PerLoad.prototype.removeLoading = function(){
		var _self = this;
		var _loadingImg = document.getElementById(_self.loadingImgId);
		_loadingImg.parentNode.removeChild(_loadingImg);
	}
	
	return PerLoad;
	
})();


