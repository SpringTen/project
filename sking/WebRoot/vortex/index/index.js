Index = function() {
	var northPanel = null;
	var centerPanel = null;
	var southPanel = null;
	var viewType = null;
	var mainLayout = "main_layout";
	var mainNavigationAccordionId = "main_NavigationAccordion";
	var fullScreen = false;

	// 用户信息，权限信息
	var userId = null;
	//dejunx add 2013-03-21
	var userType = 'user';
	
	var currentMenuCode = null;
	var currentMenuId = null;
	var currentMenuNavId = null;
	var currentNavId = null;
	var pmsResourceId = null;
	var nodeSystemCode = null;

	function setUserType(type) {
		userType = type;
	};
	function getUserType(type) {
		return userType;
	};
	function setCurrentMenuCode(code) {
		currentMenuCode = code;
	};
	function getCurrentMenuCode() {
		return currentMenuCode;
	};
	function setCurrentMenuId(id) {
		currentMenuId = id;
	};

	function getCurrentMenuId() {
		return currentMenuId;
	};

	function setCurrentMenuNavId(id) {
		currentMenuNavId = id;
	};

	function getCurrentMenuNavId() {
		return currentMenuNavId;
	};

	function setCurrentNavId(id) {
		currentNavId = id;
	};

	function getCurrentNavId() {
		return currentNavId;
	};

	function setUserId(userid) {
		userId = userid;
	};
	function getUserId() {
		return userId;
	};
	function setPmsResourceId(pmsResourceid) {
		pmsResourceId = pmsResourceid;
	};
	function getPmsResourceId() {
		return pmsResourceId;
	};
	function setNodeSystemCode(nodeSystemcode) {
		nodeSystemCode = nodeSystemcode;
	};
	function getNodeSystemCode() {
		return nodeSystemCode;
	};
	function setNorthPanel(panel) {
		this.northPanel = panel;
	};
	function getNorthPanel() {
		return this.northPanel;
	};
	function setCenterPanel(panel) {
		this.centerPanel = panel;
	};
	function getCenterPanel() {
		return this.centerPanel;
	};

	function setSouthPanel(panel) {
		this.southPanel = panel;
	};
	function getSouthPanel() {
		return this.southPanel;
	};

	function init() {
		viewType = TabsUtil.getViewType();
		// initNorthPanel();
		initCenterPanel();
		// initWestPanel();
		// initEastPanel();
		showNavigation();

		// initSouthPanel();

		// $('#' + mainLayout).layout('collapse','west');
	};

	function initNorthPanel() {
		clearLayout('north');
		$('#' + mainLayout).layout('add', {
					id : 'main_north',
					region : 'north',
					border : true,
					height : '50',
					style : "background:#fafafa;",
					content : getNorthPanelHtml()
				});
	};
	function getNorthPanelHtml() {
		return "n";
	};
	function clearLayout(region) {
		var panel = $('#' + mainLayout).layout('panel', region);
		if (!(panel == undefined || panel.length == 0)) {
			$('#' + mainLayout).layout('remove', region);
		} else {
			if (_systemConfig.debug) {
				VortexUtil.log("not exist " + region);
			}
		}
	};

	function initSouthPanel() {
		clearLayout('south');
		$('#' + mainLayout).layout('add', {
					id : 'main_south',
					region : 'south',
					border : true,
					height : '50',
					style : "height:50px;background:#fafafa;",
					content : getSouthPanelHtml()
				});
	};

	function getSouthPanelHtml() {
		return "s";
	};

	function initWestPanel() {
		clearLayout('west');
		$('#' + mainLayout).layout('add', {
					id : 'main_west',
					region : 'west',
					border : true,
					split : true,
					title : "导航",
					width : '250',
					content : getWestPanelHtml()
				});
	};

	function getWestPanelHtml() {
		return "w";
	};

	function initEastPanel() {
		clearLayout('east');
		$('#' + mainLayout).layout('add', {
			id : 'main_east',
			region : 'east',
			border : true,
			split : true,
			title : "导航",
			width : '250',
			content : '<div class="easyui-accordion" border="false" id="main_accordion" animate="true"></div>'
		});
	};

	function getEastPanelHtml() {
		return "e";
	};
	function initCenterPanel() {
		clearLayout('center');
		switch (viewType) {
			case "replace" :
				var id = new UUID().toString();
				$('#' + mainLayout).layout('add', {
					id : 'main_center',
					region : 'center',
					border : true,
					title : '功能区',// 暂时去掉
					iconCls : 'icon-win',
					tools : [{
								iconCls : 'icon-window-max',
								title : '全屏',
								id:'funnScreeBtn',
								handler : function() {
									//Index.changeFullScreen(this);
									changeScreen();
								}
							}],
					// style : "position:absolute; top:126px; left:0px;
					// right:0px; bottom:29px; background:#79b3ec;
					// overflow-x:hidden;"
					style : {}
						// content : getCenterReplaceHtml(id)
					});
				// TabsUtil.setReplaceIframeId(id);
				// var iframe = document.getElementById("main_panel_iframe");
				// if (iframe.attachEvent) {
				// iframe.attachEvent("onload", function() {
				// // $.messager.progress('close');
				// });
				// } else {
				// iframe.onload = function() {
				// // $.messager.progress('close');
				// };
				// }
				break;
			case "tabs" :
				$('#' + mainLayout).layout('add', {
							id : 'main_center',
							region : 'center',
							// border : true,
							title : '功能区',
							iconCls : 'icon-win',
							tools : [{
										iconCls : 'icon-win',
										title : '全屏',
										handler : function() {
											// test();
											Index.changeFullScreen(this);
										}
									}],
							content : getCenterTabsHtml()
						});

				break;
		}
	};
	function getCenterReplaceHtml(id) {
		var html = ""
				// + '<div class="easyui-panel" iconCls = "icon-win" title="功能区"
				// fit="true" border="false" plain="true" id="main_center"
				// tools="#p-tools">'
				+ '<iframe id="mainFrame_'
				+ id
				+ '"  frameborder="0" scrolling="auto" style="width:100%;height:100%" src=""></iframe>';
		// + '</div>'
		// + '<div id="p-tools">'
		// + '<a href="#" class="easyui-linkbutton" plain="true"
		// iconCls="icon-add" onclick="javascript:Index.fullScreen(this);"></a>'
		// + '</div>';
		return html;
	};

	function getCenterTabsHtml() {
		var html = '<div class="easyui-tabs" fit="true" border="false" plain="true" id="main_panel">'
				+ '<div title="主面板" style="padding: 20px; overflow: hidden;"></div>'
				+ '</div>';
		// + '<div id="tab-tools">'
		// + '<a href="#" class="easyui-linkbutton" plain="true"
		// iconCls="icon-win"
		// onclick="javascript:Index.changeFullScreen(this);"></a>'
		// + '</div>';
		return html;
	};

	function hideNavigation() {
		clearLayout('west');
	};
	function showNavigation() {
		$('#' + mainLayout).layout('add', {
			id : 'main_west',
			region : 'west',
			width : 200,
			title : '导航区',
			split : true,
			border : true,
			iconCls : 'icon-navigation',
			content : '<div class="easyui-accordion" border="false" id="'
					+ mainNavigationAccordionId
					+ '" animate="false" fit="true" style="background: #e5f3ff;""></div>'
		});
		clearNavigationItems();
		// test
		// addNavigationItem();
		initAccordionEvents();
	};
	function initAccordionEvents() {

		$('#' + mainNavigationAccordionId).accordion({
					animate : false,
					onSelect : function(title, index) {
						$('.easyui-accordion li div').removeClass("selected");
					}
				});
	};
	function getNavigationPanelId() {
		return mainNavigationAccordionId;
	};
	function InitLeftMenu() {

		$.each(_menus.menus, function(i, n) {
					var menulist = '';
					menulist += '<ul>';
					$.each(n.menus, function(j, o) {
								menulist += '<li><div><a ref="' + o.menuid
										+ '" href="#" rel="' + o.url
										+ '" ><span class="icon ' + o.icon
										+ '" >&nbsp;</span><span class="nav">'
										+ o.menuname
										+ '</span></a></div></li> ';
							})
					menulist += '</ul>';

					$('#' + mainNavigationAccordionId).accordion('add', {
								title : n.menuname,
								content : menulist,
								iconCls : 'icon ' + n.icon
							});

				});

		$('.easyui-accordion li a').click(function() {
					var tabTitle = $(this).children('.nav').text();

					if (tabTitle != '') {
						var url = $(this).attr("rel");
						var menuid = $(this).attr("ref");
						var icon = getIcon(menuid, icon);

						TabsUtil.addTab(tabTitle, url, icon);
						$('.easyui-accordion li div').removeClass("selected");
						$(this).parent().addClass("selected");
					}

				}).hover(function() {
					$(this).parent().addClass("hover");
				}, function() {
					$(this).parent().removeClass("hover");
				});

		// 选中第一个
		selectNavigation();
	};
	function selectNavigation(title) {
		// 选中第一个
		var panels = $('#' + mainNavigationAccordionId).accordion('panels');
		if (panels != undefined && panels.length > 0) {
			var t = title == undefined
					? panels[0].panel('options').title
					: title;
			$('#' + mainNavigationAccordionId).accordion('select', t);
		}

	};
	// 获取左侧导航的图标
	function getIcon(menuid) {
		var icon = 'icon ';
		$.each(_menus.menus, function(i, n) {
					$.each(n.menus, function(j, o) {
								if (o.menuid == menuid) {
									icon += o.icon;
								}
							});
				});

		return icon;
	};
	function clearNavigationItems() {
		var nav_panels = $('#' + mainNavigationAccordionId).accordion('panels');
		if (nav_panels.length > 0) {
			for (var i = 0; i <= nav_panels.length;) {
				$(nav_panels[i]).unbind();
				var title = nav_panels[i].panel('options').title;
				$('#' + mainNavigationAccordionId).accordion('remove', title);
				nav_panels = $('#' + mainNavigationAccordionId)
						.accordion('panels');
				i = 0;
				if (nav_panels.length == 0) {
					break;
				}
			}
		}
	};
	function addNavigationItem() {
		// 先清空所有的导航器
		clearNavigationItems();

		var treeNavigation = new TreeNavigation({
					isTest : true
				});
		treeNavigation.init();

		// InitLeftMenu();

	};

	function changeFullScreen() {
		var regions = ['south', 'north', 'west'];

		if (fullScreen) {
			$.each(regions, function(i, region) {
						var panel = $('#' + mainLayout).layout('panel', region);
						if (!(panel == undefined || panel.length == 0)) {
							$('#' + mainLayout).layout('expand', region);
							// panel.panel('open');
						}
					});
			fullScreen = false;
		} else {
			$.each(regions, function(i, region) {
						var panel = $('#' + mainLayout).layout('panel', region);
						if (!(panel == undefined || panel.length == 0)) {
							$('#' + mainLayout).layout('collapse', region);
							// panel.panel('close');
						}
					});
			fullScreen = true;
		}
		// $('#' + mainLayout).layout('resize');

	};
	return {
		userInfo : {},

		init : function() {
			init();
		},
		changeFullScreen : function() {
			changeFullScreen();
		},
		setNorthPanel : function(panel) {
			setNorthPanel(panel);
		},
		getNorthPanel : function() {
			return getNorthPanel();
		},
		setCenterPanel : function(panel) {
			setCenterPanel(panel);
		},
		getCenterPanel : function() {
			return getCenterPanel();
		},
		setSouthPanel : function(panel) {
			setSouthPanel(panel);
		},
		getSouthPanel : function() {
			return getSouthPanel();
		},
		minusTab : function() {
			TabsUtil.minusTab();
		},
		getTabsTotalNum : function() {
			return TabsUtil.getTabsTotalNum();
		},
		addTab : function(plugin, url) {
			TabsUtil.addTab(plugin, url);
		},
		closeTab : function(title, callback) {
			TabsUtil.closeTab(title, callback);
		},
		openTab : function(plugin, url) {
			TabsUtil.addTab(plugin, url);
		},
		getNavigationPanelId : function() {
			return getNavigationPanelId();
		},
		hideNavigation : function() {
			hideNavigation();
		},
		showNavigation : function() {
			showNavigation();
		},
		getCenterReplaceHtml : function() {
			return getCenterReplaceHtml();
		},
		selectNavigation : function(title) {
			selectNavigation(title);
		},
		setUserId : function(userid) {
			setUserId(userid);
		},
		setPmsResourceId : function(pmsResourceid) {
			setPmsResourceId(pmsResourceid);
		},
		setNodeSystemCode : function(nodeSystemcode) {
			setNodeSystemCode(nodeSystemcode);
		},
		getUserId : function() {
			return getUserId();
		},
		getPmsResourceId : function() {
			return getPmsResourceId();
		},
		getNodeSystemCode : function() {
			return getNodeSystemCode();
		},

		setCurrentMenuId : function(id) {
			setCurrentMenuId(id);
		},

		getCurrentMenuId : function() {
			return getCurrentMenuId();
		},

		setCurrentMenuNavId : function(id) {
			setCurrentMenuNavId(id);
		},

		getCurrentMenuNavId : function() {
			return getCurrentMenuNavId();
		},

		setCurrentNavId : function(id) {
			setCurrentNavId(id);
		},

		getCurrentNavId : function() {
			return getCurrentNavId();
		},
		setCurrentMenuCode : function(code) {
			setCurrentMenuCode(code);
		},
		getCurrentMenuCode : function() {
			return getCurrentMenuCode();
		},
		setUserType : function(type) {
			setUserType(type);
		},
		getUserType : function() {
			return getUserType();
		}
	}
}();
var _menus = {
	"menus" : [{
				"menuid" : "1",
				"icon" : "icon-sys",
				"menuname" : "控件使用",
				"menus" : [{
							"menuid" : "12",
							"menuname" : "疯狂秀才",
							"icon" : "icon-add",
							"url" : "http://hxling.cnblogs.com"
						}, {
							"menuid" : "13",
							"menuname" : "用户管理",
							"icon" : "icon-users",
							"url" : "demo2.html"
						}, {
							"menuid" : "14",
							"menuname" : "角色管理",
							"icon" : "icon-role",
							"url" : "demo2.html"
						}, {
							"menuid" : "15",
							"menuname" : "权限设置",
							"icon" : "icon-set",
							"url" : "demo.html"
						}, {
							"menuid" : "16",
							"menuname" : "系统日志",
							"icon" : "icon-log",
							"url" : "demo1.html"
						}]
			}, {
				"menuid" : "8",
				"icon" : "icon-sys",
				"menuname" : "员工管理",
				"menus" : [{
							"menuid" : "21",
							"menuname" : "员工列表",
							"icon" : "icon-nav",
							"url" : "demo.html"
						}, {
							"menuid" : "22",
							"menuname" : "视频监控",
							"icon" : "icon-nav",
							"url" : "demo1.html"
						}]
			}]
};
var fullScreen = false;
function changeScreen(){
	if(fullScreen){
		$('body').layout('show','all');
		fullScreen = false;
		$('#funnScreeBtn').linkbutton({iconCls:"icon-window-max",text:"正常"});
	}else{
		$('body').layout('hidden','all');
		fullScreen = true;
		$('#funnScreeBtn').linkbutton({iconCls:"icon-window-min",text:"全屏"});
	}
}
