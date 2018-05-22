dojo.require("esri.map");
dojo.require("esri.toolbars.draw");
dojo.require("esri.toolbars.edit");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.graphic");
dojo.require("esri.tasks.geometry");
dojo.require("dojo.number");
dojo.require("dojo.parser");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.layout.ExpandoPane");
dojo.require("esri.dijit.OverviewMap");
dojo.require("dijit.dijit");
dojo.require("esri.tasks.geometry");
dojo.require("esri.tasks.query");
function VortexArcGisMap(config) {
	config = config || {};
	this.map = null;
	this.repository = [];

	this.events = {
		clickGraphic : new Event(),// 点击图形事件
		clickMap : new Event(),// 点击地图事件
		dragMap : new Event(),// 拖动地图事件
		dragMapStart : new Event(),// 拖动地图开始事件
		dragMapEnd : new Event(),// 拖动地图结束事件
		mapOnLoad : new Event(),// 地图加载完成事件
		onMouseOverMap : new Event(),// 当鼠标在地图上事件
		drawEnd : new Event(),// 绘制图形结束事件
		graphicVortexChange : new Event(),// 修改图形某点发生改变事件（修改线）
		editGraphicClick : new Event(),// 修改图形时点击图形事件（与不修改图形时的点击图形事件完全分离，需要区分）
		editGraphicMoveStart : new Event(),// 修改图形移动开始事件
		editGraphicMoveEnd : new Event(),// 修改图形时移动图形结束事件
		MouseOutGraphic : new Event(),// 鼠标移动图形上方
		MouseOverGraphic : new Event(),// 鼠标移除图形
		LayersAddResult : new Event(),
		onGraphicAdd : new Event(),
		zoomEnd : new Event()
	// 缩放地图结束时触发事件
	};
	// 地图默认参数
	VortexArcGisMap.defaults = {
		isPan : false,
		logo : false,
		requestNum : 100,
		isQuickInit : true,
		slider : false,
		tipWidth : 290,
		tipHeight : 400,
		vortexMapWmtsMapLayers : VortexWmtsMapLayers
	};
	// 通过config传入值覆盖默认值，如有config为空则保持默认参数
	config = $.extend({}, VortexArcGisMap.defaults, config);
	this.wkid = gisMapConstant.defaultGisWkid;
	this.options = config;
	function getAttributes(id, t) {
		for ( var i = 0; i < t.repository.length; i++) {
			if (t.repository[i].id == id) {
				return t.repository[i];
			}
		}
		return 0;
	}
	;
	this.getAttributes = function(id) {
		var t = this;
		return getAttributes(id, t);
	};
}

