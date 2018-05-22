/* Vortex Upload Window libary */
/* upload creation */
/* based on plupload 2.1.9 */
/* version : 1.0 */
/* based on plupload */
/* geyy */
/* 2016-06-06 */
/**
 * 上传窗口组件
 */
var VortexUploadWindow = function(config) {
	this.showWindow();
	this.uploader = new VortexUpload(config);
	this.finish = config.finish;
	// 点击完成
	var t = this;
	$("#upload_finish").click(function() {
		if (t.uploader.uploader.total.queued > 0) {// 有文件未上传,询问是否关闭
			if (confirm("你还有文件未上传,确定关闭？")) {
				t.closeWindow();
			}
		} else {// 没有文件未上传
			t.closeWindow();
		}
	});
};

// 显示上传界面
VortexUploadWindow.prototype.showWindow = function() {
	// 添加遮罩
	$("body").append("<div id='upload-mask'></div>");
	// 添加上传界面主体,细节在plupload.js里innerHTML
	$("body").append("<div id='upload-body'><div id='uploader'><p>您的浏览器未安装 Flash, Silverlight, Gears, BrowserPlus 或者支持 HTML5 .</p></div><input id='upload_finish' type='button' value='完成'/></div>");
	// 设置上传窗口位置,使窗口居中,拖动部分定义在plupload.js里
	var left = ($(window).width() - 600) / 2, top = ($(window).height() - 330) / 2;
	$("#upload-body").css({
		left : left,
		top : top
	});
}

// 关闭上传界面
VortexUploadWindow.prototype.closeWindow = function() {
	// 如果自定义了回调,此时执行
	if (this.finish) {
		this.finish.apply();
	}
	// 移除遮罩和上传界面
	$("#upload-mask,#upload-body").remove();
}

