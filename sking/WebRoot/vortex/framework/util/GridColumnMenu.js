GridColumnMenu = function() {
	function createColumnMenu(id) {

		var tmenu = $('<div id="' + id
				+ '_colMenu" style="width:100px;"></div>').appendTo('body');
		var fields = $('#' + id).datagrid('getColumnFields');
		for (var i = 0; i < fields.length; i++) {

			var t = $('#' + id).datagrid('getColumnOption', fields[i]);
			if (t.title != undefined) {
				$('<div iconCls="icon-ok" id="' + t.field + '"/>')
						.html(t.title).appendTo(tmenu);
			}
		}
		tmenu.menu({
					onClick : function(item) {

						if (item.iconCls == 'icon-ok') {

							var fields = $('#' + id)
									.datagrid('getColumnFields');
							var okNum = 0;
							for (var i = 0; i < fields.length; i++) {
								var t = $('#' + id).datagrid('getColumnOption',
										fields[i]);
								var it = tmenu.menu('findItem', t.title);
								if (it != null && it.iconCls == 'icon-ok') {
									okNum++;
								}
							}
							if (okNum <= 1) {
								return;
							}

							$('#' + id).datagrid('hideColumn', item.id);
							tmenu.menu('setIcon', {
										target : item.target,
										iconCls : 'icon-empty'
									});

						} else {
							$('#' + id).datagrid('showColumn', item.id);
							tmenu.menu('setIcon', {
										target : item.target,
										iconCls : 'icon-ok'
									});
						}
					}
				});
	};
	return {
		createColumnMenu : function(id) {
			createColumnMenu(id);
		}
	}
}();