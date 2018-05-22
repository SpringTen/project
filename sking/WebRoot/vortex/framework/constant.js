var _systemConfig = {
	debug : true,
	qipStyle : "qtip-blue",
	qipShow : true,
	downloadUrl : path + "/uploadFile/download/",
	downloadFileInlineUrl : path + "/uploadFile/downloadOrOpen/{id}?openmode=inline",
	downloadFileAttachmentUrl : path + "/uploadFile/downloadOrOpen/{id}?openmode=attachment",
	defalutTreeNodeIcon : path + "/resources/images/common/treeNode.png",
	systemViewType : 'replace',// replace,tabs
	pageViewType : 'pop',// pop,tabs,replace
	loadNodeSystemURL : path + "/pms/loadNodeSystem",//加载该节点系统下的所有菜单
	loadFuncDefMenuURL : path + "/pms/loadFuncDefMenu",//加载菜单绑定的功能
	loadFuncDefNavURL : path + "/pms/loadFuncDefNav",//加载导航器加载的功能
	loadTreeNavigationURL : path + "/pms/loadTreeNavigation",//加载树形导航器
	loadListNavigationURL : path + "/pms/loadListNavigation",//加载列表导航器
	loadUserInfoURL : path + "/pms/loadUserInfo",//加载用户信息
	loadUserInSystem: path + "/pms/loadUserInSystem",//加载用户能进入的系统
	arcGisServer:'http://192.168.1.227:8098/vortex/arcgis',
	windowWidth : 950,
	windowHeight : 550,
	defaultLoadGisType:'mapABCFlash'//arcgis,mapABCFlash,mapABCJs
};
var _systemDb = {
		MYSQL:'mysql',
		ORACLE:'oracle'
	};