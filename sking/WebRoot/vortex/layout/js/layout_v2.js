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
require(["jqueryajaxform"],function (){
	ContentLayout.init();
	changePwdPanel.init();
//	window.onload = ContentLayout.iFrameHeight();
});

var ctx = window.location.href.substring(0,window.location.href.indexOf("/")+1);
var menuJson = '';
var fileServerAddress = '';

var ContentLayout = {
	init: function (){
		//初始化界面
		var args=window.location.search;
		var userId = '';
		var businessSystemCode = '';
		args = (args.split("?"))[1];
		var arg = args.split("&");
		userId = (arg[0].split("="))[1];
		businessSystemCode = (arg[1].split("="))[1];
		
		ContentLayout.loadData({
			url: ctx + "cloud/login/fileServerAddress.sa",
//			url: ctx + "cloud/util/fileServerAddress.sa",
			successCallBack: function (data){
				fileServerAddress = data.fileServer;
			}
		});
		ContentLayout.loadData({
			url: ctx + "cloud/management/rest/menu/getmenujsonbyurl.read",
//			url: ctx + "cloud/util/getMenuJsonbyurl.sa",
			params: {
				"userId": userId,
				"systemCode": businessSystemCode
			},
			successCallBack: menuJsonHandler
		});
		
		ContentLayout.mouseEvent("#ihelp",".ihelpCont");
		ContentLayout.mouseEvent("#iadmin",".iadminCont");
		ContentLayout.mouseEvent("#SearchShow",".SearchCont");
	},
	mouseEvent: function(sourceId, targetId){
		$(sourceId).mouseenter(function(){
	        $(targetId).show();
	    });
		$(sourceId).mouseleave(function(){
			$(targetId).hide();
	    });
	},
	clickEvent: function(){		//为新生成的dom元素绑定点击事件
	    $(".no_child").click(function () {
	    	$(".no_child a").css("background-color","#474747");
	    	$(this).children("a").css("background-color","#2a2a2a");
	    	$("#contentFrame").attr("src",$(this).attr("uri"));
	    });
	    $(".secondMenu>li>a").click(function (){
	    	$(".secondMenu>li>a").css("background-color","#333");
	    	$(".no_child a").css("background-color","#474747");
	    	$(this).css("background-color","#222");
	    	$(this).next("ul").toggleClass("expander");
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
//    			window.location = "http://127.0.0.1:8081/cas/logout?service=http://127.0.0.1:8089/login.jsp";
    			$.ajax({
    				url:ctx + 'cloud/login/casServerAddress.sa',
    				type:'get',
    				success:function(data){
    					$.getJSON(data.casServer+'/logout?callback=?');
    				}
    			}); 
    		}
    	});
	},
	toggleMenuBar: function (){		//显示|隐藏 菜单栏
		$(".LeftNav .Hidebtn").toggleClass("on");
        $(".LeftNav").toggleClass("on");
		if( $(".LeftNav").hasClass("on")){
			$(".LeftNav").animate({"width":"15%"});
			$(".RightCont").animate({"width":"85%","left":"15%"});
			$(".Hidebtn span").html("&lt;");
		}else{
			$(".LeftNav").animate({"width":"0"});
			$(".RightCont").animate({"width":"100%","left":"0"});
			$(".Hidebtn span").html("&gt;");
		}
	},
	iFrameHeight: function (){
		$(".ContPart").css("height",(parseInt($("body").css("height")))-(parseInt($(".layout-header").css("height"))));
//		$(".LeftNav,.RightCont").css("height",(parseInt($(".ContPart").css("height")))-56);
//		$(".LeftNav,.RightCont").css("height",(parseInt($(".ContPart").css("height")))-(parseInt($(".layout-header").css("height"))));
		$(".LeftNav,.RightCont").css("height","100%");
		$("#contentFrame").css("height",$(".RightCont").css("height"));
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
		firstMenuId: "firstMenu",
		secondMenuId: "secondMenu",
		thirdMenuId: "thirdMenu",
		filePath: fileServerAddress+"/cloudFile/common/downloadFile"
	};
	var menu = new MenuJson(config);
	
	$(".firstMenu>li").on("click", function(){
        $(".secondMenu").html("");
        $(".firstMenu>li").css("background-color","#222");
        $(this).css("background-color","#333");
        if(menuJson.children != null && menuJson.children.length > 0){
		    for(var i = 0;i<menuJson.children.length;i++){
		        if ($(this).attr("menuId") == menuJson.children[i].id) {
		        	$(".secondMenu").attr("parentId",menuJson.children[i].id);
		        	menu.loadOtherLevelMenu(menuJson.children[i],"secondMenu",menuJson.children[i].id);
		        }
		    };
		    ContentLayout.clickEvent();
		};
    });
}

//修改密码界面
var changePwdPanel = {
	formId: 'form',
	form: null,
	init: function (){
		var t = this;
		$("#changePassword").click(function (){
	    	$(".cover-page").css("display","block");
	    });
	    
	    $(".closeBtn").click(function (){
	    	$(".cover-page").css("display","none");
	    });
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
			submitHandler: function (){
				$("#"+t.formId).ajaxSubmit({
					type: "post",
					url: ctx + "cloud/management/rest/user/changepassword.read",
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
			$(".resultMsg").html(data.errMsg+" 跳转到登录界面...");
//			window.location = "https://www.vortex.com:8443/cas/logout?service=http://127.0.0.1:8089/login.jsp";
			$.ajax({
				url:ctx + 'cloud/login/casServerAddress.sa',
				type:'get',
				success:function(data){
					$.getJSON(data.casServer+'/logout?callback=?');
				}
			});
		}else {
			$(".resultMsg").css("color","#f00");
			$(".resultMsg").html(data.errMsg);
		}
	}
}

var logoutCallback=function(data){
	if(data.result==='success'){
		location.href=ctx + 'login.jsp';
	}	
}