Loader = function() {
	var menu_codes = MapUtil.getInstance();
	var menu_ids = MapUtil.getInstance();
	var menuFuncDefs = MapUtil.getInstance();
	var menuBindNavs = MapUtil.getInstance();
	var menuBindNavsObj = MapUtil.getInstance();
	var currentMeuns = MapUtil.getInstance();
	var parentCodeToChildren = MapUtil.getInstance();
	
	var firstMenuId = "first_menu";
	var secondMenuId = "second_menu";
	var systemInfoId = "systemInfo";
	var firstClickMenuCode = null;
	var currentClickMenuId = null;
	var currentClickMenuCode = null;
	var menuTemplateParserFactory = new MenuTemplateParserFactory({
		menuTemplateParser:new TestMenuTemplate()
	});
	function getCurrentClickMenuId() {
		return currentClickMenuId;
	};
	function getAllMenu(){
		return menu_codes;
	};
	function getMenuByCode(menuCode){
		return menu_codes.get(menuCode);
	};
	function getCurrentMenusByLevel(level){
		return currentMeuns.get(level);
	};
	function getCurrentMenuAllParents(){
		var menu = menu_codes.get(currentClickMenuCode);
		if (menu.parents){
			var array = new Array();
			$.each(menu.parents,function(i,n){
				array.push(n);
			});
			return array;
		}else {
			return new Array();
		}
	};
	function generateCurrentNavigationTitle(){
		var menuAllParents = getCurrentMenuAllParents();
		var currentMenu = menu_codes.get(currentClickMenuCode);
		menuAllParents.reverse();
		var title = '<div class="vnavfont vnavsize">';
		$.each(menuAllParents,function(i,n){
			title +='<a href="javascript:void(0);"  onclick="Loader.clickMenu(\'' + n.code + '\')">' + n.name +'</a>&nbsp;&gt;&nbsp;';
		});
		title += '<a href="javascript:void(0);"  onclick="Loader.clickMenu(\'' + currentMenu.code + '\')">' + currentMenu.name +'</a>';
		title +='</div>';
		return title;
	};
	/**
	 * easyUi主菜单加载
	 */
	/*function parseAllMenu(obj,nodeSystemCode) {
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu') {
						menu_codes.add(n.code, n);
						menu_ids.add(n.id, n);
						if (n.hide != 1){
							if (n.levelIndex == 1){
								var itemEl = $('#'+nodeSystemCode)[0];  // the menu item element
								if (itemEl){
									var item = userInSystemMenu.menu('getItem', itemEl);
									if (item){
										userInSystemMenu.menu('appendItem', {
											 parent: item.target,  // the parent item element	
									    	 id:nodeSystemCode+"-" + n.code,
									         text: n.name,
									         name: n.name
									     });
									}
								}
								
								
							} else if (n.levelIndex == 2){
								var firstMenu =  menu_ids.get(n.parentId);
								var itemEl = $('#'+nodeSystemCode+"-"+firstMenu.code)[0];  // the menu item element
								if (itemEl){
									var item = userInSystemMenu.menu('getItem', itemEl);
									if (item){
										userInSystemMenu.menu('appendItem', {
											 parent: item.target,  // the parent item element	
									    	 id:nodeSystemCode+"-" + firstMenu.code+ "-" + n.code,
									         text: n.name,
									         name: n.name
									     });
									}
								}
								
								
							} else if (n.levelIndex == 3){
								var secondMenu =  menu_ids.get(n.parentId);
								var firstMenu =  menu_ids.get(secondMenu.parentId);
								
								var itemEl = $('#'+nodeSystemCode+"-"+firstMenu.code+"-"+secondMenu.code)[0];  // the menu item element
								if (itemEl){
									var item = userInSystemMenu.menu('getItem', itemEl);
									if (item){
										userInSystemMenu.menu('appendItem', {
											 parent: item.target,  // the parent item element	
									    	 id:nodeSystemCode+"-"+ firstMenu.code+ "-"+secondMenu.code + "-"+ n.code,
									         text: n.name,
									         name: n.name
									     });
									}
								}
								
								
							}
						}
						
						
						
						// 解析导航器
						var menuBindNav = menuBindNavs.get(n.code);
						if (menuBindNav == undefined) {
							menuBindNavs.add(n.code, n.menuBindNavs);
						}
						if (n.childrens) {
							parseAllMenu(n,nodeSystemCode);
						}
					}
				});
	};*/
	
	function parseAllMenu(obj,nodeSystemCode) {
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu') {
						menu_codes.add(n.code, n);
						menu_ids.add(n.id, n);
						if (n.hide != 1){
							if (n.levelIndex == 1){
								var childrenArray;
								if(parentCodeToChildren.get(nodeSystemCode)==undefined){
									childrenArray = new Array();
								}else{
									childrenArray = parentCodeToChildren.get(nodeSystemCode);
								}
								var child = {};
								child.id = nodeSystemCode+"-" + n.code;
								child.text = n.name;
								child.name = n.name;
								child.code = n.code;
								childrenArray.push(child);
								parentCodeToChildren.add(nodeSystemCode,childrenArray);
								
							} else if (n.levelIndex == 2){
								var firstMenu =  menu_ids.get(n.parentId);
								var childrenArray;
								if(parentCodeToChildren.get(firstMenu.code)==undefined){
									childrenArray = new Array();
								}else{
									childrenArray = parentCodeToChildren.get(firstMenu.code);
								}
								var child = {};
								child.id = nodeSystemCode+"-" + firstMenu.code+ "-" + n.code;
								child.text = n.name;
								child.name = n.name;
								child.code = n.code;
								childrenArray.push(child);
								parentCodeToChildren.add(firstMenu.code,childrenArray);
								
							} else if (n.levelIndex == 3){
								var secondMenu =  menu_ids.get(n.parentId);
								var firstMenu =  menu_ids.get(secondMenu.parentId);
								
								var firstMenu =  menu_ids.get(n.parentId);
								var childrenArray;
								if(parentCodeToChildren.get(secondMenu.code)==undefined){
									childrenArray = new Array();
								}else{
									childrenArray = parentCodeToChildren.get(secondMenu.code);
								}
								var child = {};
								child.id = nodeSystemCode+"-"+ firstMenu.code+ "-"+secondMenu.code + "-"+ n.code;
								child.text = n.name;
								child.name = n.name;
								child.code = n.code;
								childrenArray.push(child);
								parentCodeToChildren.add(secondMenu.code,childrenArray);
							}
						}
						// 解析导航器
						var menuBindNav = menuBindNavs.get(n.code);
						if (menuBindNav == undefined) {
							menuBindNavs.add(n.code, n.menuBindNavs);
						}
						if (n.childrens) {
							parseAllMenu(n,nodeSystemCode);
						}
					}
				});
	};
	//生成html代码
	function parseHtmlBySysTemCode(nodeSystemCode){
		var html = '';
		if(parentCodeToChildren.get(nodeSystemCode)!=undefined){
			var firstMenu = parentCodeToChildren.get(nodeSystemCode);
			for(var i = 0;i<firstMenu.length;i++){
				
				if(parentCodeToChildren.get(firstMenu[i].code)!=undefined){
					html += '<div style="clear:both;"><div id="'+firstMenu[i].id+'" name="'+firstMenu[i].name+'" class="menuCanotClick firstMenu">'+firstMenu[i].text+'</div><div style="clear:both;width:300px;border-top:1px dotted #E8E8E7;margin-left:10px;"></div>';
					var secondMenu = parentCodeToChildren.get(firstMenu[i].code);
					for(var j=0;j<secondMenu.length;j++){
						
						if(parentCodeToChildren.get(secondMenu[j].code)!=undefined){
							html += '<div style="clear:both;"></div><div id="'+secondMenu[j].id+'" name="'+secondMenu[j].name+'" class="menuCanotClick secondMenu">'+secondMenu[j].text+'</div><div style="clear:both;width:150px;border-top:1px dotted #E8E8E7;margin-left:10px;"></div>';
							var thirdMenu = parentCodeToChildren.get(secondMenu[j].code);
							html += '<ul id="second-menulist-01" class="second-menu clearfix">';
							for(var k=0;k<thirdMenu.length;k++){
								html +=   '<li>';
								html += 	  '<a id="'+thirdMenu[k].id+'" name="'+thirdMenu[k].name+'" onclick="menuClick(this)" class="menuCanClick second-menu-item"  hidefocus="hidefocus">'+thirdMenu[k].text+'</a>';
								html +=   '</li>';
							}
							html += '</ul>';
						}else{
							html += '<div style="clear:both;"><div id="'+secondMenu[j].id+'" name="'+secondMenu[j].name+'" class="menuCanClick secondMenu" onclick="menuClick(this)">'+secondMenu[j].text+'</div><div style="clear:both;width:150px;border-top:1px dotted #E8E8E7;margin-left:10px;"></div>';
						}
					}
				}else{
					html += '<div style="clear:both;"><div id="'+firstMenu[i].id+'" name="'+firstMenu[i].name+'" class="menuCanClick firstMenu" onclick="menuClick(this)">'+firstMenu[i].text+'</div><div style="clear:both;width:300px;border-top:1px dotted #E8E8E7;margin-left:10px;"></div>';
				}
			}
		}
		$(html).appendTo($("#"+nodeSystemCode));
	};
	
	// 生成菜单
	function generateMenuHtml(obj, levelIndex) {

		var menuHtml = '';
		var menuHtmlArray = new Array();

		firstClickMenuCode = null;
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu' && n.levelIndex == levelIndex && n.hide != 1) {
						//if (i == 0) {
						if (firstClickMenuCode == null) {
							firstClickMenuCode = n.code;
							if (_systemConfig.debug) {
								VortexUtil
										.log("generateMenuHtml atuo click menu code = "
												+ n.code
												+ ",id = "
												+ n.id);
							}
						}
						if (currentMeuns.get(levelIndex) != undefined){
							currentMeuns.get(levelIndex).push(n);
						} else {
							var currentMenu = new Array();
							currentMenu.push(n);
							currentMeuns.add(levelIndex, currentMenu);
						}
						menuHtmlArray.push(menuTemplateParserFactory.generateHtmlByTemplate(n.code));
					}

				});

		if (levelIndex == 1) {
			//menuHtmlArray.reverse();
		}
		$.each(menuHtmlArray, function(i, n) {
					menuHtml += n;
				});
		return menuHtml;
	};
	function nodeSystemTemplate(obj) {
		var hasWelcomeUrlTemplate = '<a href="input_welcomeUrl"> <img id="systemImg" src="input_systemImg" style="border: none" /></a>';

		var noWelcomeUrlTemplate = '<img id="systemImg" src="input_systemImg" style="border: none" />';

		var defaultImageUrl = path + "/resources/themes/vortex/images/LOGO.png";
		//var defaultImageUrl = "";
		var menuDiv = obj.welcomeUrl == ""
				? noWelcomeUrlTemplate
				: hasWelcomeUrlTemplate;
		if (menuDiv.indexOf("input_welcomeUrl") != -1) {
			menuDiv = menuDiv.replace("input_welcomeUrl", path + "/"
							+ obj.welcomeUrl + "?systemCode="
							+ IndexCore.systemCode);
		}

		menuDiv = menuDiv.replace("input_systemImg", obj.systemImg == ""
						? defaultImageUrl
						: _systemConfig.downloadFileInlineUrl.replace("{id}",obj.systemImg));
		
		//menuDiv = menuDiv.replace("input_systemImg", defaultImageUrl);
		return menuDiv;
	};
	//解析系统信息
	function parseSystemData(obj){
		// 设置节点系统信息
		var nodeSystemHtml = nodeSystemTemplate(obj);
		return nodeSystemHtml;
	};
	// 根据系统编码加载属于自己权限的菜单
	function loadSystemInfo(nodeSystemCode) {
		var requestParam = {};
		// 添加用户,做权限
		requestParam.userId = IndexCore.userInfo.userId;
		// dejunx add 2013-03-21
		requestParam.userType = IndexCore.userInfo.userType;
		requestParam.nodeSystemCode = nodeSystemCode;		
		VortexUtil.remoteCall({
			url : _systemConfig.loadNodeSystemURL,
			params:requestParam,
			isAsync:true,
			dataType:'json',
			successCallback:function(data){
				// 解析所有的菜单
				parseAllMenu(data,nodeSystemCode);
				// 生成html代码
				parseHtmlBySysTemCode(nodeSystemCode);
			}
		});
	};
	function parsefuncDefData(obj) {
		var funcDefName = obj.name;
		$.each(obj.funcLayouts, function(i, n) {
					// 现在每个功能定义中只有一个功能设计，暂时是这样设计的
					var funcLayout = n;
					var url = "";
					if (funcLayout.controlRegisterDTO.dtoType) {
						url = funcLayout.controlRegisterDTO.url;
					}
					if (url != "") {
						if (_systemConfig.debug) {
//							VortexUtil.log("parsefuncDefData time = "
//									+ new Date());
						}
						var currentMenuId = Loader.getCurrentClickMenuId();
						
						//设置当前操作
						IndexCore.currentOperator.currentMenuId = currentMenuId;
						IndexCore.currentOperator.currentMenuNavId = '';
						IndexCore.currentOperator.currentNavId = '';
						IndexCore.currentOperator.pmsResourceId = currentMenuId;
						
						var menu = menu_ids.get(currentMenuId);
						
						FuncPanelUtil.addTab(menu.name, url,{id:menu.id});
					} else {
						VortexUtil.show({
									msg : "没有配置控件注册"
								});
					}
				});
	};
	function loadFuncDef(menuCode, funcDefId) {
		var menuFuncDef = menuFuncDefs.get(menuCode);
		if (menuFuncDef != undefined) {
			parsefuncDefData(menuFuncDef);
		} else {
			VortexUtil.remoteCall({
				url : _systemConfig.loadFuncDefMenuURL,
				params:{"funcDefId":funcDefId},
				isAsync:true,
				dataType:'json',
				successCallback:function(data){
					if (_systemConfig.debug) {
						VortexUtil.log(data);
					}
					parsefuncDefData(data);
					menuFuncDefs.add(menuCode, data);
				}
			});
		}

	};
	function loadMenuBindNav(menuCode) {
		var menuBindNav = menuBindNavs.get(menuCode);
		if (menuBindNav.length == 0) {
			IndexCore.removeNavigationPanel();
		} else {
			IndexCore.addNavigationPanel();
			var navigationMap = menuBindNavsObj.get(menuCode);
			if (navigationMap == undefined) {
				navigationMap = MapUtil.getInstance();
				menuBindNavsObj.add(menuCode, navigationMap);
			}
			$.each(menuBindNav, function(i, n) {
						var menuBindNavId = n.id;
						if (n.navControlType == 'treeNav') {// 树型导航器
							var treeNavigation = null;
							if (navigationMap.get(menuBindNavId) == undefined) {
								treeNavigation = new TreeNavigation({
											menuBindNav : n
										});
								navigationMap
										.add(menuBindNavId, treeNavigation);

							} else {
								treeNavigation = navigationMap
										.get(menuBindNavId);
							}
							// 此外还有问题，第一次加载时，数据没加载过来，选中节点会有问题
							treeNavigation.init();
							if (i == 0) {
								// treeNavigation.selectFirstHasFuncDefNode.defer(100);
								treeNavigation.selectFirstHasFuncDefNode();
							}

						} else if (n.navControlType == 'listNav') {// 列表导航器

							var listNavigation = null;
							if (navigationMap.get(menuBindNavId) == undefined) {
								listNavigation = new ListNavigation({
											menuBindNav : n
										});
								navigationMap
										.add(menuBindNavId, listNavigation);

							} else {
								listNavigation = navigationMap
										.get(menuBindNavId);
							}
							// 此外还有问题，第一次加载时，数据没加载过来，选中节点会有问题
							listNavigation.init();

						} else {
							if (_systemConfig.debug) {
								VortexUtil.log("无法识别的导航器");
							}
						}
					});
			//Index.selectNavigation.defer(100);
		}

	};
	function clickMenuById(id){
		var menu = menu_ids.get(id);
		clickMenu(menu.code);
	};
	// 点击菜单进行的操作
	function clickMenu(code) {
		var needSelectFirst = false;
		var menu = menu_codes.get(code);
		var menu_systemCode = menu.nodeSystemCode;
		if (menu != undefined) {
			VortexUtil.updataUrl('currentMenuCode', code);

			currentClickMenuId = menu.id;
			currentClickMenuCode = menu.code;
			//设置当前操作
			IndexCore.currentOperator.currentMenuCode = menu.code;
			IndexCore.currentOperator.nodeSystemCode = menu_systemCode;
			if (_systemConfig.debug) {
				
			}

			/*switch (menu.levelIndex) {
				case 1:// 如果点击的是一级菜单
					//改变一级菜单样式
					menuTemplateParserFactory.changeMenuCss(code);
					// 加载二级菜单
					var menuHtml = generateMenuHtml(menu, 2);
					if (menuHtml == "") {//没有二级菜单
						//去掉左边的菜单面板
						IndexCore.removeLeftMenuPanel();
					} else {
						IndexCore.addLeftMenuPanel(menuHtml);
						needSelectFirst = true;
					}
					break;
	
				case 2:// 如果点击的是二级菜单
					//改变二级菜单样式
					menuTemplateParserFactory.changeMenuCss(code);
					//显示三级菜单
					// 加载三级菜单
					var menuHtml = generateMenuHtml(menu, 3);
					if (menuHtml != "") {//有三级菜单
						if (!document.getElementById( menu.id + "_childrenMenu")){
							var templateHtml = ' <div class="leftnav_zi1_ul" style="display:none;" id="' + menu.id + '_childrenMenu">'
								+ menuHtml
								+'</div>';
							$('#' + menu.id).append(templateHtml);
						}
						$('#' + menu.id + "_childrenMenu").show();
						needSelectFirst = true;
					} 
					break;
				case 3:// 如果点击的是三级菜单
					//改变三级菜单样式
					menuTemplateParserFactory.changeMenuCss(code);
					break;
			}*/
			// 加载导航器
			loadMenuBindNav(menu.code);
			// 加载功能面板
			if (menu.funcBindTag == "func") {
				if (menu.funcDefId == "") {
					if (_systemConfig.debug) {
						VortexUtil.log(menu.name + "没有配置功能面板");
					}
				} else {
					// 加载功能定义
					loadFuncDef(menu.code, menu.funcDefId);
				}

			} else if (menu.funcBindTag == "url") {
				if (menu.url == "") {
					if (_systemConfig.debug) {
						VortexUtil.log(menu.name + "没有配置url");
					}
				}
			} else {
				if (_systemConfig.debug) {
					// VortexUtil.log(menu.name + "没有配置功能");
				}
			}

			// 选中第一个
			/*if (needSelectFirst) {
				clickMenu(firstClickMenuCode);
			}*/

		}
	};
	
	function goToMenu(menuCode){
		var menu = menu_codes.get(menuCode);
		if (menu != undefined) {
			if (menu.parent) {// 如果存在父节点、
				var parents = menu.parents;
				parents.reverse();
				$.each(parents,function(i,n){
					// 先选中父节点
					clickMenu(n.code);
				});
			}
			clickMenu(menuCode);
		} else {
			VortexUtil.show({
				msg : "无权限操作"
			});
		}
	}
	return {
		loadSystemInfo : function(nodeSystemCode) {
			loadSystemInfo(nodeSystemCode);
		},
		getAllMenu:function(){
			return getAllMenu();
		},
		getMenuByCode:function(menuCode){
			return getMenuByCode(menuCode);
		},
		getCurrentMenusByLevel:function(level){
			return getCurrentMenusByLevel(level);
		},
		clickMenu : function(code) {
			clickMenu(code);
		},
		clickMenuById : function(id) {
			clickMenuById(id);
		},
		goToMenu :function(code){
			goToMenu(code);
		},
		getCurrentClickMenuId : function() {
			return getCurrentClickMenuId();
		},
		getCurrentMenuAllParents:function (){
			return getCurrentMenuAllParents();
		},
		generateCurrentNavigationTitle:function (){
			return generateCurrentNavigationTitle();
		}
	};
}();