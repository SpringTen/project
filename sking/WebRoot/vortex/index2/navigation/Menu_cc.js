Menu = function() {
	var menus = MapUtil.getInstance();
	var menuFuncDefs = MapUtil.getInstance();
	var menuBindNavs = MapUtil.getInstance();
	var menuBindNavsObj = MapUtil.getInstance();
	var firstSelectMenu = null;
	var currentFirstMenu = new Array();
	var currentSecondMenu = new Array();
	var firstMenuId = "first_menu";
	var secondMenuId = "second_menu";
	var currentClickMenuCode = null;
	var currentClickMenuId = null;

	function getCurrentClickMenuId() {
		return currentClickMenuId;
	}
	// 一级菜单模板
	function firstMenuTemplate(menu) {

		var splitHtml = '<div style="float: right; width: 2px; margin-right: 10px;"><img src="input_splitImgSrc" /></div>';
		var templateHtml = '<div style="margin-right: 15px; background: url(input_menuIcon); width: 72px; height: 84px; float: right; cursor: pointer; margin-top: 5px;" id="input_menuId" onclick="Menu.clickMenu(\'input_menuCode\')" >'
				+ '<div style="font-size: 12px; margin-top: 70px;  color: #9f9f9f; text-align:center; line-height:13px" align="center" id="input_menuId2_name">input_menuName</div>'
				+ '</div>';

		var splitImgSrc = path + '/resources/themes/cc/images/headline.png';
		var menuDefaultImgUrl = path + '/resources/images/vortex01.png';
		var menuIconUrl = menu.icon == ""
				? menuDefaultImgUrl
				: (_systemConfig.downloadUrl + menu.icon);

		var menuDiv = menu.hasSplit == '1'
				? (templateHtml + splitHtml)
				: templateHtml;
		menuDiv = menuDiv.replace("input_splitImgSrc", splitImgSrc);
		menuDiv = menuDiv.replace("input_menuIcon", menuIconUrl);
		menuDiv = menuDiv.replace("input_menuId", menu.id);
		menuDiv = menuDiv.replace("input_menuId2", menu.id);
		menuDiv = menuDiv.replace("input_menuCode", menu.code);
		menuDiv = menuDiv.replace("input_menuName", menu.name);
		return menuDiv;
	};
	// 改变一级菜单样式
	function changeFirstMenuCss(selectMenuCode) {

		var menuDefaultImgUrl = path + '/resources/images/vortex01.png';
		var menuDefaultSelectImgUrl = path
				+ '/resources/images/vortex02.png';
		$.each(currentFirstMenu, function(i, n) {
					var menuIconUrl = n.selectIcon == ""
							|| n.selectIcon == null
							? menuDefaultImgUrl
							: (_systemConfig.downloadUrl + n.icon);
					var menuIconBackground = 'url(' + menuIconUrl + ')';
					var menuIconColor = "#9f9f9f";
					var menuSelectIconUrl = n.selectIcon == ""
							|| n.selectIcon == null
							? menuDefaultSelectImgUrl
							: (_systemConfig.downloadUrl + n.selectIcon);
					var menuSelectIconBackground = 'url(' + menuSelectIconUrl
							+ ')';
					var menuSelectIconColor = "#fff";
					if (n.code == selectMenuCode) {
						$('#' + n.id).css('background',
								menuSelectIconBackground);
						$('#' + n.id + "_name").css('color',
								menuSelectIconColor);
					} else {
						$('#' + n.id).css('background', menuIconBackground);
						$('#' + n.id + "_name").css('color', menuIconColor);
					}
				});
	};
	// 二级菜单模板
	function secondMenuTemplate(menu) {

		var templateHtml = "<div style=\"cursor: pointer; text-align:center;float: left; font-size: 12px; margin-left: 20px; width: 89px; font-family: '微软雅黑'; color: #6b6b6b; line-height: 34px; list-style-type: none; background: url(input_menuIcon) no-repeat 0px 14px;\" id=\"input_menuId\" onclick=\"Menu.clickMenu('input_menuCode')\">input_menuName</div>";

		// templateHtml += '<div style=" float:right;width:402px; height:34px;
		// background:url(' + path + '/resources/themes/cc/images/menubg02.png)
		// no-repeat"></div>'
		var defaultImageUrl = path + "/resources/themes/cc/images/menuarrow.png";

		var menuDiv = templateHtml;
		menuDiv = menuDiv.replace("input_menuIcon", defaultImageUrl);
		menuDiv = menuDiv.replace("input_menuId", menu.id);
		menuDiv = menuDiv.replace("input_menuCode", menu.code);
		menuDiv = menuDiv.replace("input_menuName", menu.name);

		return menuDiv;
	};
	// 改变二级菜单样式
	function changeSecondMenuCss(selectMenuCode) {
		var defaultImageUrl = path + "/resources/themes/cc/images/menuarrow.png";
		var defaultBackground = 'url(' + defaultImageUrl
				+ ') no-repeat 0px 14px';
		var defalutColor = "#6b6b6b";

		var selectImageUrl = path + "/resources/themes/cc/images/menubotton.png";
		var selectBackground = 'url(' + selectImageUrl + ') no-repeat 0px 5px';
		var selectColor = "#fff";
		$.each(currentSecondMenu, function(i, n) {
					if (n.code == selectMenuCode) {
						$('#' + n.id).css('background', selectBackground);
						$('#' + n.id).css('color', selectColor);
					} else {
						$('#' + n.id).css('background', defaultBackground);
						$('#' + n.id).css('color', defalutColor);
					}
				});
	};
	// 添加菜单上提示信息
	function addQtips(array) {
		if (_systemConfig.qipShow) {
			$.each(array, function(i, n) {
						var content = n.description;
						var id = n.id;

						if (content != "" && content != undefined
								&& content != null) {
							$('#' + id).qtip({
								content : {
									text : content
								},
								position : {
									my : 'top left',
									target : 'mouse',
									viewport : $(window), // Keep it
									adjust : {
										x : 10,
										y : 20
									}
								},
								hide : {
									fixed : true
								},
								style : _systemConfig.qipStyle
										|| 'ui-tooltip-shadow'
							});
						}

					});
		}

	};
	// 删除菜单上提示信息
	function removeQip(array) {
		if (_systemConfig.qipShow) {
			$.each(array, function(i, n) {
						$('#' + n.id).qtip('destroy'); // Preferred method

					});
		}

	};

	function generateAllMenu(obj) {
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu') {
						menus.add(n.code, n);

						if (n.childrens) {
							generateAllMenu(n);
						}
					}
				});
	};
	// 生成菜单
	function generateMenu(obj, levelIndex) {

		if (levelIndex == 2) {// 如果是二级菜单
			removeQip(currentSecondMenu);
		}
		currentSecondMenu = new Array();
		var menuHtml = '';
		var menuHtmlArray = new Array();

		currentClickMenuCode = null;
		// 从节点系统中解析子菜单
		$.each(obj.childrens, function(i, n) {
					if (n.nodeType == 'menu' && n.levelIndex == levelIndex) {
						menus.add(n.code, n);

						// 解析导航器
						var menuBindNav = menuBindNavs.get(n.code);

						if (menuBindNav == undefined) {
							menuBindNavs.add(n.code, n.menuBindNavs);
						}

						if (i == 0) {
							// clickMenu(n.code);
							currentClickMenuCode = n.code;
							currentClickMenuId = n.id
							if (_systemConfig.debug) {
								VortexUtil
										.log("generateMenu atuo click menu code = "
												+ n.code
												+ ",id = "
												+ currentClickMenuId);
							}
						}

						if (levelIndex == 1) {
							if (n.hide != 1) {
								currentFirstMenu.push(n);
								menuHtmlArray.push(firstMenuTemplate(n));
							}
						} else if (levelIndex == 2) {
							if (n.hide != 1) {
								currentSecondMenu.push(n);
								menuHtmlArray.push(secondMenuTemplate(n));
							}
						}

					}

				});

		if (levelIndex == 1) {
			menuHtmlArray.reverse();
		}
		$.each(menuHtmlArray, function(i, n) {
					menuHtml += n;
				});
		return menuHtml;
	};
	function nodeSystemTemplate(obj) {
		var hasWelcomeUrlTemplate = '<a href="input_welcomeUrl"> <img id="systemImg" src="input_systemImg" style="border: none" /></a>';

		var noWelcomeUrlTemplate = '<img id="systemImg" src="input_systemImg" style="border: none" />';

		// var defaultImageUrl = path + "/resources/themes/cc/images/menuarrow.png";
		var defaultImageUrl = "";
		var menuDiv = obj.welcomeUrl == ""
				? noWelcomeUrlTemplate
				: hasWelcomeUrlTemplate;
		if (menuDiv.indexOf("input_welcomeUrl") != -1) {
			menuDiv = menuDiv.replace("input_welcomeUrl", path + "/"
							+ obj.welcomeUrl + "?systemCode="
							+ Index.getNodeSystemCode() + "&userId="
							+ Index.getUserId() + "&userType="
							+ Index.getUserType());
		}

		menuDiv = menuDiv.replace("input_systemImg", obj.systemImg == ""
						? defaultImageUrl
						: (_systemConfig.downloadUrl + obj.systemImg));
		return menuDiv;
	};
	function parseMenuData(obj) {
		// 设置节点系统信息
		var nodeSystemHtml = nodeSystemTemplate(obj);
		$('#systemInfo').html(nodeSystemHtml);

		var menuHtml = generateMenu(obj, 1);
		return menuHtml;
	};
	// 根据系统编码加载属于自己权限的菜单
	function loadMenus(nodeSystemCode) {
		// $.ajax({
		// type : "POST",
		// url : _systemConfig.loadNodeSystemURL,
		// data : "nodeSystemCode=" + nodeSystemCode,
		// dataType : "json",
		// success : function(data) {
		// if (_systemConfig.debug) {
		// VortexUtil.log(data);
		// }
		// var html = parseMenuData(data);
		// $('#' + firstMenuId).append(html);
		// addQtips(currentFirstMenu);
		//
		// // 选中第一个
		// clickMenu(currentClickMenuCode);
		// VortexUtil.loading(false);
		// }
		// });
		var requestParam = {};
		// 添加用户,做权限
		requestParam.userId = Index.getUserId();
		// dejunx add 2013-03-21
		requestParam.userType = Index.getUserType();

		requestParam.nodeSystemCode = nodeSystemCode;
		$.post(_systemConfig.loadNodeSystemURL, requestParam, function(data) {
					if (_systemConfig.debug) {
						VortexUtil.log(data);
					}
					// 生成所有的菜单
					generateAllMenu(data);

					var html = parseMenuData(data);
					$('#' + firstMenuId).append(html);
					addQtips(currentFirstMenu);

					var menuCode = VortexUtil.getUrlRequestParamValue(
							document.location.href, "currentMenuCode");
					if (menuCode == null) {
						// 选中第一个
						clickMenu(currentClickMenuCode);
					} else {
						var menu = menus.get(menuCode);
						if (menu != undefined) {
							if (menu.parent) {// 如果存在父节点、
								// 先选中父节点
								clickMenu(menu.parent.code);
							}
							clickMenu(menuCode);
						} else {
							// 选中第一个
							clickMenu(currentClickMenuCode);
						}

					}

					VortexUtil.loading(false);
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
							VortexUtil.log("parsefuncDefData time = "
									+ new Date());
						}
						var currentMenuId = Menu.getCurrentClickMenuId();
						// url = url + "?pmsSession=true&currentMenuId="
						// + currentMenuId + "&currentSystemCode="
						// + Index.getNodeSystemCode();
						Index.setCurrentMenuId(currentMenuId);
						Index.setCurrentMenuNavId("");
						Index.setCurrentNavId("");
						Index.setPmsResourceId(currentMenuId);
						TabsUtil.addTab(funcDefName, url);
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
			$.ajax({
						type : "POST",
						url : _systemConfig.loadFuncDefMenuURL,
						data : "funcDefId=" + funcDefId,
						dataType : "json",
						success : function(data) {
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
			Index.hideNavigation();
		} else {
			Index.showNavigation();
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
			Index.selectNavigation.defer(100);
		}

	};
	function noSecondMenuTemplate(menu) {
		var templateHtml = '<div  style=" float:left;width:550px; height:34px; line-height:34px;  font-size:12px; color:#7c7c7c; margin-left:20px"><img src="input_infoImgSrc" align="absmiddle"  style="margin-right:20px"/>欢迎进入input_menuName</div>';
//		templateHtml += '<div  style=" float:right;width:402px; height:34px; background:url('
//				+ path
//				+ '/resources/themes/cc/images/menubg02.png) no-repeat"></div>'
		var infoImgSrc = path + '/resources/themes/cc/images/iconmenu01.png';

		var menuDiv = templateHtml;
		menuDiv = menuDiv.replace("input_infoImgSrc", infoImgSrc);
		menuDiv = menuDiv.replace("input_menuName", menu.name);
		return menuDiv;
	};
	// 点击菜单进行的操作
	function clickMenu(code) {
		var needSelectFirst = false;
		var menu = menus.get(code);
		if (menu != undefined) {
			VortexUtil.updataUrl('currentMenuCode', code);

			currentClickMenuId = menu.id;

			if (_systemConfig.debug) {
				VortexUtil.log("click menu code = " + menu.code + ",name = "
						+ menu.name + ",namePy = " + String2Alpha(menu.name)
						+ ",id = " + currentClickMenuId);
			}

			if (menu.levelIndex == 1) {// 如果点击的是一级菜单
				changeFirstMenuCss(code);
				// 加载二级菜单
				var menuHtml = generateMenu(menu, 2);
				if (menuHtml == "") {
					menuHtml = noSecondMenuTemplate(menu);
				} else {
					needSelectFirst = true;
				}
				menuHtml += '<div  style=" float:right;width:402px; height:34px; background:url('
						+ path
						+ '/resources/themes/cc/images/menubg02.png) no-repeat"></div>'
				$('#' + secondMenuId).html(menuHtml);
				addQtips(currentSecondMenu);

				// // 选中第一个
				// clickMenu(currentClickMenuCode);

			} else if (menu.levelIndex == 2) {// 如果点击的是二级菜单
				changeSecondMenuCss(code);
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
				clickMenu(currentClickMenuCode);
			}

		}
	};
	return {
		firstMenuTemplate : function(menuName, bgUrl) {
			return firstMenuTemplate(menuName, bgUrl);
		},
		secondMenuTemplate : function(menuName, bgUrl) {
			return secondMenuTemplate(menuName, bgUrl);
		},
		loadMenus : function(nodeSystemCode) {
			loadMenus(nodeSystemCode);
		},
		clickMenu : function(code) {
			clickMenu(code);
		},
		getCurrentClickMenuId : function() {
			return getCurrentClickMenuId();
		}
	};
}();