ListNavigation = function(config) {
	config = config || {};
	this.listNodes = null;
	this.mainNavigationAccordionId = Index.getNavigationPanelId();
	this.menuBindNav = config.menuBindNav;
	this.treePanelId = config.menuBindNav ? config.menuBindNav.id : ""
			+ '_tree';
	this.loadTreeRemoteURL = config.loadTreeRemoteURL
			|| _systemConfig.loadListNavigationURL;
	this.isTest = config.isTest || false;

	this.listNavigationFuncDefs = MapUtil.getInstance();
	this.currentNodeId = null;
}
ListNavigation.prototype.init = function() {
	var t = this;

	t.loadTree();
	return t;
}
ListNavigation.prototype.loadTree = function() {
	var t = this;
	if (t.listNodes == null) {
		// $.ajax({
		// type : "POST",
		// url : t.loadTreeRemoteURL,
		// data : "menuId=" + t.menuBindNav.menuId + "&navControlId="
		// + t.menuBindNav.navControlId,
		// dataType : "json",
		// success : function(data) {
		// if (_systemConfig.debug) {
		// VortexUtil.log("ListNavigation = " + data);
		// }
		// t.listNodes = data;
		// t.initTree(t.listNodes);
		// }
		// });
		var requestParam = {};
		// 添加用户,做权限
		requestParam.userId = Index.getUserId();
		//dejunx add 2013-03-21
		requestParam.userType = Index.getUserType();
		
		requestParam.nodeSystemCode = Index.getNodeSystemCode();

		requestParam.menuId = t.menuBindNav.menuId;
		requestParam.menuNavId = t.menuBindNav.id;
		requestParam.navControlId = t.menuBindNav.navControlId;
		$.post(t.loadTreeRemoteURL, requestParam, function(data) {
					if (_systemConfig.debug) {
						VortexUtil.log("ListNavigation = " + data);
					}
					t.listNodes = data;
					t.initTree(t.listNodes);
				}, "json");

	} else {
		t.initTree(t.listNodes);
	}

};
ListNavigation.prototype.loadFuncDef = function(ListNavigationId, funcDefId) {
	if (funcDefId == "") {
		VortexUtil.show({
					msg : "没有配置功能"
				});
		return;
	}

	var t = this;
	var ListNavigationFuncDef = t.listNavigationFuncDefs.get(ListNavigationId);
	if (ListNavigationFuncDef != undefined) {
		t.parsefuncDefData(ListNavigationFuncDef);
	} else {
		// 需要当前menuCode，暂时没有用
		$.ajax({
					type : "POST",
					url : _systemConfig.loadFuncDefNavURL,
					data : "funcDefId=" + funcDefId,
					dataType : "json",
					success : function(data) {
						if (_systemConfig.debug) {
							VortexUtil.log(data);
						}
						t.parsefuncDefData(data);
						t.listNavigationFuncDefs.add(ListNavigationId, data);
					}
				});
	}

};
ListNavigation.prototype.parsefuncDefData = function(obj) {
	var t = this;
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
						VortexUtil.log("parsefuncDefData time = " + new Date());
					}
					var currentMenuId = Menu.getCurrentClickMenuId();
					var currentMenuNavId = t.menuBindNav.id;
					var currentNavId = t.currentNodeId;
					// url = url + "?pmsSession=true&currentMenuId="
					// + currentMenuId + "&currentMenuNavId="
					// + currentMenuNavId + "&currentNavId="
					// + currentNavId + "&currentSystemCode="
					// + Index.getNodeSystemCode();

					Index.setCurrentMenuId(currentMenuId);
					Index.setCurrentMenuNavId(currentMenuNavId);
					Index.setCurrentNavId(currentNavId);

					Index.setPmsResourceId(currentNavId + "_"
							+ currentMenuNavId + "_" + currentMenuId);
					TabsUtil.addTab(funcDefName, url);
				} else {
					VortexUtil.show({
								msg : "没有配置控件注册"
							});
				}
			});
};
ListNavigation.prototype.initTree = function(zNodes) {
	var t = this;
	var menulist = '';
	menulist += '<ul>';
	$.each(zNodes, function(j, o) {
				menulist += '<li><div><a id="' + o.id + '" ref="' + o.id
						+ '" href="#" rel="' + o.funcDefId
						+ '" ><span class="icon-nav'
						+ '" >&nbsp;</span><span class="nav">' + o.name
						+ '</span></a></div></li> ';
			})
	menulist += '</ul>';

	$('#' + t.mainNavigationAccordionId).accordion('add', {
				title : t.menuBindNav.showNavName,
				content : menulist
			});

	$('.easyui-accordion li a').click(function() {
				var tabTitle = $(this).children('.nav').text();

				if (tabTitle != '') {
					var url = $(this).attr("rel");
					var menuid = $(this).attr("ref");
					// var icon = getIcon(menuid, icon);

					// TabsUtil.addTab(tabTitle, url, null);

					t.loadFuncDef(menuid, url);
					$('.easyui-accordion li div').removeClass("selected");
					$(this).parent().addClass("selected");
				}

			}).hover(function() {
				$(this).parent().addClass("hover");
			}, function() {
				$(this).parent().removeClass("hover");
			});

};
ListNavigation.prototype.noSelectAll = function() {
	$('.easyui-accordion li div').removeClass("selected");
};
ListNavigation.prototype.selectFirstHasFuncDefNode = function() {
	var t = this;
	var treeObj = t.listNodes;
	if (treeObj == null) {
		t.selectFirstHasFuncDefNode.defer(100, t);
		if (_systemConfig.debug) {
			VortexUtil.log("defer selectFirstHasFuncDefNode");
		}
	} else {
		var nodes = treeObj;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if ("ListNavigation" == node.nodeType) {
				if (node.funcDefId != "") {
					document.getElementById(node.id).click();
					t.currentNodeId = node.id;
					t.loadFuncDef(node.id, node.funcDefId);
					break;
				}
			}
		}
	}

};
