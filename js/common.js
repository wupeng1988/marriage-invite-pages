var showAlert = "";
function createAlert() {
	this.html = '<div id="prompt-info-b" style = "display:none; z-index:11000; width:100%; position:fixed; top:200px;"><div class="prompt-info" style="width:100px; text-align:center; border-radius:5px; -moz-border-radius:5px; background-color:black; color:white; padding:1em 2em; margin:0px auto;"></div></div>';
	this.init();
}
createAlert.prototype = {
	init : function() {
		var _self = this;
		$("body").append(_self.html);
	},
	alert : function(word, callback) {
		$("#prompt-info-b").children(".prompt-info").html(word);
		if ($("#prompt-info-b").css("display") == "none") {
			$("#prompt-info-b").show();
			isShow = setTimeout(function() {
				$("#prompt-info-b").fadeOut("normal");
			}, 1500);
		} else {
			clearTimeout(isShow);
			$("#prompt-info-b").show();
			isShow = setTimeout(function() {
				$("#prompt-info-b").fadeOut("normal");
			}, 1500);
		}
		if (callback && typeof callback == "function") {
			callback();
		}
	}
}
showAlert = new createAlert();
