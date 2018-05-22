var configPaths = {
	// jquery
	"jquery-1.7.1" : "/resources/js/jquery/jquery-1.7.1",
	"jquery-1.7.2" : "/resources/js/jquery/jquery-1.7.2",
	"jquery-1.8.0" : "/resources/js/jquery/jquery-1.8.0",
	"jquery-1.8.2" : "/resources/js/jquery/jquery-1.8.2",
	"jquery-1.8.3" : "/resources/js/jquery/jquery-1.8.3",
	"jquery-1.9.1" : "/resources/js/jquery/jquery-1.9.1",
	"jquery-1.10.0" : "/resources/js/jquery/jquery-1.10.0",
	"jquery-1.10.2" : "/resources/js/jquery/jquery-1.10.2",
	
	"jquery-migrate": "/resources/js/jquery/jquery-migrate-1.2.1",

	// easyui
	"easyui-1.3.3" : "/resources/js/jquery/easyui/1.3.3/jquery.easyui.min",
	"easyui-1.3.6" : "/resources/js/jquery/easyui/1.3.6/jquery.easyui.min",
	"easyui-1.4.2" : "/resources/js/jquery/easyui/1.4.2/jquery.easyui.min",
	
	"easyui-lang-zh": "/resources/js/jquery/easyui/1.3.6/locale/easyui-lang-zh_CN",

	"autocomplete-vortex" : "/resources/js/jquery/autocomplete/1.2.3/jquery.autocomplete-vortex",
	"ztree.core_vortex" : "/resources/js/jquery/zTree/3.5.15/jquery.ztree.core_vortex-3.5",
	"ztree.excheck" : "/resources/js/jquery/zTree/3.5.15/jquery.ztree.excheck-3.5.min",
	"ztree.exedit" : "/resources/js/jquery/zTree/3.5.15/jquery.ztree.exedit-3.5.min",
	"ztree.exhide" : "/resources/js/jquery/zTree/3.5.15/jquery.ztree.exhide-3.5.min",
	"ajaxfileupload" : "/resources/js/jquery/ajaxfileupload/ajaxfileupload",
	"jquery.form" : "/resources/js/jquery/form/3.43.0/jquery.form",
	"jquery-noinput" : "/resources/js/jquery/jquery-noInput/0.0.1/jquery-noinput.min",
	"jquery.validate" : "/resources/js/jquery/jquery-validation/1.11.1/jquery.validate",
	"messages_zh" : "/resources/js/jquery/jquery-validation/1.11.1/messages_zh",
	"jquery.metadata" : "/resources/js/jquery/jquery-validation/1.11.1/jquery.metadata",
	"additional-methods" : "/resources/js/jquery/jquery-validation/1.11.1/additional-methods",
	"jquery.qtip" : "/resources/js/jquery/qtip2/jquery.qtip",

	"imagesloaded" : "/resources/js/jquery/qtip2/imagesloaded",

	"fancybox" : "/resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox",
	"css_fancybox" : "/resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox",

	"EasyUILayout" : "/vortex/framework/easyui/layout/EasyUILayout",
	"EasyUIAccordion" : "/vortex/framework/easyui/accordion/EasyUIAccordion",
	"easyuidatagrid" : "/vortex/framework/datagrid/easyuidatagrid",
	"jquery.panel.extend" : "/vortex/framework/easyui/extension/jquery.panel.extend",
	"jquery.layout.extend" : "/vortex/framework/easyui/extension/jquery.layout.extend",
	"mask" : "/vortex/framework/jquery/plugins/mask/mask",
	"TestMenuTemplate" : "/vortex/framework/navigation/TestMenuTemplate",
	"MenuTemplateParserFactory" : "/vortex/framework/navigation/MenuTemplateParserFactory",
	"GridColumnMenu" : "/vortex/framework/util/GridColumnMenu",
	"constant" : "/vortex/framework/constant",
	"Tree" : "/vortex/framework/tree/Tree",
	"jqueryajaxform" : "/vortex/framework/ajaxform/jqueryajaxform",
	"windowControl" : "/vortex/framework/easyui/window/windowControl",
	"jqueryautocomplete" : "/vortex/framework/autocomplete/jqueryautocomplete",

	"easyuiValidate" : "/vortex/framework/util/easyuiValidate",
	"VortexUtil" : "/vortex/framework/util/VortexUtil",
	"MapUtil" : "/vortex/framework/util/MapUtil",
	"ScriptSynchLoaderMgr" : "/vortex/framework/util/ScriptSynchLoaderMgr",
	"global" : "/vortex/framework/util/global",
	"event" : "/vortex/framework/util/event",
	"MapUtil" : "/vortex/framework/util/MapUtil",
	"dateUtils" : "/vortex/framework/util/dateUtils",
	"uuid" : "/vortex/framework/util/uuid",

	"Qtip" : "/vortex/framework/message/Qtip",

	"FuncPanelUtil" : "/vortex/index/FuncPanelUtil",
	"IndexCore" : "/vortex/index/IndexCore",
	"StartUp_v2" : "/vortex/index/StartUp_v2",
	"Loader" : "/vortex/index/Loader",

	"uploadFileNew" : "/vortex/uploadFile/uploadFileNew",
	"echarts-all":"/resources/js/echarts/baidu/2.2.7/build/dist/echarts-all",
	"DynamicForm":"/vortex/framework/dynamicform/DynamicForm",
	'highcharts-lib' : '/vortex/framework/highstock/highstock',
	// Map
	"gisMapConstant" : "/vortex/gisMapConstant",
	"mapConstants" : "/vortex/gis/js/mapConstants",
	"gisUtils" : "/vortex/gis/js/gisUtils",
	"gisFactory" : "/vortex/gis/js/gisFactory",
	"gisLibrary" : "/vortex/gis/js/gisLibrary",
	"mapTool" : "/vortex/gis/js/mapTool",
	"cloudGis" : "/resources/cloud/management/js/gis/cloudGis",
	"pageClose" : "/resources/cloud/js/pageClose",
	"vortexBMap" : "/vortex/gis/js/bMap/vortexBMap",

	// ICON
	
	//plupload
	"js_plupload": "/resources/cloud/js/plupload/plupload",
	"css_plupload": "/resources/cloud/js/plupload/plupload",
	"vortex.upload.lib": "/resources/cloud/js/plupload/vortex.upload.lib",
	"vortex.upload.window": "/resources/cloud/js/plupload/vortex.upload.window",

	// BootStarp
	"css_bootstrap" : "/resources/js/bootstrap/2.3.2/css/bootstrap",
	"css_bootstrap-responsive" : "/resources/js/bootstrap/2.3.2/css/bootstrap-responsive",
	"js_bootstrap" : "/resources/js/bootstrap/2.3.2/js/bootstrap.min",

	// thirdparty
	"js_alertify" : "/thirdparty/alertify/1.0/alertify.min",
	"css_alertify.core" : "/thirdparty/alertify/1.0/themes/alertify.core",
	"css_alertify.default" : "/thirdparty/alertify/1.0/themes/alertify.default",

	// encapsulation
	"vortex.show.lib" : "/vortex.lib/vortex.show/vortex.show.lib",
	"vortex.datagrid.lib" : "/vortex.lib/vortex.datagrid/vortex.datagrid.lib",
	"vortex.form.lib" : "/vortex.lib/vortex.form/vortex.form.lib",
	"vortex.chart.lib" : "/vortex.lib/vortex.chart/vortex.chart.lib",

	// vortex.stylesheet
	"css_common" : "/css/common/common",
	"css_common_style" : "/css/common/common_style",
	"css_datagrid" : "/css/common/datagrid",
	"css_common.override" : "/css/thirdparty.override/common.override",
	"css_thirdparty.cloud" : "/css/thirdparty.override/override.thirdparty.cloud",
	 //export.import
	"DataGridExport" : "/vortex/framework/datagrid/DataGridExport",
	// 收运调度页面CSS
	"css_ljsy_trans": "/resources/cloud/ljsy/css/style",

	// CSS样式路径
	"css_easyui" : "/resources/js/jquery/easyui/1.3.6/themes/bootstrap/easyui",
	"css_icon" : "/resources/js/jquery/easyui/1.3.6/themes/icon",
	"css_zTreeStyle" : "/resources/js/jquery/zTree/3.5.15/css/zTreeStyle/zTreeStyle",
	"css_autocomplete" : "/resources/js/jquery/autocomplete/1.2.3/jquery.autocomplete",
	"css_validate" : "/resources/js/jquery/jquery-validation/1.11.1/validate",
	"css_qtip" : "/resources/js/jquery/qtip2/2.1.1/jquery.qtip",

	"css_page" : "/resources/themes/vortex/css/page",
	"css_vortex" : "/resources/themes/vortex",
	"css_show" : "/resources/file/css/show",
	"css_gis_map" : "/vortex/gis/css/map",

	"WdatePicker" : "/resources/js/My97DatePicker/WdatePicker",
	
	// management工程自己的js
	"base" : "/resources/cloud/management/js/base",
	"manageUtil" : "/resources/cloud/js/util/util",
	"resizeAll" : "/resources/cloud/management/js/resizeAll",
	
	// jcss工程自己的的js
	"jcss_base_item" : "/resources/cloud/jcss/js/jcssBaseItem",
	"jcss_util" : "/resources/cloud/jcss/js/jcssUtil",
	"jcss_map" : "/resources/cloud/jcss/js/jcssMap",
	"jcss_common" : "/resources/cloud/jcss/js/common/jcssCommon",
	"jcss_common_view" : "/resources/cloud/jcss/js/common/jcssCommonViewForm",
	"jcss_peijian" : "/resources/cloud/jcss/js/common/tabPeijian",
	"jcss_peijian_view" : "/resources/cloud/jcss/js/common/tabPeijianView",
	
	// ljsy工程自己的的js
	"echarts3.0": "/resources/cloud/ljsy/js/taskTransKanBan/echarts.min",
	"importUtils": "/resources/cloud/ljsy/js/importUtils",
	"ljsy_base_item" : "/resources/cloud/ljsy/js/ljsyBaseItem",
	"ljsy_utils" : "/resources/cloud/ljsy/js/ljsyUtils",
	"css_common_override":"/css/common/override.common",
	"css_ljsy" : "/resources/cloud/ljsy/css/ljsy",
	// 帆软js
	"fineReport":"/vortex/framework/report/FineReportViewer",
	"reportConstants":"/vortex/reportConstant",
	// 餐厨
	"cc_base_item" : "/resources/cloud/cc/js/ccBaseItem",
	'ccImportUtil' : '/resources/cloud/cc/js/utils/ccImportUtils',
	'cc_restaurantRelated' : '/resources/cloud/cc/js/restaurant/restaurantRelated',
	'jgzxDataUtil' : '/resources/cloud/cc/js/czjg/jgzxDataUtil',
	"echarts-all":"/resources/js/echarts/baidu/2.2.7/build/dist/echarts-all",
	"datagrid-bufferview" : "/resources/cloud/cc/js/carCollectDay/datagrid-bufferview",
	"datagrid-detailview" : "/vortex/framework/easyui/plugins/datagrid-detailview",
	"fillValueUtil" : "/resources/cloud/js/util/util",
	
	"easyui-kindEditor" : "/vortex/framework/easyui/plugins/easyui-kindEditor",
	"zh_CN" : "/resources/js/kindEditor/kindeditor-4.1.7/lang/zh_CN",
	"kindEditor-image" : "/resources/js/kindEditor/kindeditor-4.1.7/plugins/image/image",
	"kindeditor" : "/resources/js/kindEditor/kindeditor-4.1.7/kindeditor",
	"vortex.datagrid.lib.wx" : "/resources/cloud/wechat/js/vortex.lib/vortex.datagrid/vortex.datagrid.lib",
	"TreeWx" : "/resources/cloud/wechat/js/vortex/framework/tree/Tree"
	
};

