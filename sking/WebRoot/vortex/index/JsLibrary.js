//初始化js文件库加载
function initJsLoader(){
    var urls = [];
        
};

function addExtensionJs(urls){
	
    //在index.jsp中加载的js文件
   // urls.push(path +"/vortex/framework/easyui/plugins/jquery.layout.js");
    urls.push(path +"/vortex/framework/easyui/extension/jquery.panel.extend.js");
    urls.push(path +"/vortex/framework/easyui/extension/jquery.layout.extend.js");
    urls.push(path +"/vortex/framework/easyui/accordion/EasyUIAccordion.js");
    urls.push(path +"/vortex/framework/easyui/layout/EasyUILayout.js");
    
    urls.push(path +"/resources/js/jquery/lhgdialog/4.2.0/lhgdialog.js?skin=default");
    
};

function addIndexJs(urls){
    //在index.jsp中加载的js文件
    urls.push(path +"/vortex/framework/navigation/TreeNavigationV2.js");
    urls.push(path +"/vortex/framework/navigation/ListNavigationV2.js");
    urls.push(path +"/vortex/framework/navigation/MenuTemplateParserFactory.js");
    urls.push(path +"/vortex/framework/navigation/TestMenuTemplate.js");
    urls.push(path +"/vortex/index/Loader.js");
    urls.push(path +"/vortex/index/IndexCore.js");
    urls.push(path +"/vortex/index/FuncPanelUtil.js");
    urls.push(path +"/vortex/index/StartUp_v2.js");
    
    urls.push(path +"/resources/themes/changeskin/css/changeskin.css");
    urls.push(path +"/vortex/index/skin.js");
}