// 带缩略图的上传区域
var VortexUploadThumbnail = function(config) {
	var t = this;
	config = $.extend(true, {}, VortexUploadThumbnail.defaults, config);
	this.id = config.id;
	this.fileserver = config.fileserver;
	this.systemserver = config.systemserver;
	if ($.type(config.fileids) === 'array') {
		this.fileids = config.fileids;
	} else if (($.type(config.fileids) === 'string') && config.fileids != '') {
		this.fileids = eval(config.fileids);
	} else {
		this.fileids = [];
	}
	this.params = config.params;
	this.type = config.type;
	this.multi = config.multi;
	this.piconly = config.piconly;
	this.viewmode = config.viewmode;
	this.delHandler = config.delHandler;
	this.completeHandler = config.completeHandler;
	var setting = {
		type : this.type,
		url : this.fileserver + '/cloudFile/common/uploadFile',
		params : this.params,
		complete : function(successArr, errorArr) {
			var result = "我是上传完成的回调.\n";
			result += "成功:" + successArr.length + "\n";
			$.each(successArr, function(index, ele) {
				// result += "\t" + ele.fileName + ":"+ ele.data[0].id + "\n";
				t.addThumbnail({
					id : ele.data[0].id,
					name : ele.fileName
				}, true);
			});
			if (t.completeHandler) {
				t.completeHandler.call(this, successArr, errorArr);
			}
			// alert(successArr.length+"个文件上传成功,\n"+errorArr.length+"个文件上传失败!");
		}
	};
	if (this.piconly == 1) {
		setting = $.extend(true, {}, setting, {
			filters : [ {
				extensions : "jpg,gif,png,bmp,jpeg,ico"
			} ]
		});
	}
	if (this.multi == 0) {
		setting = $.extend(true, {}, setting, {
			singlefile : true
		});
	}else{
		$("#"+t.id).css({
			"width":$("#"+t.id).closest(".input-right-box").width(),
						"min-width":"240px"
					});
		$(window).resize(function(){
			$("#"+t.id).css("width",$("#"+t.id).closest(".input-right-box").width());
			t.refreshPic();
		});
	}
	this.setting = setting;
	// 初始化上传区域
	this.initUploadArea();
};
// 重加加载配置初始化
VortexUploadThumbnail.prototype.load = function(config) {
	var t = this;
	this.clear();
	if ($.type(config.fileids) === 'array') {
		this.fileids = config.fileids;
	} else if (($.type(config.fileids) === 'string') && config.fileids != '') {
		this.fileids = eval(config.fileids);
	} else {
		this.fileids = [];
	}
	this.params = config.params;
	var setting = {
		type : this.type,
		url : this.fileserver + '/cloudFile/common/uploadFile',
		params : this.params,
		complete : function(successArr, errorArr) {
			var result = "我是上传完成的回调.\n";
			result += "成功:" + successArr.length + "\n";
			$.each(successArr, function(index, ele) {
				// result += "\t" + ele.fileName + ":"+ ele.data[0].id + "\n";
				t.addThumbnail({
					id : ele.data[0].id,
					name : ele.fileName
				}, true);
			});
			if (t.completeHandler) {
				t.completeHandler.call(this, successArr, errorArr);
			}
			// alert(successArr.length+"个文件上传成功,\n"+errorArr.length+"个文件上传失败!");
		}
	};
	if (this.piconly == 1) {
		setting = $.extend(true, {}, setting, {
			filters : [ {
				extensions : "jpg,gif,png,bmp,jpeg,ico"
			} ]
		});
	}
	if (this.multi == 0) {
		setting = $.extend(true, {}, setting, {
			singlefile : true
		});
	}
	this.setting = setting;
	// 存储fileds的值
	$("#" + t.id + "_fileids").val(this.getFileIds());
	// 初始化缩略图
	this.initFiles(t.fileids);
	// 初始化拖拽区域
	this.addDragArea(t.id + "_addpic");
	// 根据最外层div宽度确定显示几张缩略图
	this.refreshPic();
}
// 初始化上传区域 √
VortexUploadThumbnail.prototype.initUploadArea = function() {
	var t = this;
	var uploadArea = $("#" + t.id);
	// 设置样式,并在内部追加内容
	uploadArea.css({
		margin : 0,
		font : "normal 14px 'Microsoft Yahei'",
		"line-height" : '20px',
		color : '#333',
		"background-color" : '#fff'
	}).append("<div class='thumbnail' id='" + t.id + "_lt' style='display:none;'>" + "<span style='line-height:114px;'>&lt;</span>" + "</div>" + "<div class='thumbnail' id='" + t.id + "_gt' style='display:none;'>" + "<span style='line-height:114px;'>&gt;</span>" + "</div>" + "<div class='addpic' id='" + t.id + "_addpic'>" + "<div class='thumbnail'>" + "<img src='" + t.systemserver + "/resources/cloud/js/plupload/img/addfile.png'/>" + "<div class='caption'>" + "<h4 style='width:104px;text-align:center;'>请上传</h4>" + "</div>" + "</div>" + "</div>");
	// 如果没有查看原图的div,就新建它(因为多个上传区域可以共享一个查看原图div,所以只有在不存在的时候才创建它)
	if ($(".fancybox-overlay-fixed").size() == 0) {
		$(document.body).append("<div class='fancybox-overlay fancybox-overlay-fixed' style='display:none;'>" + "<div tabindex='-1' class='fancybox-wrap fancybox-desktop fancybox-type-image fancybox-opened'>" + "<div class='fancybox-skin'>" + "<div class='fancybox-outer'>" + "<div class='fancybox-inner'>" + "<img class='fancybox-image' alt='' src=''>" + "</div>" + "</div>" + "<div class='fancybox-title fancybox-title-float-wrap'>" + "<span class='child'></span>" + "</div>" + "<a title='关闭' class='fancybox-item fancybox-close' href='javascript:;'></a>" + "</div>" + "</div>" + "</div>");
	}
	$("img.fancybox-image")[0].onload = function(e) {
		t.bigpicload();
	};
	$("#" + t.id + "_lt").click(function(e) {
		t.switchPic(0);
	});
	$("#" + t.id + "_gt").click(function(e) {
		t.switchPic(1);
	});
	// 存储fileds的值
	$(document.body).append("<input id='" + t.id + "_fileids' type='hidden' value=''/>");
	$("#" + t.id + "_fileids").val(this.getFileIds());
	// 初始化缩略图
	this.initFiles(t.fileids);
	// 初始化拖拽区域
	this.addDragArea(t.id + "_addpic");
	// 根据最外层div宽度确定显示几张缩略图
	this.refreshPic();
}

// 新增拖拽区域√
VortexUploadThumbnail.prototype.addDragArea = function(id) {
	var t = this;
	$(document.body).append("<div id='" + id + "_hedden_area' style='display:none;'></div>");
	var dragSetting = $.extend(true, {}, this.setting, {
		id : id + '_hedden_area',
		type : 1,
		dropelement : [ id + "" ]
	});
	new VortexUpload(dragSetting);
	$("#" + id).click(function() {
		t.addUploadWindow();
	});
}

