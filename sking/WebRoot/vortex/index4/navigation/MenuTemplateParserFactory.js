MenuTemplateParserFactory = function(config) {
	config = config || {};
	this.menuTemplateParser = config.menuTemplateParser || new TestMenuTemplate();
};
MenuTemplateParserFactory.prototype.init = function() {
	var t = this;
};
// 菜单模板
MenuTemplateParserFactory.prototype.generateHtmlByTemplate = function(menuCode) {
	var t = this;
	var html = '';
	var menu = Loader.getMenuByCode(menuCode);
	if (menu) {
		switch (menu.levelIndex) {
		case 1:
			html = t.generateHtmlByFirstMenuTemplate(menuCode);
			break;
		case 2:
			html = t.generateHtmlBySecondMenuTemplate(menuCode);
			break;
		case 3:
			html = t.generateHtmlByThreeMenuTemplate(menuCode);
			break;
		default:
			break;
		}
	} 
	return html;
};
// 改变菜单样式
MenuTemplateParserFactory.prototype.changeMenuCss = function(menuCode) {
	var t = this;
	var menu = Loader.getMenuByCode(menuCode);
	if (menu) {
		switch (menu.levelIndex) {
		case 1:
			 t.changeFirstMenuCss(menuCode);
			break;
		case 2:
			t.changeSecondMenuCss(menuCode);
			break;
		case 3:
			t.changeThreeMenuCss(menuCode);
			break;
		default:
			break;
		}
	} 
};
// 一级菜单模板
MenuTemplateParserFactory.prototype.generateHtmlByFirstMenuTemplate = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.parseFirstMenuByTemplate(menuCode);
};

// 改变一级菜单样式
MenuTemplateParserFactory.prototype.changeFirstMenuCss = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.changeFirstMenuCss(menuCode);
};
//二级菜单模板
MenuTemplateParserFactory.prototype.generateHtmlBySecondMenuTemplate = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.parseSecondMenuByTemplate(menuCode);
};
//改变二级菜单样式
MenuTemplateParserFactory.prototype.changeSecondMenuCss = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.changeSecondMenuCss(menuCode);
};
//三级菜单模板
MenuTemplateParserFactory.prototype.generateHtmlByThreeMenuTemplate = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.parseThreeMenuByTemplate(menuCode);
};
//改变三级菜单样式
MenuTemplateParserFactory.prototype.changeThreeMenuCss = function(menuCode) {
	var t = this;
	return t.menuTemplateParser.changeThreeMenuCss(menuCode);
};