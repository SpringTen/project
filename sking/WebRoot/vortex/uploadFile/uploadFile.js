function UploadFile(config) {
	this.id = config.id;
	this.list_id = this.id + "_list";
	this.fileArr = [];
	this.maxFileNum = config.maxFileNum || 3;
	this.uploadSuccess = config.success;
	// 表单的操作 add,view,update
	this.formOperate = config.formOperate || 'add';
	// 上传限制，file：所有文件,pic:图片
	this.fileLimit = config.fileLimit || 'file';

	this.defaultValue = config.defaultValue || '';
	// 注册该对象
	this.registerControl();
	this.render();
}
UploadFile.prototype.registerControl = function() {
	var t = this;
	VortexUtil.regControl(t.id, t);
}
UploadFile.prototype.render = function() {
	var t = this;

	t.clearData();
	if (t.formOperate == 'view') {
		$('#' + t.id + '_tb').hide();;
	}
	if (t.defaultValue != '') {
		t.setValue(t.defaultValue);
	}
}

UploadFile.prototype.reload = function(defaultValue) {
	var t = this;
	t.clearData();
	if (defaultValue != '') {
		t.setValue(defaultValue);
	}
}
UploadFile.prototype.clearData = function() {
	var t = this;
	t.fileArr = [];
	var rows = $('#' + t.list_id).datagrid('getRows');
	if (rows.length > 0) {
		for (var i = 0; i < rows.length; i++) {
			$('#' + t.list_id).datagrid('deleteRow', i);
		}
	}

}

UploadFile.prototype.getValue = function() {
	var t = this;
	var uuidStr = "";
	var filesNum = t.fileArr.length;
	for (var i = 0; i < filesNum; i++) {
		var fileInfo = t.fileArr[i];
		if (i == 0) {
			uuidStr = fileInfo.id;
		} else {
			uuidStr += "," + fileInfo.id;
		}
	}
	return uuidStr;
}

