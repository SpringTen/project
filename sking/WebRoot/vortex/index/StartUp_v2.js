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
	$("#createUserInSystem").bind("click",function(e){
		 e.preventDefault();
         if (!userInSystemMenu){
        	 refreshUserInSystemHtml();
         }
         userInSystemMenu.menu('show', {
             left:e.pageX-20,
             top:e.pageY+15
         });
		});
	var requestParam = {};
	// 添加用户,做权限
	requestParam.userId = IndexCore.userInfo.userId;
	$.post(_systemConfig.loadUserInSystem, requestParam, function(data) {
				if (_systemConfig.debug) {
					VortexUtil.log(data);
				}
				userInSystem = data;
				if (userInSystem.length==1 && systemCode==userInSystem[0].code){
					$("#changeSystem").hide();
				}
			}, "json");
	
}
var userInSystemMenu = null;
var nodeSystems = MapUtil.getInstance();
function refreshUserInSystemHtml(){
	var openUrl = null;
	userInSystemMenu = $('<div style="width:200px;"/>').appendTo('body');
	userInSystemMenu.menu({
        onClick: function(item){
        	openUrl = VortexUtil.updateUrlKey(currentHref,"systemCode",item.id);
        	if (item.id == 'exitSystem'){
        		logout();
        	} else{
        		var nodeSystem = nodeSystems.get(item.id);
        		if (nodeSystem.funcUrl != null && nodeSystem.funcUrl != ""){
        			VortexUtil.openWin(nodeSystem.funcUrl,screen.availWidth-10,screen.availHeight-60,item.id);
        		} else {
        			VortexUtil.openWin(openUrl,screen.availWidth-10,screen.availHeight-60,item.id);
        		}
        		
        	}
        }
    });
	$.each(userInSystem, function(i, n) {
		if (n.code != systemCode){
			userInSystemMenu.menu('appendItem', {
		    	 id:n.code,
		         text: n.shortName == null?n.name:n.shortName,
		         name: n.shortName == null?n.name:n.shortName
		     });
			$('#'+n.code).tooltip({
			    position: 'left',
			    content: n.name
			});
			
			nodeSystems.add(n.code,  n);
		}
	});
	/*userInSystemMenu.menu('appendItem', {
   	 	id:'exitSystem',
        text: "退出系统",
        name: "退出系统"
    });*/
}