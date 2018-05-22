/*var FileFormatter = {
	formatters : {
		image : {
			name : '图片',
			endFix : [ 'jpg', 'gif', 'png', 'tif' ]
		},
		excel : {
			name : '表格',
			endFix : [ 'xls', 'xlsx' ]
		},
		word : {
			name : '文字',
			endFix : [ 'doc', 'docx' ]
		},
		ppt : {
			name : '演示',
			endFix : [ 'ppt', 'pptx' ]
		},
		text : {
			name : '文本',
			endFix : [ 'txt' ]
		},
		zip : {
			name : '压缩',
			endFix : [ 'zip' ]
		},
		rar : {
			name : '压缩',
			endFix : [ 'rar' ]
		},
		video : {
			name : '视频',
			endFix : [ 'dvdscr,dvdrip,hr-hdtv,avi,mkv,mov,mp4,ac3,flv' ]
		},
		audio : {
			name : '音频',
			endFix : [ 'acm,aif,aifc,aiff,asf,asp,asx,au' ]
		},
		other : {
			name : '其他',
			endFix : [ '' ]
		}
	},
	isFormatter : oneMatches(function(name, endFix) {
		if (!name || !endFix) {
			return false;
		}
		return name.toLowerCase().endWith('.' + endFix.toLowerCase());
	}),
	getDisplayImageUrl : function(id, file) {
		// 图片
		if (this.isFormatter(file.fileUrl, this.formatters.image.endFix) || this.isFormatter(file.fileContentType, this.formatters.image.endFix)) {
			return path + "/vortexfile/clientUploadFile/download/" + id;
		}
		if (this.isFormatter(file.fileUrl, this.formatters.zip.endFix) || this.isFormatter(file.fileContentType, this.formatters.zip.endFix)) {
			return path + "/resources/file/images/img2.gif";
		}
		if (this.isFormatter(file.fileUrl, this.formatters.rar.endFix) || this.isFormatter(file.fileContentType, this.formatters.rar.endFix)) {
			return path + "/resources/file/images/img3.gif";
		}
		if (this.isFormatter(file.fileUrl, this.formatters.text.endFix) || this.isFormatter(file.fileContentType, this.formatters.text.endFix)) {
			return path + "/resources/file/images/img4.gif";
		}
		if (this.isFormatter(file.fileUrl, this.formatters.video.endFix) || this.isFormatter(file.fileContentType, this.formatters.video.endFix)) {
			return path + "/resources/file/images/img5.gif";
		}
		if (this.isFormatter(file.fileUrl, this.formatters.audio.endFix) || this.isFormatter(file.fileContentType, this.formatters.audio.endFix)) {
			return path + "/resources/file/images/img7.gif";
		}
		return path + "/resources/file/images/img8.gif";
	}
};*/
function oneMatches(matchFunction) {
	return function(object, patterns) {
		for (var i = 0; i < patterns.length; i++) {
			if (matchFunction(object, patterns[i])) {
				return true;
			}
		}
		return false;
	};
}

UploadFile = function(config) {
	var defaults = {
		directoryShowType : "list",// tree,list
		directoryTreeId : "directory_treeId",
		typeTableId : "data_list",
		photoTableId : "photo_list"
	};
	this.options = $.extend({}, defaults, config);
	this.hashMap = MapUtil.getInstance();
	this.nameMap = MapUtil.getInstance();
	this.photoMap = MapUtil.getInstance();
	this.deletePhotos = MapUtil.getInstance();
	this.typeTableId = this.options.typeTableId;
	this.photoTableId = this.options.photoTableId;
	this.code = '-1';
	this.photoId = '';
	this.suffix = '';
	this.viewmode = this.options.viewmode;
	this.columns = this.options.columns || {};
	this.directoryNodes = this.options.directoryNodes || {};
	this.name = '';
	this.resourceId = this.options.resourceId;
	this.coverphoto = this.options.coverphoto;
	this.useCodeAsDir = this.options.useCodeAsDir; // 标识是否使用code的值作为文件保存路径。取值：Y、N

}

