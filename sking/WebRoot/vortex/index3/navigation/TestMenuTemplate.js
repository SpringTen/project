TestMenuTemplate = function(config) {
};
TestMenuTemplate.prototype.init = function() {
	var t = this;
};
//一级菜单模板
TestMenuTemplate.prototype.parseFirstMenuByTemplate = function(menuCode) {
	var t = this;
	var template = t.firstMenuTemplate();
	var menu = Loader.getMenuByCode(menuCode);
	var parserHtml = template;
	var menuDefaultImgUrl = path + '/resources/themes/vortex/images/firstmenudefault.png';
	var menuIconUrl = menu.icon == ""
		? menuDefaultImgUrl
		: _systemConfig.downloadFileInlineUrl.replace("{id}",menu.icon);
	parserHtml = parserHtml.replace("input_menuIcon", menuIconUrl);
	parserHtml = parserHtml.replace("input_menuId", menu.id);
	parserHtml = parserHtml.replace("input_menuCode", menu.code);
	parserHtml = parserHtml.replace("input_menuName", menu.name);
	return parserHtml;
};
// 一级菜单模板
TestMenuTemplate.prototype.firstMenuTemplate = function() {
	//var templateHtml = '<a href="javascript:void(0);" id="input_menuId" onclick="Loader.clickMenu(\'input_menuCode\')">input_menuName</a>&nbsp;&nbsp;';
	
	var templateHtml = '<div class="vheader-menu-m vheader-menu-m1" id="input_menuId" onclick="Loader.clickMenu(\'input_menuCode\')">'
							+'<div class="vheader-menu-con">'
							+'<div><img class="vheader-menu-img" src="input_menuIcon"/>'
						+'<span class="vheader-menu-text">input_menuName</span></div>'
						+'</div>'
					+'</div>';
	return templateHtml;
};

// 改变一级菜单样式
TestMenuTemplate.prototype.changeFirstMenuCss = function(menuCode) {
	var menu = Loader.getMenuByCode(menuCode);
	
	var menus = Loader.getCurrentMenusByLevel(1);
	if (menus != undefined){
		$.each(menus,function(i,n){
			$('#' + n.id).removeClass('vheader-menu-m1_click');
		});
	}
	$('#' + menu.id).addClass('vheader-menu-m1_click');
};

//二级菜单模板
TestMenuTemplate.prototype.parseSecondMenuByTemplate = function(menuCode) {
	var t = this;
	var template = t.secondMenuTemplate();
	var menu = Loader.getMenuByCode(menuCode);
	var parserHtml = template;
	var menuDefaultImgUrl = path + '/resources/themes/vortex/images/secondmenudefault.png';
	/*var menuIconUrl = menu.icon == ""
		? menuDefaultImgUrl
		: (_systemConfig.downloadUrl + menu.icon);*/
	var menuIconUrl = menu.icon == ""
		? menuDefaultImgUrl
		: _systemConfig.downloadFileInlineUrl.replace("{id}",menu.icon);
	parserHtml = parserHtml.replace("input_menuIcon", menuIconUrl);
	parserHtml = parserHtml.replace("input_menuId", menu.id);
	parserHtml = parserHtml.replace("input_menuCode", menu.code);
	parserHtml = parserHtml.replace("input_menuName", menu.name);
	return parserHtml;
};
//二级菜单模板
TestMenuTemplate.prototype.secondMenuTemplate = function() {
	//var templateHtml = '<a href="javascript:void(0);" onclick="Loader.clickMenu(\'input_menuCode\')">input_menuName</a><br>';
	var templateHtml = '<div class="cursor" id="input_menuId" ><div class="leftnav1" onclick="Loader.clickMenu(\'input_menuCode\')">'
							+'<div class="leftnav1-left-img" >'
								+'<img src="input_menuIcon"/>'
							+'</div>'
							+'<div class="leftnav1-left-txt">input_menuName</div>'
						+'</div></div>';
	return templateHtml;
};
//改变二级菜单样式
TestMenuTemplate.prototype.changeSecondMenuCss = function(menuCode) {
	var menu = Loader.getMenuByCode(menuCode);
	var menus = Loader.getCurrentMenusByLevel(2);
	if (menus != undefined){
		$.each(menus,function(i,n){
			$('#' + n.id).removeClass('leftnav1_click');
			$('#' + n.id + '_childrenMenu').hide();
		});
	}
	$('#' + menu.id).addClass('leftnav1_click');
	
};

//三级菜单模板
TestMenuTemplate.prototype.parseThreeMenuByTemplate = function(menuCode) {
	var t = this;
	var template = t.threeMenuTemplate();
	var menu = Loader.getMenuByCode(menuCode);
	var parserHtml = template;
	var menuDefaultImgUrl = path + '/resources/themes/vortex/images/secondmenudefault.png';
	var menuIconUrl = menu.icon == ""
		? menuDefaultImgUrl
		: _systemConfig.downloadFileInlineUrl.replace("{id}",menu.icon);
	parserHtml = parserHtml.replace("input_menuIcon", menuIconUrl);
	parserHtml = parserHtml.replace("input_menuId", menu.id);
	parserHtml = parserHtml.replace("input_menuCode", menu.code);
	parserHtml = parserHtml.replace("input_menuName", menu.name);
	return parserHtml;
};
//三级菜单模板
TestMenuTemplate.prototype.threeMenuTemplate = function() {
	//var templateHtml = '<a href="javascript:void(0);" onclick="Loader.clickMenu(\'input_menuCode\')">input_menuName</a><br>';
	var templateHtml = '<div class="leftnav_zi1_li1" id="input_menuId" onclick="Loader.clickMenu(\'input_menuCode\')"><a href="javascript:void(0);" >input_menuName</a></div>';
	return templateHtml;
};
//改变三级菜单样式
TestMenuTemplate.prototype.changeThreeMenuCss = function(menuCode) {
	var menu = Loader.getMenuByCode(menuCode);
	var menus = Loader.getCurrentMenusByLevel(3);
	if (menus != undefined){
		$.each(menus,function(i,n){
			$('#' + n.id).removeClass('leftnav_zi1_li1-click');
		});
	}
	$('#' + menu.id).addClass('leftnav_zi1_li1-click');
	
};