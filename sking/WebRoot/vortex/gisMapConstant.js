/*
建议所有在使用经纬度时，都将值设置为float，不要使用string，避免出现问题
 */
var gisMapConstant = {
	isUseWmtsMapLayer : false, // 是否使用天地图(瓦片，切层)
	defaultGisWkid : 4326,// 坐标系
	defaultMapLayerServices : "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer",// 默认图层
	defaultLoadGisType : 'bMap',// arcgis,aMap,bMap
//	defaultMapLng : "116.483917",
//	defaultMapLat : "39.929221",
	defaultMapCenter : [ 116.468021, 39.890092 ],// 北京市
	defaultMapZoom : "10",
//	defaultMapCityName : "北京朝阳",
	gisJsCssUrlServer : 'http://192.168.1.23:8888/vortex/arcgis',
	defaultMapLng : "120.607435",
	defaultMapLat : "31.311724",
	defaultMapCityName : "苏州",
	satelliteSwitch : false,
	defaultMapCenter : [ 120.607435,31.311724 ],// 苏州
	getDefaultMapCenter: function (callback){
		$.ajax({
			url : path + "/cloud/login/logininfo.sa",
			type: "post",
			dataType : "json",
			async: false,
			success: function (data){
				if(data.latitude && data.longitude){
					gisMapConstant.defaultMapCenter = [data.longitude, data.latitude];
					gisMapConstant.defaultMapLng = data.longitude;
					gisMapConstant.defaultMapLat = data.latitude;
				}
				if(data.longitudeDone && data.latitudeDone) {
					const pos = [parseFloat(data.longitudeDone), parseFloat(data.latitudeDone)];
					callback(pos);
				}
			}
		});
	}
// 卫星地图切换按钮
};