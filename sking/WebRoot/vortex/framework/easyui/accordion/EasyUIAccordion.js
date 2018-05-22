EasyUIAccordion = function(config) {
	this.accordionId = config.accordionId;
	this.init();
};
//初如化
EasyUIAccordion.prototype.init = function() {
	var t = this;
	$('#' + t.accordionId).accordion({
		animate : false,
		onSelect : function(title, index) {
			$('.easyui-accordion li div').removeClass("selected");
		}
	});
};
// 选中
EasyUIAccordion.prototype.select = function(title) {
	var t = this;
	// 选中第一个
	var panels = $('#' + t.accordionId).accordion('panels');
	if (panels != undefined && panels.length > 0) {
		var t = title == undefined ? panels[0].panel('options').title : title;
		$('#' + t.accordionId).accordion('select', t);
	}
};
//添加
EasyUIAccordion.prototype.add = function(panelConfig) {
	var t = this;
	$('#' + t.accordionId).accordion('add', panelConfig);
};
//清除所有
EasyUIAccordion.prototype.clearAllItems = function() {
	var t = this;
	var nav_panels = $('#' + t.accordionId).accordion('panels');
	if (nav_panels.length > 0) {
		for ( var i = 0; i <= nav_panels.length;) {
			$(nav_panels[i]).unbind();
			var title = nav_panels[i].panel('options').title;
			$('#' + t.accordionId).accordion('remove', title);
			nav_panels = $('#' + t.accordionId).accordion('panels');
			i = 0;
			if (nav_panels.length == 0) {
				break;
			}
		}
	}
};
