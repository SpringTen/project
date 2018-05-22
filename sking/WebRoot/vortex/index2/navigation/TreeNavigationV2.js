TreeNavigation = function(config) {
	config = config || {};
	this.treeNodes = null;
	this.mainNavigationAccordionId = IndexCore.navigationAccordionId;
	this.menuBindNav = config.menuBindNav;
	this.treePanelId = config.menuBindNav ? config.menuBindNav.id : ""
			+ '_tree';
	this.loadTreeRemoteURL = config.loadTreeRemoteURL
			|| _systemConfig.loadTreeNavigationURL;
	this.isTest = config.isTest || false;

	this.treeNavigationFuncDefs = MapUtil.getInstance();
	this.currentNodeId = null;
}
TreeNavigation.prototype.init = function() {
	var t = this;

	if (t.isTest) {
		t.add();
	} else {
		t.addTreePanel();
		t.loadTree();
	}
	return t;
}
TreeNavigation.prototype.loadTree = function() {
	var t = this;
	if (t.treeNodes == null) {
		var requestParam = {};
		// 添加用户,做权限
		requestParam.userId = IndexCore.userInfo.userId;
		// dejunx add 2013-03-21
		//requestParam.userType = IndexCore.userInfo.userType;

		requestParam.nodeSystemCode = IndexCore.currentOperator.nodeSystemCode;
		requestParam.menuId = t.menuBindNav.menuId;
		requestParam.menuNavId = t.menuBindNav.id;
		requestParam.navControlId = t.menuBindNav.navControlId;

		$.ajax({
			url : t.loadTreeRemoteURL,
			dataType : "json",
			data : requestParam,
			async : false,
			cache : false,
			type : "post",
			success : function(data) {
				if (_systemConfig.debug) {
					VortexUtil.log("treeNavigation = " + data);
				}
				t.treeNodes = data;
				// t.initTree(t.treeNodes.items);
				t.initTree(data.items[0].children);
			}
		});

	} else {
		// t.initTree(t.treeNodes.items);
		t.initTree(t.treeNodes.items[0].children);
	}

};
TreeNavigation.prototype.loadFuncDef = function(treeNavigationId, funcDefId,
		treeNode) {
	if (treeNode.leaf == true) {
		if (funcDefId == "") {
			VortexUtil.show({
				msg : "没有配置功能"
			});
			return;
		}
	} else {
		return;
	}

	var t = this;
	var treeNavigationFuncDef = t.treeNavigationFuncDefs.get(treeNavigationId);
	if (treeNavigationFuncDef != undefined) {
		t.parsefuncDefData(treeNavigationFuncDef);
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
				t.treeNavigationFuncDefs.add(treeNavigationId, data);
			}
		});
	}

};
TreeNavigation.prototype.parsefuncDefData = function(obj) {
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
			var currentMenuNavId = t.menuBindNav.id;
			var currentNavId = t.currentNodeId;
			var pmsResourceId = currentNavId + "_" + currentMenuNavId + "_"
			+ IndexCore.currentOperator.currentMenuId;
			//设置当前操作
			IndexCore.currentOperator.currentMenuNavId = currentMenuNavId;
			IndexCore.currentOperator.currentNavId = currentNavId;
			IndexCore.currentOperator.pmsResourceId = pmsResourceId;
			
			FuncPanelUtil.addTab(funcDefName, url);
		} else {
			VortexUtil.show({
				msg : "没有配置控件注册"
			});
		}
	});
};
TreeNavigation.prototype.initTree = function(zNodes) {
	var t = this;
	var nodeOnClick = function(event, treeId, treeNode, clickFlag) {
		if (treeNode.attributes) {
			if (t.isTest) {
				TabsUtil.addTab(treeNode.name, treeNode.attributes.url);
			} else {
				t.currentNodeId = treeNode.attributes.id;
				t.loadFuncDef(treeNode.attributes.id,
						treeNode.attributes.funcDefId, treeNode);
			}

		} else {
		}

	};
	var setting = {
		callback : {
			onClick : nodeOnClick
		}
	};
	$.fn.zTree.init($("#" + t.treePanelId), setting, zNodes);
	t.expandAllNode(true);

	t.addTreeQitp();
};
TreeNavigation.prototype.addTreeQitp = function() {
	var t = this;
	if (_systemConfig.qipShow) {
		$('a[title]').qtip('destroy'); // Preferred method
		$('a[title]').qtip({
			position : {
				my : 'top left',
				target : 'mouse',
				viewport : $(window), // Keep it on-screen at all
				// times if possible
				adjust : {
					x : 10,
					y : 20
				}
			},
			hide : {
				fixed : true
			// Helps to prevent the tooltip from hiding
			// ocassionally when tracking!
			},
			style : _systemConfig.qipStyle
		});
	}
};
TreeNavigation.prototype.selectFirstHasFuncDefNode = function() {
	var t = this;
	var treeObj = t.getZTreeObj();
	if (treeObj == null) {
		t.selectFirstHasFuncDefNode.defer(100, t);
		if (_systemConfig.debug) {
			VortexUtil.log("defer selectFirstHasFuncDefNode");
		}
	} else {
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		for ( var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if ("TreeNavigation" == node.attributes.nodeType) {
				if (node.attributes.funcDefId != "") {
					treeObj.selectNode(node);
					t.currentNodeId = node.attributes.id;
					t.loadFuncDef(node.attributes.id,
							node.attributes.funcDefId, node);
					break;
				}
			}
		}
	}

};
TreeNavigation.prototype.expandAllNode = function(status) {
	var t = this;
	var treeObj = t.getZTreeObj();
	treeObj.expandAll(status);
};
TreeNavigation.prototype.getZTreeObj = function() {
	var t = this;
	return $.fn.zTree.getZTreeObj(t.treePanelId);
};

