Loader = function() {
	var menus = MapUtil.getInstance();
	var menuFuncDefs = MapUtil.getInstance();
	var menuBindNavs = MapUtil.getInstance();
	var menuBindNavsObj = MapUtil.getInstance();
	var currentMeuns = MapUtil.getInstance();
	
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
		return menus;
	};
	function getMenuByCode(menuCode){
		return menus.get(menuCode);
	};
	function getCurrentMenusByLevel(level){
		return currentMeuns.get(level);
	};
	function getCurrentMenuAllParents(){
		var menu = menus.get(currentClickMenuCode);
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
		var currentMenu = menus.get(currentClickMenuCode);
		menuAllParents.reverse();
		var title = '<div class="vnavfont vnavsize">';
		$.each(menuAllParents,function(i,n){
			title +='<a href="javascript:void(0);"  onclick="Loader.clickMenu(\'' + n.code + '\')">' + n.name +'</a>&nbsp;&gt;&nbsp;';
		});
		title += '<a href="javascript:void(0);"  onclick="Loader.clickMenu(\'' + currentMenu.code + '\')">' + currentMenu.name +'</a>';
		title +='</div>';
		return title;
	};
	function parseAllMenu(obj) {
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu') {
						menus.add(n.code, n);
						// 解析导航器
						var menuBindNav = menuBindNavs.get(n.code);
						if (menuBindNav == undefined) {
							menuBindNavs.add(n.code, n.menuBindNavs);
						}
						if (n.childrens) {
							parseAllMenu(n);
						}
					}
				});
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
		$.post(_systemConfig.loadNodeSystemURL, requestParam, function(data) {
					//隐藏加载信息
					$.mask.hide();
					if (_systemConfig.debug) {
						VortexUtil.log(data);
					}
					// 解析所有的菜单
					parseAllMenu(data);

					//解析系统信息
					var systemHtml = parseSystemData(data);
					$('#'+ systemInfoId).html(systemHtml);
					VortexUtil.setPageTitle(data.name);
					//解析一级菜单信息
					var html = generateMenuHtml(data, 1);
					$('#' + firstMenuId).append(html);

					var menuCode = VortexUtil.getUrlRequestParamValue(
							document.location.href, "currentMenuCode");
					if (menuCode == null) {
						// 选中第一个
						clickMenu(firstClickMenuCode);
					} else {
						var menu = menus.get(menuCode);
						if (menu != undefined) {
							if (menu.parent) {// 如果存在父节点、
								var parents = menu.parents;
								var newParents = new Array();//复制数据
								$.each(parents,function(i,n){
									newParents.push(n);
								});
								newParents.reverse();
								$.each(newParents,function(i,n){
									// 先选中父节点
									clickMenu(n.code);
								});
								// 先选中父节点
								//clickMenu(menu.parent.code);
							}
							clickMenu(menuCode);
						} else {
							// 选中第一个
							clickMenu(firstClickMenuCode);
						}

					}

				}, "json");
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
						
						FuncPanelUtil.addTab(funcDefName, url);
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
			/*$.ajax({
						type : "POST",
						url : _systemConfig.loadFuncDefMenuURL,
						data : "funcDefId=" + funcDefId,
						dataType : "json",
						success : function(data) {
							//添加登陆判断
							if (data.relogin){
								window.top.location.href = path + '/' + data.reloginUri;
							} else {
								if (_systemConfig.debug) {
									VortexUtil.log(data);
								}
								parsefuncDefData(data);
								menuFuncDefs.add(menuCode, data);
							}
							
						}
					});*/
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
	// 点击菜单进行的操作
	function clickMenu(code) {
		var needSelectFirst = false;
		var menu = menus.get(code);
		if (menu != undefined) {
			VortexUtil.updataUrl('currentMenuCode', code);

			currentClickMenuId = menu.id;
			currentClickMenuCode = menu.code;
			//设置当前操作
			IndexCore.currentOperator.currentMenuCode = menu.code;
			
			if (_systemConfig.debug) {
//				VortexUtil.log("click menu code = " + menu.code + ",name = "
//						+ menu.name + ",namePy = " + String2Alpha(menu.name)
//						+ ",id = " + currentClickMenuId);
			}

			switch (menu.levelIndex) {
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
			}
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
			if (needSelectFirst) {
				clickMenu(firstClickMenuCode);
			}

		}
	};
	
	function goToMenu(menuCode){
		var menu = menus.get(menuCode);
		if (menu != undefined) {
			if (menu.parent) {// 如果存在父节点、
				var parents = menu.parents;
				parents.reverse();
				$.each(parents,function(i,n){
					// 先选中父节点
					clickMenu(n.code);
				});
				// 先选中父节点
				//clickMenu(menu.parent.code);
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