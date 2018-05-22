function DataGridExport(tableId) {
	this.id = tableId || 'data_list';
}

DataGridExport.prototype = {
	download : function(url) {
		var t = this;
		var options = $('#' + this.id).datagrid('options');
		var pager = $('#' + this.id).datagrid('getPager'); // 得到DataGrid页面
		var exportFrameId = this.id + "_" + 'excelIFrame';
		var excelIframe = document.getElementById(exportFrameId);
		// dejunx add 2015.4.21
		pager.pagination({
			buttons : [ {

				iconCls : 'v-xls',

				handler : function() {
					// if (!excelIframe) {
					// excelIframe = document.createElement("IFRAME");
					// document.body.appendChild(excelIframe);
					// excelIframe.name = exportFrameId;
					// excelIframe.id = exportFrameId;
					// excelIframe.style.display = "none";
					// }

					var columns = options.columns[0];
					var columnFields = new Array();
					var columnNames = new Array();
					for ( var i = 0; i < columns.length; i++) {
						if (columns[i].field == 'ck') {
							continue;
						}
						if (columns[i].field == 'id') {
							continue;
						}
						if (!columns[i].hidden) {
							columnFields.push(columns[i].field);
							columnNames
									.push(columns[i].title ? columns[i].title
											: "");
						}
					}

					var rows = $('#' + t.id).datagrid('getSelections');
					var ids = new Array();
					if (rows) {
						var dateIds = new Array();
						$(rows).each(function(index, row) {
							ids.push(row.id);
						});
					}

					var postParams = {};
					for ( var property in options.queryParams) {
						postParams[property] = options.queryParams[property];
					}
					postParams.page = options.pageNumber;
					postParams.rows = options.pageSize;
					postParams.columnFields = columnFields.toString();
					postParams.columnNames = columnNames.toString();
					postParams.sortName = options.sortName;
					postParams.sortOrder = options.sortOrder;
					postParams.title = options.title;

					// dejunx add 2015.4.21
					postParams.downloadIds = ids.toString();

					var dynamicForm = new DynamicForm({
						actionUrl : url,
						target : excelIframe.name
					});
					dynamicForm.requestParams = postParams;
					$.messager.defaults = {
						ok : "全部导出",
						cancel : "本页导出"
					};
					VortexUtil.confirm({
						msg : '是否要导出全部数据?(确定表示导出全部数据/取消表示导出本页数据)',
						callback : function() {
							postParams.downloadAll = true;
							dynamicForm.submitForm();
							dynamicForm.removeForm();
						},
						cancelCallback : function() {
							postParams.downloadAll = false;
							dynamicForm.submitForm();
							dynamicForm.removeForm();
						}
					});
					$.messager.defaults = {
						ok : "确定",
						cancel : "取消"
					};
				}
			} ]
		});
		var allNodes = document.getElementsByTagName('span');
		for ( var int = 0; int < allNodes.length; int++) {
			var element = allNodes[int];
			if (element.className.indexOf("v-xls") != -1) {
				element.title = "导出";
			}
		}

	}
};
