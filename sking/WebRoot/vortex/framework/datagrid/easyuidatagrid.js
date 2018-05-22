EasyuiDataGrid = function(config) {
	config = config || {};

	this.gridId = config.gridId;
	this.gridUrl = config.gridUrl;
	this.gridToolbar = config.gridToolbar;
	this.successCallback = config.successCallback;
	this.gridClickRow = config.gridClickRow;
	this.gridDblClickRow = config.gridDblClickRow;
	this.gridLoadSuccess = config.gridLoadSuccess;
	this.gridQueryParam = config.gridQueryParam;
	this.gridOnCheck = config.gridOnCheck;
	this.gridOnUnCheck = config.gridOnUnCheck;
	this.gridOnCheckAll = config.gridOnCheckAll;
	this.gridOnUnCheckAll = config.gridOnUnCheckAll;
	this.singleSelctAndChecks = config.singleSelctAndChecks||false;
	this.onExpandRow = config.onExpandRow;
	this.detailFormatter = config.detailFormatter;
	config = $.extend({}, EasyuiDataGrid.defaults, {
		onLoadSuccess : function(data) {
			//自动调整rownumber宽度
			if (config.rownumbers){
//				$(this).datagrid("fixRownumber");
			}
			if (typeof config.gridLoadSuccess == 'function') {
				config.gridLoadSuccess(data);
			}
		},
		onClickRow : function(rowIndex, rowData) {
			if(config.singleSelctAndChecks){
				$('#' + config.gridId).datagrid('unselectAll');
				$('#' + config.gridId).datagrid('uncheckAll');
				$('#' + config.gridId).datagrid('selectRow',rowIndex);
			}
			if (typeof config.gridClickRow == 'function') {
				config.gridClickRow(rowIndex, rowData);
			}
		},
		// 双击事件
		onDblClickRow : function(rowIndex, rowData) {
			if (typeof config.gridDblClickRow == 'function') {
				config.gridDblClickRow(rowIndex, rowData);
			}
		},
		// 勾选事件
		onCheck : function(rowIndex, rowData) {
			if (typeof config.gridOnCheck == 'function') {
				config.gridOnCheck(rowIndex, rowData);
			}
		},
		// 取消勾选事件
		onUncheck : function(rowIndex, rowData) {
			if (typeof config.gridOnUnCheck == 'function') {
				config.gridOnUnCheck(rowIndex, rowData);
			}
		},
		// 勾选全部事件
		onCheckAll : function(rows) {
			if (typeof config.gridOnCheckAll == 'function') {
				config.gridOnCheckAll(rows);
			}
		},
		// 取消全部勾选事件
		onUncheckAll : function(rows) {
			if (typeof config.gridOnUnCheckAll == 'function') {
				config.gridOnUnCheckAll(rows);
			}
		},
		// 展开行
		onExpandRow : function(rowIndex, rowData) {
			if (typeof config.onExpandRow == 'function') {
				config.onExpandRow(rowIndex, rowData);
			}
		},
		detailFormatter : function(rowIndex, rowData) {
			if (typeof config.detailFormatter == 'function') {
				config.detailFormatter(rowIndex, rowData);
			}
		},
		onHeaderContextMenu : function(e, field) {
			e.preventDefault();
			if (!$('#' + config.gridId + '_colMenu').length) {
				GridColumnMenu.createColumnMenu(config.gridId);
			}
			$('#' + config.gridId + '_colMenu').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		}
	}, config);

	this.options = config;
	this.init();
};
EasyuiDataGrid.prototype.init = function() {
	var t = this;
	t.initGrid(t.options);
};
EasyuiDataGrid.prototype.initGrid = function(config) {
	var t = this;
	if (t.gridUrl) {
		config.url = t.gridUrl;
	}
	// 工具栏
	if (t.gridToolbar) {
		config.toolbar = t.gridToolbar;
	}
	if (t.gridQueryParam) {
		if (typeof t.gridQueryParam == 'function') {
			config.queryParams = t.gridQueryParam.call(window || this);
		} else if (typeof t.gridQueryParam == 'object') {
			config.queryParams = t.gridQueryParam;
		}
	}
	$('#' + t.gridId).datagrid(config);
	if (config.pagination) {
		$('#' + t.gridId).pagination().find('a.l-btn').tooltip(
				{
					content : function() {
						var cc = $(this).find('span.l-btn-empty').attr('class')
								.split(' ');
						var icon = cc[1].split('-')[1];
						return icon + ' 页';
					}
				});
		$.parser.parse('#' + t.gridId);
	}

};
EasyuiDataGrid.prototype.getSelected = function() {
	var t = this;
	var row = $('#' + t.gridId).datagrid('getSelected');
	return row;
};
EasyuiDataGrid.prototype.getSelections = function() {
	var t = this;
	var rows = $('#' + t.gridId).datagrid('getSelections');
	return rows;
};
EasyuiDataGrid.prototype.validSelected = function() {
	var t = this;
	var rows = $('#' + t.gridId).datagrid('getSelected');
	if (!rows) {
		VortexUtil.show({
			msg : '请选择要操作的行'
		});
		return false;
	} else {
		return true;
	}
};
// 判断是否选择一条数据
EasyuiDataGrid.prototype.validCheckedOne = function() {
	var t = this;
	var rows = $('#' + t.gridId).datagrid('getChecked');
	if (rows.length > 1) {
		VortexUtil.show({
			msg : '请选择一条数据'
		});
		return false;
	} else {
		return true;
	}
};
EasyuiDataGrid.prototype.load = function(queryParam) {
	var t = this;
	t.dataLoad('load', queryParam);

};
EasyuiDataGrid.prototype.loadData = function(data) {
	var t = this;
	t.dataLoad('loadData', data);
};

EasyuiDataGrid.prototype.dataLoad = function(loadOrReload, queryParam) {
	var t = this;
	if (queryParam) {
		$('#' + t.gridId).datagrid(loadOrReload, queryParam);
	} else {
		if (typeof t.gridQueryParam == 'function') {
			$('#' + t.gridId).datagrid(loadOrReload, t.gridQueryParam());
		} else {
			$('#' + t.gridId).datagrid(loadOrReload, t.gridQueryParam);
		}
	}

};
EasyuiDataGrid.prototype.reload = function(queryParam) {
	var t = this;
	t.dataLoad('reload', queryParam);
};
EasyuiDataGrid.prototype.selectRow = function(index) {
	var t = this;
	$('#' + t.gridId).datagrid('unselectAll');
	$('#' + t.gridId).datagrid('selectRow', index);
	$('#' + t.gridId).datagrid('checkRow', index);
};
EasyuiDataGrid.defaults = {
	// height : 'auto',
	rownumbers : true,
	border : true,
	plain : true,
	pagination : true,
	fit : true,
	fitColumns : true,
	singleSelect : false,
	striped : false,
	remoteSort : true

};
