function getWelcomeImage() {
	var url = path + '/resources/themes/images/man.png';
	 if (Index.userInfo) {
		 switch (Index.userInfo.superadmin) {
			 case '1' :
				 url = path + '/resources/themes/images/admin.png';
				 break;
			 default :
				 if (Index.userInfo.sexy == '2') {
					 url = path + '/resources/themes/images/woman.png';
				 }
			 break;
		 }
	 }
	return url;
};

// 初始化欢迎菜单项
var welcomeEl = null;
var welcomeImageEl = null;
function initWelcomeHtml() {
	welcomeEl = document.getElementById('welcome');
	welcomeImageEl = document.getElementById('welcomeImage');
	if (!welcomeEl) {
		return;
	}
	var requestParam = {};
	// 添加用户,做权限
	requestParam.userId = IndexCore.userInfo.userId;
	requestParam.userType = IndexCore.userInfo.userType;
	$.post(_systemConfig.loadUserInfoURL, requestParam, function(data) {
				if (_systemConfig.debug) {
					VortexUtil.log(data);
				}
				//Index.userInfo = data;
				Index.userInfo = $.extend({}, Index.userInfo,data);
				refreshWelcomeHtml();
			}, "json");
};

function refreshWelcomeHtml() {
	if (welcomeEl) {
		welcomeEl.innerHTML = (Index.userInfo ? Index.userInfo.name : '管理员');
		welcomeImageEl.src = getWelcomeImage();
	}
};

// ------End------

// -------修改密码-----

function updateUserPsw() {
	//$('#user_window').window('setTitle', "修改密码");
	//$('#user_window').window('open'); // open a window
	$('#user_window').dialog({
		title:'修改密码',
		width:400,
		modal:true,
		height:180,
		top:(parseInt($('#main_layout').height()- 180)/2 ),
		left:(parseInt($('#main_layout').width()- 400)/2),
		buttons:'#bb',
		onClose:function(){
		}
	});
	clearUserForm();
}
function saveConfigPageWindow() {
	var userId = IndexCore.userInfo.userId;
	var oldPsw = $('#oldPsw').val();
	var newPsw = $('#newPsw').val();
	var secondPsw = $('#secondPsw').val();
	if (oldPsw.isNull() || newPsw.isNull() || secondPsw.isNull()) {
		$.messager.show({
					title : '提示',
					msg : '带*的必填',
					timeout : 2000,
					showType : 'slide'
				});
		return;
	}
	if (newPsw != secondPsw) {
		$.messager.show({
					title : '提示',
					msg : '新密码两次输入的不一致',
					timeout : 2000,
					showType : 'slide'
				});
		return;
	}
	var requestParam = {};
	// 添加用户,做权限
	requestParam.userId = userId;
	requestParam.oldPsw = oldPsw;

	requestParam.newPsw = newPsw;
	requestParam.secondPsw = secondPsw;
	$.post(path + '/admin/user/updatePsw/' + userId, requestParam, function(
					data) {
				$.messager.show({
							title : '提示',
							msg : data.operateMessage,
							timeout : 2000,
							showType : 'slide'
						});
				if (data.operateSuccess) {
					closeConfigPageWindow();
				}
			}, "json");

}
function closeConfigPageWindow() {
	clearUserForm();
	//$('#user_window').window('close'); // close a window
	$('#user_window').dialog('close'); // close a window
}
function clearUserForm() {
	$('#oldPsw').val('');
	$('#newPsw').val('');
	$('#secondPsw').val('');
}
function logout() {
	$.messager.confirm('警告', '确定要退出系统吗?', function(r) {
		if (r) {
			self.location = path+ '/pms/logout';
		}

	});

}
var userInSystem = [];
function createUserInSystem(){
	/*$("#createUserInSystem").bind("click",function(e){
		 e.preventDefault();
         if (!userInSystemMenu){
        	 refreshUserInSystemHtml();
         }
         userInSystemMenu.menu('show', {
             left:0,
             top:0
         });
		});*/
	 if (!userInSystemMenu){
		 var requestParam = {};
			// 添加用户,做权限
			requestParam.userId = IndexCore.userInfo.userId;
			$.post(_systemConfig.loadUserInSystem, requestParam, function(data) {
						if (_systemConfig.debug) {
							VortexUtil.log(data);
						}
						userInSystem = data;
						/*if (userInSystem.length==1 && systemCode==userInSystem[0].code){
							$("#changeSystem").hide();
						}*/
						
						refreshUserInSystemHtml();
					}, "json");
	 }
	
	
}
var userInSystemMenu = null;
/**
 * easyUI加载主菜单
 */
/*function refreshUserInSystemHtml(){
	
     
	var openUrl = null;
	userInSystemMenu = $('<div id="allMenu" style="width:200px;z-index: 99999;"/>').appendTo('body');
	userInSystemMenu.menu({
        onClick: function(item){
        	openUrl = VortexUtil.updateUrlKey(currentHref,"systemCode",item.id);
        	if (item.id == 'exitSystem'){
        		logout();
        	} else{
        		//VortexUtil.openWin(openUrl,screen.availWidth-10,screen.availHeight-60,item.id);
        	}
        	var id = item.id;
        	var ids = id.split('-');
        	if (ids.length > 1){
        		var nodeSystemCode = ids[0];
        		var menuCode = ids[ids.length - 1];
        		Loader.clickMenu(menuCode);
        	}
        }
    });
	
	 var p = $('#funcRegion_tab').tabs().tabs('tabs')[0];
	 
     var mb = p.panel('options').tab.find('a.tabs-inner');
     mb.menubutton({
         menu:'#allMenu'
        	 ,
         iconCls:'icon-help'
     }).click(function(){
         $('#funcRegion_tab').tabs('select',0);
     });
     
	$.each(userInSystem, function(i, n) {
			userInSystemMenu.menu('appendItem', {
		    	 id:n.code,
		         text: n.shortName == null?n.name:n.shortName,
		         name: n.shortName == null?n.name:n.shortName
		     });
			
			Loader.loadSystemInfo(n.code);
	});
	//隐藏加载信息
	$.mask.hide();
	
}*/

