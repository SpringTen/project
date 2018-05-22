//初始化js文件库加载
function initJsLoader(){
    var urls = [];
        
};

function addExtensionJs(urls){
	
    //在index.jsp中加载的js文件
    //urls.push(path +"/vortex/framework/easyui/plugins/jquery.layout1.4.2.js");
    urls.push(path +"/vortex/framework/easyui/extension/jquery.panel.extend.js");
    urls.push(path +"/vortex/framework/easyui/extension/jquery.layout.extend.js");
    urls.push(path +"/vortex/framework/easyui/accordion/EasyUIAccordion.js");
    urls.push(path +"/vortex/framework/easyui/layout/EasyUILayout.js");
    
    urls.push(path +"/resources/js/jquery/lhgdialog/4.2.0/lhgdialog.js?skin=default");
    
};

function addIndexJs(urls){
    //在index.jsp中加载的js文件
    urls.push(path +"/vortex/index4/navigation/TreeNavigationV2.js");
    urls.push(path +"/vortex/index4/navigation/ListNavigationV2.js");
    urls.push(path +"/vortex/index4/navigation/MenuTemplateParserFactory.js");
    urls.push(path +"/vortex/index4/navigation/TestMenuTemplate.js");
    urls.push(path +"/vortex/index4/StartUp_v2.js");
    urls.push(path +"/vortex/index4/Loader.js");
    urls.push(path +"/vortex/index4/IndexCore.js");
    urls.push(path +"/vortex/index4/FuncPanelUtil.js");
    
    
    urls.push(path +"/resources/themes/changeskin/css/changeskin.css");
    urls.push(path +"/vortex/index4/skin.js");
}