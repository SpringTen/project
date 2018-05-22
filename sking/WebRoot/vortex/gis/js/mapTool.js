var mapToolGisType = gisMapConstant.defaultLoadGisType;
function mapWindowTool(config, lnglats) {
	// 默认参数设置
	var defaultConfig = {
		// 窗体的标题名称
		title : "地图",
		// 指定窗口是否为模态
		modal : true,
		// 当窗体初始化后，是否默认打开画图状态
		isDraw : false,
		// (只有未指定坐标点数组且画图类型不是点时，该参数才有效)
		// 默认的画图类型
		type : 'marker',
		// 点的图标URL(只有画图类型为点时才有效)
		markerUrl : null,
		// 默认的回调函数
		callback : null
	};

	defaultConfig.width = parseInt(document.body.clientWidth * 0.8, 10);
	defaultConfig.height = parseInt(document.body.clientHeight * 0.8, 10);

	config = $.extend(true, {}, defaultConfig, config);
	config.lnglats = lnglats;
	_mapWindowToolExtend.init(config); // 初始化窗口
	// this.addGraph(this.config.type, lnglats); // 初始化地图，并加载覆盖物
}
var _mapWindowToolExtend = {
	_gis : null,
	_cfg : null,
	_mapValue : null,
	_dataGridObj : null,
	_dialogId : "dlg-vortex-map",
	_mapId : "dlg-vortex-map-div",
	_toolBarDivId : "dlg-vortex-map-toolBar",
	_buttonDivId : "dlg-vortex-map-button",
	_vtxGraphicId : "graphic",
	_dataGridId : "mapTool_dataGridId",
	_layOutId : "mapTool_layout",
	_timerToResize : null,
	init : function(_cfg) {
		var t = this;
		t._cfg = _cfg;
		t._dataGridObj = null;
		t._mapValue = MapUtil.getInstance();
		t.initWin();
	},
	initWin : function() {
		var t = this;
		var div = $("#" + t._dialogId);
		if (div.length != 0) {
			$('#' + t._dialogId).dialog("destroy");
			div.parent().remove(); // 删除当前存在的DIV
			$("#" + t._buttonDivId).parent().remove(); // 删除当前存在的DIV
			$("#" + t._toolBarDivId).parent().remove(); // 删除当前存在的DIV
		}

		var html = '<div id="' + t._dialogId + '" style="width:';
		html = html + t._cfg.width + 'px;height:' + t._cfg.height + 'px;">';
		html = html + '<div id="' + t._layOutId
				+ '" class="easyui-layout" style="width:100%;height:100%;" >';
		html = html + '</div>';

		html = html + '</div>';

		var _toolBarHtml = '<div id="'
				+ t._toolBarDivId
				+ '"><input type="text" id="areaName_mapTool" class="inputquery" name="areaName_mapTool" style="margin-bottom: 1px;"/>'
				+ '<a href="#" class="btn btnquery" onclick="_mapWindowToolExtend.searchByAreaName();" style="margin-left: 5px;">查询</a>'
				+ '<a href="#" class="btn" onclick="_mapWindowToolExtend.clearSearch();" style="margin-left: 5px;">清空</a>'
				+ '<a href="#" class="btn btnreset" onclick="_mapWindowToolExtend.returnTotalMap();" style="margin-left: 5px;">返回全局地图</a></div>';
		var _buttonHtml = '<div id="' + t._buttonDivId + '">';
		_buttonHtml = _buttonHtml
				+ '<a href="#" id="_winToolDraw" class="btn" onclick="_mapWindowToolExtend.buttonDraw();" style="height:24px;">绘制</a>';
		_buttonHtml = _buttonHtml
				+ '<a href="#" id="_winToolReDraw" class="btn" onclick="_mapWindowToolExtend.buttonClear();" style="height:24px;">重绘</a>';
		_buttonHtml = _buttonHtml
				+ '<a href="#" id="_winToolConfirm" class="btn btnquery" onclick="_mapWindowToolExtend.buttonConfirm();" style="height:24px;margin-left: 5px;">确定</a>';
		_buttonHtml = _buttonHtml + '</div>';
		html = html + _toolBarHtml;
		html = html + _buttonHtml;
		$("body").append(html);
		$("#areaName_mapTool").autocomplete();
		var dialog_cfg = {
			title : t._cfg.title,
			maximizable : true,
			modal : t._cfg.modal,
			toolbar : "#" + t._toolBarDivId,
			buttons : "#" + t._buttonDivId,
			onResize : function() {
				if ($('#' + t._mapId).length != 0) {
					$('#' + t._layOutId).layout('resize');
				}
			},
			onOpen : function() {
				$('#' + t._layOutId).layout();
				var center_config = {
					region : 'center',
					split : true,
					content : '<div id="' + t._mapId
							+ '" style="width:100%;height:100%"></div>'
				};
				$('#' + t._layOutId).layout('add', center_config);
				$('#' + t._layOutId).layout('resize');
				new GisFactory({
					gisType : mapToolGisType,
					mapDIV : t._mapId
				}).createMap(function(arcgis) {
					t._gis = arcgis;
					t._gis.bind('drawEnd', function() {
						var graphic = t._gis.getGraphic(t._vtxGraphicId);
						t._gis.doEdit(graphic);
					});
					t._gis.bind('clickGraphic', function(obj, event) {
						if (obj.attributes.id) {
							t.goToCenter(obj.attributes.id);
						}
					});
					$("#_winToolDraw").hide();
					$("#_winToolReDraw").hide();
					$("#_winToolConfirm").hide();

					if (t._cfg.lnglats == null || t._cfg.lnglats == '') {
						$("#_winToolDraw").show();
					} else {
						$("#_winToolReDraw").show();
						$("#_winToolConfirm").show();
						t.initMapLayer();
					}
				});
				$(window)
						.resize(
								function() {
									clearTimeout(t._timerToResize);
									t._timerToResize = setTimeout(
											function() {
												$('#' + t._dialogId)
														.dialog(
																'resize',
																{
																	width : parseInt(
																			document.body.clientWidth * 0.8,
																			10),
																	height : parseInt(
																			document.body.clientHeight * 0.8,
																			10)
																});
												$('#' + t._dialogId).dialog(
														'center');
											}, t._timerToResize);
								});
			}
		};
		// 设置窗口显示内容及按钮
		$('#' + t._dialogId).dialog(dialog_cfg);
	},
	initDataGrid : function() {
		var t = this;
		var options = {
			region : 'west',
			title : "查询结果",
			split : true,
			content : "<table id='" + t._dataGridId + "'></table>"
		};
		options.width = parseInt(document.body.clientWidth * 0.8 * 0.2, 10);
		$('#' + t._layOutId).layout('add', options);
		var columns = [ [ {
			field : 'name',
			title : '名称',
			width : 20,
			align : 'left'
		} ] ];
		var config = {
			pagination : false,
			singleSelect : true,
			gridId : t._dataGridId,
			columns : columns,
			gridClickRow : function(rowIndex, rowData) {
				t.clickRow(rowData.id);
			},
			gridDblClickRow : function(rowIndex, rowData) {
				t.goToCenter(rowData.id);
			}
		};
		t._dataGridObj = new EasyuiDataGrid(config);
	},
	clickRow : function(clickId) {
		var t = this;
		var ids = t._mapValue.getAllKey();
		if (ids.length > 0) {
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];
				var graph = t._gis.getGraphic(id);
				if (null != graph) {
					t._gis.updatePoint({
						id : id,
						url : "/vortex/gis/images/defaultMarker.png"
					});
				} else {
					var obj = t._mapValue.get(id);
					if (undefined != obj) {
						t._gis.addPoint({
							id : obj.id,
							longitude : obj.lnglat[0],
							latitude : obj.lnglat[1],
							fit : false
						});
					}
				}
			}
		}
		if (clickId != t._vtxGraphicId) {
			var graph_obj = t._gis.getGraphic(clickId);
			if (null != graph_obj) {
				t._gis.updatePoint({
					id : clickId,
					url : "/vortex/gis/images/defaultMarker_selected.png"
				});
			}
		}
	},
	returnTotalMap : function() {
		var t = this;
		var exist_ids = t._mapValue.getAllKey();
		exist_ids.push(t._vtxGraphicId);
		t._gis.setFitview(exist_ids);
	},
	goToCenter : function(id) {
		var t = this;
		t.clickRow(id);
		t._gis.setFitview([ id ]);
	},
	clearDataGrid : function() {
		var t = this;
		var exist_ids = t._mapValue.getAllKey();
		if (exist_ids.length > 0) {
			for (var i = 0; i < exist_ids.length; i++) {
				var id = exist_ids[i];
				var graph = t._gis.getGraphic(id);
				if (null != graph) {
					t._gis.removeGraphic(graph);
				}
			}
		}
		$('#' + t._dataGridId).datagrid('loadData', []);
		t._mapValue.clear();
	},
	loadDataGrid : function(data) {
		var t = this;
		t.clearDataGrid();
		var newData = new Array();
		var ids = new Array();
		if (data.length > 0) {
			for (var int = 0; int < data.length; int++) {
				var element = data[int];
				element.id = element.lnglat[0] + "_" + element.lnglat[1];
				newData.push(element);
				t._mapValue.add(element.id, element);
				t._gis.addPoint({
					id : element.id,
					longitude : element.lnglat[0],
					latitude : element.lnglat[1],
					fit : false
				});
				ids.push(element.id);
			}
			t._gis.setFitview(ids);
		}
		$('#' + t._dataGridId).datagrid('loadData', newData);
	},
	searchByAreaName : function() {
		var t = this;
		var areaName = $("#areaName_mapTool").val();
		if (areaName != "") {
			t._gis.vtxAreaNameSearch(areaName, function(status, vortexResult) {
				if (null != t._dataGridObj) {
					t.clearDataGrid();
					$('#' + t._layOutId).layout('remove', "west");
				}
				t.initDataGrid();
				t.loadDataGrid(vortexResult);
			});
		}
	},
	clearSearch : function() {
		var t = this;
		t._dataGridObj = null;
		t.clearDataGrid();
		$("#areaName_mapTool").val('');
		$('#' + t._layOutId).layout('remove', "west");
	},
	closeTool : function() {
		$('#' + this._dialogId).dialog('close'); // 关闭窗口
		$('#' + this._dialogId).dialog('destroy'); // 销毁窗口
		$('#' + this._dialogId).parent().remove();
	},
	initMapLayer : function() {
		var t = this;
		t._gis.clear();
		var _lnglats = t._cfg.lnglats;
		switch (t._cfg.type) {
		case "marker":
		case MapConstants.pelType.POINT:
			var lng = null;
			var lat = null;
			if (_lnglats instanceof Array) {
				if (_lnglats[0][0] != "" && _lnglats[0][0] != undefined
						&& _lnglats[0][1] != "" && _lnglats[0][1] != undefined) {
					lng = parseFloat(_lnglats[0][0]);
					lat = parseFloat(_lnglats[0][1]);
				} else {
					throw '指定的参数错误';
				}
			}
			if (null != lng && null != lat) {
				var point_cfg = {
					longitude : lng,
					latitude : lat,
					id : t._vtxGraphicId,
					url : t._cfg.markerUrl,
					infoWindow : false,
					config : {
						fit : false
					}
				};
				if (undefined == point_cfg.url || null == point_cfg.url) {
					point_cfg.url = "/vortex/gis/images/defaultMarker_big.png";
					point_cfg.config = {
						width : 44,
						height : 44,
						fit : false
					};
				}
				t._gis.addPoint(point_cfg);
			}
			break;
		case MapConstants.pelType.POLYLINE:
			if (_lnglats != null) {
				if (!_lnglats instanceof Array) {
					throw '指定的参数错误';
				}
				t._gis.addLine({
					paths : [ _lnglats ],
					id : t._vtxGraphicId,
					infoWindow : false,
					config : {
						fit : false
					}
				});
			}
			break;
		case MapConstants.pelType.POLYGON:
			if (_lnglats != null) {
				if (!_lnglats instanceof Array) {
					throw '指定的参数错误';
				}
				t._gis.addPolygon({
					rings : [ _lnglats ],
					id : t._vtxGraphicId,
					infoWindow : false,
					config : {
						fit : false
					}
				});
			}
			break;
		case MapConstants.pelType.RECTANGLE:
			if (_lnglats != null) {
				if (!_lnglats instanceof Array) {
					throw '指定的参数错误';
				}
				t._gis.addRectangle({
					rings : [ _lnglats ],
					id : t._vtxGraphicId,
					infoWindow : false,
					config : {
						fit : false
					}
				});
			}
			break;
		default:
			break;
		}
		t._gis.setFitview([t._vtxGraphicId]);
		var draw_graphic = t._gis.getGraphic(t._vtxGraphicId);
		if (null == draw_graphic) {
			$("#_winToolDraw").show();
			$("#_winToolReDraw").hide();
			$("#_winToolConfirm").hide();
		} else {
			t._gis.doEdit(draw_graphic);
		}
	},
	buttonDraw : function() {// 绘制按钮
		var t = this;
		t._gis.clear();
		$("#_winToolDraw").hide();
		$("#_winToolReDraw").show();
		$("#_winToolConfirm").show();
		switch (t._cfg.type) {
		case "marker":
		case MapConstants.pelType.POINT:
			var center = t._gis.getNowCenter();
			var point_cfg = {
				longitude : center[0],
				latitude : center[1],
				id : t._vtxGraphicId,
				url : t._cfg.markerUrl,
				infoWindow : false,
				fit : false
			};
			if (undefined == point_cfg.url || null == point_cfg.url) {
				point_cfg.url = "/vortex/gis/images/defaultMarker_big.png";
				point_cfg.config = {
					width : 44,
					height : 44
				};
			}
			t._gis.addPoint(point_cfg);
			var draw_graphic = t._gis.getGraphic(t._vtxGraphicId);
			t._gis.doEdit(draw_graphic);
			break;
		default:
			t._gis.draw(t._cfg.type, null, {
				id : t._vtxGraphicId
			});
			break;
		}
	},
	buttonClear : function() {// 重绘按钮
		var t = this;
		t._gis.clear();
		t.clearSearch();
		$("#_winToolDraw").show();
		$("#_winToolReDraw").hide();
		$("#_winToolConfirm").hide();
	},
	buttonConfirm : function() {// 确认按钮
		var t = this;
		var graph = t._gis.getGraphic(t._vtxGraphicId);
		if (!graph) { // 如果未作图点确认，则提示相关信息
			VortexUtil.show({
				msg : '请先作图'
			});
			return;
		}
		var result = null;
		var geometry = graph.geometry;
		switch (geometry.type) {
		case MapConstants.pelType.POINT:
			result = [ [ geometry.x, geometry.y ] ];
			break;
		case MapConstants.pelType.POLYLINE:
			result = geometry.paths[0];
			break;
		case MapConstants.pelType.POLYGON:
		case MapConstants.pelType.RECTANGLE:
			result = geometry.rings[0];
			break;
		case MapConstants.pelType.CIRCLE:
			result = geometry;
			break;
		}
		if (typeof (t._cfg.callback) == "function") {
			t._cfg.callback(result); // 执行回调方法
		}
		t.closeTool();
	}
};