function refreshUserInSystemHtml(){
	/*var p = $('#funcRegion_tab').tabs().tabs('tabs')[0];
	 
    var mb = p.panel('options').tab.find('a.tabs-inner');
    mb.linkbutton({});
    mb.click(function(){
    	$('#funcRegion_tab').tabs('select',0);
    });
    mb.mouseenter(function(){
    	$("#allMenu").show();
    });
    mb.mouseleave(function(){
    	$("#allMenu").hide();
    });*/
    
    $.each(userInSystem, function(i, n) {
    	var html = '';
    	html += '<li id="'+n.code+'" class="nextmenu_sys" style="float:left;height:40px;line-height:40px;position:relative;">';
    	html += 	'<span style="padding:0px 15px;">'+(n.shortName == null?n.name:n.shortName)+'</span>';
    	html += '</li>';
    	$(html).appendTo($("#nav-ul"));
		//加载菜单
		Loader.loadSystemInfo(n.code);
    	
    	/*var html ='';
		html += '<li>';
		html += 	'<div id="m01" class="first-menu-item" hidefocus="hidefocus">';
		html +=     	'<i class="iconfont" style="width: 30px;height: 30px;">';
		if(n.navImg){
			html += 		'<img src="'+_systemConfig.downloadFileInlineUrl.replace("{id}",n.navImg)+'" width="100%" height="100%"/>';
		}
		html +=         '</i>';
		html +=         '<span class="first-menu-title">'+(n.shortName == null?n.name:n.shortName)+'</span>';
		html += 	'</div>';
		html +=     '<div id="'+n.code+'" class="second-panel" style=" top: -22px; left: 200px;display:none;">';
		
		html += 	'</div>';
		html += '</li>';
		$(html).appendTo($("#first_menu"));
		//加载菜单
		Loader.loadSystemInfo(n.code);*/
    });
    $("#nav-ul li").hover(function () {
		if($(window).width()-$(this).offset().left<160*3
				&&$(this).offset().left>160*3){
					if($(this).find(".one-menu").hasClass("left_0")){
						$(this).find(".one-menu").removeClass("left_0").addClass("right_0");
						$(this).find(".two-menu").removeClass("left_100").addClass("right_100");
						$(this).find(".three-menu").removeClass("left_100").addClass("right_100");
					}
				}
			var nextUl = $(this).children("ul");
			if(nextUl.length>0){
				nextUl.show();
			}
		 },
		function () {
			var nextUl = $(this).children("ul");
			if(nextUl.length>0){
				nextUl.hide();
			}
		});
    	$(".nextmenu").mouseenter(function(){
			var nextUl = $(this).children("ul");
			if(nextUl.length>0){
				nextUl.show();
			}
    	});
		$(".nextmenu").mouseleave(function(){
			var nextUl = $(this).children("ul");
			if(nextUl.length>0){
				nextUl.hide();
			}
		});
		
		//打开默认
		if(IndexCore.defaultOpenCode){
			$("#"+IndexCore.defaultOpenCode).click();
		}
    //隐藏加载信息
	$.mask.hide();
}


var menu_codes = MapUtil.getInstance();
var menu_ids = MapUtil.getInstance();
function parseAllMenu(obj,nodeSystemCode) {
	// 从节点系统中解析子菜单
	$.each(obj.childrens, function(i, n) {
				if (n.nodeType == 'menu') {
					menu_codes.add(n.code, n);
					menu_ids.add(n.id, n);
					if (n.levelIndex == 1){
						var itemEl = $('#'+nodeSystemCode)[0];  // the menu item element
						var item = userInSystemMenu.menu('getItem', itemEl);
						userInSystemMenu.menu('appendItem', {
							 parent: item.target,  // the parent item element	
					    	 id:nodeSystemCode+"-" + n.code,
					         text: n.name,
					         name: n.name
					     });
					} else if (n.levelIndex == 2){
						var firstMenu =  menu_ids.get(n.parentId);
						var itemEl = $('#'+nodeSystemCode+"-"+firstMenu.code)[0];  // the menu item element
						var item = userInSystemMenu.menu('getItem', itemEl);
						userInSystemMenu.menu('appendItem', {
							 parent: item.target,  // the parent item element	
					    	 id:nodeSystemCode+"-" + firstMenu.code+ "-" + n.code,
					         text: n.name,
					         name: n.name
					     });
					} else if (n.levelIndex == 3){
						var secondMenu =  menu_ids.get(n.parentId);
						var firstMenu =  menu_ids.get(secondMenu.parentId);
						
						var itemEl = $('#'+nodeSystemCode+"-"+firstMenu.code+"-"+secondMenu.code)[0];  // the menu item element
						var item = userInSystemMenu.menu('getItem', itemEl);
						userInSystemMenu.menu('appendItem', {
							 parent: item.target,  // the parent item element	
					    	 id:nodeSystemCode+"-"+ firstMenu.code+ "-"+secondMenu.code + n.code,
					         text: n.name,
					         name: n.name
					     });
					}
					
					
					if (n.childrens) {
						parseAllMenu(n,nodeSystemCode);
					}
				}
			});
};