// 点击按钮时弹出上传窗口√
VortexUploadThumbnail.prototype.addUploadWindow = function() {
	var winSetting = $.extend(true, {}, this.setting, {
		dropelement : [ "upload-mask", "uploader_filelist" ]
	});
	new VortexUploadWindow(winSetting);
}

// 删除图片√
/**
 * @param filed
 * @param flag
 *            标志 1，调用回调，0 不调用回调
 */
VortexUploadThumbnail.prototype.delFile = function(filed,flag) {
	var t = this;
	$("#" + t.id + "_" + filed.id).remove();
	var newfileids = [];
	$.each(t.fileids, function(i, ele) {
		if (ele.id != filed.id) {
			newfileids.push(ele);
		}
	});
	t.fileids = newfileids;
	$("#" + t.id + "_fileids").val(this.getFileIds());
	this.refreshPic();
	if (t.delHandler&&flag) {
		t.delHandler.call(this, filed);
	}
}

// 初始化缩略图√
VortexUploadThumbnail.prototype.initFiles = function(ids) {
	var t = this;
	if (ids) {
		$.each(ids, function(index, ele) {
			if (ele) {
				t.addThumbnail(ele, false);
			}
		});
	}
}

// 新增缩略图 √
VortexUploadThumbnail.prototype.addThumbnail = function(filed, isupload) {
	var t = this;
	if (isupload && (t.multi == 0)) {
		t.clear();
	}
	var result_html = "";
	var deletepic = "";
	if (this.viewmode == 0) {
		deletepic = "<a title='删除' class='fancybox-item fancybox-close fancybox-close1' href='javascript:;'></a>";
	}
	// 如果是图片的后缀,从服务器获取缩略图;否则获取指定文件的图片
	if (t.fileIsPic(filed.name)) {
		result_html += "<div style='width:110px;display:inline-block;' id='" + t.id + "_" + filed.id + "'>" + "<div class='thumbnail viewpic' style='position:relative;'>" + "<img src='" + t.fileserver + "/cloudFile/common/downloadFile?id=" + filed.id + "&openmode=inline'/>" + "<div class='caption'>" ;
		// 如果图片没有文件名
		if(filed.name){
			result_html += "<h4  title='" + filed.name + "'>" + filed.name + "</h4>" + "</div>" + deletepic + "</div>" + "</div>"
		}
	} else {
		result_html += "<div style='width:110px;display:inline-block;' id='" + t.id + "_" + filed.id + "'>" + "<div class='thumbnail downloadfile' style='position:relative;'>" + "<img src='" + t.systemserver + "/resources/cloud/js/plupload/img/file.png' style='cursor:pointer;' title='下载'/>" + "<div class='caption'>" + "<h4  title='" + filed.name + "'>" + filed.name + "</h4>" + "</div>" + deletepic + "</div>" + "</div>";
	}
	$("#" + t.id + "_gt").before(result_html);
	$("#" + t.id + "_" + filed.id + " .thumbnail .fancybox-close1").click(function(e) {
		t.delFile(filed,1);
	});
	$("#" + t.id + "_" + filed.id + " .thumbnail.viewpic >img").dblclick(function(e) {
		t.viewOriginPic(filed.id, filed.name);
	});
	$("#" + t.id + "_" + filed.id + " .thumbnail.downloadfile >img").click(function(e) {
		t.downloadFile(filed.id);
	});
	if (isupload) {
		t.fileids.push(filed);
		$("#" + t.id + "_fileids").val(this.getFileIds());
	}
	this.refreshPic();
}
// 删除所有图片
VortexUploadThumbnail.prototype.clear = function() {
	var t = this;
	$.each(this.fileids, function(i, ele) {
		t.delFile(ele);
	});
}
/**
 * 获取fileids字符串
 */