UploadFile.prototype.init = function(name) {
	var t = this;
	t.name = name;

	if (t.options.directoryShowType == "list") {
		$('#' + t.typeTableId).datagrid({
			border : true,
			plain : true,
			fit : true,
			fitColumns : true,
			striped : false,
			remoteSort : true,
			singleSelect : true,
			fit : true,
			columns : [ [ {
				field : 'name',
				title : '分类名',
				width : 150,
				align : 'center'
			}, {
				field : 'code',
				title : '编号',
				width : 0,
				align : 'center',
				hidden : true
			}, {
				field : 'value',
				title : '图片',
				width : 0,
				align : 'center',
				hidden : true
			} ] ],
			onClickRow : function(index, data) {
				var value = data;
				t.initPhoto(index, value);
			}
		});
		var columns = t.columns;
		for (var i = 0; i < columns.length; i++) {
			$('#' + t.typeTableId).datagrid('appendRow', {
				name : columns[i].name,
				code : columns[i].code,
				value : columns[i].value
			});
		}
		// 将数据存到hashmap
		$.each(columns, function(index, value) {
			t.hashMap.add(value.code, JSON.parse(value.value));
		});

	} else if (t.options.directoryShowType == "tree") {
		var setting = {
			view : {
				selectedMulti : false
			},
			callback : {
				onClick : function(event, treeId, treeNode) {
					t.initPhoto(null, treeNode.attributes.code);
				}
			}
		};
		var treeNodes = t.directoryNodes;
		if (treeNodes.length == 0) {
			treeNodes.push({
				id : "-1",
				name : "所有目录",
				parentId : null,
				open : true,
				attributes : {
					id : "-1",
					name : "所有目录",
					parentId : null
				}
			});
		}
		t.directoryTreeObj = $.fn.zTree.init($("#" + t.options.directoryTreeId), setting, treeNodes);
	}

}
UploadFile.prototype.initPhoto = function(index, data) {

	var t = this;
	// 也可以只写一个参数,内容是所有的配置对象
	//
	// var rows = null;
	// var row = null;
	// if (index == undefined) {
	// index = 0;
	// }
	// if (code == undefined) {
	// code = null;
	// }
	// if (t.options.directoryShowType == "list") {
	// rows = $('#' + t.typeTableId).datagrid('getRows');
	// } else if (t.options.directoryShowType == "tree") {
	// rows =
	// t.directoryTreeObj.transformToArray(t.directoryTreeObj.getNodes());
	// }
	// if (rows && rows.length > 0) {
	// if (t.options.directoryShowType == "list") {
	// row = rows[(index ? index : 0)];
	// $('#' + t.typeTableId).datagrid('selectRow', (index ? index : 0));
	// } else if (t.options.directoryShowType == "tree") {
	// for (var int = 0; int < rows.length; int++) {
	// if (rows[int].attributes.code == code) {
	// row = rows[int].attributes;
	// t.directoryTreeObj.selectNode(rows[int]);
	// break;
	// }
	// }
	// }
	// t.code = row.code;
	// if (!t.hashMap.get(row.code)) {
	// t.hashMap.add(row.code, (row.value ? row.value.split(',') : ''));
	// }
	// if (row.value) {
	// var params = {
	// 's_IN_clientUploadFile.id' : row.value
	// };
	// $.post(path + '/vortexfile/clientUploadFile/fileList', params,
	// function(data) {
	// if (data != null) {
	// for (var i = 0; i < data.length; i++) {
	// var value = {
	// fileName : data[i].fileName,
	// fileTime : data[i].fileCreateTime,
	// fileUrl : data[i].fileUrl,
	// fileContentType : data[i].fileContentType
	// };
	// t.nameMap.add(data[i].id, value);
	// }
	// t.getPhoto(t.hashMap.get(t.code));
	// }
	// });
	// } else {
	// t.getPhoto(t.hashMap.get(t.code));
	// }
	// }
	var rows = null;
	rows = $('#' + t.typeTableId).datagrid('getRows');
	var row = rows[index];
	t.code = row.code;
	if (thumbnail2 == null || thumbnail2 == undefined || thumbnail2 == "") {
		thumbnail2 = new VortexUploadThumbnail({
			id : t.photoTableId,
			fileserver : fileserver,
			systemserver : path,
			fileids : t.hashMap.get(t.code),
			params : {
				fileDirCode : t.code
			},
			multi : 1,
			viewmode : t.viewmode,
			completeHandler : function(success) {
				// alert(success);
				console.log("---success---");
				console.log(success);
				console.log(thumbnail2.fileids);
				var fileids = thumbnail2.fileids;
				t.hashMap.add(t.code, fileids);
			},

			delHandler : function(filed) {
				console.log("delete");
				console.log(filed);
				var dataArr = t.hashMap.get(t.code);// 存储的数据
				// //从hashmap中删除被删除的象
				$.each(dataArr, function(index, value) {
					if (value) {
						if (value.name == filed.name && value.id == filed.id) {
							dataArr.splice(index, 1);
						}
					}

				});
			}

		});
		console.log(index);
	} else {

		thumbnail2.load({
			fileids : t.hashMap.get(t.code),
			params : {
				fileDirCode : t.code
			},
		});

	}

}

