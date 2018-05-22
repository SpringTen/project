var _vortexGisConfig = null;
function GisFactory(config) {
	config = config || {};
	GisFactory.defaults = {
		gisType : gisMapConstant.defaultLoadGisType,
		mapDIV : "map",
		layerService : gisMapConstant.defaultMapLayerServices,
		center : gisMapConstant.defaultMapCenter,
		zoom : gisMapConstant.defaultMapZoom,
		gisVersion : gisMapConstant.gisVersion,
		gisInitCallBack : null
	};
	config = $.extend(true, {}, GisFactory.defaults, config);
	this.options = config;
	this.createMap = function(callback) {
		var t = this;
		t.options.gisInitCallBack = callback;
		_vortexGisConfig = t.options;
		if (t.options.gisType == "arcgis") {
			if (t.options.gisVersion == undefined
					|| t.options.gisVersion == null
					|| t.options.gisVersion == "") {
				// t.createArcGis(callback);
				t.createArcGisNew(callback);
			} else {
				t.createArcGisJsVersion(callback);
			}
		} else if (t.options.gisType == "aMap") {
			t.createVortexAMap(callback);
		} else if (t.options.gisType == "bMap") {
			t.createVortexBMap(callback);
		}
	};
	this.createArcGis = function(callback) {
		var t = this;
		var urls = [];
		addArcGisJs(urls);
		var event = new Event();
		event.attach(function() {
			var gis = new ArcGis();
			gis.bind('mapOnLoad', function() {
			});
			gis.bind('layersAddResult', function() {
				if (typeof callback == 'function') {
					callback(gis);
				}
			});
			gis.createMap(t.options.mapDIV);
			gis.addLayer(t.options.layerService);
		});
		ScriptSynchLoaderMgr.synchLoadJsEvent({
			'scripts' : urls,
			'params' : {
				'a' : 100
			},
			'event' : event
		});

	};
	this.createArcGisNew = function(callback) {
		var t = this;
		var urls = [];
		addArcGisJsNew(urls);
		var event = new Event();
		event.attach(function() {
			var gis = new ArcGis();
			if (gisMapConstant.isUseWmtsMapLayer) {// 判断是否使用天地图
				gis.bind('mapOnLoad', function() {
					if (typeof callback == 'function') {
						callback(gis);
					}
				});
			} else {
				gis.bind('layersAddResult', function() {
					if (typeof callback == 'function') {
						callback(gis);
					}
				});
			}
			gis.createMap(t.options.mapDIV);
			if (gisMapConstant.isUseWmtsMapLayer) {
				gis.map.addLayer(new VortexAnnoLayer());
				gis.map.addLayer(new VortexBaseMapLayer());
			} else {
				gis.addLayer(t.options.layerService);
			}
		});
		ScriptSynchLoaderMgr.synchLoadJsEvent({
			'scripts' : urls,
			'params' : {
				'a' : 100
			},
			'event' : event
		});
	};
	this.createArcGisJsVersion = function(callback) {
		var t = this;
		var urls = [];
		addArcGisJsVersionJs(urls, t.options.gisVersion);
		ScriptSynchLoaderMgr.synchLoadJsCallback({
			'scripts' : urls,
			'callback' : function() {
				dojo.addOnLoad(initVortexMap);
			}
		});
	};
	this.createVortexAMap = function(callback) {
		var t = this;
		var urls = [];
		addVortexAMap(urls);
		ScriptSynchLoaderMgr.synchLoadJsCallback({
			'scripts' : urls,
			'callback' : function() {
				if (!isFirstInit) {
					initVortexMap();
				}
			}
		});
	};
	this.createVortexBMap = function(callback) {
		var t = this;
		var urls = [];
		addVortexBMapBaseJs(urls);
		ScriptSynchLoaderMgr.synchLoadJsCallback({
			'scripts' : urls,
			'callback' : function() {
				if (!isFirstInit) {
					initVortexMap();
				}
			}
		});
	};
};
var isFirstInit = true;
function initVortexMap() {
	var _vgis = null;
	if (_vortexGisConfig.gisType == "aMap") {
		isFirstInit = false;
		_vgis = new VortexAMap(_vortexGisConfig);
		_vgis.createMap(_vortexGisConfig.mapDIV);
		if (typeof _vortexGisConfig.gisInitCallBack == 'function') {
			_vortexGisConfig.gisInitCallBack(_vgis);
		}
	} else if (_vortexGisConfig.gisType == "bMap") {
		isFirstInit = false;
		var plugUrls = [];
		addVortexBMapPlugJs(plugUrls);
		ScriptSynchLoaderMgr.synchLoadJsCallback({
			'scripts' : plugUrls,
			'callback' : function() {
				_vgis = new VortexBMap(_vortexGisConfig);
				_vgis.createMap(_vortexGisConfig.mapDIV);
				if (typeof _vortexGisConfig.gisInitCallBack == 'function') {
					_vortexGisConfig.gisInitCallBack(_vgis);
				}
			}
		});
	} else if (_vortexGisConfig.gisType == "arcgis") {
		_vgis = new ArcGis();
		_vgis.createMap(_vortexGisConfig);
		_vgis.isFirstInit = true;
		if (gisMapConstant.isUseWmtsMapLayer) {// 判断是否使用天地图
			dojo.connect(_vgis.map, "onLoad", function(event) {
				if (_vgis.isFirstInit) {
					if (_vortexGisConfig.zoom) {
						_vgis.setZoom(_vortexGisConfig.zoom);
					}
					if (_vortexGisConfig.center
							&& _vortexGisConfig.center.length > 1) {
						_vgis.setCenter(_vortexGisConfig.center[0],
								_vortexGisConfig.center[1]);
					}
					_vgis.isFirstInit = false;
				}
				if (typeof _vortexGisConfig.gisInitCallBack == 'function') {
					_vortexGisConfig.gisInitCallBack(_vgis);
				}
			});
		} else {
			dojo.connect(_vgis.map, "onLayerAddResult", function(event) {
				if (_vgis.isFirstInit) {
					if (_vortexGisConfig.zoom) {
						_vgis.setZoom(_vortexGisConfig.zoom);
					}
					if (_vortexGisConfig.center
							&& _vortexGisConfig.center.length > 1) {
						_vgis.setCenter(_vortexGisConfig.center[0],
								_vortexGisConfig.center[1]);
					}
					_vgis.isFirstInit = false;
				}
				if (typeof _vortexGisConfig.gisInitCallBack == 'function') {
					_vortexGisConfig.gisInitCallBack(_vgis);
				}
			});
		}
		if (gisMapConstant.isUseWmtsMapLayer) {
			_vgis.map.addLayer(new VortexAnnoLayer());
			_vgis.map.addLayer(new VortexBaseMapLayer());
		} else {
			_vgis.addDynamicLayer(_vortexGisConfig.layerService);
		}

	}
}