VortexUploadThumbnail.prototype.getFileIds = function() {
	var fileids = JSON.stringify(this.fileids);
	return fileids;
}
// 根据文件名后缀判断是否为图片√
VortexUploadThumbnail.prototype.fileIsPic = function(filename) {
	// 没有文件名，就默认他是图片
	if(!filename)
	{
		return true;
	}
	var fileExtension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
	if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'gif' || fileExtension == 'bmp' || fileExtension == 'jpeg' || fileExtension == 'ico')
		return true;
	return false;
}
// 下载文件√
VortexUploadThumbnail.prototype.downloadFile = function(id) {
	location.href = this.fileserver + '/cloudFile/common/downloadFile?id=' + id;
}
// 查看原图√
VortexUploadThumbnail.prototype.viewOriginPic = function(id, filename) {
	var t = this;
	$(".fancybox-overlay-fixed .fancybox-image").attr("src", t.fileserver + "/cloudFile/common/downloadFile?id=" + id);
	$(".fancybox-overlay-fixed .fancybox-title-float-wrap>.child").text(filename);
	$(".fancybox-overlay-fixed").show();
	$(".fancybox-overlay-fixed .fancybox-close").click(function() {
		$(".fancybox-overlay-fixed").hide();
	});
}
// 原图加载完成时居中√
VortexUploadThumbnail.prototype.bigpicload = function() {
	var picleft = ($(window).width() - $(".fancybox-image").width()) / 2 - 40;
	var pictop = ($(window).height() - $(".fancybox-image").height()) / 2 - 40;
	if (picleft < 0)
		picleft = 0;
	if (pictop < 0)
		pictop = 0;
	$(".fancybox-type-image").css({
		position : "absolute",
		top : pictop,
		left : picleft
	});
}
// 切换展示图片(typeSwitch:0-左，1-右)
VortexUploadThumbnail.prototype.switchPic = function(typeSwitch) {
	var t = this;
	var allpic = $("#" + t.id + ">div:not(#" + t.id + "_lt):not(#" + t.id + "_gt):not(.addpic)");
	if (typeSwitch == 0) {
		// 如果所有图片的第一张是隐藏的，可以切换
		if (allpic.first().is(":hidden")) {
			allpic.filter(":visible:first").prev().show();
			allpic.filter(":visible:last").hide();
			if (allpic.first().is(":visible")) {
				$("#" + t.id + "_lt").hide();
			}
			if (allpic.last().is(":hidden")) {
				$("#" + t.id + "_gt").show();
			}
		}
	} else {
		// 如果所有图片的最后一张是隐藏的，可以切换
		if (allpic.last().is(":hidden")) {
			allpic.filter(":visible:last").next().show();
			allpic.filter(":visible:first").hide();
			if (allpic.last().is(":visible")) {
				$("#" + t.id + "_gt").hide();
			}
			if (allpic.first().is(":hidden")) {
				$("#" + t.id + "_lt").show();
			}
		}
	}
}
// 根据div大小确定显示几张
VortexUploadThumbnail.prototype.refreshPic = function() {
	var t = this;
	if (t.multi == 0) {
		if ((t.fileids.length > 0) || (this.viewmode == 1)) {
			$("#" + t.id + "_addpic").hide();
		} else {
			$("#" + t.id + "_addpic").show();
		}
	} else {
		var allpic = $("#" + t.id + ">div:not(#" + t.id + "_lt):not(#" + t.id + "_gt):not(.addpic)");
		// 如果可容纳张数小于照片数
		var canPicSize = Math.floor(($("#" + t.id).width() - 156) / 114);
		if (this.viewmode == 1) {
			$("#" + t.id + "_addpic").hide();
			canPicSize = canPicSize + 1;
		}
		// if (canPicSize <= allpic.size()) {
			allpic.filter(":lt(" + canPicSize + ")").show();
			allpic.filter(":gt(" + (canPicSize - 1) + ")").hide();
			$("#" + t.id + "_lt").hide();
			if (canPicSize < allpic.size()) {
				$("#" + t.id + "_gt").show();
			} else {
				$("#" + t.id + "_gt").hide();
			}
			$("#" + t.id + ">div.addpic:not(#" + t.id + "_addpic)").remove();
// } else {
// $("#" + t.id + "_gt").hide();
// $("#" + t.id + ">.addpic:not(#" + t.id + "_addpic)").remove();
// for (var i = 0; i < canPicSize - allpic.size(); i++) {
// var randomNumber = new Date().getTime();
// $("#" + t.id + "_gt").before("<div class='addpic' id='addpic_" + randomNumber
// + "'><div class='thumbnail'><img src='" + t.systemserver +
// "/resources/cloud/js/plupload/img/addfile.png'/><div class='caption'><h4
// style='width:104px;text-align:center;'>请上传</h4></div></div></div>");
// t.addDragArea("addpic_" + randomNumber);
// }
		// }
	}
}
/**
 * 默认配置
 */
VortexUploadThumbnail.defaults = {
	fileserver : '',
	fileids : [],
	params : {},
	type : 0,
	multi : 1,
	piconly : 1,
	viewmode : 0
};