UploadFile.prototype.callBack = function(uploadResult) {
	var t = this;
	var code = t.code;
	if (uploadResult) {
		var ids = t.hashMap.get(code) ? t.hashMap.get(code) : new Array();
		for (var i = 0; i < uploadResult.length; i++) {
			var response = $.parseJSON(uploadResult[i].response);
			if (response && response.success) {
				ids.push(response.id);
				var value = {
					fileName : response.fileName,
					fileTime : response.fileTime,
					fileUrl : response.fileUrl,
					fileContentType : response.fileContentType
				};
				t.nameMap.add(response.id, value);
			}
		}
		t.hashMap.add(code, ids);
		t.getPhoto(ids);
	}
}

UploadFile.prototype.viewRow = function() {
	var t = this;
	if (t.code == '-1') {
		VortexUtil.show({
			msg : '请选择分类'
		});
		return;
	}
	var code = t.code;
	var useCodeAsDir = t.useCodeAsDir;
	var params = {
		code : code,
		uploadUrl : path + '/vortexfile/clientUploadFile/save?code=' + code + '&useCodeAsDir=' + useCodeAsDir
	};
	var uploadResult = popup.uploadFile(params, function(uploadResult) {
		if (uploadResult) {
			var ids = t.hashMap.get(code) ? t.hashMap.get(code) : new Array();
			for (var i = 0; i < uploadResult.length; i++) {
				var response = $.parseJSON(uploadResult[i].response);
				if (response && response.success) {
					ids.push(response.id);
					var value = {
						fileName : response.fileName,
						fileTime : response.fileTime,
						fileUrl : response.fileUrl,
						fileContentType : response.fileContentType
					};
					t.nameMap.add(response.id, value);
				}
			}
			t.hashMap.add(code, ids);
			t.getPhoto(ids);
		}
	});

}
UploadFile.prototype.viewDoc = function() {
	var t = this;
	VortexUtil.goToPage('查看附件信息', 'vortexfile/clientUploadFile/view/' + t.photoId);
	hideMenu();
}
/*
 * UploadFile.prototype.downDoc = function() { var t = this; location.href =
 * path + "/vortexfile/clientUploadFile/download/" + t.photoId; hideMenu(); }
 */
UploadFile.prototype.reName = function() {
	hideMenu();
	var t = this;
	var $d = $("#" + t.photoId), $name = $("div.vimg-con", $d);

	if ($("input.input-rename").size() > 0)
		return;

	var dot = $name.text().lastIndexOf('.');
	if (dot == '-1') {
		dot = $name.text().length;
	}
	var originName = $name.text().substring(0, dot).replace(/\(封面\)/, "");
	t.suffix = $name.text().substring(dot);
	var $inp = $("<input type='text' class='input-rename' onkeydown='" + t.name + ".isEnterKey();' onblur='" + t.name + ".doReName();'/>").val(originName).appendTo($name.html(""));
	$inp.focus().click(function() {
		return false;
	});
}
UploadFile.prototype.isEnterKey = function() {
	var t = this;
	if (event.keyCode == 13) {
		t.doReName();
	}
}
UploadFile.prototype.doReName = function() {
	var t = this;
	var $inp = $("input.input-rename");
	if ($inp.size() == 0)
		return;

	var newName = $inp.val() + t.suffix;
	$inp.parent().text(t.coverphoto == t.photoId ? '(封面)' + newName : newName);
	$inp.remove();
	VortexUtil.remoteCall({
		url : path + '/vortexfile/clientUploadFile/rename',
		params : {
			newName : newName,
			docId : t.photoId
		},
		successCallback : function(data) {
		}
	});
}
function hideMenu() {
	$('#menuDiv').hide();
	$("body").unbind("mousedown", onBodyDown);
}

