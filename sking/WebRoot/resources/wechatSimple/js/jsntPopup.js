var jsntDropdown = {
	/**
	 * 选择机构人员
	 */
	selectOrganizationStaff: function(id, config){
		if (!config){
			config = {};
		}
		config.treeUrl = path + '/jsnt/staffInfo/loadOrganizationStaffTree';
		config.nodeType = 'staff';
		config.title = "机构人员树";
		return this.selectFromTree(id, config);
	},
	/**
	 * 选择机构
	 */
	selectOrganization: function(id, config){
		if (!config){
			config = {};
		}
		config.treeUrl = path + '/jsnt/organization/loadOrganizationTree';
		config.nodeType = 'organization';
		config.title = "机构树";
		return this.selectFromTree(id, config);
	},
	/**
	 * 销毁树
	 */
	destroyTree:function(id,config){
		var prefix = 'DD-' + config.nodeType + '-';
		var panelId = prefix + id;
		var keyId = prefix + 'SEARCH-KEY-' + id;
		var searchButtonId = prefix + "SEARCH-BUTTON-" + id;
		
		$('#' + id).unbind();
		
		$('#' + keyId).unbind();
		$('#' + searchButtonId).unbind();
		// 用户树工具栏按钮事件
		$('#' + panelId + ' .icon-treeSearch').unbind();
		$('#' + panelId + ' .icon-treeRefresh').unbind();
		$('#' + panelId + ' .icon-treeLeft').unbind();
		$('#' + panelId + ' .icon-treeRight').unbind();
		
		$('#' + panelId).remove();
	},
	/**
	 * config中包括如下属性
	 * title: 面板的标题
	 * treeUrl： 树的url
	 * selectedMulti：是否多选
	 * nodeType：要选节点的nodeType
	 * selections: 应选中的节点
	 * width: 面板的宽度 默认200px;
	 * height：面板的高度 默认170px;
	 * chkboxType : checkbox 对于父子节点的关联关系
	 * partNodes:只显示需要的部分节点 传递参数为nodes的根节点的nodeType和id的对象形式{nodeType:'xxx',id:'123'}
	 * isDisablePNode : 是否使父节点失效(用在关系简单的树结构中)
	 * requestParam : 参数
	 */
	selectFromTree: function(id, config){
		var prefix = 'DD-' + config.nodeType + '-';
		var panelId = prefix + id;
		var panelId2 = prefix + 'PANEL-' + id;
		var searchId = prefix + 'SEARCH-' + id;
		var keyId = prefix + 'SEARCH-KEY-' + id;
		var searchButtonId = prefix + "SEARCH-BUTTON-" + id;
		var treeId = prefix + 'TREE-' + id;
		var toolbarId = prefix + 'TB-' + id;
		
		var html = '<div id="' + panelId + '" style="display:none; position: absolute;">'
			+ '<div id="' + panelId2 + '" style="overflow: scroll;">'
			+ '<div id="' + searchId + '" style="display: none">'
			+ '<span style="margin-left: 5px; text-align: center;">关键字:</span>'
			+ '<input type="text" id="' + keyId + '" style="width:80px; margin-bottom: 0px; height:23px;"/>'
			+ '<a id="' + searchButtonId + '" href="javascript:void(0);" ></a></div>'
			+ '<div id="' + treeId + '" class="ztree"></div></div>'
			+ '<div id="' + toolbarId + '">'
			+ '<a href="#" class="icon-treeSearch" title="搜索"></a>'
			+ '<a href="#" class="icon-treeRefresh" title="刷新"></a>'
			+ '<a href="#" class="icon-treeLeft" title="收缩所有"></a>'
			+ '<a href="#" class="icon-treeRight" title="展开所有"></a>'
			+ '</div>';
		$('body').append(html);
		
		var _panelHeight = (config.height ? config.height : 170);
		var _panelWidth = (config.width ? config.width : 250);
		$('#' + panelId2).panel({
			title: config.title,
			tools: '#' + toolbarId,
			plain: true,
			border: true,
			width: _panelWidth,
		    height: _panelHeight
		});
		// 搜索按钮
		$('#' + searchButtonId).linkbutton({
			 iconCls: 'icon-search',
			 plain: true
		});
		$('#' + searchButtonId).bind("click", function(){
			tree.searchNode();
		});
		
		$('#' + id).bind("click", function(){
			var onBodyDown = function(event){
				if (!(event.target.id == panelId || $(event.target).parents("#" + panelId).length>0)) {
					hideMenu();
				}
			};
			var hideMenu = function(){
				$("#" + panelId).fadeOut("fast");
				$('body').unbind("mousedown", onBodyDown);
			};
			var offset = $(this).offset();
			//alert(document.body.clientHeight);
			//alert(offset.top);
			//alert(offset.top + 250 > document.body.clientHeight);
			if ((offset.top + _panelHeight + $(this).outerHeight()) > document.body.clientHeight){
				var _top = offset.top - $(this).outerHeight() - _panelHeight;
				var _v = offset.top - $(this).outerHeight() - _panelHeight;
				if (_v < 0){
					var h = (offset.top-$(this).outerHeight()) > _panelHeight ? _panelHeight:(offset.top-$(this).outerHeight());
					$('#' + panelId2).panel('resize',{
						height: h
					});
					_top = offset.top-$(this).outerHeight()-h;
				} else {
					$('#' + panelId2).panel('resize',{
						height: _panelHeight
					});
				}
				$("#" + panelId).css({left:offset.left + "px", top: _top + "px",zIndex:9999}).slideDown("fast");
			} else {
				$("#" + panelId).css({left:offset.left + "px", top:offset.top + $(this).outerHeight() + "px",zIndex:9999}).slideDown("fast");
			}
			//$("#" + panelId).css({left:offset.left + "px", top:offset.top + $(this).outerHeight() + "px",zIndex:9999}).slideDown("fast");
			$("body").bind("mousedown", onBodyDown);
		});
		// 树配置
		var treeConfig = {
			loadTreeRemoteURL: config.treeUrl,
			requestParam : config.requestParam,
			treePanelId: treeId,
			treeSearchPanelId:searchId,
			keyInputId: keyId,			
			treeSetting:{
				check : {
					enable : true
				},
				callback: {
					onCheck: function(event, treeId, treeNode){
						returnValue.selectionsChanged.notify();
					}
				}
			}
		};
		treeConfig.onLoadCallback = function(){
			var ztree = tree.getZTreeObj();
			if(config.partNodes){
				returnValue.showPartNodes(config.partNodes);
			}
			if (!config.selectedMulti){
				var nodes = ztree.transformToArray(ztree.getNodes());
				for (var i = 0; i < nodes.length; i++){
					if (nodes[i].nodeType != config.nodeType){
						nodes[i].nocheck = true;
						ztree.updateNode(nodes[i]);
					}
				}
			}
			if (config.selections && config.selections.length){
				returnValue.setSelections(config.selections);
			}
			if (config.isDisablePNode) {
				var nodes = ztree.transformToArray(ztree.getNodes());
				for (var i = 0; i < nodes.length; i++){
					if (nodes[i].isParent){
						nodes[i].chkDisabled = true;
						ztree.updateNode(nodes[i]);
					}
				}
			}
		};
		if (!config.selectedMulti){
			treeConfig.treeSetting.check.chkStyle = 'radio';
			treeConfig.treeSetting.check.radioType = 'all';
		}
		//checkbox 对于父子节点的关联关系
		if(config.chkboxType){
			treeConfig.treeSetting.check.chkboxType = config.chkboxType;
		}
		var tree = new Tree(treeConfig);
		tree.loadTree();
		// 搜索条件和按钮事件
		$('#' + keyId).bind("propertychange", function() {
			tree.searchNode();
		}).bind("input", function() {
			tree.searchNode();
		});
		
		// 用户树工具栏按钮事件
		$('#' + panelId + ' .icon-treeSearch').bind("click", function(){
			tree.changeTreeSearchPanelShow();
		});
		$('#' + panelId + ' .icon-treeRefresh').bind("click", function(){
			tree.loadTree();
		});
		$('#' + panelId + ' .icon-treeLeft').bind("click", function(){
			tree.expandAllNode(false);
		});
		$('#' + panelId + ' .icon-treeRight').bind("click", function(){
			tree.expandAllNode(true);
		});
		var returnValue = {
			
			getSelections: function(){
				return tree.getZTreeObj().getCheckedNodes(true);
			},
			showPartNodes: function(partNodeObj){
				var zTree = tree.getZTreeObj();
				var newNodes = null;
				var nodes = zTree.getNodesByParam("nodeType", partNodeObj.nodeType, null);
				for(var i = 0; i < nodes.length; i++) {
					if(nodes[i].attributes.id == partNodeObj.id) {
						newNodes = nodes[i];
						break;
					}
				}
				zTree.expandNode(newNodes, true, false);
				var roots = zTree.getNodes();
				if(roots && roots.length) {
					for(var i = 0; i < roots.length; i++) {
						zTree.removeNode(roots[i]);
					}
				}
				zTree.addNodes(null, newNodes);
			},
			setSelections: function(ids){
				var zTree = tree.getZTreeObj();
				zTree.checkAllNodes(false);
				var allNodes = zTree.transformToArray(zTree.getNodes());
				if (ids && ids.length){
					for (var i = 0; i <  ids.length; i++){
						for(var j = 0; j < allNodes.length; j++) {
							if (ids[i] != ''){
								if(allNodes[j].id.indexOf(ids[i]) != -1) {
									zTree.checkNode(allNodes[j], true, true, false);
								}
							}
						}
					}
				}
				this.selectionsChanged.notify();
			}
		};
		returnValue.selectionsChanged = new Event(returnValue);
		return returnValue;
	}
};
