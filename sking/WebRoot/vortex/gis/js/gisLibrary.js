function addVortexArcGisMap(urls) {
	urls.push(gisMapConstant.gisJsCssUrlServer + "/Global.js");
	urls.push(gisMapConstant.gisJsCssUrlServer
			+ "/js/dojo/dijit/themes/tundra/tundra.css");
	urls.push(gisMapConstant.gisJsCssUrlServer + "/js/esri/css/esri.css");
	urls.push(gisMapConstant.gisJsCssUrlServer
			+ "/js/dojo/dijit/themes/claro/claro.css");
	urls.push(gisMapConstant.gisJsCssUrlServer + "/init.js");
	urls.push(path + "/vortex/gis/js/arcGisMap/vortexWmtsMapLayers.js");
	urls.push(path + "/vortex/gis/js/arcGisMap/vortexArcGisMap.js");
}
function addVortexAMap(urls) {
	urls
			.push("http://webapi.amap.com/maps?v=1.3&key=3e98a4983d85cbdd1c98ca5b364e0f6d&callback=initVortexMap");
	urls.push(path + "/vortex/gis/js/aMap/vortexAMap2.js");
}
function addVortexBMapBaseJs(urls) {
	urls
			.push("http://api.map.baidu.com/api?v=2.0&ak=EVlFc6DZzAzU5avIjoxNcFgQ&callback=initVortexMap");
}
function addVortexBMapPlugJs(urls) {
	urls
			.push("http://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js");
	urls
			.push("http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js");
	urls
			.push("http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js");
	urls
			.push("http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js");
	urls
			.push("http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js");
	urls
	.push("http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js");
	urls.push(path + "/vortex/gis/js/bMap/vortexBMap.js");
}