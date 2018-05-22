function getWelcomeImage() {
	var url = path + '/vortex/framework/images/male.gif';
	// if (Index.userInfo) {
	// switch (Index.userInfo.superadmin) {
	// case '1' :
	// url = path + '/vortex/framework/images/admin.gif';
	// break;
	// default :
	// if (Index.userInfo.sexy == '2') {
	// url = path + '/vortex/framework/images/female.gif';
	// }
	// break;
	// }
	// }
	return url;
};

// 初始化欢迎菜单项
var welcomeEl = null;
function initWelcomeHtml() {
	welcomeEl = document.getElementById('welcome');
	if (!welcomeEl) {
		return;
	}
	var requestParam = {};
	// 添加用户,做权限
	requestParam.userId = Index.getUserId();
	requestParam.userType = Index.getUserType();
	$.post(_systemConfig.loadUserInfoURL, requestParam, function(data) {
				if (_systemConfig.debug) {
					VortexUtil.log(data);
				}
				Index.userInfo = data;
				refreshWelcomeHtml();
			}, "json");
};

function refreshWelcomeHtml() {
	if (welcomeEl) {
		// welcomeEl.innerHTML = '<span style="position:relative;top:-2px;"><img
		// src="'
		// + getWelcomeImage()
		// + '"/>欢迎您:'
		// + (Index.userInfo ? Index.userInfo.name : '')
		// + '<b></b></span>';
		//dejunx update 2013-03-21
		if (Index.getUserType() == 'CyqyUser') {
			/*welcomeEl.innerHTML = '<span style="position:relative;top:-2px;">欢迎您：'
				+ (Index.userInfo ? Index.userInfo.name : '管理员')
				+ '<b></b></span>';*/
			welcomeEl.innerHTML = '您好：'
				+ (Index.userInfo ? Index.userInfo.name : '管理员')
				+ '';
		} else {
			/*welcomeEl.innerHTML = '<span style="position:relative;top:-2px;">欢迎您：'
				+ '<a href="javascript:void(0)" onclick="updateUserPsw();">'
				+ (Index.userInfo ? Index.userInfo.name : '管理员')
				+ '</a><b></b></span>';*/
			welcomeEl.innerHTML = '您好：'
				+ '<a href="javascript:void(0)"  style="color:#FFF" onclick="updateUserPsw();" >'
				+ (Index.userInfo ? Index.userInfo.name : '管理员')
				+ '</a>';
		}
		
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
	var userId = Index.getUserId();
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
