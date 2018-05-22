IndexCore = Index = function() {
	var northPanel = null;
	var centerPanel = null;
	var southPanel = null;
	var viewType = null;
	var mainLayoutId = "main_layout";
	var mainMenuPanelId = "main_menu";
	var centerFuncPanel_layoutId = "centerFuncPanel_layout";
	var navigationAccordionId = "main_NavigationAccordion";
	var navigationAccordion = null;
	var currentFirstMenuRegion = 'north';
	//当前菜单区域是否显示  true:显示，false:不显示
	var currentFirstMenuRegionShowHide = true;
	//当前二级菜单位置
	var currentSecondMenuRegion = 'west';
	//当前菜单区域是否显示  true:显示，false:不显示
	var currentSecondMenuRegionShowHide = true;
	//是否全屏
	var fullScreen = false;
	
	// 最顶层主面板
	var mainLayout = new EasyUILayout({
		layoutId :mainLayoutId
	});
	// 中间的功能面板
	var centerFuncPanel_layout = new EasyUILayout({
		layoutId :centerFuncPanel_layoutId
	});
	function init() {
		viewType = FuncPanelUtil.getViewType();
		initFuncPanel();
	};
	//显示与隐藏一级菜单
	function showHideFirstMenuPanelRegion(){
		if (currentFirstMenuRegionShowHide){
			$('body').layout('hidden', currentFirstMenuRegion);
			currentFirstMenuRegionShowHide = false;
		} else {
			$('body').layout('show', currentFirstMenuRegion);
			currentFirstMenuRegionShowHide = true;
		}
	}
	//全屏
	function changeFullScreen() {
		if (fullScreen) {
			$('body').layout('show', 'all');
			fullScreen = false;
			$('#fullScreeBtn').linkbutton({
				iconCls : "v-full",
				text : "全屏"
			});
		} else {
			$('body').layout('hidden', 'all');
			fullScreen = true;
			$('#fullScreeBtn').linkbutton({
				iconCls : "v-full",
				text : "正常"
			});
		}
	};
	// 新增左边菜单导航面板
	function addLeftMenuPanel(content){
		var html = '<div class="content-left font">';
		html += content;
		html += '</div>';
		mainLayout.add(currentSecondMenuRegion,{
					id : 'main_west',
					region : currentSecondMenuRegion,
					width : 202,
					title : '<div class="vnavfont vnavsize"><a href="javascript:void(0);">菜单导航区</a></div>',
					//split : true,
					border : false,
					headerCls:'content-left-background',
					iconCls : 'v-navigation',
					content : html
				});
		$('#main_west').addClass('content-left-background');
		$('#main_layout').layout('setRegionToolVisableState',{region:currentSecondMenuRegion,visible:false});   
		$('#main_west').panel('resize');
	};
	//显示与隐藏菜单面板
	function showHideSecondMenuPanelRegion(){
		if (document.getElementById("main_west")){
			if (currentSecondMenuRegionShowHide){
				$('body').layout('hidden', currentSecondMenuRegion);
				currentSecondMenuRegionShowHide = false;
			} else {
				$('body').layout('show', currentSecondMenuRegion);
				currentSecondMenuRegionShowHide = true;
			}
		}
	}
	// 改变菜单左右位置
	function changeLeftMenuPanelRegion(){
		if (document.getElementById("main_west")){
			var html = $('#main_west').html();
			if (currentSecondMenuRegion == 'west'){
				currentSecondMenuRegion = 'east';
				mainLayout.remove('west');
			} else {
				currentSecondMenuRegion = 'west';
				mainLayout.remove('east');
			}
			mainLayout.add(currentSecondMenuRegion,{
						id : 'main_west',
						region : currentSecondMenuRegion,
						title : '<div class="vnavfont vnavsize"><a href="javascript:void(0);">菜单导航区</a></div>',
						//split : true,
						border : false,
						headerCls:'content-left-background',
						iconCls : 'v-navigation',
						content : html
					});
			$('#main_west').addClass('content-left-background');
			$('#main_layout').layout('setRegionToolVisableState',{region:currentSecondMenuRegion,visible:false});   
			$('#main_west').panel('resize');
			
			$('#showhideSecondMenuBtn').linkbutton({
				iconCls : "v-hide"+currentSecondMenuRegion,
				plain:true
			});
		}
	};
	// 删除左边菜单导航面板
	function removeLeftMenuPanel(){
		mainLayout.remove(currentSecondMenuRegion);
	};
	
	// 新增左边导航器导航面板
	function addNavigationPanel(content){
		centerFuncPanel_layout.add('west',{
					id : 'centerFuncPanel_west',
					region : 'west',
					width : 200,
					title : '导航区',
					split : true,
					border : false,
					iconCls : 'v-navigation',
					content : '<div class="easyui-accordion" border="false" id="'
						+ navigationAccordionId
						+ '" animate="false" fit="true""></div>'
				});
		navigationAccordion = new EasyUIAccordion({
			accordionId:navigationAccordionId
		});
	};
	// 删除左边导航器导航面板
	function removeNavigationPanel(){
		centerFuncPanel_layout.remove('west');
		navigationAccordion = null;
	};
	// 初始化中间的功能面板
	function initFuncPanel() {
		switch (viewType) {
		case "replace":
			//var id = new UUID().toString();
			if (!document.getElementById('func_tool')){
				$("body").append('<div id="func_tool">'
						+'<a id="showhideFirstMenuBtn" style="width:20px;" href="javascript:void(0);" title="显隐一级菜单" onclick="javascript:IndexCore.showHideFirstMenuPanelRegion();"></a>'
						+'<a id="showhideSecondMenuBtn" style="width:20px;" href="javascript:void(0);" title="显隐二级菜单" onclick="javascript:IndexCore.showHideSecondMenuPanelRegion();"></a>'
						//+'<a id="changeBtn" style="width:50px;" href="javascript:void(0);" title="切换菜单位置" onclick="javascript:IndexCore.changeLeftMenuPanelRegion();"></a>'
						+'<a id="fullScreeBtn" style="width:60px;" href="javascript:void(0);" title="全屏显示系统" onclick="javascript:IndexCore.changeFullScreen();"></a>'
						+'</div>');
			}
			centerFuncPanel_layout.add('center',{
				id : 'funcRegion',
				region : 'center',
				border : false,
				title : '功能区',// 暂时去掉
				iconCls : 'v-func',
				tools:'#func_tool'
//				tools : [ {
//					iconCls : 'v-window-max',
//					title : '全屏',
//					id : 'fullScreeBtn',
//					handler : function() {
//						changeScreen();
//					}
//				} ]
			});
			//$.parser.parse('#fullScreeBtn');
			$('#fullScreeBtn').linkbutton({
				iconCls : "v-full",
				text : "全屏",
				plain:true
			});
			$('#fullScreeBtn').removeClass('panel-tool-a');
			$('#changeBtn').linkbutton({
				iconCls : "v-change",
				text : "切换",
				plain:true
			});
			$('#changeBtn').removeClass('panel-tool-a');
			
			$('#showhideSecondMenuBtn').linkbutton({
				iconCls : "v-hide"+currentSecondMenuRegion,
				plain:true
			});
			$('#showhideSecondMenuBtn').removeClass('panel-tool-a');
			
			$('#showhideFirstMenuBtn').linkbutton({
				iconCls : "v-hide"+currentFirstMenuRegion,
				plain:true
			});
			$('#showhideFirstMenuBtn').removeClass('panel-tool-a');
			break;
		case "tabs":
			if (!document.getElementById('func_tool')){
				$("body").append('<div id="func_tool">'
						+'<a id="fullScreeBtn" style="width:60px;" href="javascript:void(0);" title="全屏显示系统" onclick="javascript:IndexCore.changeFullScreen();"></a>'
						+'</div>');
			}
			
			centerFuncPanel_layout.add('center',{
				id : 'funcRegion',
				region : 'center',
				border : false,
				// title : '功能区',
				// iconCls : 'icon-win',
				tools : [ {
					iconCls : 'v-window-max',
					title : '全屏',
					id : 'fullScreeBtn',
					handler : function() {
						changeScreen();
					}
				} ],
				content : getCenterTabsHtml()
			});
			
			/*$('#funcRegion_tab').tabs({
				tools:'#func_tool'
			 });
			
			$('#fullScreeBtn').linkbutton({
				iconCls : "v-full",
				text : "全屏",
				plain:true
			});
			$('#fullScreeBtn').removeClass('panel-tool-a');*/
			break;
		}
	};

	function getCenterTabsHtml() {
		var html = '<div class="easyui-tabs" data-options= "fit:true,border:false,plain:true,pill:true" id="funcRegion_tab">'
					+ '</div>';
		return html;
	};

	return {
		// 用户信息
		userInfo : {
			userId : '',
			userType : ''
		},
		defaultOpenCode : 'zhddjg-_zhddjg_ljczqmt-zhddjg_zdczyzt',
		systemCode:'',
		navigationAccordionId:navigationAccordionId,
		// 当前操作菜单
		currentOperator:{
			nodeSystemCode:'',
			currentMenuCode :'',
			currentMenuId:'',
			currentMenuNavId:'',
			currentNavId:'',
			pmsResourceId:''
		},
		init : function() {
			init();
		},
		addTab:function(plugin, url){
			FuncPanelUtil.addTab(plugin, url);
		},
		closeTab : function(title, callback) {
			FuncPanelUtil.closeTab(title, callback);
		},
		openTab : function(plugin, url) {
			FuncPanelUtil.addTab(plugin, url);
		},
		addLeftMenuPanel:function(content){
			addLeftMenuPanel(content);
		},
		removeLeftMenuPanel:function(){
			removeLeftMenuPanel();
		},
		addNavigationPanel:function(content){
			addNavigationPanel(content);
		},
		removeNavigationPanel:function(){
			removeNavigationPanel();
		},
		changeLeftMenuPanelRegion:function(){
			changeLeftMenuPanelRegion();
		},
		showHideSecondMenuPanelRegion:function(){
			showHideSecondMenuPanelRegion();
		},
		showHideFirstMenuPanelRegion:function(){
			showHideFirstMenuPanelRegion();
		},
		changeFullScreen:function(){
			changeFullScreen();
		}
	}
}();


