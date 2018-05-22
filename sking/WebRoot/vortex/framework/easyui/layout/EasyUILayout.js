EasyUILayout = function(config) {
	this.layoutId = config.layoutId;
	this.init();
};
//初如化
EasyUILayout.prototype.init = function() {
	var t = this;
};
// 删除
EasyUILayout.prototype.remove =function (region) {
	var t = this;
	var panel = $('#' + t.layoutId).layout('panel', region);
	if (!(panel == undefined || panel.length == 0)) {
		$('#' + t.layoutId).layout('remove', region);
	} else {
		if (_systemConfig.debug) {
			VortexUtil.log("not exist " + region);
		}
	}
}
//添加
EasyUILayout.prototype.add =function (region,regionPanelConfig) {
	var t = this;
	t.remove(region);
	$('#' + t.layoutId).layout('add', regionPanelConfig);
}
//显示某个region，center除外。
EasyUILayout.prototype.show = function(region) {
	var t = this;
	$('#' + t.layoutId).layout('show', region);
};
//隐藏除某个region，center除外
EasyUILayout.prototype.hide = function(region) {
	var t = this;
	$('#' + t.layoutId).layout('hide', region);
};