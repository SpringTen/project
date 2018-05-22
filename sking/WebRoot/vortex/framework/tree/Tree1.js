function Tree(loadTreeRemoteURL, treePanelId, treeSearchPanelId, keyInputId,
		callback) {
	this.loadTreeRemoteURL = loadTreeRemoteURL;
	this.treePanelId = treePanelId;
	this.treeSearchPanelId = treeSearchPanelId;
	this.keyInputId = keyInputId;
	this.filterNodeList = [];
	this.key = $('#' + this.keyInputId);
	this.searchFunction = callback;
}
Tree.prototype.initTree = function(zNodes) {
	var t = this;
	var nodeOnClick = function(event, treeId, treeNode, clickFlag) {
		if (typeof t.searchFunction == 'function') {
			t.searchFunction(treeNode.id, treeNode.name);
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
			onClick : nodeOnClick
		},
		view : {
			fontCss : getFontCss
		}
	};
	$.fn.zTree.init($("#controlGroup_tree"), setting, zNodes);
	t.expandAllNode(true);
};
Tree.prototype.loadTree = function() {
	var t = this;
	/*
	 * $.post('${ctx}/admin/controlGroup/loadTree', function(data) { //var data =
	 * eval('(' + data + ')'); alert(data); initTree('controlGroup_tree',
	 * data.items); });
	 */

	$.ajax({
				type : "POST",
				url : t.loadTreeRemoteURL,
				data : "",
				// dataType: "json",
				success : function(data) {
					var data = eval('(' + data + ')');
					t.initTree(data.items);
				}
			});

};

Tree.prototype.getZTreeObj = function() {
	var t = this;
	return $.fn.zTree.getZTreeObj(t.treePanelId);
};
Tree.prototype.expandAllNode = function(status) {
	var t = this;
	var treeObj = t.getZTreeObj();
	treeObj.expandAll(status);
};
Tree.prototype.changeTreeSearchPanelShow = function() {
	var t = this;
	if ($('#' + t.treeSearchPanelId).css('display') == "none") {
		$('#' + t.treeSearchPanelId).show();
	} else {
		$('#' + t.treeSearchPanelId).hide();
	}
};
Tree.prototype.searchNode = function() {
	var t = this;
	var zTree = t.getZTreeObj();

	var value = $.trim(t.key.get(0).value);
	var keyType = "name";
	if (value === "")
		return;
	t.expandAllNode(true);
	t.updateNodes(false);

	t.filterNodeList = zTree.getNodesByParamFuzzy(keyType, value);
	t.updateNodes(true);

};
Tree.prototype.getAllParentNode = function(node, array) {
	var t = this;
	if (node.getParentNode() != null) {
		array.push(node.getParentNode());
		t.getAllParentNode(node.getParentNode(), array);
	}
};
Tree.prototype.updateNodes = function(highlight) {
	var t = this;
	var zTree = t.getZTreeObj();
	for (var i = 0, l = t.filterNodeList.length; i < l; i++) {
		t.filterNodeList[i].highlight = highlight;
		zTree.updateNode(t.filterNodeList[i]);
	}
	if (!highlight) {
		var nodes = zTree.getNodesByParam("isHidden", true);
		zTree.showNodes(nodes);
	} else {
		var nodes = zTree.getNodesByParam("isHidden", false);
		zTree.hideNodes(nodes);
		for (var i = 0, l = t.filterNodeList.length; i < l; i++) {
			var parentNodes = [];
			t.getAllParentNode(t.filterNodeList[i], parentNodes)
			zTree.showNodes(parentNodes.reverse());
			zTree.showNode(this.filterNodeList[i]);

		}
	}
};

Tree.prototype.getSelectedNodes = function() {
	var t = this;
	var treeObj = t.getZTreeObj();
	return treeObj.getSelectedNodes();
};
/*
 * return { loadTree : function() { loadTree(); }, getAllParentNode :
 * function(node, array) { getAllParentNode(node, array); }, searchNode :
 * function() { searchNode(); }, changeTreeSearchPanelShow : function() {
 * changeTreeSearchPanelShow(); }, getZTreeObj : function() { return
 * getZTreeObj(); }, expandAllNode : function(status) { expandAllNode(status); },
 * getSelectedNodes : function() { return getSelectedNodes(); } };
 */