UploadFile.prototype.setValue = function(value) {
	var t = this;
	t.defaultValue = value;
	t.addFromUuids(value);

}
UploadFile.prototype.addFromUuids = function(value) {
	var t = this;
	var src = path + '/uploadFile/getFiles';
	$.ajax({
				type : "POST",
				url : src,
				data : "ids=" + value,
				success : function(data) {
					var data = eval('(' + data + ')');
					if (data.items.length > 0) {
						$(data.items).each(function(i, n) {
									t.fileArr.push(n);
								});
						t.refreshData();
					}

				}
			});
}
UploadFile.prototype.refreshData = function() {
	var t = this;
	for (var i = 0; i < t.fileArr.length; i++) {
		var fileInfo = t.fileArr[i];
		this.addOneToGrid(fileInfo);
	}
}
UploadFile.prototype.addOneToGrid = function(data) {
	var t = this;
	var src = path + '/uploadFile/download/' + data.id;
	var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;
	data.pic = '';
	if (patn.test(data.fileName)) {
		data.pic = '<img id="' + data.id 
				+ '_img" style="cursor:pointer" width="60" height="60" src="'
				+ src + '" alt="' + data.fileName + '"/>';

	}
	$('#' + t.list_id).datagrid('appendRow', {
				id : data.id,
				fileName : data.fileName,
				pic : data.pic,
				size : UploadFile.size(data.fileSize)
			});
}
UploadFile.clearInputFile = function(id) {
	var file = $("#" + id);
	file.after(file.clone().val(""));
	file.remove();
}
UploadFile.prototype.createGridMenu = function() {
	var t = this;
	var menuId = t.list_id + "_menu";
	var tmenu = $('<div id="' + menuId + '" style="width:100px;"></div>')
			.appendTo('body');
	$('<div iconCls="icon-ok" id="download" gridListId="' + t.list_id + '"/>')
			.html("下载").appendTo(tmenu);
	if (t.formOperate != 'view') {
		$('<div iconCls="icon-ok" id="deleteFile" gridListId="' + t.list_id
				+ '"/>').html("删除").appendTo(tmenu);
	}
	tmenu.menu({
				onClick : function(item) {
					var action = item.id;
					var rows = $('#' + t.list_id).datagrid('getSelected');
					if (!rows) {
						return;
					}
					switch (action) {
						case "download" :
							var src = path + '/uploadFile/download/' + rows.id;
							VortexUtil.gotoPage(src);
							break;
						case "deleteFile" :
							UploadFile.deleteFile(rows, function() {
										var rowIndex = $('#' + t.list_id)
												.datagrid('getRowIndex', rows);
										$('#' + t.list_id).datagrid(
												'deleteRow', rowIndex);
										t.removeFromArr(rowIndex);
									}, true);
							break;
					}
				}
			});
	return menuId;
}
// html触发的事件
UploadFile.prototype.onHtmlEvent = function(params) {
	// 点击事件
	var index = params.index;// 行号
	var uuid = this.fileArr[index].id;
	if (params.eventID == 0) {// 下载
	} else if (params.eventID == 1) {// 删除
	}
}
UploadFile.size = function(len) {
	var kb = len / 1024;
	if (kb < 1024)
		return kb.toFixed(2) + "K";
	else {
		var m = kb / 1024;
		return m.toFixed(2) + "M";
	}
}
UploadFile.prototype.removeFromArr = function(index) {
	var t = this;
	var fileInfo = t.fileArr[index];
	if (index != t.fileArr.length - 1) {
		var temNum = t.fileArr.length - 2;
		for (var i = index; i <= temNum; i++) {
			t.fileArr[i] = t.fileArr[i + 1];
		}
	}
	t.fileArr.pop();
	VortexUtil.log(t.id + " remove after = " + t.getValue());
	return fileInfo;
}
UploadFile.deleteFile = function(selectRow, callbackObj, needPrompt) {
	/*
	 * $.messager.confirm('警告', '是否要删除该文件?', function(r) { if (r) { $.post(path +
	 * '/uploadFile/delete/' + selectRow.id, function(data) { // var data =
	 * eval('(' + data + ')'); if (data.operateSuccess) { $.messager.show({
	 * title : '提示', msg : selectRow.name + data.operateMessage, timeout : 2000,
	 * showType : 'show' }); if (typeof callback == 'function') { callback(); } }
	 * }); }
	 * 
	 * });
	 */
	if (needPrompt == true) {
		VortexUtil.confirm({
					msg : '是否要删除该文件?',
					callback : function() {
						$.post(path + '/uploadFile/delete/' + selectRow.id,
								function(data) {
									// var data = eval('(' + data + ')');
									if (data.operateSuccess) {
										VortexUtil.show({
													msg : selectRow.name
															+ data.operateMessage
												});
										if (typeof callbackObj == 'function') {
											callbackObj();
										}
									}
								});
					}
				});
	} else {
		$.post(path + '/uploadFile/delete/' + selectRow.id, function(data) {
					// var data = eval('(' + data + ')');
					if (data.operateSuccess) {
						if (typeof callbackObj == 'function') {
							callbackObj();
						}
					}
				});
	}

}
UploadFile.prototype.ajaxFileUpload = function() {
	var t = this;
	var fileName = $('#' + t.id).val();
	if (fileName == '') {
		VortexUtil.show({
					msg : "请选择要上传的附件"
				});
		return false;
	}

	if (t.fileLimit == 'pic') {
		var fileext = fileName.substring(fileName.lastIndexOf("."),
				fileName.length);
		fileext = fileext.toLowerCase();
		if ((fileext != '.jpg') && (fileext != '.gif') && (fileext != '.jpeg')
				&& (fileext != '.png') && (fileext != '.bmp')) {
			VortexUtil.show({
						msg : "对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 ！"
					});
			UploadFile.clearInputFile(t.id);
			return false;
		}
	}

	// var rowTotals = $('#' + this.list_id).datagrid('getRows');
	if (t.maxFileNum > 1 && t.fileArr.length >= t.maxFileNum) {
		VortexUtil.show({
					msg : "本输入域已经存在的文件个数已经达到或超过了您设置的最大个数,请先删除再上传！"
				});
		UploadFile.clearInputFile(t.id);
		return false;
	} else if (t.maxFileNum > 1) {
		t.uploadFile();
	} else {
		if (t.fileArr.length > 0) {
			VortexUtil.confirm({
						msg : '本输入域已经存在文件,您要把它替换掉吗？',
						callback : function() {
							UploadFile.deleteFile(t.fileArr[0], function() {
										$('#' + t.list_id).datagrid(
												'selectRow', 0)
										var rows = $('#' + t.list_id)
												.datagrid('getSelected');
										var rowIndex = $('#' + t.list_id)
												.datagrid('getRowIndex', rows);
										$('#' + t.list_id).datagrid(
												'deleteRow', rowIndex);
										t.removeFromArr(rowIndex);
										t.uploadFile();
									}, false);
						},
						cancelCallback : function() {
							UploadFile.clearInputFile(t.id);
						}
					});
		} else {
			t.uploadFile();
		}
	}

	return false;

}
UploadFile.prototype.uploadFile = function() {
	var t = this;
	$.ajaxFileUpload({
				url : path + '/uploadFile/upload1/' + t.id,
				secureuri : false,
				fileElementId : t.id,
				dataType : 'json',
				beforeSend : function() {
					$.messager.progress({
								title : '上传提示',
								msg : '正在上传数据'
							});

				},
				complete : function() {
					$.messager.progress('close');
				},
				success : function(data, status) {
					UploadFile.clearInputFile(t.id);
					if (data.success == true) {
						if (typeof t.uploadSuccess == 'function') {
							t.uploadSuccess(t.id, t.list_id, data);
						} else {
							// UploadFile.uploadSuccess(t.list_id, data);
							t.addOneToGrid(data);
						}
						t.fileArr.push(data);
					} else {
						VortexUtil.show({
									msg : data.msg || '上传失败'
								});
					}

					VortexUtil.log(t.id + " add after = " + t.getValue());
				},
				error : function(data, status, e) {
					UploadFile.clearInputFile(t.id);
					$.messager.progress('close');
					VortexUtil.show({
								msg : "上传失败"
							});
				}
			});
}
UploadFile.uploadSuccess = function(fileList_id, data) {
	if (data.success == true) {
		var src = path + '/uploadFile/download/' + data.id;
		var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;
		data.pic = '';
		if (patn.test(data.fileName)) {
			data.pic = '<img style="cursor:pointer" width="60" height="60" src="'
					+ src + '"/>';

		}
		$('#' + fileList_id).datagrid('appendRow', {
					id : data.id,
					fileName : data.fileName,
					pic : data.pic,
					size : UploadFile.size(data.fileSize)
				});
	}
}