UploadFile.prototype.showMenu = function(event, id) {
	var t = this;
	t.photoId = id;
	document.getElementById("menuDiv").style.left = event.clientX + 'px';
	document.getElementById("menuDiv").style.top = event.clientY + 'px';
	document.getElementById("menuDiv").style.display = "block";
	event.returnValue = false;
	event.cancelBubble = true;
	$("body").bind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuDiv" || $(event.target).parents("#menuDiv").length > 0)) {
		hideMenu();
	}
}
UploadFile.prototype.setCoverPhoto = function(callback) {
	var newName = name ? name : 'coverphoto';
	var t = this;
	var photos = t.photoMap.getAllKey();
	if (photos.length == 0) {
		VortexUtil.show({
			msg : '请选择要设为封面的图片'
		});
		return;
	}
	if (photos.length > 1) {
		VortexUtil.show({
			msg : '请选择至多一张图片设为封面'
		});
		return;
	}
	VortexUtil.show({
		msg : '设置成功'
	});
	t.coverphoto = photos[0];
	t.getPhoto(t.hashMap.get(t.code));
	if (typeof callback == 'function') { // 初始地图后的执行回调方法
		callback(t.coverphoto);
	}
}

UploadFile.prototype.getPhoto = function(ids) {
	var t = this;
	var str = "";
	if (ids) {
		for (var i = 0; i < ids.length; i++) {
			if (ids[i] && ids[i] != '') {
				str += '<div id=' + ids[i] + ' class="vimg" onclick="' + t.name + '.checkRows(this,\'' + ids[i] + '\')" oncontextmenu="' + t.name + '.showMenu(event,\'' + ids[i] + '\')"><div><a href="';
				str += FileFormatter.getDisplayImageUrl(ids[i], t.nameMap.get(ids[i]));
				str += '" rel="gallery" class="various fancybox.ajax"><img src="';
				str += FileFormatter.getDisplayImageUrl(ids[i], t.nameMap.get(ids[i]));
				str += '"/></a></div><div class="vimg-con">';
				if (t.coverphoto == ids[i]) {
					str += '(封面)';
				}
				str += t.nameMap.get(ids[i]).fileName;
				str += '</div><div class="vimg-txt">';
				var time = t.nameMap.get(ids[i]).fileTime;
				if (time) {
					var date = new Date(time);
					str += date.format('yyyy-MM-dd hh:mm:ss');
				}
				str += '</div></div>';
			}
		}
	}
	var html = '<div id="menuDiv" style="z-index:100;width:80px;position:absolute;display:none;' + 'border:1px solid #aed0ea; background:#f2f5f7;left: 0px;top: 0px;">' + '<table border="0" style="padding: 5px">' + '<tr><td align="left"><a href="#" class="btn" onclick="' + t.name + '.viewDoc();">查看</a></td></tr>' + '<tr><td align="left"><a href="#" class="btn" onclick="' + t.name + '.downDoc();">下载</a></td></tr>' + '<tr><td align="left"><a href="#" class="btn" onclick="' + t.name + '.reName();">重命名</a></td></tr>' + '</table></div>';
	$('#' + t.photoTableId).html(str);
	$(document.body).append(html);
	$('.various').fancybox({
		type : 'image'
	});
}

