/*
*Modify by yzq
*Modify on 2016.06.23
*/
require.config({
	baseUrl: ctx,
	paths: configPaths,
	shim: scene_layout,
	map: configMap
});
require(["jquery-1.10.0", "jqueryajaxform"],function (){
	$(function () {
		ContentLayout.init();
        App.initHelpers('slick');
        changePwdPanel.init();
        
        $("button[data-toggle='dropdown']").click(function (){
        	$("body").append("<iframe id='changeUrlFrame' style='display:none;' src='"+ ctx +"cloud/util/fileServerAddress.sa'></iframe>");
        	$("#changeUrlFrame").onLoad = function (){
        		$("#changeUrlFrame").remove();
        	};
        });
        
        // 父子界面通信（不支持IE8及其以下）
        // 解决session过期ifame中出现登录界面的问题
        window.addEventListener('message',function(e){   
            if(e.data==='logout'){
                window.location.reload();
            }
        },false);
    });
});

var ctx = window.location.href.substring(0,window.location.href.lastIndexOf("/")+1);
var menuJson = '';
var fileServerAddress = '';
var welcomeMenuId = '';
var defaultWelcomeId = '';

var ContentLayout = {
	init: function (){
		//初始化界面
		var args=window.location.search;
		var userId = '';
		var businessSystemCode = '';
		args = (args.split("?"))[1];
		var arg = args.split("&");
		if((arg[0].split("="))[0] == 'userId'){
			userId = (arg[0].split("="))[1];
			businessSystemCode = (arg[1].split("="))[1];
		}else {
			userId = (arg[1].split("="))[1];
			businessSystemCode = (arg[0].split("="))[1];
		}
		
		ContentLayout.loadData({
			url: ctx + "cloud/util/fileServerAddress.sa",
			successCallBack: function (data){
				fileServerAddress = data.fileServer;
			}
		});
		ContentLayout.loadData({
			url: ctx + "cloud/login/logininfo.sa",
			successCallBack: function (data){
				if(data.name != ""){
					$("#username").html(data.name);
				}else {
					$("#username").html("未知用户");
				}
				
				if(data.photoId != ""){
					$("#photoId").prop("src",fileServerAddress+"/cloudFile/common/downloadFile?id=" + data.photoId);
				}
			}
		});
		ContentLayout.loadData({
			url: ctx + "cloud/util/getMenuJson.sa",
			params: {
				"userId": userId,
				"systemCode": businessSystemCode
			},
			successCallBack: menuJsonHandler
		});
		
	},
	/**
	 * 加载数据
	 * config: {url:'',params:{},successCallBack:function()}加载数据配置参数
	 * */
	loadData: function(config){
		$.ajax({
			url : config.url,
			type: "post",
			data : config.params,
			dataType : "json",
			success: config.successCallBack
		});
	},
	exitSystem: function(){		//退出系统
		VortexShow.confirm({
    		infoString: "确认退出系统吗？",
    		callback: function (){
    			$.ajax({
    				url:ctx + 'cloud/util/casServerAddress.sa',
    				type:'get',
    				success:function(data){
    					$.getJSON(data.casServer+'/logout?callback=?');
    				}
    			});
    		}
    	});
	},
	iFrameHeight: function (){
		$("#contentFrame").height($("main").height());
	},
	setWelcomPage: function (){
		if(welcomeMenuId == ''){
			welcomeMenuId = defaultWelcomeId;
		}
		var $element = $("li[menuid="+ welcomeMenuId +"]");
		var welcomeUrl = $element.attr("uri");
		if(welcomeUrl){
			$("#contentFrame").attr("src",welcomeUrl);
		}
		/*$element.parent("ul").parent("li").addClass("open");
		$element.addClass("checkedMenu");*/
		if($element.parentsUntil("div")){
			for(var i=0;i<$element.parentsUntil("div").length;i++){
				if($($element.parentsUntil("div")[i]).attr("menuid")){
					$($element.parentsUntil("div")[i]).addClass("open");
				}
			}
		}
//		$element.parentsUntil("div").find("li").addClass("open");
		$element.addClass("checkedMenu");
	}
}
/**
 * 菜单JSON返回后的处理函数
 *rst: 返回的JSON对象
 * */
function menuJsonHandler(rst) {
	menuJson = JSON.parse(rst.data);
	var config = {
		menuObj : menuJson,
		container : "nav-main",
		parentId : "",
		menuLevel : "0"
	}
	var menu = new MenuJson(config);
	
//	showMenu(menuJson,"nav-main",'',0);
	
	/*$(".nav-main>li>a").click(function (){
		$(this).parent().toggleClass('open');
	})*/
	
	$(".no_child").click(function () {
    	$("#contentFrame").attr("src",$(this).attr("uri"));
    	$(".no_child").removeClass("checkedMenu");
    	$(this).addClass("checkedMenu");
    });
	
	OneUI.init('uiNav');
	ContentLayout.setWelcomPage();
}

//修改密码界面
var changePwdPanel = {
	formId: 'form',
	form: null,
	init: function (){
		var t = this;
		/*$("#changePassword").click(function (){
	    	$(".cover-page").css("display","block");
	    });
	    
	    $(".closeBtn").click(function (){
	    	$(".cover-page").css("display","none");
	    });*/
		$("span.error").html("");
	    $("#"+t.formId).validate({
	    	onkeyup:false,
	    	rules: {
	    		oldPassword: {
		    		required: true
		    	},
		    	newPassword: {
		    		required: true
		    	},
		    	confirm_newPassword: {
		    		required: true,
		    		equalTo: "#newPassword"
		    	}
	    	},
	    	messages: {
	    		oldPassword: {
	    			required: '不能为空'
				},
				newPassword: {
					required: '不能为空'
				},
				confirm_newPassword : {
					required: '不能为空',
					equalTo : "密码不一致"
				}
			},
			errorPlacement: function (error, element) {
				console.log(error[0].innerHTML);
				$(element).siblings("span").html(error[0].innerHTML);
				if(error[0].innerHTML == ""){
					$(element).removeClass("input-error");
				}else {
					$(element).addClass("input-error");
				}
			},
			success:function (element) {
			},
			submitHandler: function (){
				$("#"+t.formId).ajaxSubmit({
					type: "post",
					url: ctx + "cloud/util/changePassword.sa",
					success: t.returnBack
				});
			}
	    });
	},
	formSubmit: function (){
		var t = this;
		$("#"+t.formId).submit();
	},
	returnBack: function (data){
		if(data.result == "0"){
			$(".resultMsg").css("color","#0f0");
			$(".resultMsg").html(data.msg+" 跳转到登录界面...");

			$.ajax({
				url:ctx + 'cloud/util/casServerAddress.sa',
				type:'get',
				success:function(data){
					$.getJSON(data.casServer+'/logout?callback=?');
				}
			});
		}else {
			$(".resultMsg").css("color","#f00");
			$(".resultMsg").html(data.msg);
		}
	}
}

var logoutCallback=function(data){
	if(data.result==='success'){
		location.href=ctx + 'login.jsp';
	}	
}