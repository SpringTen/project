if (!Array.remove) {
	Array.prototype.remove = function(dx) {
		if (isNaN(dx) || dx > this.length) {
			return false;
		}
		for (var i = 0, n = 0; i < this.length; i++) {
			if (this[i] != this[dx]) {
				this[n++] = this[i];
			}
		}
		this.length -= 1;
	};
}

function VortexAMap(config) {
	config = config || {};
	this.options = config;
	this.map = null;
	this._cluster = null;
	this.repository = [];
	this.mapLayerMaps = null;// 地图上所有图元
	this.mapInfoWindow = null;// 地图上窗体
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
		editGraphicClick : new Event(),// 修改图形时点击图形事件（与不修改图形时的点击图形事件完全分离,需要区分）
		editGraphicMoveStart : new Event(),// 修改图形移动开始事件
		editGraphicMoveEnd : new Event(),// 修改图形时移动图形结束事件
		MouseOutGraphic : new Event(),// 鼠标移出图形
		MouseOverGraphic : new Event(),// 鼠标移动图形上方
		LayersAddResult : new Event(),
		onGraphicAdd : new Event(),
		zoomEnd : new Event()
	// 缩放地图结束时触发事件
	};

	function getAttributes(id, t) {
		for (var i = 0; i < t.repository.length; i++) {
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
VortexAMap.prototype = {
	/***************************************************************************
	 * 创建地图 mapDIV:地图divid
	 **************************************************************************/
	createMap : function(mapDIV) {
		var t = this;
		var position = new AMap.LngLat(parseFloat(t.options.center[0]),
				parseFloat(t.options.center[1]));
		t.map = new AMap.Map(mapDIV, {
			view : new AMap.View2D({// 创建地图二维视口
				center : position,// 创建中心点坐标
				zoom : parseInt(t.options.zoom, 10),// 设置地图缩放级别
				rotation : 0
			// 设置地图旋转角度
			}),
			resizeEnable : true,
			lang : "zh_cn"// 设置地图语言类型,默认：中文简体
		});
		if (t.options.satelliteSwitch) {
			t.map.plugin([ "AMap.MapType" ], function() {
				// 地图类型切换
				var type = new AMap.MapType({
					defaultType : 0,
					showTraffic : false,
					showRoad : true
				// 使用2D地图
				});
				t.map.addControl(type);
			});
		}
		// 地图加载完成事件
		t.map.on('complete', function() {
			t.events.mapOnLoad.sender = t.map;
			t.events.mapOnLoad.notify();
		});
		// 点击地图事件
		t.map.on('click', function(event) {
			t.map.eventX = event.lnglat.getLng();
			t.map.eventY = event.lnglat.getLat();
			t.events.clickMap.sender = t.map;
			t.events.clickMap.notify(event);
		});
		// 拖动地图事件
		t.map.on('dragging', function() {
			t.events.dragMap.sender = t.map;
			t.events.dragMap.notify();
		});
		// 拖动地图开始事件
		t.map.on('dragstart', function(event) {
			t.events.dragMapStart.sender = t.map;
			t.events.dragMapStart.notify(event);
		});
		// 拖动地图结束事件
		t.map.on('dragend', function(event) {
			t.events.dragMapEnd.sender = t.map;
			t.events.dragMapEnd.notify(event);
		});
		// 当鼠标在地图上事件
		t.map.on('mouseover', function(event) {
			t.events.onMouseOverMap.sender = t.map;
			t.events.onMouseOverMap.notify(event);
		});
		// 缩放地图结束时触发事件
		t.map.on('zoomend', function() {
			t.events.zoomEnd.sender = t.map;
			t.events.zoomEnd.notify();
		});

		// 初始化地图图元Map
		t.mapLayerMaps = MapUtil.getInstance();
	},
	/***************************************************************************
	 * 添加弹出框方法 src:通过 getGraphic获取的对象, title:气泡标题, content：气泡内容
	 * 
	 **************************************************************************/
	openInfoWindow : function(src, title, content, config) {
		var t = this;
		t.closeInfoWindow();
		var infoLngLat;
		switch (src.geometryType) {
		case MapConstants.pelType.POINT:
			infoLngLat = [ parseFloat(src.attributes.longitude),
					parseFloat(src.attributes.latitude) ];
			break;
		case MapConstants.pelType.LINE:
		case MapConstants.pelType.RECTANGLE:
		case MapConstants.pelType.POLYGON:
			var points = src.mapLayer.getPath();
			var index = Math.ceil(points.length / 2);
			var infoPoint = points[index];
			infoLngLat = [ parseFloat(infoPoint.getLng()),
					parseFloat(infoPoint.getLat()) ];
			break;
		default:
			break;
		}
		var offset;
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
		if (tipOptions && typeof tipOptions.infowindowOffsetX != "undefined"
				&& typeof tipOptions.infowindowOffsetY != "undefined") {
			offset = new AMap.Pixel(tipOptions.infowindowOffsetX,
					tipOptions.infowindowOffsetY);
		} else {
			// 默认
			offset = new AMap.Pixel(0, -30);
		}

		var vortexInfoWindow = new AMap.InfoWindow({
			isCustom : true, // 使用自定义窗体
			autoMove : true,// 是否自动调整窗体到视野内
			content : t.createInfoWindow(title, content),
			offset : offset
		});
		vortexInfoWindow.open(t.map, infoLngLat);
		this.mapInfoWindow = vortexInfoWindow;
	},
	openInfoWindowByCustom : function(config) {
		var t = this;
		t.closeInfoWindow();
		if (typeof config.longitude == "string") {
			config.longitude = parseFloat(config.longitude);
		}
		if (typeof config.latitude == "string") {
			config.latitude = parseFloat(config.latitude);
		}
		var infoLngLat = [ parseFloat(config.longitude),
				parseFloat(config.latitude) ];

		var offset;
		var tipOptions = $.extend({}, config, t.options);
		if (typeof tipOptions.infowindowOffsetX != "undefined"
				&& typeof tipOptions.infowindowOffsetY != "undefined") {
			offset = new AMap.Pixel(tipOptions.infowindowOffsetX,
					tipOptions.infowindowOffsetY);
		} else {
			// 默认
			offset = new AMap.Pixel(0, -30);
		}
		var vortexInfoWindow = new AMap.InfoWindow({
			isCustom : true, // 使用自定义窗体
			autoMove : true,// 是否自动调整窗体到视野内
			content : t.createInfoWindow(tipOptions.title, tipOptions.content),
			offset : offset
		// 使用默认信息窗体框样式,显示信息内容
		});
		vortexInfoWindow.open(t.map, infoLngLat);
		this.mapInfoWindow = vortexInfoWindow;
	},
	/***************************************************************************
	 * 关闭所有气泡
	 * 
	 **************************************************************************/
	closeInfoWindow : function() {
		this.map.clearInfoWindow();
	},
	/***************************************************************************
	 * 改变气泡大小方法(参数缺失,不可使用！！)
	 * 
	 **************************************************************************/
	resizeInfoWindow : function(width, height) {
		// this.map.infoWindow.resize(width, height);
	},
	// 内部方法，气泡样式
	createInfoWindow : function(title, content) {
		var info = document.createElement("div");
		info.className = "info";
		// 可以通过下面的方式修改自定义窗体的宽高

		// 定义顶部标题
		var top = document.createElement("div");
		var titleD = document.createElement("div");
		top.className = "info-top";
		titleD.innerHTML = title;

		top.appendChild(titleD);
		info.appendChild(top);

		// 定义中部内容
		var middle = document.createElement("div");
		middle.className = "info-middle";
		middle.style.backgroundColor = 'white';
		middle.style.font = "12px Microsoft Yahei";
		middle.innerHTML = content;
		info.appendChild(middle);

		// 定义底部内容
		// var bottom = document.createElement("div");
		// bottom.className = "info-bottom";
		// bottom.style.position = 'relative';
		// bottom.style.top = '0px';
		// bottom.style.margin = '0 auto';
		// var sharp = document.createElement("img");
		// sharp.src = "http://webapi.amap.com/images/sharp.png";
		// bottom.appendChild(sharp);
		// info.appendChild(bottom);
		return info;
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
				for (var i = 0; i < lnglatAtrr.length; i++) {
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
	/***************************************************************************
	 * 加点data:{ longitude :"", latitude : "", infoWindow:true/false, url:"" }
	 * 
	 **************************************************************************/
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
		var markerIcon = new AMap.Icon({
			image : markerIconUrl
		});
		if (options.width && options.height) {
			markerIcon
					.setImageSize(new AMap.Size(options.width, options.height));
		}
		// 添加至地图
		var vortexMarker = new AMap.Marker({
			icon : markerIcon,
			position : [ data.longitude, data.latitude ],
			clickable : true
		});

		// 添加label
		if (data.canShowLabel && options.labelContent) {
			var labelOptions = {};
			labelOptions.content = "<div class=\"label-content\">"
					+ options.labelContent + "</div>";
			// label偏移量(由于用css修正，X偏转为标注起点向右偏转)
			if (typeof options.labelPixelX != "undefined"
					&& typeof options.labelPixelY != "undefined") {
				labelOptions.offset = new AMap.Pixel(options.labelPixelX,
						options.labelPixelY);
			} else {
				// 设置默认
				labelOptions.offset = new AMap.Pixel(12, 35);
			}
			// label的父div默认蓝框白底右下角显示，样式className为：amap-marker-label
			vortexMarker.setLabel(labelOptions);
		}

		vortexMarker.setMap(t.map);

		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.POINT,
			attributes : data,
			mapLayer : vortexMarker
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 点击图形事件
		vortexMarker.on('click', function(event) {
			// 关闭气泡
			t.closeInfoWindow();
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.events.clickGraphic.sender = vortexObj;
			t.events.clickGraphic.notify(event);
		});
		// 鼠标移出图形
		vortexMarker.on('mouseout', function(event) {
			t.events.MouseOutGraphic.sender = vortexObj;
			t.events.MouseOutGraphic.notify(event);
		});
		// 鼠标移动图形上方
		vortexMarker.on('mouseover', function(event) {
			t.events.MouseOverGraphic.sender = vortexObj;
			t.events.MouseOverGraphic.notify(event);
		});
	},
	/*
	 * 添加线方法
	 */
	addLine : function(data) {
		var t = this;
		if (data.paths.length > 0) {
			for (var i = 0; i < data.paths.length; i++) {
				var oneLine = data.paths[i];
				for (var j = 0; j < oneLine.length; j++) {
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
		// 添加至地图
		var vortexLine = new AMap.Polyline({
			// 设置线覆盖物路径
			path : data.paths[0],
			// 线样式
			strokeStyle : options.lineType,
			// 线颜色
			strokeColor : options.lineColor,
			// 线宽
			strokeWeight : options.lineWidth,
			// 线透明度，取值范围0~1
			strokeOpacity : options.linePellucidity
		});
		vortexLine.setMap(t.map);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.LINE,
			attributes : data,
			mapLayer : vortexLine
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 点击图形事件
		vortexLine.on('click', function(event) {
			// 关闭气泡
			t.closeInfoWindow();
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.events.clickGraphic.sender = vortexObj;
			t.events.clickGraphic.notify(event);
		});
		// 鼠标移出图形
		vortexLine.on('mouseout', function(event) {
			t.events.MouseOutGraphic.sender = vortexObj;
			t.events.MouseOutGraphic.notify(event);
		});
		// 鼠标移动图形上方
		vortexLine.on('mouseover', function(event) {
			t.events.MouseOverGraphic.sender = vortexObj;
			t.events.MouseOverGraphic.notify(event);
		});
	},
	/*
	 * 添加多边形方法
	 */
	addPolygon : function(data) {
		var t = this;
		if (data.rings.length > 0) {
			for (var i = 0; i < data.rings.length; i++) {
				var oneLine = data.rings[i];
				for (var j = 0; j < oneLine.length; j++) {
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
		// 添加至地图
		var vortexPolygon = new AMap.Polygon({
			// 设置多边形边界路径
			path : data.rings[0],
			// 线样式
			strokeStyle : options.lineType,
			// 线颜色
			strokeColor : options.lineColor,
			// 线宽
			strokeWeight : options.lineWidth,
			// 线透明度，取值范围0~1
			strokeOpacity : options.linePellucidity,
			// 填充色
			fillColor : options.fillColor,
			// 填充透明度，取值范围0~1
			fillOpacity : options.fillPellucidity
		});
		vortexPolygon.setMap(t.map);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.POLYGON,
			attributes : data,
			mapLayer : vortexPolygon
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 点击图形事件
		vortexPolygon.on('click', function(event) {
			// 关闭气泡
			t.closeInfoWindow();
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.events.clickGraphic.sender = vortexObj;
			t.events.clickGraphic.notify(event);
		});
		// 鼠标移出图形
		vortexPolygon.on('mouseout', function(event) {
			t.events.MouseOutGraphic.sender = vortexObj;
			t.events.MouseOutGraphic.notify(event);
		});
		// 鼠标移动图形上方
		vortexPolygon.on('mouseover', function(event) {
			t.events.MouseOverGraphic.sender = vortexObj;
			t.events.MouseOverGraphic.notify(event);
		});
	},
	/*
	 * 添加矩形方法
	 */
	addRectangle : function(data) {
		var t = this;
		if (data.rings.length > 0) {
			for (var i = 0; i < data.rings.length; i++) {
				var oneLine = data.rings[i];
				for (var j = 0; j < oneLine.length; j++) {
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
		// 添加至地图
		var vortexRectangle = new AMap.Polygon({
			// 设置多边形边界路径
			path : data.rings[0],
			// 线样式
			strokeStyle : options.lineType,
			// 线颜色
			strokeColor : options.lineColor,
			// 线宽
			strokeWeight : options.lineWidth,
			// 线透明度，取值范围0~1
			strokeOpacity : options.linePellucidity,
			// 填充色
			fillColor : options.fillColor,
			// 填充透明度，取值范围0~1
			fillOpacity : options.fillPellucidity
		});
		vortexRectangle.setMap(t.map);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.RECTANGLE,
			attributes : data,
			mapLayer : vortexRectangle
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 点击图形事件
		vortexRectangle.on('click', function(event) {
			// 关闭气泡
			t.closeInfoWindow();
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.events.clickGraphic.sender = vortexObj;
			t.events.clickGraphic.notify(event);
		});
		// 鼠标移出图形
		vortexRectangle.on('mouseout', function(event) {
			t.events.MouseOutGraphic.sender = vortexObj;
			t.events.MouseOutGraphic.notify(event);
		});
		// 鼠标移动图形上方
		vortexRectangle.on('mouseover', function(event) {
			t.events.MouseOverGraphic.sender = vortexObj;
			t.events.MouseOverGraphic.notify(event);
		});
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
		// 添加至地图
		var vortexCircle = new AMap.Circle({
			center : new AMap.LngLat(data.longitude, data.latitude),
			radius : data.radius,
			// 线样式
			strokeStyle : options.lineType,
			// 线颜色
			strokeColor : options.lineColor,
			// 线宽
			strokeWeight : options.lineWidth,
			// 线透明度，取值范围0~1
			strokeOpacity : options.linePellucidity,
			// 填充色
			fillColor : options.fillColor,
			// 填充透明度，取值范围0~1
			fillOpacity : options.fillPellucidity
		});
		vortexCircle.setMap(t.map);
		// 封装对象,缓存
		var vortexObj = {
			geometryType : MapConstants.pelType.CIRCLE,
			attributes : data,
			mapLayer : vortexCircle
		};
		if (data.id) {
			t.mapLayerMaps.add(data.id, vortexObj);
		}
		// 点击图形事件
		vortexCircle.on('click', function(event) {
			// 关闭气泡
			t.closeInfoWindow();
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);
			t.events.clickGraphic.sender = vortexObj;
			t.events.clickGraphic.notify(event);
		});
		// 鼠标移出图形
		vortexCircle.on('mouseout', function(event) {
			t.events.MouseOutGraphic.sender = vortexObj;
			t.events.MouseOutGraphic.notify(event);
		});
		// 鼠标移动图形上方
		vortexCircle.on('mouseover', function(event) {
			t.events.MouseOverGraphic.sender = vortexObj;
			t.events.MouseOverGraphic.notify(event);
		});

	},
	// 获取线的类型
	getLineType : function(type) {
		if (type == MapConstants.lineType.LINE_DASHED) {
			return "dashed";
		} else if (type == MapConstants.lineType.LINE_SOLID) {
			return "solid";
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
		var vortexPolyline = {
			strokeColor : dlineStyle.lineColor,
			strokeWeight : dlineStyle.lineWidth,
			strokeOpacity : dlineStyle.linePellucidity
		};
		var vortexPolygon = {
			strokeColor : dPolygonStyle.lineColor,
			strokeWeight : dPolygonStyle.lineWidth,
			strokeOpacity : dPolygonStyle.linePellucidity,
			fillColor : dPolygonStyle.fillColor
		};
		var vortexRectangle = {
			strokeColor : dRectangleStyle.lineColor,
			strokeWeight : dRectangleStyle.lineWidth,
			strokeOpacity : dRectangleStyle.linePellucidity,
			fillColor : dRectangleStyle.fillColor
		};
		var vortexCircle = {
			strokeColor : dCircleStyle.lineColor,
			strokeWeight : dCircleStyle.lineWidth,
			strokeOpacity : dCircleStyle.linePellucidity,
			fillColor : dCircleStyle.fillColor
		};
		var mouseTool;
		// 在地图中添加MouseTool插件
		t.map.plugin([ "AMap.MouseTool" ], function() {
			mouseTool = new AMap.MouseTool(t.map);
			switch (geometryType) {
			case MapConstants.pelType.LINE:
				mouseTool.polyline(vortexPolyline);
				break;
			case MapConstants.pelType.POLYGON:
				mouseTool.polygon(vortexPolygon);
				break;
			case MapConstants.pelType.RECTANGLE:
				mouseTool.rectangle(vortexRectangle);
				break;
			case MapConstants.pelType.CIRCLE:
				mouseTool.circle(vortexCircle);
				break;
			default:
				break;
			}
		});
		AMap.event.addListener(mouseTool, "draw", function(event) {
			// 封装对象,缓存
			var vortexObj = {
				geometryType : geometryType,
				attributes : data,
				mapLayer : event.obj
			};
			// 设置其它信息
			vortexObj = t.setVortexObjOtherValue(vortexObj);

			t.mapLayerMaps.add(data.id, vortexObj);
			// 关闭绘图
			mouseTool.close(false);
			// 绘制图形结束事件
			t.events.drawEnd.sender = vortexObj;
			t.events.drawEnd.notify(event);
			// 点击图形事件
			vortexObj.mapLayer.on('click', function(event) {
				t.events.clickGraphic.sender = vortexObj;
				t.events.clickGraphic.notify(event);
			});
		});
	},
	// 修改制定图形方法
	doEdit : function(src) {
		var t = this;
		if (src.geometryType == MapConstants.pelType.POINT) {
			src.mapLayer.setDraggable(true);
		} else {
			var editToolbar;
			switch (src.geometryType) {
			case MapConstants.pelType.LINE:
			case MapConstants.pelType.RECTANGLE:
			case MapConstants.pelType.POLYGON:
				// 添加编辑控件
				t.map.plugin([ "AMap.PolyEditor" ], function() {
					editToolbar = new AMap.PolyEditor(t.map, src.mapLayer);
				});
				break;
			case MapConstants.pelType.CIRCLE:// 添加编辑控件
				t.map.plugin([ "AMap.CircleEditor" ], function() {
					editToolbar = new AMap.CircleEditor(t.map, src.mapLayer);
				});
				break;
			default:
				break;
			}
			// 修改图形某点发生改变事件（修改线,面）
			AMap.event.addListener(editToolbar, "adjust", function(event) {
				// 封装对象,缓存
				var vortexObj = {
					geometryType : src.geometryType,
					attributes : src.attributes,
					mapLayer : event.target
				};
				// 设置其它信息
				vortexObj = t.setVortexObjOtherValue(vortexObj);
				t.events.graphicVortexChange.sender = vortexObj;
				t.events.graphicVortexChange.notify(event);
			});
			// 开启编辑
			editToolbar.open();
		}

	},
	// 设置其他信息
	setVortexObjOtherValue : function(vortexObj) {
		var vortexMapLayer = vortexObj.mapLayer;
		var lnglatArray = new Array();
		var xmax, xmin, ymax, ymin = null;
		switch (vortexObj.geometryType) {
		case MapConstants.pelType.POINT:
			var markerPosition = vortexMapLayer.getPosition();
			lnglatArray
					.push([ markerPosition.getLng(), markerPosition.getLat() ]);
			xmax = markerPosition.getLng();
			xmin = markerPosition.getLng();
			ymax = markerPosition.getLat();
			ymin = markerPosition.getLat();
			break;
		case MapConstants.pelType.LINE:
		case MapConstants.pelType.RECTANGLE:
		case MapConstants.pelType.POLYGON:
			var allPaths = vortexMapLayer.getPath();
			for (var i = 0; i < allPaths.length; i++) {
				lnglatArray
						.push([ allPaths[i].getLng(), allPaths[i].getLat() ]);
			}
			var layerBounds = vortexMapLayer.getBounds();
			if (layerBounds != null) {
				var southWestLngLat = layerBounds.getSouthWest();
				var northEastLngLat = layerBounds.getNorthEast();
				xmax = northEastLngLat.getLng();
				xmin = southWestLngLat.getLng();
				ymax = northEastLngLat.getLat();
				ymin = southWestLngLat.getLat();
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
				var fitLayers = new Array();
				for (var i = 0; i < ids.length; i++) {
					if (t.getGraphic(ids[i]) != null
							&& t.getGraphic(ids[i]).mapLayer != null) {
						var oneLayer = t.getGraphic(ids[i]).mapLayer;
						fitLayers.push(oneLayer);
					}
				}
				if (fitLayers.length > 0) {
					t.map.setFitView(fitLayers);
				}
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
			// 先清除聚合
			if (t._cluster != null
					&& graphic.geometryType == MapConstants.pelType.POINT) {
				t._cluster.removeMarker(graphic.mapLayer);
			}
			graphic.mapLayer.setMap(null);
			removeItem = graphic.mapLayer;
		} else {
			graphic.setMap(null);
			removeItem = graphic;
		}
		var keyArray = t.mapLayerMaps.getAllKey();
		for (var i = 0; i < keyArray.length; i++) {
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
		this.map.setCenter(new AMap.LngLat(x, y));
	},
	/*
	 * 获取当前地图中心点
	 */
	getNowCenter : function() {
		var _mapCenter = this.map.getCenter();
		return [ _mapCenter.getLng(), _mapCenter.getLat() ];
	},
	// 清空地图上所有图形方法
	clear : function() {
		var t = this;
		if (t._cluster != null) {
			t._cluster.clearMarkers();
		}
		t.mapLayerMaps.clear();
		t.map.clearMap();
	},
	// 设定地图缩放比方法
	setZoom : function(zoom) {
		this.map.setZoom(zoom);
	},
	getZoom : function() {
		return this.map.getZoom();
	},
	// 设定地图大小(无此方法)
	resize : function() {
	},
	/*
	 * 设定鼠标图案
	 */
	setCursor : function(url) {
		if (url) {
			this.map.setCursor("url('" + url + "'),pointer");
		} else {
			this.map.setCursor("pointer");
		}
	},
	/*
	 * 获得当前比例尺
	 */
	getScale : function() {
		return this.map.getScale();
	},
	/*
	 * 计算面积
	 */
	calculateArea : function(graphic) {
		var totalArea = 0;
		if (graphic.mapLayer) {
			totalArea = graphic.mapLayer.getArea();
		} else {
			totalArea = graphic.getArea();
		}
		return parseFloat(totalArea.toFixed(2));
	},
	/*
	 * 计算线距离
	 */
	calculateDistance : function(data) {
		var t = this;
		var totalDistance = 0;
		if (data.length > 0) {
			for (var x = 0; x < data.length - 1; x++) {
				var firstPoint = new AMap.LngLat(data[x][0], data[x][1]);
				var secondPoint = new AMap.LngLat(data[x + 1][0],
						data[x + 1][1]);
				totalDistance = totalDistance
						+ firstPoint.distance(secondPoint);
			}
		}
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
		var pixel = t.map.lnglatToPixel(new AMap.LngLat(lng, lat));
		return [ pixel.getX(), pixel.getY() ];

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
		var lnglat = t.map.pixelToLngLat(new AMap.Pixel(x, y));
		return [ lnglat.getLng(), lnglat.getLat() ];
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
			for (var i = 0; i < mapLayerKeys.length; i++) {
				var vortexObj = t.mapLayerMaps.get(mapLayerKeys[i]);
				if (vortexObj.geometryType == MapConstants.pelType.POINT) {
					markerArrIds.push(mapLayerKeys[i]);
				}
			}
		}
		if (Object.prototype.toString.call(markerArrIds) === '[object Array]') {
			if (markerArrIds != null && markerArrIds.length > 0) {
				for (var i = 0; i < markerArrIds.length; i++) {
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
		var t = this;
		if (t._cluster == null) {
			t.map.plugin([ "AMap.MarkerClusterer" ], function() {
				t._cluster = new AMap.MarkerClusterer(t.map, markerArr, {
					maxZoom : 17
				});
			});
		} else {
			t._cluster.clearMarkers();
			t._cluster.addMarkers(markerArr);
		}
	},
	// 删除点聚合
	romoveClusters : function(markerArr) {
		var t = this;
		if (t._cluster != null) {
			t._cluster.removeMarkers(markerArr);
		}
	},
	// 清除点聚合
	romoveAllClusters : function(markerArr) {
		var t = this;
		if (t._cluster != null) {
			t._cluster.clearMarkers();
		}
	},
	/***************************************************************************
	 * graphic：移动的点 linePath：移动路线 limitTime：移动耗时(s) moveEndCallBack：移动结束回调事件
	 * 
	 * 
	 **************************************************************************/
	vortexMarkerStartMove : function(graphic, linePath, limitTime,
			moveEndCallBack) {
		var moveMarker = null;
		if (graphic.mapLayer) {
			moveMarker = graphic.mapLayer;
		} else {
			moveMarker = graphic;
		}
		if (limitTime != null && limitTime != "") {
			if (typeof limitTime == "string") {
				limitTime = parseFloat(limitTime);
			}
			if (moveMarker
					&& linePath
					&& limitTime
					&& Object.prototype.toString.call(linePath) === '[object Array]') {
				if (linePath.length > 1) {
					var lineDistance = new Array();
					var lineArr = new Array();
					for (var i = 0; i < linePath.length; i++) {
						var onePoint = linePath[i];
						var lng = onePoint[0];
						var lat = onePoint[1];
						if (typeof lng == "string") {
							lng = parseFloat(lng);
						}
						if (typeof lat == "string") {
							lat = parseFloat(lat);
						}
						lineArr.push(new AMap.LngLat(lng, lat));
						lineDistance.push(new AMap.LngLat(lng, lat));
					}
					var lineSpeed = (t.calculateDistance(lineDistance) / limitTime) * 3.6;

					t.vortexMarkerStopMove();

					moveMarker.moveAlong(lineArr, Math.ceil(lineSpeed));

					if (typeof moveEndCallBack == 'function') {
						// 移动结束事件
						moveMarker.on('movealong', function() {
							moveEndCallBack();
						});
					}
				}
			}
		}
	},
	vortexMarkerStopMove : function(graphic) {
		var moveMarker = null;
		if (graphic.mapLayer) {
			moveMarker = graphic.mapLayer;
		} else {
			moveMarker = graphic;
		}
		if (moveMarker) {
			moveMarker.stopMove();
		}
	},
	/*
	 * 路线规划 param:planType: walk,bus,car param:startPoint:{lng:xxxx,lat:xxxx}
	 * param:endPoint:{lng:xxxx,lat:xxxx} ) return {
	 * status:complete,error,no_data, result:[{ routeTime:,//耗时（s）
	 * routeDistance://距离（m） routeSteps:[[lng,lat],[lng1,lat1]] }] }
	 */
	vortexRoutePlan : function(planType, startPoint, endPoint, callBack) {
		var route_search = null;
		switch (planType) {
		case "walk":
			AMap
					.service(
							'AMap.Walking',
							function() {// 回调函数
								// 实例化Walking
								route_search = new AMap.Walking();
								// 根据起、终点坐标查询路线
								route_search
										.search(
												[ startPoint.lng,
														startPoint.lat ],
												[ endPoint.lng, endPoint.lat ],
												function(status, result) {
													if (typeof callBack == 'function') {
														var vortexResult = new Array();
														if (status == 'complete') {
															if (result) {
																if (result.routes.length > 0) {
																	for (var i = 0; i < result.routes.length; i++) {
																		var oneRoute = result.routes[i];
																		var oneVortexRoute = {
																			routeTime : oneRoute.time,
																			routeDistance : oneRoute.distance
																		};
																		var oneRouteLngLat = new Array();

																		if (oneRoute.steps.length) {
																			for (var x = 0; x < oneRoute.steps.length; x++) {
																				var oneStep = oneRoute.steps[x];
																				for (var y = 0; y < oneStep.path.length; y++) {
																					var oneStepPath = oneStep.path[y];
																					oneRouteLngLat
																							.push([
																									oneStepPath
																											.getLng(),
																									oneStepPath
																											.getLat() ]);
																				}
																			}
																		}

																		oneVortexRoute.routeSteps = oneRouteLngLat;
																		vortexResult
																				.push(oneVortexRoute);
																	}
																}
															}
														}
														// 查询结果返回
														callBack(status,
																vortexResult);
													}
												});
							})
			break;
		case "bus":
			AMap
					.service(
							'AMap.Transfer',
							function() {// 回调函数
								// 实例化Transfer
								route_search = new AMap.Transfer();
								// 根据起、终点坐标查询路线
								route_search
										.search(
												[ startPoint.lng,
														startPoint.lat ],
												[ endPoint.lng, endPoint.lat ],
												function(status, result) {
													if (typeof callBack == 'function') {
														var vortexResult = new Array();
														if (status == 'complete') {
															if (result) {
																if (result.plans.length > 0) {
																	for (var i = 0; i < result.plans.length; i++) {
																		var oneRoute = result.plans[i];
																		var oneVortexRoute = {
																			routeTime : oneRoute.time,
																			routeDistance : oneRoute.distance
																		};
																		var oneRouteLngLat = new Array();

																		if (oneRoute.path.length) {
																			for (var x = 0; x < oneRoute.path.length; x++) {
																				var oneStep = oneRoute.path[x];
																				oneRouteLngLat
																						.push([
																								oneStep
																										.getLng(),
																								oneStep
																										.getLat() ]);
																			}
																		}

																		oneVortexRoute.routeSteps = oneRouteLngLat;
																		vortexResult
																				.push(oneVortexRoute);
																	}
																}
															}
														}
														// 查询结果返回
														callBack(status,
																vortexResult);
													}
												});
							})
			break;
		case "car":
			AMap
					.service(
							'AMap.Driving',
							function() {// 回调函数
								// 实例化Driving
								route_search = new AMap.Driving();
								// 根据起、终点坐标查询路线
								route_search
										.search(
												[ startPoint.lng,
														startPoint.lat ],
												[ endPoint.lng, endPoint.lat ],
												function(status, result) {
													if (typeof callBack == 'function') {
														var vortexResult = new Array();
														if (status == 'complete') {
															if (result) {
																if (result.routes.length > 0) {
																	for (var i = 0; i < result.routes.length; i++) {
																		var oneRoute = result.routes[i];
																		var oneVortexRoute = {
																			routeTime : oneRoute.time,
																			routeDistance : oneRoute.distance
																		};
																		var oneRouteLngLat = new Array();

																		if (oneRoute.steps.length) {
																			for (var x = 0; x < oneRoute.steps.length; x++) {
																				var oneStep = oneRoute.steps[x];
																				for (var y = 0; y < oneStep.path.length; y++) {
																					var oneStepPath = oneStep.path[y];
																					oneRouteLngLat
																							.push([
																									oneStepPath
																											.getLng(),
																									oneStepPath
																											.getLat() ]);
																				}
																			}
																		}

																		oneVortexRoute.routeSteps = oneRouteLngLat;
																		vortexResult
																				.push(oneVortexRoute);
																	}
																}
															}
														}
														// 查询结果返回
														callBack(status,
																vortexResult);
													}
												});
							})
			break;
		default:
			break;
		}
	},
	// 初始化热力图 data格式：[{lng:,lat:,count:}]
	creatHeatMapOverlay : function(data) {
		var t = this;
		if (null != t.heatmap) {
			t.heatmap.setDataSet({
				data : data,
				max : 100
			});
		} else {
			t.map.plugin([ "AMap.Heatmap" ], function() {
				// 初始化heatmap对象
				t.heatmap = new AMap.Heatmap(t.map, {
					radius : 25, // 给定半径
					opacity : [ 0, 0.8 ]
				});
				t.heatmap.setDataSet({
					data : data,
					max : 100
				});
			});
		}
		t.hideHeatMapOverlay();
	},
	// 显示热力图
	showHeatMapOverlay : function() {
		var t = this;
		if (null != t.heatmap) {
			t.heatmap.show();
		}
	},
	// 隐藏热力图
	hideHeatMapOverlay : function() {
		var t = this;
		if (null != t.heatmap) {
			t.heatmap.hide();
		}
	},
	// 获取当前地图视图范围 return {southWest:{lng,lat},northEast:{lng,lat},zoom:}
	getMapExtent : function() {
		var t = this;
		var nowBounds = t.map.getBounds();
		var obj = {};
		obj.southWest = {
			lng : nowBounds.getSouthWest().getLng(),
			lat : nowBounds.getSouthWest().getLat()
		};
		obj.northEast = {
			lng : nowBounds.getNorthEast().getLng(),
			lat : nowBounds.getNorthEast().getLat()
		};
		obj.zoom = t.map.getZoom();
		return obj;
	},
	// 指定当前地图显示范围data:{southWest:{lng,lat},northEast:{lng,lat},zoom:}
	setMapExtent : function(data) {
		var t = this;
		if (data.southWest && data.northEast) {
			var userBounds = new AMap.Bounds(new AMap.LngLat(
					parseFloat(data.southWest.lng),
					parseFloat(data.southWest.lat)), new AMap.LngLat(
					parseFloat(data.northEast.lng),
					parseFloat(data.northEast.lat)));
			t.map.setBounds(userBounds);
		}
	},
	getLocalCityInfo : function(callback) {
		var t = this;
		if (typeof callback == 'function') {
			AMap.service('AMap.CitySearch', function() {// 回调函数
				var _vCitySearch = new AMap.CitySearch();
				_vCitySearch.getLocalCity(function(status, result) {
					var vortexResult = {
						city : "",
						lnglat : []
					};
					if (status == 'complete') {
						var _mapBond = result.bounds;
						vortexResult.city = result.city;
						vortexResult.lnglat = [ _mapBond.getLng(),
								_mapBond.getLat() ];
					}
					// 查询结果返回
					callback(status, vortexResult);
				});
			})
		}
	},
	// 根据地图经纬度获取地理信息
	getLocationByLngLat : function(lng, lat, callback) {
		var t = this;
		var _lng = lng;
		var _lat = lat;
		if (_lng == null || _lat == null) {
			return;
		}
		if (_lng == "" || _lat == "") {
			return;
		}
		if (typeof _lng == "string") {
			_lng = parseFloat(_lng);
		}
		if (typeof _lat == "string") {
			_lat = parseFloat(_lat);
		}
		AMap
				.service(
						'AMap.Geocoder',
						function() {// 回调函数
							// 逆地址解析
							var _vGeocoder = new AMap.Geocoder();
							_vGeocoder
									.getAddress(
											new AMap.LngLat(_lng, _lat),
											function(status, result) {
												if (typeof callback == 'function') {
													var vortexResult = {
														// 所在省
														province : "",
														// 所在城市
														city : "",
														// 所在区
														district : "",
														// 所在乡镇
														township : "",
														// 所在街道
														street : "",
														// 门牌号
														streetNumber : "",
														// 所在社区
														neighborhood : "",
														// 格式化地址
														formattedAddress : ""
													};
													if (status == 'complete') {
														var _vregeocode = result.regeocode;
														var _vaddressComponent = _vregeocode.addressComponent;
														vortexResult.province = _vaddressComponent.province;
														vortexResult.city = _vaddressComponent.city;
														vortexResult.district = _vaddressComponent.district;
														vortexResult.township = _vaddressComponent.township;
														vortexResult.street = _vaddressComponent.street;
														vortexResult.streetNumber = _vaddressComponent.streetNumber;
														vortexResult.neighborhood = _vaddressComponent.neighborhood;
														vortexResult.formattedAddress = _vregeocode.formattedAddress;
													}
													callback(status,
															vortexResult);
												}
											});
						})

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
