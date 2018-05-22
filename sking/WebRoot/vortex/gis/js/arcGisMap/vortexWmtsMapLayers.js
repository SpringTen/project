/*
 * 天地图（瓦片切层式）
 */
var VortexWmtsMapLayers = {
	url : [
			{
				urlStr : "http://t0.tianditu.com/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={0}&TILEROW={1}&TILECOL={2}&FORMAT=tiles",
				minValue : 12,
				maxValue : 14,
				type : "2D",
				annoLayerFilter : "vec_c",
				baseMapFilter : "cva_c"
			},
			{
				urlStr : "http://t0.tianditu.com/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={0}&TILEROW={1}&TILECOL={2}&FORMAT=tiles",
				minValue : 12,
				maxValue : 14,
				type : "2D",
				annoLayerFilter : "vec_c",
				baseMapFilter : "cva_c"
			},
			{
				urlStr : "http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=ZJEMAPANNO&FORMAT=image/png&TILEMATRIXSET=TileMatrixSet0&TILEMATRIX={0}&STYLE=default&TILEROW={1}&TILECOL={2}",
				minValue : 15,
				maxValue : 17,
				type : "2D",
				annoLayerFilter : "ZJEMAP_2D",
				baseMapFilter : "ZJEMAPANNO_2D"
			},
			{
				urlStr : "http://srv.zjditu.cn/ZJEMAP_2D/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=ZJEMAP&FORMAT=image/png&TILEMATRIXSET=TileMatrixSet0&TILEMATRIX={0}&STYLE=default&TILEROW={1}&TILECOL={2}",
				minValue : 15,
				maxValue : 17,
				type : "2D",
				annoLayerFilter : "ZJEMAP_2D",
				baseMapFilter : "ZJEMAPANNO_2D"
			},
			{
				urlStr : "http://www.zjditu.cn:88/DQEMAP/wmts.asmx/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=DQEMAP&Style=default&Format=image/png&TileMatrixSet=TileMatrixSet0&TileMatrix={0}&TileRow={1}&TileCol={2}",
				minValue : 18,
				maxValue : 20,
				type : "2D",
				annoLayerFilter : "DQEMAP",
				baseMapFilter : "DQEMAPANNO"
			},
			{
				urlStr : "http://www.zjditu.cn:88/DQEMAPANNO/wmts.asmx/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=DQEMAPANNO&Style=default&Format=image/png&TileMatrixSet=TileMatrixSet0&TileMatrix={0}&TileRow={1}&TileCol={2}",
				minValue : 18,
				maxValue : 20,
				type : "2D",
				annoLayerFilter : "DQEMAP",
				baseMapFilter : "DQEMAPANNO"
			},
			{
				urlStr : "http://t0.tianditu.com/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={0}&TILEROW={1}&TILECOL={2}&FORMAT=tiles",
				minValue : 12,
				maxValue : 14,
				type : "Satellite",
				annoLayerFilter : "img_c",
				baseMapFilter : "cia_c"
			},
			{
				urlStr : "http://t0.tianditu.com/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={0}&TILEROW={1}&TILECOL={2}&FORMAT=tiles",
				minValue : 12,
				maxValue : 14,
				type : "Satellite",
				annoLayerFilter : "img_c",
				baseMapFilter : "cia_c"
			},
			{
				urlStr : "http://srv.zjditu.cn/ZJDOM_2D/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=ZJDOM2W1&FORMAT=image/jpeg&TILEMATRIXSET=Matrix_0&TILEMATRIX={0}&TILEROW={1}&TILECOL={2}",
				minValue : 15,
				maxValue : 17,
				type : "Satellite",
				annoLayerFilter : "ZJDOM_2D",
				baseMapFilter : "ZJDOMANNO_2D"
			},
			{
				urlStr : "http://srv.zjditu.cn/ZJDOMANNO_2D/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=ZJIMGANNO&FORMAT=image/png&TILEMATRIXSET=TileMatrixSet0&TILEMATRIX={0}&STYLE=default&TILEROW={1}&TILECOL={2}",
				minValue : 15,
				maxValue : 17,
				type : "Satellite",
				annoLayerFilter : "ZJDOM_2D",
				baseMapFilter : "ZJDOMANNO_2D"
			},
			{
				urlStr : "http://www.zjditu.cn:88/DQIMG/wmts.asmx/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=DQEMAP&Style=default&Format=image/png&TileMatrixSet=TileMatrixSet0&TileMatrix={0}&TileRow={1}&TileCol={2}",
				minValue : 18,
				maxValue : 20,
				type : "Satellite",
				annoLayerFilter : "DQIMG",
				baseMapFilter : "DQIMGANNO"
			},
			{
				urlStr : "http://www.zjditu.cn:88/DQIMGANNO/wmts.asmx/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=DQEMAPANNO&Style=default&Format=image/png&TileMatrixSet=TileMatrixSet0&TileMatrix={0}&TileRow={1}&TileCol={2}",
				minValue : 18,
				maxValue : 20,
				type : "Satellite",
				annoLayerFilter : "DQIMG",
				baseMapFilter : "DQIMGANNO"
			} ],
	defaultType : "2D",
	switchTypeArrays : [ "2D", "Satellite" ],
	fullExtent : {
		xmin : -180.0,
		ymin : -90.0,
		xmax : 180.0,
		ymax : 90.0
	},
	initialExtent : {
		xmin : 119.96,
		ymin : 30.2,
		xmax : 120.3,
		ymax : 30.54
	},
	wkid : 4326,
	origin : {
		x : -180,
		y : 90
	},
	lods : [ {
		"level" : 12,
		"resolution" : 0.00034332275390625,
		"scale" : 144447.93
	}, {
		"level" : 13,
		"resolution" : 0.000171661376953125,
		"scale" : 72223.96
	}, {
		"level" : 14,
		"resolution" : 0.0000858306884765625,
		"scale" : 36111.98
	}, {
		"level" : 15,
		"resolution" : 0.00004291534423828125,
		"scale" : 18035.742100270663377549137718
	}, {
		"level" : 16,
		"resolution" : 0.000021457672119140625,
		"scale" : 9017.871050135331688774568859
	}, {
		"level" : 17,
		"resolution" : 0.0000107288360595703125,
		"scale" : 4508.9355250676658443872844296
	}, {
		"level" : 18,
		"resolution" : 0.00000536441802978515625,
		"scale" : 2254.4677625338329221936422148
	}, {
		"level" : 19,
		"resolution" : 0.000002682209014892578125,
		"scale" : 1127.2338812669164610968211074
	}, {
		"level" : 20,
		"resolution" : 0.0000013411045074462890625,
		"scale" : 563.61694063345823054841055369
	} ],
	minLevel : 12,
	maxLevel : 20
};