var configMap = {
	"*" : {
		"css" : "/resources/js/css.js"
	}
};

var scene_datagrid = {
	"vortex.datagrid.lib" : [ "easyui-1.3.6", "GridColumnMenu", "VortexUtil",
			"jqueryautocomplete", "js_alertify" , "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "MapUtil"],
	"VortexUtil" : [ "constant" ],
	"vortex.show.lib" : ["js_alertify"],
	"easyui-1.3.6" : ["jquery-1.10.0" ],
	"jqueryautocomplete" : [ "autocomplete-vortex" ],
	"autocomplete-vortex" : ["jquery-1.10.0" ],
	"vortex.show.lib" : ["js_alertify"],
	"GridColumnMenu" : [ "easyui-1.3.6" ]
};

var scene_form = {
	"jqueryajaxform" : [ "jquery.form", "messages_zh", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "manageUtil", "base" ],
	"messages_zh" : [ "jquery.validate", "additional-methods",
			"jquery.metadata" ],
	"jquery.validate" : [ "jquery-1.10.0" ],
	"additional-methods" : [ "jquery.validate" ],
	"base" : [ "VortexUtil", "easyui-1.3.6", "event" ],
	"jquery.form" : ["jquery-1.10.0"],
	"easyui-1.3.6" : [ "jquery-1.10.0" ]
};

var scene_tree = {
	"Tree" : [ "jquery.qtip" ,"easyui-1.3.6" ,"ztree.core_vortex",  "ztree.excheck",
			"ztree.exedit", "ztree.exhide", "constant", "VortexUtil", "global",
			"vortex.show.lib", "vortex.form.lib", "vortex.chart.lib" ],
	"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
	"jquery-migrate": [ "jquery-1.10.0" ],
	"ztree.excheck" : [ "ztree.core_vortex" ],
	"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
	"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
	"ztree.core_vortex" : [ "jquery-1.10.0" ],
	"easyui-1.3.6" : [ "jquery-1.10.0" ]
};

var scene_easyui_form = {
	"vortex.datagrid.lib" : [ "jquery-1.10.0","easyui-1.3.6", "GridColumnMenu", "VortexUtil",
			"autocomplete-vortex", "js_alertify", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global" ],
	"VortexUtil" : [ "constant" ],
	"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
	"additional-methods" : [ "jquery.validate" ],
	"jqueryajaxform" : [ "jquery.form", "messages_zh" ],
	"jquery.form" : ["jquery-1.10.0"],
	"GridColumnMenu" : [ "easyui-1.3.6" ],
	"easyui-1.3.6": ["jquery-1.10.0"]
};

var scene_tree_datagrid = {
	"Tree" : [ "jqueryajaxform", "ztree.core_vortex", "ztree.excheck",
			"ztree.exedit", "ztree.exhide", "jquery.qtip" ],
	"vortex.datagrid.lib" : [ "jquery-1.10.0","easyui-1.3.6", "GridColumnMenu", "VortexUtil",
			"jqueryautocomplete", "js_alertify", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "MapUtil", "dateUtils" ],
	"VortexUtil" : [ "constant" ],
	"ztree.core_vortex" : [ "jquery-1.10.0"],
	"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
	"jquery-migrate": [ "jquery-1.10.0" ],
	"jqueryautocomplete" : [ "autocomplete-vortex" ],
	"autocomplete-vortex" : [  "jquery-1.10.0" ],
	"jcss_base_item" : [ "event" ],
	"ztree.excheck" : [ "ztree.core_vortex" ],
	"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
	"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
	"jqueryajaxform" : [ "jquery.form", "vortex.form.lib", "jquery.validate" ],
	"jquery.form" : ["jquery-1.10.0"],
	"vortex.form.lib" : [ "jquery.form" ],
	"easyui-1.3.6": ["jquery-1.10.0"],
	"jquery.validate": ["jquery-1.10.0"],
	"base" : [ "event" ]
};

var scene_map_tree_form = {
	"Tree" : [ "easyui-1.3.6", "ztree.core_vortex", "ztree.excheck",
			"ztree.exedit", "ztree.exhide", "VortexUtil", 
			"constant", "VortexUtil", "global", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global","jquery.qtip"],
	"ztree.excheck" : [ "ztree.core_vortex" ],
	"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
	"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
	"cloudGis" : [ "gisMapConstant", "gisFactory", "VortexUtil", "mapTool" ],
	"mapTool": [ "gisMapConstant", "mapConstants", "gisFactory"],
	"gisFactory" : [ "mapConstants", "gisUtils", "gisLibrary", "ScriptSynchLoaderMgr" ],
	"ScriptSynchLoaderMgr" : [ "MapUtil", "event", "windowControl" ],
	"VortexUtil" : [ "constant", "uuid" ],
	"jqueryajaxform" : [ "jquery.form" ],
	"jquery.form" : ["jquery-1.10.0"],
	"windowControl" : [ "global", "messages_zh" ],
	"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
	"additional-methods" : [ "jquery.validate" ],
	"easyui-1.3.6" : [ "jquery-1.10.0" ],
	"ztree.core_vortex" : ["jquery-1.10.0" ],
	"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
	"jquery-migrate": [ "jquery-1.10.0" ],
	"jquery.validate" : [ "jquery-1.10.0"]
};

var scene_map_easyui_form = {
	"vortex.datagrid.lib" : [ "easyui-1.3.6", "GridColumnMenu", "VortexUtil",
			"jqueryautocomplete", "js_alertify", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "MapUtil" ],
	"cloudGis" : [ "gisMapConstant", "gisFactory", "VortexUtil" ],
	"gisFactory" : [ "mapConstants", "gisUtils", "gisLibrary", "ScriptSynchLoaderMgr", "mapTool" ],
	"ScriptSynchLoaderMgr" : [ "MapUtil", "event", "windowControl" ],
	"VortexUtil" : [ "constant", "uuid" ],
	"jqueryajaxform" : [ "jquery.form" ],
	"jquery.form" : ["jquery-1.10.0"],
	"windowControl" : [ "global", "messages_zh" ],
	"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
	"additional-methods" : [ "jquery.validate" ],
	"easyui-1.3.6" : [ "jquery-1.10.0"],
	"jquery.validate" : [ "jquery-1.10.0" ],
	"jqueryautocomplete" : [ "autocomplete-vortex" ]
};

var scene_jcss_map_tree_form_fancybox_datepicker_upload = {
	"Tree" : [ "jquery.qtip", "easyui-1.3.6", "ztree.core_vortex", "ztree.excheck",
			"ztree.exedit", "ztree.exhide", "VortexUtil", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global" ],
	"ztree.excheck" : [ "ztree.core_vortex" ],
	"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
	"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
	"jcss_map" : [ "gisMapConstant", "gisFactory", "VortexUtil" ],
	"gisFactory" : [ "mapConstants", "gisUtils", "gisLibrary", "ScriptSynchLoaderMgr", "mapTool" ],
	"ScriptSynchLoaderMgr" : [ "MapUtil", "event", "windowControl" ],
	"VortexUtil" : [ "constant", "uuid" ],
	"jqueryajaxform" : [ "jquery.form", "messages_zh" ],
	"jquery.form" : ["jquery-1.10.0"],
	"windowControl" : [ "global", "messages_zh" ],
	"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
	"additional-methods" : [ "jquery.validate" ],
	"easyui-1.3.6" : [ "jquery-1.10.0"],
	"ztree.core_vortex" : [ "jquery-1.10.0"],
	"jquery.validate" : [ "jquery-1.10.0"],
	"fancybox" : [ "jquery-1.10.0" ],
	"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
	"jquery-migrate": [ "jquery-1.10.0" ],
	"jcss_base_item" : [ "event" ],
	"jcss_util" : ["jquery-1.10.0"],
	"jcss_common" : ["jquery-1.10.0" , "jcss_peijian" , "jcss_map"],
	"jcss_common_view" : ["jcss_peijian_view"]
};

var scene_tree_form = {
	"Tree" : [ "jquery-1.10.0","easyui-1.3.6", "ztree.core_vortex", "ztree.excheck",
			"ztree.exedit", "ztree.exhide", "VortexUtil", "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "constant" , "jquery.qtip"],
	"ztree.excheck" : [ "ztree.core_vortex" ],
	"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
	"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
	"jqueryajaxform" : [ "jquery.form", "messages_zh" ,"jquery.validate"],
	"messages_zh" : [ "jquery.validate", "additional-methods",
			"jquery.metadata" ],
	"additional-methods" : [ "jquery-1.10.0","jquery.validate" ],
	"jquery.validate": ["jquery-1.10.0"],
	"base" : [ "jquery-1.10.0","VortexUtil", "easyui-1.3.6", "Tree", "event" ],
	"jquery.form" : ["jquery-1.10.0"],
	"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
	"jquery-migrate": [ "jquery-1.10.0" ],
	"easyui-1.3.6": ["jquery-1.10.0"],
	"vortex.upload.window" : ["vortex.upload.lib", "fancybox", "js_plupload"],
	"vortex.upload.lib": ["fancybox", "js_plupload"],
	"ztree.core_vortex": ["jquery-1.10.0"]
};

var scene_layout = {
	"jqueryajaxform": ["jquery-1.10.0", "jquery.form", "VortexUtil", "messages_zh", "js_alertify", "vortex.show.lib"],
	"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
	"jquery.validate" : [ "jquery-1.10.0" ],
	"additional-methods" : [ "jquery.validate" ]
};
var scene_ljsy_map_tree_form = {
		"Tree" : [ "easyui-1.3.6", "ztree.core_vortex", "ztree.excheck",
				"ztree.exedit", "ztree.exhide", "VortexUtil", 
				"constant", "VortexUtil", "global", "js_alertify", "vortex.show.lib", "vortex.form.lib",
				"vortex.chart.lib", "global","jquery.qtip"],
		"ztree.excheck" : [ "ztree.core_vortex" ],
		"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
		"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
//		"js_alertify" : [ "css!css_alertify.core", "css!css_alertify.default" ],
		"cloudGis" : [ "gisMapConstant", "gisFactory", "VortexUtil"],
		"gisFactory" : [ "mapConstants", "gisUtils", "gisLibrary", "ScriptSynchLoaderMgr", "mapTool" ],
		"ScriptSynchLoaderMgr" : [ "MapUtil", "event", "windowControl" ],
		"ljsy_base_item":["event"],
		"ljsy_utils":["event"],
//		"ljsy_css":["css!css_ljsy", "css!css_ljsy_trans"],
		"VortexUtil" : [ "constant", "uuid" ],
		"jqueryajaxform" : [ "jquery.form", "messages_zh" ],
		"jquery.form" : ["jquery-1.10.0"],
		"windowControl" : [ "global", "messages_zh" ],
		"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
		"additional-methods" : [ "jquery.validate" ],
		"easyui-1.3.6" : ["jquery-1.10.0"],
		"ztree.core_vortex" : [ "css!css_icon" ],
		"jquery.qtip" : [ "event" , "jquery-1.10.0"],
		"jquery.validate" : [ "jquery-1.10.0" ],
//		"fancybox" : [ "css!css_fancybox" ],
		"ljfl_Fujian" : ["js_plupload","vortex.upload.window","vortex.upload.lib"],
		"vortex.upload.window" : ["vortex.upload.lib"],
		"js_plupload" : ["jquery-1.10.0"],
		"vortex.datagrid.lib" : ["easyui-1.3.6", "ajaxfileupload"],
		"vortex.chart.lib": ["jquery-1.10.0","echarts-all"],
		"autocomplete-vortex" : ["jquery-1.10.0"],
		"mask" : ["jquery-1.10.0"],
		"ajaxfileupload": ["jquery-1.10.0"],
		"echarts3.0": ["jquery-1.10.0"]
	};

/*var scene_export_import = {
	"vortex.datagrid.lib" : [ "easyui-1.3.6", "GridColumnMenu", "VortexUtil",
		"jqueryautocomplete", "js_alertify", "css!css_page",
		"css!css_vortex", "css!css_show", "css!css_common",
		"css!css_common_style", "css!css_datagrid",
		"css!css_common.override", "css!css_thirdparty.cloud" , "vortex.show.lib", "vortex.form.lib",
		"vortex.chart.lib", "global", "MapUtil"],
  	"VortexUtil" : [ "constant" ],
  	"vortex.show.lib" : ["js_alertify"],
  	"easyui-1.3.6" : [ "css!css_easyui" ],
  	"jqueryautocomplete" : [ "autocomplete-vortex" ],
  	"autocomplete-vortex" : [ "css!css_autocomplete", "jquery-1.10.0" ],
  	"vortex.show.lib" : ["js_alertify"],
  	"js_alertify" : [ "css!css_alertify.core", "css!css_alertify.default" ],
  	"GridColumnMenu" : [ "easyui-1.3.6" ],
	"DataGridExport" : ["jquery-1.10.0", "easyui-1.3.6","VortexUtil"],
	"ajaxfileupload" : ["jquery-1.10.0",]
}*/

var scene_cc_map_tree_form = {
		"Tree" : [ "easyui-1.3.6", "ztree.core_vortex", "ztree.excheck",
				"ztree.exedit", "ztree.exhide", "VortexUtil", 
				"constant", "VortexUtil", "global", "js_alertify", "vortex.show.lib", "vortex.form.lib",
				"vortex.chart.lib", "global","jquery.qtip"],
		"ztree.excheck" : [ "ztree.core_vortex" ],
		"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
		"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
		"cloudGis" : [ "gisMapConstant", "gisFactory", "VortexUtil"],
		"gisFactory" : [ "mapConstants", "gisUtils", "gisLibrary", "ScriptSynchLoaderMgr", "mapTool" ],
		"ScriptSynchLoaderMgr" : [ "MapUtil", "event", "windowControl" ],
		"VortexUtil" : [ "constant", "uuid" ],
		"jqueryajaxform" : [ "jquery.form", "messages_zh" ],
		"jquery.form" : ["jquery-1.10.0"],
		"windowControl" : [ "global", "messages_zh" ],
		"messages_zh" : [ "jquery.validate", "additional-methods", "jquery.metadata" ],
		"additional-methods" : [ "jquery.validate" ],
		"easyui-1.3.6" : ["jquery-1.10.0"],
		"ztree.core_vortex" : [ "css!css_icon" ],
		"jquery.qtip" : [ "event" , "jquery-1.10.0"],
		"vortex.upload.window" : ["vortex.upload.lib"],
		"js_plupload" : ["jquery-1.10.0"],
		"vortex.datagrid.lib" : ["easyui-1.3.6", "ajaxfileupload"],
		"vortex.datagrid.lib" : [ "jquery-1.10.0","easyui-1.3.6", "GridColumnMenu", "VortexUtil",
		              			"jqueryautocomplete", "js_alertify", "vortex.show.lib", "vortex.form.lib",
		              			"vortex.chart.lib", "global", "MapUtil", "dateUtils" ],
		
		"vortex.chart.lib": ["jquery-1.10.0","echarts-all"],
//		"highcharts" : ["jquery-1.10.0", "highcharts-lib"],
		"autocomplete-vortex" : ["jquery-1.10.0"],
		"mask" : ["jquery-1.10.0"],
		"ajaxfileupload": ["jquery-1.10.0"],
		"echarts3.0": ["jquery-1.10.0"],
		"base" : [ "event" ],
		"easyui-kindEditor" : [ "jquery-1.10.0", "easyui-1.3.6", "zh_CN", "kindEditor-image", "kindeditor" ],
		"zh_CN" : [ "kindeditor" ],
		"kindEditor-image" : [ "kindeditor" ],
		"vortex.upload.window" : [ "vortex.upload.lib" ],
		"js_plupload" : [ "jquery-1.10.0" ],
		"vortex.upload.window" : ["vortex.upload.lib"]
	};
	
var scene_datagrid_wx = {
	"vortex.datagrid.lib.wx" : [ "easyui-1.3.6", "GridColumnMenu", "VortexUtil",
			"jqueryautocomplete", "js_alertify" , "vortex.show.lib", "vortex.form.lib",
			"vortex.chart.lib", "global", "MapUtil"],
	"VortexUtil" : [ "constant" ],
	"vortex.show.lib" : ["js_alertify"],
	"easyui-1.3.6" : ["jquery-1.10.0" ],
	"jqueryautocomplete" : [ "autocomplete-vortex" ],
	"autocomplete-vortex" : ["jquery-1.10.0" ],
	"vortex.show.lib" : ["js_alertify"],
	"GridColumnMenu" : [ "easyui-1.3.6" ]
};
var scene_tree_datagrid_wx = {
		"TreeWx" : [ "jqueryajaxform", "ztree.core_vortex", "ztree.excheck", "ztree.exedit", "ztree.exhide", "jquery.qtip" ],
		"vortex.datagrid.lib.wx" : [ "jquery-1.10.0","easyui-1.3.6", "GridColumnMenu", "VortexUtil", "jqueryautocomplete", "js_alertify", "vortex.show.lib", "vortex.form.lib","vortex.chart.lib", "global", "MapUtil", "dateUtils" ],
		"VortexUtil" : [ "constant" ],
		"ztree.core_vortex" : [ "jquery-1.10.0"],
		"jquery.qtip" : [ "jquery-1.10.0","jquery-migrate"],
		"jquery-migrate": [ "jquery-1.10.0" ],
		"jqueryautocomplete" : [ "autocomplete-vortex" ],
		"autocomplete-vortex" : [  "jquery-1.10.0" ],
		"jcss_base_item" : [ "event" ],
		"ztree.excheck" : [ "ztree.core_vortex" ],
		"ztree.exedit" : [ "ztree.core_vortex"  , "ztree.excheck" ],
		"ztree.exhide" : [ "ztree.core_vortex" , "ztree.exedit" , "ztree.excheck" ],
		"jqueryajaxform" : [ "jquery.form", "vortex.form.lib", "jquery.validate" ],
		"jquery.form" : ["jquery-1.10.0"],
		"vortex.form.lib" : [ "jquery.form" ],
		"easyui-1.3.6": ["jquery-1.10.0"],
		"jquery.validate": ["jquery-1.10.0"],
		"base" : [ "event" ],
		"easyui-kindEditor" : [ "jquery-1.10.0", "easyui-1.3.6", "zh_CN", "kindEditor-image", "kindeditor" ],
		"zh_CN" : [ "kindeditor" ],
		"kindEditor-image" : [ "kindeditor" ],
		"vortex.upload.window" : [ "vortex.upload.lib" ],
		"js_plupload" : [ "jquery-1.10.0" ],
		"vortex.upload.window" : ["vortex.upload.lib"]
	};