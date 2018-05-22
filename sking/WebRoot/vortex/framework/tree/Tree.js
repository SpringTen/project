// Tree = function(loadTreeRemoteURL, treePanelId, treeSearchPanelId,
// keyInputId,
// callback, iconFromRemote) {
Tree = function(config) {
	config = config || {};
	this.loadTreeRemoteURL = config.loadTreeRemoteURL;
	this.requestParam = config.requestParam || {};
	this.treePanelId = config.treePanelId;
	this.treeSearchPanelId = config.treeSearchPanelId;
	this.keyInputId = config.keyInputId;
	this.filterNodeList = [];
	this.key = $('#' + this.keyInputId);
	this.treeNodeOnClickCallback = config.onClickCallback;
	this.treeNodeDbClickCallback = config.onDbClickCallback;
	this.treeBeforeLoadCallback = config.beforeLoadCallback;
	this.treeOnLoadCallback = config.onLoadCallback;
	this.treeSetting = config.treeSetting || {};
	this.showQip = config.showQip != undefined ? config.showQip : true;
	this.iconFromRemote = config.iconFromRemote || false;

	this.initTree = function(zNodes) {
		var t = this;
		var nodeOnClick = function(event, treeId, treeNode, clickFlag) {
			try{
				var zTree = $.fn.zTree.getZTreeObj( t.treePanelId);
				zTree.checkNode(treeNode,!treeNode.checked,true,true);
			}catch(e){}
			
			
			if (typeof t.treeNodeOnClickCallback == 'function') {
				t.treeNodeOnClickCallback(treeNode.id, treeNode.name,
						treeNode.nodeType, treeNode.attributes);
			}
		};
		var nodeDblClick = function(event, treeId, treeNode, clickFlag) {
			if (typeof t.treeNodeDbClickCallback == 'function') {
				t.treeNodeDbClickCallback(treeNode.id, treeNode.name,
						treeNode.nodeType, treeNode.attributes);
			}
		};
		var getFontCss = function(treeId, treeNode) {
			return (!!treeNode.highlight) ? {
				color : "#A60000",
				"font-weight" : "bold"
			} : {
				color : "#333",
				"font-weight" : "normal"
			};
		};
		var setting = {
			callback : {
				onClick : nodeOnClick,
				onDblClick:nodeDblClick
			},
			view : {
				fontCss : getFontCss
			},
			data : {
				key : {
					title : "qtip"
				}
			},
			check : {
				enable : false
			},
			iconFromRemote : t.iconFromRemote
		};

		$.extend(true, setting, t.treeSetting);
		$.fn.zTree.init($("#" + t.treePanelId), setting, zNodes);
		//t.expandAllNode(true);
		t.expandNode(t.getFirstNode());
		if (t.showQip) {
			t.addTreeQitp();
		}

		// t.updateType();

		// 树加载完成
		if (typeof t.treeOnLoadCallback == 'function') {
			t.treeOnLoadCallback();

			if (_systemConfig.debug) {
				VortexUtil.log("call treeOnLoadCallback");
			}
		}
	};

	this.addTreeQitp = function() {
		if (_systemConfig.qipShow) {
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
				},
				style : {
			        classes: _systemConfig.qipStyle
			    }
			});
		}
	};
	this.loadTree = function(selectNodeId) {
		var t = this;
		/*
		 * $.post('${ctx}/admin/controlGroup/loadTree', function(data) { //var
		 * data = eval('(' + data + ')'); alert(data);
		 * initTree('controlGroup_tree', data.items); });
		 */

		// 树初始化时执行
		if (typeof t.treeBeforeLoadCallback == 'function') {
			t.treeBeforeLoadCallback();

			if (_systemConfig.debug) {
				VortexUtil.log("call treeBeforeLoadCallback");
			}
		}
		if (typeof (t.loadTreeRemoteURL) == 'string') {
			// $.ajax({
			// type : "POST",
			// url : t.loadTreeRemoteURL,
			// data : "",
			// dataType : "json",
			// success : function(data) {
			// // var data = eval('(' + data + ')');
			// t.initTree(data.items);
			//
			// if (selectNodeId != undefined) {
			// t.selectNodeById(selectNodeId);
			// }
			//
			// }
			// });
			$.post(t.loadTreeRemoteURL, t.requestParam, function(data) {
				t.initTree(data.items);

				if (selectNodeId != undefined) {
					t.selectNodeById(selectNodeId);
				}
			}, "json");

		} else if (typeof (t.loadTreeRemoteURL) == 'object') {
			t.initTree(t.loadTreeRemoteURL);
		} else {

		}

	};

	this.reloadTree = function(requestParam) {
		var t = this;
		var param = {};
		if (requestParam != undefined) {
			param = requestParam;
			t.requestParam = param;
		} else {
			param = t.requestParam;
		}

		// 树初始化时执行
		if (typeof t.treeBeforeLoadCallback == 'function') {
			t.treeBeforeLoadCallback();

			if (_systemConfig.debug) {
				VortexUtil.log("call treeBeforeLoadCallback");
			}
		}
		if (typeof (t.loadTreeRemoteURL) == 'string') {
			$.post(t.loadTreeRemoteURL, param, function(data) {
				t.initTree(data.items);
			}, "json");

		} else if (typeof (t.loadTreeRemoteURL) == 'object') {
			t.initTree(t.loadTreeRemoteURL);
		} else {

		}

	};
	this.getNodeById =function(id){
		var t = this;
		var zTree = t.getZTreeObj();
		return zTree.getNodeByParam("id", id, null);
	};
	this.getFirstNode =function(){
		var t = this;
		var treeObj = t.getZTreeObj();
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		if (nodes.length > 0){
			return nodes[0];
		} else {
			return undefined;
		}
	};
	this.expandNode = function(node) {
		if (node){
			var t = this;
			var treeObj = t.getZTreeObj();
			treeObj.expandNode(node, true, false, true);
		}
	};
	this.expandAllNode = function(status) {
		var t = this;
		var treeObj = t.getZTreeObj();
		treeObj.expandAll(status);
	};
	this.updateType = function() {
		var t = this;
		var zTree = t.getZTreeObj(), nodes = zTree.getNodes();
		for ( var i = 0, l = nodes.length; i < l; i++) {
			var num = nodes[i].children ? nodes[i].children.length : 0;
			nodes[i].name = nodes[i].name.replace(/ \(.*\)/gi, "") + " (" + num
					+ ")";
			zTree.updateNode(nodes[i]);
		}
	};
	this.getZTreeObj = function() {
		var t = this;
		return $.fn.zTree.getZTreeObj(t.treePanelId);
	};

	this.changeTreeSearchPanelShow = function() {
		var t = this;
		if ($('#' + t.treeSearchPanelId).css('display') == "none") {
			$('#' + t.treeSearchPanelId).show();
		} else {
			$('#' + t.treeSearchPanelId).hide();
		}
	};

	this.searchNode = function() {
		var t = this;
		var zTree = t.getZTreeObj();

		t.expandAllNode(true);
		t.updateNodes(false);

		var value = $.trim(t.key.get(0).value);
		if (value === "") {
			return;
		}

		// t.filterNodeList = zTree.getNodesByParamFuzzy(keyType, value);

		// var filterNode = function(node) {
		// value = value.toUpperCase();
		// var py = String2Alpha(node.name);
		// if (py.indexOf(value) > -1) {
		// return true;
		// }
		//
		// return (node.name.indexOf(value) > -1);
		// };

		var filterNode = function(node) {
			value = value.toUpperCase();

			try {
				// 返回数组，支持多音字
				var arr = makePy(node.name);
				if (arr && arr.length) {
					for ( var i = 0; i < arr.length; i++) {
						if (arr[i].indexOf(value) > -1) {
							return true;
						}
					}
				}
			} catch (e) {
			}

			return (node.name.indexOf(value) > -1);
		};

		t.filterNodeList = zTree.getNodesByFilter(filterNode);
		t.updateNodes(true);

	};

	this.selectNodeById = function(id) {
		var t = this;
		var zTree = t.getZTreeObj();
		var node = zTree.getNodeByParam("id", id, null);
		if (node != null) {
			zTree.selectNode(node);
		}

	};
	this.checkNodeById = function(id) {
		var t = this;
		var zTree = t.getZTreeObj();
		var node = zTree.getNodeByParam("id", id, null);
		if (node != null) {
			zTree.checkNode(node, true, true);
		}

	};
	this.checkNodeByLikeId = function(id) {
		var t = this;
		var zTree = t.getZTreeObj();
		var filter = function (node) {
		    return node.id.indexOf(id)>-1;
		};
		var nodes = zTree.getNodesByFilter(filter); // 查找节点集合;
		if (nodes != null) {
			for ( var i = 0, l = nodes.length; i < l; i++) {
				zTree.checkNode(nodes[i], true, true);
			}
			
		}

	};
	this.checkNodeByParam = function(key,value) {
		var t = this;
		var zTree = t.getZTreeObj();
		var node = zTree.getNodeByParam(key, value, null);
		if (node != null) {
			zTree.checkNode(node, true, true);
		}

	};
	this.updateNodes = function(highlight) {
		var t = this;
		var zTree = t.getZTreeObj();
		for ( var i = 0, l = t.filterNodeList.length; i < l; i++) {
			t.filterNodeList[i].highlight = highlight;
			zTree.updateNode(t.filterNodeList[i]);
		}
		if (!highlight) {
			var nodes = zTree.getNodesByParam("isHidden", true);
			zTree.showNodes(nodes);
		} else {
			var nodes = zTree.getNodesByParam("isHidden", false);
			zTree.hideNodes(nodes);
			for ( var i = 0, l = t.filterNodeList.length; i < l; i++) {
				var parentNodes = [];
				t.getAllParentNode(t.filterNodeList[i], parentNodes);
				zTree.showNodes(parentNodes.reverse());
				zTree.showNode(t.filterNodeList[i]);

			}
		}
	};
	this.getAllParentNode = function(node, array) {
		var t = this;
		if (node.getParentNode() != null) {
			array.push(node.getParentNode());
			t.getAllParentNode(node.getParentNode(), array);
		}
	};
	this.getSelectedNodes = function() {
		var t = this;
		var ztree = t.getZTreeObj();
		return ztree.getSelectedNodes();
	};
	this.getCheckedNodes = function(flag) {
		var t = this;
		var ztree = t.getZTreeObj();
		return ztree.getCheckedNodes(flag || true);
	};
	// return {
	// loadTree : function() {
	// this.loadTree();
	// },
	// getAllParentNode : function(node, array) {
	// this.getAllParentNode(node, array);
	// },
	// searchNode : function() {
	// this.searchNode();
	// },
	// changeTreeSearchPanelShow : function() {
	// this.changeTreeSearchPanelShow();
	// },
	// getZTreeObj : function() {
	// return this.getZTreeObj();
	// },
	// expandAllNode : function(status) {
	// this.expandAllNode(status);
	// },
	// getSelectedNodes : function() {
	// return this.getSelectedNodes();
	// }
	// }
};
