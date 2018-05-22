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
};

function loadCallback(sender, e){
	//alert(e.a);
	
	//设置当前操作
	//IndexCore.currentOperator.nodeSystemCode = systemCode;
	IndexCore.systemCode = systemCode;
	IndexCore.userInfo.userId = userId;
	IndexCore.userInfo.userType = userType;
	
	IndexCore.init();
	FuncPanelUtil.init();
	
	//Loader.loadSystemInfo(systemCode);

	initWelcomeHtml();
	createUserInSystem();
	onLoadCustomMainIndexRes();
};

///////////////////////////
function onLoadCustomMainIndexRes(){
	initLoadCustomMainIndexRes();
	VortexUtil.remoteCall({
		url : 'admin/customMainPageResource/loadUserCustomMainPageResource',
		isAsync:true,
		successCallback : function(data) {
			var html= '<div class="wrapper" style="cursor: pointer;"><div class="boxing">';
			if (data.length > 0) {
				$(data).each(function(index,oneMenu) {
					html= html + '<div class="box5" onClick="Loader.clickMenuById(\''+ oneMenu.menuId +'\');" id = "'+ oneMenu.id +'">';
					html= html + '<div class="icon">';
					if (!(oneMenu.iconId == "" || oneMenu.iconId == null)){
						html= html + '<img src="'+_systemConfig.downloadUrl + oneMenu.iconId+'" title="'+ oneMenu.memo +'">';
					} else {
						html= html + '<img src="' + path + '/resources/themes/vortex/images/index2/pic_default.png" title="'+ oneMenu.memo +'">';
					}
					
					html= html + '</div>';
					html= html + '<div class="word">';
					html= html + '<p>'+oneMenu.dispayName+'</p>';
					html= html + '</div>';
					html= html + '</div>';
				});
			}
			html= html +'<div class="plus" style="cursor: pointer;" onclick="addSelfMenu()"><div class="icon"><img src="resources/themes/vortex/images/index2/plus.png"></div></div></div></div>';
			$("#funcRegion_menuTab").html(html);
			
			$(".wrapper").find(".box5").unbind("mouseenter");
			
			$(".wrapper").find(".box5").bind("mouseenter",function(e){
				 e.preventDefault();
		         if (!cmenu){
		       	  createMenu();
		         }
		         currentMainPageId = e.currentTarget.id;
		         var offsetLeft = $(this).offset().left;
		         var offsetTop = $(this).offset().top;
		         var boxWidth = $(this).width();
		         var boxHeight = $(this).height();
		         cmenu.menu('show', {
		             left:offsetLeft+(boxWidth-cmenu.width())/2,
		             top:offsetTop+boxHeight
		         });
				});
			$(".wrapper").find(".box5").bind("mouseleave",function(e){
				var menuOffsetLeft = cmenu.offset().left;
				var menuWidth = cmenu.width();
				if(e.pageX>menuOffsetLeft
						&&e.pageX<menuOffsetLeft+menuWidth
						&&e.pageY>$(this).offset().top){
					
				}else{
					cmenu.menu('hide');
				}
			});
			/*$(".wrapper").find(".box5").rightClick(function(e){
				e.preventDefault();
				if (!cmenu){
			       	  createMenu();
			         }
			         currentMainPageId = e.currentTarget.id;
			         alert(e.currentTarget.id);
			         alert(cmenu);
			         cmenu.menu('show', {
			             left:e.pageX,
			             top:e.pageY+10
			         });
			});*/
		}
	});
};
function initLoadCustomMainIndexRes(){
	var html= '<div class="wrapper"><div class="boxing">';
	html= html +'<div class="plus" style="cursor: pointer;" onclick="addSelfMenu()"><div class="icon"><img src="resources/themes/vortex/images/index2/plus.png"></div></div></div></div>';
	$("#funcRegion_menuTab").html(html);
};
function addSelfMenu(){
	VortexUtil.goToPage("添加自定义菜单", 'admin/customMainPageResource/add');
};
function updateSelfMenu(id){
	VortexUtil.goToPage("修改自定义菜单", 'admin/customMainPageResource/update/' + id);
};
var cmenu;
var currentMainPageId = null;
function createMenu(){
    cmenu = $('<div/>').appendTo('body');
    cmenu.menu({
        onClick: function(item){
        	if (item.id == 'updateCustomMainPage'){
        		updateSelfMenu(currentMainPageId);
        	} else if (item.id == 'deleteCustomMainPage'){
        		$.messager.confirm('警告', '确定删除吗?', function(r) {
            		if (r) {
            			VortexUtil.remoteCall({
            				url : 'admin/customMainPageResource/delete?id='+currentMainPageId,
            				isAsync:true,
            				successCallback : function(data) {
            					if (data.operateSuccess){
            						VortexUtil.show({
            							msg:data.operateMessage
            						});
            						onLoadCustomMainIndexRes();
            					}
            					}
            				});
            		}

            	});
        	}
        	
        }
    });
    cmenu.menu('appendItem', {
   	 id:'updateCustomMainPage',
        text: '修改'
    });
     cmenu.menu('appendItem', {
    	 id:'deleteCustomMainPage',
         text: '删除'
     });
};