VortexArcGisMap.prototype = {
	/*
	 * 添加天地图
	 */
	initVortexWmtsLayer : function(options) {
		if (options.vortexMapWmtsMapLayers == undefined
				|| options.vortexMapWmtsMapLayers == null
				|| gisMapConstant.isUseWmtsMapLayer == false) {
			return;
		}
		var maplayer = options.vortexMapWmtsMapLayers;
		var thisMap = this;
		this.initialExtent = new esri.geometry.Extent(
				maplayer.initialExtent.xmin, maplayer.initialExtent.ymin,
				maplayer.initialExtent.xmax, maplayer.initialExtent.ymax,
				this.spatialReference);
		this.fullExtent = new esri.geometry.Extent(maplayer.fullExtent.xmin,
				maplayer.fullExtent.ymin, maplayer.fullExtent.xmax,
				maplayer.fullExtent.ymax, this.spatialReference);
		this.maxLevel = maplayer.maxLevel;// 最大显示级别
		this.minLevel = maplayer.minLevel;// 最小显示级别
		dojo.declare("VortexAnnoLayer", esri.layers.TiledMapServiceLayer, {
			constructor : function() {
				this.spatialReference = new esri.SpatialReference({
					wkid : maplayer.wkid
				});
				this.initialExtent = thisMap.initialExtent;
				this.fullExtent = thisMap.fullExtent;
				this.tileInfo = new esri.layers.TileInfo({
					"rows" : 256,
					"cols" : 256,
					"origin" : maplayer.origin,
					"spatialReference" : {
						"wkid" : maplayer.wkid
					},
					"lods" : maplayer.lods
				});
				this.loaded = true;
				this.onLoad(this);
			},
			getTileUrl : function(level, row, col) {
				for ( var i = 0; i < maplayer.url.length; i++) {
					var u = maplayer.url[i];
					if (u.type == maplayer.defaultType) {
						if (level >= u.minValue && level <= u.maxValue) {
							var urlStr = u.urlStr;
							if (urlStr.indexOf(u.annoLayerFilter) != -1) {
								var regLvl = new RegExp('\\{0\\}', "g");
								var regRow = new RegExp('\\{1\\}', "g");
								var regCol = new RegExp('\\{2\\}', "g");
								urlStr = urlStr.replace(regLvl, level + "");
								urlStr = urlStr.replace(regRow, row + "");
								urlStr = urlStr.replace(regCol, col + "");
								return urlStr;
							}
						}
					}
				}
			}
		});
		dojo.declare("VortexBaseMapLayer", esri.layers.TiledMapServiceLayer, {
			constructor : function() {
				this.spatialReference = new esri.SpatialReference({
					wkid : maplayer.wkid
				});
				this.initialExtent = thisMap.initialExtent;
				this.fullExtent = thisMap.fullExtent;
				this.tileInfo = new esri.layers.TileInfo({
					"rows" : 256,
					"cols" : 256,
					"origin" : maplayer.origin,
					"spatialReference" : {
						"wkid" : maplayer.wkid
					},
					"lods" : maplayer.lods
				});
				this.loaded = true;
				this.onLoad(this);
			},
			getTileUrl : function(level, row, col) {
				for ( var i = 0; i < maplayer.url.length; i++) {
					var u = maplayer.url[i];
					if (u.type == maplayer.defaultType) {
						if (level >= u.minValue && level <= u.maxValue) {
							var urlStr = u.urlStr;
							if (urlStr.indexOf(u.baseMapFilter) != -1) {
								var regLvl = new RegExp('\\{0\\}', "g");
								var regRow = new RegExp('\\{1\\}', "g");
								var regCol = new RegExp('\\{2\\}', "g");
								urlStr = urlStr.replace(regLvl, level + "");
								urlStr = urlStr.replace(regRow, row + "");
								urlStr = urlStr.replace(regCol, col + "");
								return urlStr;
							}
						}
					}
				}
			}
		});
		this.options = $.extend({}, this.options, {
			extent : this.initialExtent,
			lods : maplayer.lods
		});
	},
	/*
	 * 新建地图方法
	 */
	createMap : function(mapDIV) {
		var t = this;
		// 添加天地图方式（浙江德清）
		t.initVortexWmtsLayer(t.options);
		t.map = new esri.Map(mapDIV, t.options);

		dojo.connect(window, 'resize', t.map, t.map.resize);// 当界面大小发生改变时，也一起改变地图大小

		dojo.connect(t.map, 'onLoad', function(event) {
			t.events.mapOnLoad.sender = t.map;
			t.events.mapOnLoad.notify(event);
		});

		dojo.connect(t.map, "onClick", function(event) {
			if (event.graphic) {
				if (event.graphic.attributes) {
					// 关闭气泡
					t.closeInfoWindow();
					var vortexObj = t.getGraphic(event.graphic.attributes.id);
					vortexObj.mapLayer = event.graphic;
					vortexObj = t.setVortexObjOtherValue(vortexObj);
					t.events.clickGraphic.sender = vortexObj;
					t.events.clickGraphic.notify(event);
				}
			} else {
				t.map.eventX = event.mapPoint.x;
				t.map.eventY = event.mapPoint.y;
				t.events.clickMap.sender = t.map;
				t.events.clickMap.notify(event);
			}
		});
		dojo.connect(t.map, 'onMouseDrag', function(event) {
			t.events.dragMap.sender = t.map;
			t.events.dragMap.notify(event);
		});
		dojo.connect(t.map, 'onMouseDragEnd', function(event) {
			t.events.dragMapEnd.sender = t.map;
			t.events.dragMapEnd.notify(event);
		});
		dojo.connect(t.map, 'onMouseDragStart', function(event) {
			t.events.dragMapStart.sender = t.map;
			t.events.dragMapStart.notify(event);
		});
		dojo.connect(t.map, 'onLayerAddResult', function(layer) {
			t.events.LayersAddResult.sender = t.map;
			t.events.LayersAddResult.notify(layer);
		});
		// 鼠标移出图形
		// dojo.connect(t.map, 'onMouseOut', function(event) {
		// if (event.graphic) {
		// if (event.graphic.attributes) {
		// var vortexObj = t.getGraphic(event.graphic.attributes.id);
		// vortexObj.mapLayer = event.graphic;
		// t.events.MouseOutGraphic.sender = vortexObj;
		// t.events.MouseOutGraphic.notify(event);
		// }
		// }
		// });
		// 鼠标移动图形上方
		// dojo.connect(t.map, 'onMouseOver', function(event) {
		// if (event.graphic) {
		// if (event.graphic.attributes) {
		// var vortexObj = t.getGraphic(event.graphic.attributes.id);
		// vortexObj.mapLayer = event.graphic;
		// t.events.MouseOverGraphic.sender = vortexObj;
		// t.events.MouseOverGraphic.notify(event);
		// }
		// }
		// });
		// 初始化地图图元Map
		t.mapLayerMaps = MapUtil.getInstance();
	},
	addData : function(data) {
		this.initData = data;
	},
	/*
	 * 添加瓦片图方法
	 */
	addDynamicLayer : function(url) {
		var t = this;
		var onLineChinaMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(
				url);
		t.map.addLayer(onLineChinaMapServiceLayer);
	},
	addTiledMapLayer : function(url) {
		var t = this;
		var onLineChinaMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
				url);
		t.map.addLayer(onLineChinaMapServiceLayer);
	},
	/*
	 * 添加弹出框方法
	 */
	openInfoWindow : function(src, title, content, config) {
		var t = this;
		t.map.infoWindow.setTitle(title);
		t.map.infoWindow.setContent(content);
		var geometry = null;
		switch (src.geometryType) {
		case MapConstants.pelType.POINT:
			geometry = src.mapLayer.geometry;
			break;
		case MapConstants.pelType.LINE:
			var paths = src.mapLayer.geometry.paths[0];
			geometry = new esri.geometry.Point(paths[0][0], paths[0][1],
					new esri.SpatialReference({
						wkid : t.wkid
					}));
			break;
		case MapConstants.pelType.POLYGON:
		case MapConstants.pelType.RECTANGLE:
			geometry = src.mapLayer.geometry.getCentroid();
			break;
		default:
			break;
		}
		if (config == undefined) {
			config = {};
		}
		if (src.attributes == undefined) {
			src.attributes = {};
		}
		if (src.attributes.config == undefined) {
			src.attributes.config = {};
		}
		var tipOptions = $.extend({}, src.attributes.config, config, t.options);
		// 重新定义弹窗大小
		var nowTipWidth = tipOptions.tipWidth;
		var nowTipHeight = tipOptions.tipHeight;
		t.resizeInfoWindow(nowTipWidth, nowTipHeight);
		if (null != geometry) {
			t.map.infoWindow.show(geometry);
		}
	},
	openInfoWindowByCustom : function(config) {
		var t = this;
		var tipOptions = $.extend({}, config, t.options);
		t.map.infoWindow.setTitle(tipOptions.title);
		t.map.infoWindow.setContent(tipOptions.content);
		var nowTipWidth = tipOptions.tipWidth;
		var nowTipHeight = tipOptions.tipHeight;
		// 重新定义弹窗大小
		t.resizeInfoWindow(nowTipWidth, nowTipHeight);
		var geometry = new esri.geometry.Point(tipOptions.longitude,
				tipOptions.latitude, new esri.SpatialReference({
					wkid : t.wkid
				}));
		t.map.infoWindow.show(geometry, t.map.getInfoWindowAnchor(t.map
				.toScreen(geometry)));
	},
	// 关闭弹出框方法
	closeInfoWindow : function() {
		this.map.infoWindow.hide();
	},
	// 改变弹出框大小方法
	resizeInfoWindow : function(width, height) {
		this.map.infoWindow.resize(width, height);
	},
	addVortexMapLayer : function(data) {
		var t = this;
		if (data.pelType && data.lnglatAtrr) {
			var lnglatAtrr = data.lnglatAtrr;
			var lnglatArray = new Array();
			switch (data.pelType) {
			case MapConstants.pelType.LINE:
			case MapConstants.pelType.RECTANGLE:
			case MapConstants.pelType.POLYGON:
				var lnglatArray = new Array();
				for ( var i = 0; i < lnglatAtrr.length; i++) {
					var onePoint = lnglatAtrr[i];
					var lng = onePoint[0];
					var lat = onePoint[1];
					if (typeof lng == "string") {
						lng = parseFloat(lng);
					}
					if (typeof lat == "string") {
						lat = parseFloat(lat);
					}
					lnglatArray.push([ lng, lat ]);
				}
				break;
			default:
				break;
			}
			switch (data.pelType) {
			case MapConstants.pelType.POINT:
				data.longitude = lnglatAtrr[0][0];
				data.latitude = lnglatAtrr[0][1];
				t.addPoint(data);
				break;
			case MapConstants.pelType.LINE:
				data.paths = new Array();
				data.paths.push(lnglatArray);
				t.addLine(data);
				break;
			case MapConstants.pelType.POLYGON:
				data.rings = new Array();
				data.rings.push(lnglatArray);
				t.addPolygon(data);
				break;
			case MapConstants.pelType.RECTANGLE:
				data.rings = new Array();
				data.rings.push(lnglatArray);
				t.addRectangle(data);
				break;
			case MapConstants.pelType.CIRCLE:
				t.addCircle(data);
				break;
			}
		}
	},
	/*
	 * 添加点方法
	 */
	addPoint : function(data) {
		var t = this;
		if (typeof data.longitude == "string") {
			data.longitude = parseFloat(data.longitude);
		}
		if (typeof data.latitude == "string") {
			data.latitude = parseFloat(data.latitude);
		}
		if (data.longitude == null || data.latitude == null) {
			return;
		}
		if (data.longitude == "" || data.latitude == "") {
			return;
		}
		if (data.infoWindow == undefined) {
			data.infoWindow = true;
		}
		var parameter;
		if (data.config == null || data.config == undefined) {
			parameter = data;
		} else {
			parameter = data.config;
		}
		// 默认样式
		var defaults = MapConstants.pointStyle || {};
		var options = $.extend({}, defaults, parameter);
		var markerIconUrl = options.url;
		if (data.url) {
			markerIconUrl = data.url;
		}
		var vortexPosition = new esri.geometry.Point(data.longitude,
				data.latitude, new esri.SpatialReference({
					wkid : t.wkid
				}));
		var markerIcon = new esri.symbol.PictureMarkerSymbol(markerIconUrl,
				options.width, options.height);
		var vortexMarker = new esri.Graphic(vortexPosition, markerIcon, data);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.POINT,
			attributes : data,
			mapLayer : vortexMarker
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 添加至地图
		t.map.graphics.add(vortexObj.mapLayer);
	},
	/*
	 * 添加线方法
	 */
	addLine : function(data) {
		var t = this;

		if (data.paths.length > 0) {
			for ( var i = 0; i < data.paths.length; i++) {
				var oneLine = data.paths[i];
				for ( var j = 0; j < oneLine.length; j++) {
					var onePoint = oneLine[j];
					var lng = onePoint[0];
					var lat = onePoint[1];
					if (typeof lng == "string") {
						lng = parseFloat(lng);
					}
					if (typeof lat == "string") {
						lat = parseFloat(lat);
					}
					oneLine[j] = [ lng, lat ];
				}
			}
		}
		if (data.infoWindow == undefined) {
			data.infoWindow = true;
		}
		var parameter;
		if (data.config == null || data.config == undefined) {
			parameter = data;
		} else {
			parameter = data.config;
		}
		// 颜色转换
		if (parameter.color) {
			parameter.lineColor = GisUtils.format10To16(parameter.color);
		}
		if (parameter.lineColor) {
			parameter.lineColor = GisUtils.format10To16(parameter.lineColor);
		}
		// 默认样式
		var defaults = MapConstants.lineStyle || {};
		var options = $.extend({}, defaults, parameter);
		var vortexLinePath = new esri.geometry.Polyline({
			"paths" : data.paths,
			"spatialReference" : {
				"wkid" : t.wkid
			}
		});

		var vortexLineOptions = new esri.symbol.SimpleLineSymbol(
				options.lineType, new dojo.Color(options.lineColor),
				options.lineWidth);
		var vortexLine = new esri.Graphic(vortexLinePath, vortexLineOptions,
				data);

		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.LINE,
			attributes : data,
			mapLayer : vortexLine
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 添加至地图
		t.map.graphics.add(vortexObj.mapLayer);
	},
	/*
	 * 添加多边形方法
	 */
	addPolygon : function(data) {
		var t = this;
		if (data.rings.length > 0) {
			for ( var i = 0; i < data.rings.length; i++) {
				var oneLine = data.rings[i];
				for ( var j = 0; j < oneLine.length; j++) {
					var onePoint = oneLine[j];
					var lng = onePoint[0];
					var lat = onePoint[1];
					if (typeof lng == "string") {
						lng = parseFloat(lng);
					}
					if (typeof lat == "string") {
						lat = parseFloat(lat);
					}
					oneLine[j] = [ lng, lat ];
				}
			}
		}
		if (data.infoWindow == undefined) {
			data.infoWindow = true;
		}
		var parameter;
		if (data.config == null || data.config == undefined) {
			parameter = data;
		} else {
			parameter = data.config;
		}
		// 颜色转换
		if (parameter) {
			if (parameter.color) {
				parameter.fillColor = GisUtils.format10To16(parameter.color);
			}
			if (parameter.fillColor) {
				parameter.fillColor = GisUtils
						.format10To16(parameter.fillColor);
			}
			if (parameter.lineColor) {
				parameter.lineColor = MapConstants
						.format10To16(parameter.lineColor);
			}
		}
		// 默认样式
		var defaults = MapConstants.polygonStyle || {};
		var options = $.extend({}, defaults, parameter);
		var vortexPolygonPath = new esri.geometry.Polygon({
			rings : data.rings,
			"spatialReference" : {
				"wkid" : t.wkid
			}
		});
		var vortexPolygonOptions = new esri.symbol.SimpleFillSymbol(
				options.lineType, new esri.symbol.SimpleLineSymbol(
						options.lineType, new dojo.Color(options.lineColor),
						options.lineWidth), new dojo.Color(options.fillColor));
		var vortexPolygon = new esri.Graphic(vortexPolygonPath,
				vortexPolygonOptions, data);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.POLYGON,
			attributes : data,
			mapLayer : vortexPolygon
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 添加至地图
		t.map.graphics.add(vortexPolygon);
	},
	/*
	 * 添加矩形方法
	 */
	addRectangle : function(data) {
		var t = this;
		if (data.rings.length > 0) {
			for ( var i = 0; i < data.rings.length; i++) {
				var oneLine = data.rings[i];
				for ( var j = 0; j < oneLine.length; j++) {
					var onePoint = oneLine[j];
					var lng = onePoint[0];
					var lat = onePoint[1];
					if (typeof lng == "string") {
						lng = parseFloat(lng);
					}
					if (typeof lat == "string") {
						lat = parseFloat(lat);
					}
					oneLine[j] = [ lng, lat ];
				}
			}
		}
		if (data.infoWindow == undefined) {
			data.infoWindow = true;
		}
		var parameter;
		if (data.config == null || data.config == undefined) {
			parameter = data;
		} else {
			parameter = data.config;
		}
		// 颜色转换
		if (parameter) {
			if (parameter.color) {
				parameter.fillColor = GisUtils.format10To16(parameter.color);
			}
			if (parameter.fillColor) {
				parameter.fillColor = GisUtils
						.format10To16(parameter.fillColor);
			}
			if (parameter.lineColor) {
				parameter.lineColor = MapConstants
						.format10To16(parameter.lineColor);
			}
		}
		// 默认样式
		var defaults = MapConstants.rectangleStyle || {};
		var options = $.extend({}, defaults, parameter);
		var vortexRectanglePath = new esri.geometry.Polygon({
			rings : data.rings,
			"spatialReference" : {
				"wkid" : t.wkid
			}
		});
		var vortexRectangleOptions = new esri.symbol.SimpleFillSymbol(
				options.lineType, new esri.symbol.SimpleLineSymbol(
						options.lineType, new dojo.Color(options.lineColor),
						options.lineWidth), new dojo.Color(options.fillColor));
		var vortexRectangle = new esri.Graphic(vortexRectanglePath,
				vortexRectangleOptions, data);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.RECTANGLE,
			attributes : data,
			mapLayer : vortexRectangle
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 添加至地图
		t.map.graphics.add(vortexRectangle);
	},
	/*
	 * 添加圆方法
	 */
	addCircle : function(data) {
		var t = this;
		if (typeof data.longitude == "string") {
			data.longitude = parseFloat(data.longitude);
		}
		if (typeof data.latitude == "string") {
			data.latitude = parseFloat(data.latitude);
		}
		if (typeof data.radius == "string") {
			data.radius = parseFloat(data.radius);
		}
		if (data.infoWindow == undefined) {
			data.infoWindow = true;
		}
		var parameter;
		if (data.config == null || data.config == undefined) {
			parameter = data;
		} else {
			parameter = data.config;
		}
		// 颜色转换
		if (parameter) {
			if (parameter.color) {
				parameter.fillColor = GisUtils.format10To16(parameter.color);
			}
			if (parameter.fillColor) {
				parameter.fillColor = GisUtils
						.format10To16(parameter.fillColor);
			}
			if (parameter.lineColor) {
				parameter.lineColor = MapConstants
						.format10To16(parameter.lineColor);
			}
		}
		// 默认样式
		var defaults = MapConstants.circleStyle || {};
		var options = $.extend({}, defaults, parameter);
		var vortexCirclePath = new esri.geometry.Circle(
				new esri.geometry.Point(data.longitude, data.latitude,
						new esri.SpatialReference({
							wkid : t.wkid
						})), {
					"radius" : data.radius
				});
		var vortexCircleOptions = new esri.symbol.SimpleFillSymbol(
				options.lineType, new esri.symbol.SimpleLineSymbol(
						options.lineType, new dojo.Color(options.lineColor),
						options.lineWidth), new dojo.Color(options.fillColor));
		var vortexCircle = new esri.Graphic(vortexCirclePath,
				vortexCircleOptions, data);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.CIRCLE,
			attributes : data,
			mapLayer : vortexCircle
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 添加至地图
		t.map.graphics.add(vortexCircle);
	},
	// 获取线的类型
	getLineType : function(type) {
		if (type == MapConstants.lineType.LINE_DASHED) {
			return esri.symbol.SimpleLineSymbol.STYLE_DASH;
		} else if (type == MapConstants.lineType.LINE_SOLID) {
			return esri.symbol.SimpleLineSymbol.STYLE_SOLID;
		}
	},
	/*
	 * 绘图方法
	 */
	draw : function(geometryType, data) {
		var t = this;
		var dlineStyle = MapConstants.lineStyle;
		var dPolygonStyle = MapConstants.polygonStyle;
		var dRectangleStyle = MapConstants.rectangleStyle;
		var dCircleStyle = MapConstants.circleStyle;
		var vortexPolylineOptions = new esri.symbol.SimpleLineSymbol(t
				.getLineType(dlineStyle.lineType), new dojo.Color(
				dlineStyle.lineColor), dlineStyle.lineWidth);
		var vortexPolygonOptions = new esri.symbol.SimpleFillSymbol(t
				.getLineType(dPolygonStyle.lineType),
				new esri.symbol.SimpleLineSymbol(t
						.getLineType(dPolygonStyle.lineType), new dojo.Color(
						dPolygonStyle.lineColor), dPolygonStyle.lineWidth),
				new dojo.Color(dPolygonStyle.fillColor));
		var vortexRectangleOptions = new esri.symbol.SimpleFillSymbol(t
				.getLineType(dRectangleStyle.lineType),
				new esri.symbol.SimpleLineSymbol(t
						.getLineType(dRectangleStyle.lineType), new dojo.Color(
						dRectangleStyle.lineColor), dRectangleStyle.lineWidth),
				new dojo.Color(dRectangleStyle.fillColor));
		var vortexCircleOptions = new esri.symbol.SimpleFillSymbol(t
				.getLineType(dCircleStyle.lineType),
				new esri.symbol.SimpleLineSymbol(t
						.getLineType(dCircleStyle.lineType), new dojo.Color(
						dCircleStyle.lineColor), dCircleStyle.lineWidth),
				new dojo.Color(dCircleStyle.fillColor));
		// 实例化鼠标绘制工具
		var mouseTool = new esri.toolbars.Draw(t.map);
		switch (geometryType) {
		case MapConstants.pelType.POINT:
			break;
		case MapConstants.pelType.LINE:
			mouseTool.activate(esri.toolbars.Draw.POLYLINE);
			break;
		case MapConstants.pelType.POLYGON:
			mouseTool.activate(esri.toolbars.Draw.POLYGON);
			break;
		case MapConstants.pelType.RECTANGLE:
			mouseTool.activate(esri.toolbars.Draw.RECTANGLE);
			break;
		case MapConstants.pelType.CIRCLE:
			mouseTool.activate(esri.toolbars.Draw.CIRCLE);
			break;
		default:
			break;
		}

		mouseTool.on("draw-end", function(event) {
			// 封装对象,缓存
			var vortexObj = {
				geometryType : geometryType,
				attributes : data
			};
			switch (geometryType) {
			case MapConstants.pelType.LINE:
				var vortexPolyline = new esri.Graphic(event.geometry,
						vortexPolylineOptions);
				t.map.graphics.add(vortexPolyline);
				vortexObj.mapLayer = vortexPolyline;
				break;
			case MapConstants.pelType.POLYGON:
				var vortexPolygon = new esri.Graphic(event.geometry,
						vortexPolygonOptions);
				t.map.graphics.add(vortexPolygon);
				vortexObj.mapLayer = vortexPolygon;
				break;
			case MapConstants.pelType.RECTANGLE:
				var vortexRectangle = new esri.Graphic(event.geometry,
						vortexRectangleOptions);
				t.map.graphics.add(vortexRectangle);
				vortexObj.mapLayer = vortexRectangle;
				break;
			case MapConstants.pelType.CIRCLE:
				var vortexCircle = new esri.Graphic(event.geometry,
						vortexCircleOptions);
				t.map.graphics.add(vortexCircle);
				vortexObj.mapLayer = vortexCircle;
				break;
			default:
				break;
			}
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.mapLayerMaps.add(data.id, vortexObj);
			// 关闭绘图
			mouseTool.deactivate();
			// 绘制图形结束事件
			t.events.drawEnd.sender = vortexObj;
			t.events.drawEnd.notify(event);
		});

	},
	// 修改制定图形方法
	doEdit : function(src) {
		var t = this;
		if (null != t.editToolbar) {
			t.editToolbar.deactivate();
			t.editToolbar = null;
		}
		var options = {
			allowAddVertices : true,
			allowDeleteVertices : true,
			uniformScaling : true
		};
		t.editToolbar = new esri.toolbars.Edit(t.map);
		t.editToolbar.activate(esri.toolbars.Edit.EDIT_VERTICES, src.mapLayer,
				options);
		t.editToolbar.on("vertex-move-stop", function(event) {
			// 封装对象,缓存
			var vortexObj = {
				geometryType : src.geometryType,
				attributes : src.attributes,
				mapLayer : event.graphic
			};
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.mapLayerMaps.add(vortexObj.attributes.id, vortexObj);
			t.events.graphicVortexChange.sender = vortexObj;
			t.events.graphicVortexChange.notify(event);
		});
	},
	// 设置其他信息
	setVortexObjOtherValue : function(vortexObj) {
		var vortexMapLayer = vortexObj.mapLayer;
		var lnglatArray = new Array();
		var xmax, xmin, ymax, ymin = null;
		switch (vortexObj.geometryType) {
		case MapConstants.pelType.POINT:
			var markerPosition = vortexMapLayer.geometry;
			lnglatArray.push([ markerPosition.x, markerPosition.y ]);
			xmax = markerPosition.x;
			xmin = markerPosition.x;
			ymax = markerPosition.y;
			ymin = markerPosition.y;
			break;
		case MapConstants.pelType.LINE:
		case MapConstants.pelType.RECTANGLE:
		case MapConstants.pelType.POLYGON:
			var allPaths = null;
			if (vortexObj.geometryType == MapConstants.pelType.LINE) {
				allPaths = vortexMapLayer.geometry.paths[0];
			} else if (vortexObj.geometryType == MapConstants.pelType.POLYGON
					|| vortexObj.geometryType == MapConstants.pelType.RECTANGLE) {
				allPaths = vortexMapLayer.geometry.rings[0];
			}
			for ( var i = 0; i < allPaths.length; i++) {
				lnglatArray.push([ allPaths[i][0], allPaths[i][1] ]);
			}
			var polygonBounds = vortexMapLayer.geometry.getExtent();
			if (polygonBounds != null) {
				xmax = polygonBounds.xmax;
				xmin = polygonBounds.xmin;
				ymax = polygonBounds.ymax;
				ymin = polygonBounds.ymin;
			}
			break;
		default:
			break;
		}
		vortexObj.vortexMapInfo = {};
		vortexObj.vortexMapInfo.type = vortexObj.geometryType;
		vortexObj.vortexMapInfo.extent = {};
		vortexObj.vortexMapInfo.extent.xmax = xmax;
		vortexObj.vortexMapInfo.extent.xmin = xmin;
		vortexObj.vortexMapInfo.extent.ymax = ymax;
		vortexObj.vortexMapInfo.extent.ymin = ymin;
		vortexObj.vortexMapInfo.lnglatAtrr = lnglatArray;
		return vortexObj;
	},
	/*
	 * 设置几个覆盖物自适应当前窗口 ids为一个数组
	 */
	setFitview : function(ids) {
		var t = this;
		if (ids) {
			if (ids.length > 0) {
				var xmin = 0, xmax = 0, ymin = 0, ymax = 0;
				var firstGraphic = t.getGraphic(ids[0]);
				if (firstGraphic == null || firstGraphic == undefined) {
					return;
				}
				var polBounds = firstGraphic.vortexMapInfo.extent
				xmax = polBounds.xmax;
				xmin = polBounds.xmin;
				ymax = polBounds.ymax;
				ymin = polBounds.ymin;
				for ( var i = 0; i < ids.length; i++) {
					var oneGraphic = t.getGraphic(ids[i]);
					if (oneGraphic) {
						var onePolBounds = oneGraphic.vortexMapInfo.extent;
						if (xmin > onePolBounds.xmin) {
							xmin = onePolBounds.xmin;
						}
						if (xmax < onePolBounds.xmax) {
							xmax = onePolBounds.xmax;
						}
						if (ymin > onePolBounds.ymin) {
							ymin = onePolBounds.ymin;
						}
						if (ymax < onePolBounds.ymax) {
							ymax = onePolBounds.ymax;
						}
					}
				}
				var newExtent = new esri.geometry.Extent(xmin, ymin, xmax,
						ymax, new esri.SpatialReference({
							wkid : t.wkid
						}));
				t.map.setExtent(newExtent, true);
			}
		}
	},
	// 通过id获得图形方法
	getGraphic : function(id) {
		var t = this;
		if (null == t.mapLayerMaps.get(id)) {
			return null;
		}
		var vortexObj = t.mapLayerMaps.get(id);
		// 设置其它信息
		vortexObj = t.setVortexObjOtherValue(vortexObj);
		return vortexObj;
	},
	// 移除指定图形方法
	removeGraphic : function(graphic) {
		var t = this;
		var removeItem;
		if (graphic.mapLayer) {
			removeItem = graphic.mapLayer;
		} else {
			removeItem = graphic;
		}
		t.map.graphics.remove(removeItem);
		var keyArray = t.mapLayerMaps.getAllKey();
		for ( var i = 0; i < keyArray.length; i++) {
			if (t.mapLayerMaps.get(keyArray[i]).mapLayer == removeItem) {
				t.mapLayerMaps.remove(keyArray[i]);
				break;
			}
		}
		t.closeInfoWindow();
	},
	/*
	 * 设置覆盖物是否隐藏
	 */
	setGraphicVisibleById : function(overlayId, isVisible) {
		var t = this;
		var mapOverlay = t.getGraphic(overlayId);
		if (mapOverlay != null && mapOverlay.mapLayer != null) {
			if (isVisible) {
				mapOverlay.mapLayer.show();
			} else {
				mapOverlay.mapLayer.hide();
			}
		}
	},
	/*
	 * 地图设定中心方法
	 */
	setCenter : function(x, y) {
		var t = this;
		if (typeof x == "string") {
			x = parseFloat(x);
		}
		if (typeof y == "string") {
			y = parseFloat(y);
		}
		var point = new esri.geometry.Point(x, y, new esri.SpatialReference({
			wkid : t.wkid
		}));
		this.map.centerAt(point);
	},
	/*
	 * 获取当前地图中心点
	 */
	getNowCenter : function() {
		var t = this;
		var _centerPoint = t.map.extent.getCenter();
		return [ _centerPoint.getLongitude(), _centerPoint.getLatitude() ];
	},
	// 清空地图上所有图形方法
	clear : function() {
		var t = this;
		t.map.graphics.clear();
		t.mapLayerMaps.clear();
		if (null != t.editToolbar) {
			t.editToolbar.deactivate();
			t.editToolbar = null;
		}
	},
	// 设定地图缩放比方法
	setZoom : function(zoom) {
		this.map.setLevel(zoom);
	},
	getZoom : function() {
		return this.map.getLevel();
	},
	resize : function() {
		this.map.resize();
	},
	/*
	 * 设定鼠标图案
	 */
	setCursor : function(url) {
		if (url) {
			this.map.setMapCursor("url(" + url + "),auto");
		} else {
			this.map.setMapCursor("default");
		}
	},
	/*
	 * 获得当前比例尺（错误）
	 */
	getScale : function() {
		var t = this;
		return t.map.getScale();
	},
	/*
	 * 计算面积
	 */
	calculateArea : function(graphic) {
		var areas = 0;
		var calculateItem = null;
		if (graphic.mapLayer) {
			calculateItem = graphic.mapLayer;
		} else {
			calculateItem = graphic;
		}
		if (null == calculateItem) {
			return areas;
		}
		require([ "esri/geometry/geodesicUtils", "esri/units" ], function(
				geodesicUtils, Units) {
			areas = geodesicUtils.geodesicAreas([ calculateItem.geometry ],
					esri.Units.ACRES)[0];
			if (!areas) {
				areas = 0;
			}
		});
		return areas;
	},
	/*
	 * 计算线距离
	 */
	calculateDistance : function(data) {
		var t = this;
		var totalDistance = 0;
		require([ "esri/geometry/geodesicUtils", "esri/units" ], function(
				geodesicUtils, Units) {
			if (data.length > 0) {
				for ( var x = 0; x < data.length - 1; x++) {
					var lnglats = new Array();
					lnglats.push([ data[x + 1][0], data[x + 1][1] ]);
					lnglats.push([ data[x][0], data[x][1] ]);
					var onePath = new esri.geometry.Polyline({
						"paths" : [ lnglats ],
						"spatialReference" : {
							"wkid" : t.wkid
						}
					});
					var oneLength = geodesicUtils.geodesicLengths([ onePath ],
							esri.Units.METERS)[0];
					if (oneLength) {
						totalDistance = totalDistance + oneLength;
					}
				}
			}
		});
		return parseFloat(totalDistance.toFixed(2));
	},
	/*
	 * 把经纬度坐标转换成屏幕坐标
	 */
	fromLngLatToContainerPixel : function(lng, lat) {
		if (lng == null || lat == null) {
			return;
		}
		if (lng == "" || lat == "") {
			return;
		}
		if (typeof lng == "string") {
			lng = parseFloat(lng);
		}
		if (typeof lat == "string") {
			lat = parseFloat(lat);
		}
		var t = this;
		var pixel = t.map.toScreen(new esri.geometry.Point(lng, lat,
				new esri.SpatialReference({
					wkid : t.wkid
				})));
		return [ pixel.x, pixel.y ];
	},
	/*
	 * 把屏幕坐标转化成经纬度坐标
	 */
	fromContainerPixelToLngLat : function(x, y) {
		if (x == null || y == null) {
			return;
		}
		if (x == "" || y == "") {
			return;
		}
		if (typeof x == "string") {
			x = parseFloat(x);
		}
		if (typeof y == "string") {
			y = parseFloat(y);
		}
		var t = this;
		var lnglat = t.map.toMap(new esri.geometry.ScreenPoint(x, y));
		return [ lnglat.getLongitude(), lnglat.getLatitude() ];
	},

	// 切换地图
	switchMap : function() {
		var t = this;
		if (t.options.vortexMapWmtsMapLayers == undefined
				|| t.options.vortexMapWmtsMapLayers == null
				|| gisMapConstant.isUseWmtsMapLayer == false) {
			return;
		}

		var vortexLayers = t.options.vortexMapWmtsMapLayers;
		var nowType = vortexLayers.defaultType;
		var switchTypeArrays = vortexLayers.switchTypeArrays;
		if (switchTypeArrays == undefined || switchTypeArrays == null
				|| switchTypeArrays.length == 0) {
			return;
		}
		var layerIds = t.map.layerIds;
		if (layerIds == undefined || layerIds == null || layerIds.length == 0) {

		}
		var layer0 = t.map.getLayer(layerIds[0]);
		var layer1 = t.map.getLayer(layerIds[1]);
		t.map.removeLayer(layer0);
		t.map.removeLayer(layer1);
		var index = switchTypeArrays.indexOf(nowType) + 1;
		var maxIndex = switchTypeArrays.length - 1;
		if (index > maxIndex) {
			index = 0;
		}
		vortexLayers.defaultType = switchTypeArrays[index];
		t.map.addLayer(new VortexAnnoLayer());
		t.map.addLayer(new VortexBaseMapLayer());
	},
	/*
	 * 聚合地图上的点
	 */
	clusterByIds : function(markerArrIds) {
		var t = this;
		var markerArr = new Array();
		if (markerArrIds == null || markerArrIds == undefined) {
			markerArrIds = new Array();
			var mapLayerKeys = t.mapLayerMaps.getAllKey();
			for ( var i = 0; i < mapLayerKeys.length; i++) {
				var vortexObj = t.mapLayerMaps.get(mapLayerKeys[i]);
				if (vortexObj.geometryType == MapConstants.pelType.POINT) {
					markerArrIds.push(mapLayerKeys[i]);
				}
			}
		}
		if (Object.prototype.toString.call(markerArrIds) === '[object Array]') {
			if (markerArrIds != null && markerArrIds.length > 0) {
				for ( var i = 0; i < markerArrIds.length; i++) {
					var vortexObj = t.mapLayerMaps.get(markerArrIds[i]);
					if (vortexObj.mapLayer
							&& vortexObj.geometryType == MapConstants.pelType.POINT) {
						markerArr.push(vortexObj.mapLayer);
					}
				}
			}
			if (markerArr.length > 0) {
				t.addClusters(markerArr);
			}
		}
	},
	// 添加点聚合
	addClusters : function(markerArr) {
	},
	// 删除点聚合
	romoveClusters : function(markerArr) {
		var t = this;
		if (t._cluster != null) {
			// t._cluster.removeMarkers(markerArr);
		}
	},
	// 清除点聚合
	romoveAllClusters : function(markerArr) {
		var t = this;
		if (t._cluster != null) {
			// t._cluster.clearMarkers();
			t._cluster.clearSingles();
		}
	},

	/***************************************************************************
	 * graphic：移动的点 linePath：移动路线 limitTime：移动耗时(s) moveEndCallBack：移动结束回调事件
	 * 
	 * 
	 **************************************************************************/
	vortexMarkerStartMove : function(graphic, linePath, limitTime,
			moveEndCallBack) {
	},
	vortexMarkerStopMove : function(graphic) {
	},
	/*
	 * 路线规划 param:planType: walk,bus,car param:startPoint:{lng:xxxx,lat:xxxx}
	 * param:endPoint:{lng:xxxx,lat:xxxx} ) return {
	 * status:complete,error,no_data, result:[{ routeTime:,//耗时（s）
	 * routeDistance://距离（m） routeSteps:[[lng,lat],[lng1,lat1]] }] }
	 */
	vortexRoutePlan : function(planType, startPoint, endPoint, callBack) {
	},
	// 初始化热力图 data格式：[{lng:,lat:,count:}]
	creatHeatMapOverlay : function(data) {
		var t = this;
		if (null != t.heatmap) {
		} else {
		}
		t.hideHeatMapOverlay();
	},
	// 显示热力图
	showHeatMapOverlay : function() {
		var t = this;
		if (null != t.heatmap) {
		}
	},
	// 隐藏热力图
	hideHeatMapOverlay : function() {
		var t = this;
		if (null != t.heatmap) {
		}
	},
	// 获取当前地图视图范围 return {southWest:{lng,lat},northEast:{lng,lat}}
	getMapExtent : function() {
		var t = this;
		var nowBounds = t.map.extent;
		var obj = {};
		obj.southWest = {
			lng : nowBounds.xmin,
			lat : nowBounds.ymin
		};
		obj.northEast = {
			lng : nowBounds.xmax,
			lat : nowBounds.ymax
		};
		obj.zoom = t.map.getLevel();
		return obj;
	},
	// 指定当前地图显示范围data:{southWest:{lng,lat},northEast:{lng,lat}}
	setMapExtent : function(data) {
		var t = this;
		if (data.southWest && data.northEast) {
			var newExtent = new esri.geometry.Extent(
					parseFloat(data.southWest.lng),
					parseFloat(data.southWest.lat),
					parseFloat(data.northEast.lng),
					parseFloat(data.northEast.lat), new esri.SpatialReference({
						wkid : t.wkid
					}));
			t.map.setExtent(newExtent, true);
		}
	},
	// 绑定监听事件方法
	bind : function(event, callback) {
		var t = this;
		if (event === "mapOnLoad") {
			t.mapOnLoad(callback);
		} else if (event === "clickGraphic") {
			t.clickGraphic(callback);
		} else if (event === "clickMap") {
			t.clickMap(callback);
		} else if (event === "dragMap") {
			t.dragMap(callback);
		} else if (event === "dragMapStart") {
			t.dragMapStart(callback);
		} else if (event === "dragMapEnd") {
			t.dragMapEnd(callback);
		} else if (event === "drawEnd") {
			t.drawEnd(callback);
		} else if (event === "onMouseOverMap") {
			t.onMouseOverMap(callback);
		} else if (event === "graphicVortexChange") {
			t.graphicVortexChange(callback);
		} else if (event === "clickEditGraphic") {
			t.editGraphicClick(callback);
		} else if (event === "editGraphicMoveStart") {
			t.editGraphicMoveStart(callback);
		} else if (event === "editGraphicMoveEnd") {
			t.editGraphicMoveEnd(callback);
		} else if (event === "mouseOutGraphic") {
			t.MouseOutGraphic(callback);
		} else if (event === "mouseOverGraphic") {
			t.MouseOverGraphic(callback);
		} else if (event === "layersAddResult") {
			t.LayersAddResult(callback);
		} else if (event === "onGraphicAdd") {
			t.onGraphicAdd(callback);
		}
	},
	// 执行绑定地图监听事件方法
	onGraphicAdd : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.onGraphicAdd.attach(callback);
		}
	},
	LayersAddResult : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.LayersAddResult.attach(callback);
		}
	},
	clickGraphic : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.clickGraphic.attach(callback);
		}
	},
	clickMap : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.clickMap.attach(callback);
		}
	},
	dragMap : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.dragMap.attach(callback);
		}
	},
	dragMapStart : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.dragMapStart.attach(callback);
		}
	},
	dragMapEnd : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.dragMapEnd.attach(callback);
		}
	},
	mapOnLoad : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.mapOnLoad.attach(callback);
		}
	},
	onMouseOverMap : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.onMouseOverMap.attach(callback);
		}
	},
	drawEnd : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.drawEnd.attach(callback);
		}
	},
	graphicVortexChange : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.graphicVortexChange.attach(callback);
		}
	},
	editGraphicClick : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.editGraphicClick.attach(callback);
		}
	},
	editGraphicMoveStart : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.editGraphicMoveStart.attach(callback);
		}
	},
	editGraphicMoveEnd : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.editGraphicMoveEnd.attach(callback);
		}
	},
	MouseOutGraphic : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.MouseOutGraphic.attach(callback);
		}
	},
	MouseOverGraphic : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			t.events.MouseOverGraphic.attach(callback);
		}
	}
};