var userId = "";
var userType = "";
var systemCode = "";
var menuCode = "";
var currentHref = document.location.href;

function onReady(uId) {
	$.mask();
	userId = uId;
	systemCode = VortexUtil.getUrlRequestParamValue(currentHref,
			"systemCode");
	menuCode = VortexUtil.getUrlRequestParamValue(currentHref,
			"currentMenuCode");
	
	// 加载js文件
	loadLibs();
};

//提前加载的文件
function loadLibs() {
	// 库文件集
	var urls = [];

	// 初始化js文件库加载
	initJsLoader();

	addExtensionJs(urls);
	addIndexJs(urls);

	ScriptSynchLoaderMgr.synchLoadJsCallback({
		'scripts':urls,
		'callback':loadCallback
	});
	/*var event = ScriptSynchLoaderMgr.synchLoadJsEvent({
		'scripts':urls,
		'params':{
			'a':100
		}
	});
	event.attach(loadCallback);*/
//	ScriptLoaderMgr.loadJs({
//		'scripts':urls,
//		'callback':loadCallback
//	});
};

function loadCallback(sender, e){
	//alert(e.a);
	
	//设置当前操作
	IndexCore.currentOperator.nodeSystemCode = systemCode;
	IndexCore.systemCode = systemCode;
	IndexCore.userInfo.userId = userId;
	IndexCore.userInfo.userType = userType;
	
	IndexCore.init();
	FuncPanelUtil.init();
	
	Loader.loadSystemInfo(systemCode);

	initWelcomeHtml();
	createUserInSystem();
};