TreeNavigation.prototype.addTreePanel = function() {
	var t = this;
	$('#' + t.mainNavigationAccordionId)
			.accordion(
					'add',
					{
						title : t.menuBindNav.showNavName,
						tools : [ {

							iconCls : 'icon-treeRefresh',
							handler : function() {
								t.loadTree();
							}
						}, {

							iconCls : 'icon-treeLeft',
							handler : function() {
								t.expandAllNode(true);
							}
						}, {

							iconCls : 'icon-treeRight',
							handler : function() {
								t.expandAllNode(false);
							}
						} ],
						 content : '<ul id="' + t.treePanelId + '"class="ztree"></ul>'
//						content : '<div class="easyui-panel" data-options="border:false,fit:true" style="background: #e5f3ff;"">'
//								+ '<ul id="'
//								+ t.treePanelId
//								+ '" class="ztree" style="background: #e5f3ff;"></ul>'
//								+ '</div>'
					});
};

TreeNavigation.prototype.add = function() {
	var t = this;
	$('#' + t.mainNavigationAccordionId).accordion('add', {
		title : '平台管理',
		tools : [ {

			iconCls : 'icon-treeRefresh',
			handler : function() {
				t.loadTree();
			}
		}, {

			iconCls : 'icon-treeAdd',
			handler : function() {
				t.expandAllNode(true);
			}
		}, {

			iconCls : 'icon-treeDelete',
			handler : function() {
				t.expandAllNode(false);
			}
		} ],
		content : '<ul id="' + t.treePanelId + '" class="ztree"></ul>'
	});
	t.initTestTree();
};
TreeNavigation.prototype.initTestTree = function() {
	var t = this;
	var zNodes1 = [ {
		id : 0,
		pid : -1,
		name : "平台管理",
		open : true,
		icon : path + "/resources/images/tabs.gif",
		children : [ {
			id : 1,
			pid : 0,
			name : "应用平台",
			icon : path + "/resources/images/tabs.gif",
			attributes : {
				url : 'admin/application/query'
			}
		}, {
			id : 2,
			pid : 0,
			name : "系统构建",
			open : true,
			icon : path + "/resources/images/tabs.gif",
			children : [ {
				id : 21,
				pid : 2,
				name : "系统管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/nodeSystem/query'
				}
			}, {
				id : 22,
				pid : 2,
				name : "菜单管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/menu/query'
				}
			}, {
				id : 23,
				pid : 2,
				name : "导航控件组",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/navControlGroup/query'
				}
			}, {
				id : 24,
				pid : 2,
				name : "导航控件定义",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/navControl/query'
				}
			}
			// , {
			// id : 23,
			// pid : 2,
			// name : "功能绑定",
			// icon : path
			// + "/resources/images/tabs.gif",
			// attributes : {
			// // url : 'uploadFile/query'
			// }
			// }
			]
		}, {
			id : 3,
			pid : 0,
			name : "控件配置",
			open : true,
			icon : path + "/resources/images/tabs.gif",
			children : [ {
				id : 331,
				pid : 3,
				name : "功能定义组",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/funcDefGroup/query'
				}
			}, {
				id : 31,
				pid : 3,
				name : "功能定义",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/funcDef/query'
				}
			}, {
				id : 33,
				pid : 3,
				name : "控件组",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/controlGroup/query'
				}
			}, {
				id : 34,
				pid : 3,
				name : "控件注册",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/controlRegister/query'
				}
			} ]
		}, {
			id : 4,
			pid : 0,
			name : "权限管理",
			open : true,
			icon : path + "/resources/images/tabs.gif",
			children : [ {
				id : 41,
				pid : 4,
				name : "动作组",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/actionGroup/query'
				}
			}, {
				id : 42,
				pid : 4,
				name : "动作",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/action/query'
				}
			}, {
				id : 43,
				pid : 4,
				name : "部门管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/department/query'
				}
			}, {
				id : 44,
				pid : 4,
				name : "人员管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/staff/query'
				}
			}, {
				id : 45,
				pid : 4,
				name : "用户管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/user/query'
				}
			}, {
				id : 46,
				pid : 4,
				name : "角色组管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/roleGroup/query'
				}
			}, {
				id : 47,
				pid : 4,
				name : "角色管理",
				icon : path + "/resources/images/tabs.gif",
				attributes : {
					url : 'admin/role/query'
				}
			} ]
		}, {
			id : 5,
			pid : 0,
			name : "文件管理",
			icon : path + "/resources/images/tabs.gif",
			attributes : {
				url : 'uploadFile/query'
			}
		} ]
	}

	];
	t.initTree(zNodes1);
}