/*
 * UploadFile.prototype.callBack = function(data) { var t = this; var ids = new
 * Array(); for (var i = 0; i < data.length; i++) { var obj =
 * JSON.parse(data[i].response); t.nameMap.add(obj.id, obj); ids.push(obj.id); }
 * t.hashMap.add(t.code, ids); var str = ""; if (ids) { for (var i = 0; i <
 * ids.length; i++) { if (ids[i] && ids[i] != '') { str += '<div id=' + ids[i] + '
 * class="vimg" onclick="' + t.name + '.checkRows(this,\'' + ids[i] + '\')"
 * oncontextmenu="' + t.name + '.showMenu(event,\'' + ids[i] + '\')"><div><a
 * href="'; str += FileFormatter.getDisplayImageUrl(ids[i],
 * t.nameMap.get(ids[i])); str += '" rel="gallery" class="various
 * fancybox.ajax"><img src="'; str += FileFormatter.getDisplayImageUrl(ids[i],
 * t.nameMap.get(ids[i])); str += '"/></a></div><div class="vimg-con">'; if
 * (t.coverphoto == ids[i]) { str += '(封面)'; } str +=
 * t.nameMap.get(ids[i]).fileName; str += '</div><div class="vimg-txt">'; var
 * time = t.nameMap.get(ids[i]).fileTime; if (time) { var date = new Date(time);
 * str += date.format('yyyy-MM-dd hh:mm:ss'); } str += '</div></div>'; } } }
 * var html = '<div id="menuDiv"
 * style="z-index:100;width:80px;position:absolute;display:none;' + 'border:1px
 * solid #aed0ea; background:#f2f5f7;left: 0px;top: 0px;">' + '<table
 * border="0" style="padding: 5px">' + '<tr><td align="left"><a href="#"
 * class="btn" onclick="' + t.name + '.viewDoc();">查看</a></td></tr>' + '<tr><td align="left"><a
 * href="#" class="btn" onclick="' + t.name + '.downDoc();">下载</a></td></tr>' + '<tr><td align="left"><a
 * href="#" class="btn" onclick="' + t.name + '.reName();">重命名</a></td></tr>' + '</table></div>';
 * $('#' + t.photoTableId).html(str); $(document.body).append(html);
 * $('.various').fancybox({ type : 'image' }); }
 */

UploadFile.prototype.checkRows = function(div, id) {
	var t = this;
	if (t.photoMap.get(id) != null) {
		$(div).css('border', '1px #f7f7f7 solid');
		t.photoMap.remove(id);
	} else {
		$(div).css('border', '1px #F00 solid');
		t.photoMap.add(id, id);
	}
}
/*
 * UploadFile.prototype.removePhoto = function() { var t = this; var code =
 * t.code; if (t.hashMap.get(code) && t.hashMap.get(code).length > 0) { var ids =
 * t.hashMap.get(code); var newIds = new Array(); if (t.photoMap &&
 * t.photoMap.getAllKey().length > 0) { VortexUtil.confirm({ title : '警告', msg :
 * '是否要删除记录?', callback : function() { for (var i = 0; i < ids.length; i++) { if
 * (!t.photoMap.get(ids[i])) { newIds.push(ids[i]); } else {
 * t.deletePhotos.add(ids[i], ids[i]); t.nameMap.remove(ids[i]); } } t.photoMap =
 * MapUtil.getInstance(); t.hashMap.add(code, newIds);
 * t.getPhoto(t.hashMap.get(code)); } }); } else { VortexUtil.show({ msg :
 * '请选择要删除的图片' }); } } else { VortexUtil.show({ msg : '请选择要删除的图片' }); } }
 */
/*
 * UploadFile.prototype.downloadPhoto = function(iframe) { var t = this; var
 * code = t.code; if (t.hashMap.get(code) && t.hashMap.get(code).length > 0) {
 * var ids = t.hashMap.get(code); var newIds = new Array(); if (t.photoMap &&
 * t.photoMap.getAllKey().length > 0) { var rows = t.photoMap.getAllKey(); for
 * (var i = 0; i < rows.length; i++) { location.href = path +
 * "/vortexfile/clientUploadFile/download/" + rows[i].toString(); } } else {
 * VortexUtil.show({ msg : '请选择要下载的图片' }); } } else { VortexUtil.show({ msg :
 * '请选择要下载的图片' }); } hideMenu(); }
 */
UploadFile.prototype.getNowSelectTypeOption = function() {
	var t = this;
	if (t.options.directoryShowType == "list") {
		return $('#' + t.typeTableId).datagrid("getSelected");
	} else if (t.options.directoryShowType == "tree") {
		var nodes = t.directoryTreeObj.getSelectedNodes();
		return nodes[0].attributes;
	}
}