FuncPanelUtil = function() {
	var tabs = 1;
	var maxTabsNum = 10;
	var funcRegionTabPanelId = "funcRegion_tab";
	var funcRegionPanelId = "funcRegion";
	var onlyOpenTitle = "主菜单";
	var closeCallback = null;
	var replaceIframeId = null;

	var systemViewType = _systemConfig.systemViewType || "replace";
	var pageViewType = _systemConfig.pageViewType || "pop";
	var menuIdUrlMap =  MapUtil.getInstance();
	function init() {
		switch (systemViewType) {
			case "replace" :
				break;
			case "tabs" :
				tabClose();
				break;
		}

	};
	function setReplaceIframeId(id) {
		replaceIframeId = id;
	};
	function getViewType() {
		return systemViewType;
	};
	function clearIframe(id) {

		if (typeof closeCallback == "function") {
			closeCallback.call(window);
			closeCallback = null;
			return;
		}

		var el = document.getElementById(id);
		if (el) {
			$(el).unbind();
			el.src = "javascript:''";
			try {
				var iframe = el.contentWindow;
				if (typeof iframe.document === 'object') {
					iframe.document.write('');
					iframe.document.clear();
					iframe.document.close();
				}

			} catch (e) {
			}

			el.parentNode.removeChild(el);
			if ($.browser.msie) {
				setTimeout("CollectGarbage()", 1);
			}

		}

	};
	function addTab(plugin, url, params) {
		var id = null;
		if (params){
			id = params.id;
		}
		url = url.replace("{back_dynamic_suffix}", ".smvc");
		if (url.indexOf('?') >= 0) {
			url += '&';
		} else {
			url += '?';
		}
		url += "pmsSession=true&currentMenuId=" + IndexCore.currentOperator.currentMenuId
				+ "&currentMenuNavId=" + IndexCore.currentOperator.currentMenuNavId
				+ "&currentNavId=" + IndexCore.currentOperator.currentNavId
				+ "&currentSystemCode=" + IndexCore.currentOperator.nodeSystemCode;
		
		menuIdUrlMap.add(id,url);
		switch (systemViewType) {
			case "replace" :
				closeCallback = null;
				if (replaceIframeId != null) {
					clearIframe(replaceIframeId);
				}
				//replaceIframeId = new UUID().toString();

				if (!document.getElementById("mainFrame_" + replaceIframeId)) {
					//$('#' + funcRegionPanelId).html(createFrame(replaceIframeId, url));
					$('#' + funcRegionPanelId)[0].innerHTML = createFrame(replaceIframeId, url);
				} else {

					$('#mainFrame_' + replaceIframeId).attr('src', url);
				}

				try {
				} catch (e) {
					VortexUtil.log(e);
				}
				//不用标题
				var title = Loader.generateCurrentNavigationTitle();
				$('#' + funcRegionPanelId).panel('setTitle', title);
				break;
			case "tabs" :
			
				//$('#' + funcRegionTabPanelId).tabs({tabPosition:'bottom'});
				if ($('#' + funcRegionTabPanelId).tabs('existsById', id)) {
					$('#' + funcRegionTabPanelId).tabs('selectById', id);
					$('#refresh').click();
				} else {
					
					tabs++;
					if (tabs > maxTabsNum) {
						$('#' + funcRegionTabPanelId).tabs('close', 1);
					}
					//var uuid = new UUID().toString();
					$('#' + funcRegionTabPanelId).tabs('add', {
						id : id,
						title : plugin,
						closable : true,
						content : createFrame(id, url, true)
						});
				}
				break;
		}

	};
	function createFrame(id, url, needPath) {
		var index = url.substr(0,1);
		if (index == '/'){
			needPath = false;
		}
		var s = '<iframe id="mainFrame_'
				+ id
				+ '" name="mainFrame_' + id +'" scrolling="auto" frameborder="0"  border="0" marginwidth="0" marginheight="0" allowtransparency="yes" src="'
				+ (needPath ? path + '/' : "") + (url ? url : "")
				+ '" style="width:100%;height:100%;"></iframe>';
		return s;
	};

	function closeTab(title, callback) {
		closeCallback = null;
		if (typeof callback == "function") {
			closeCallback = callback;
		}

		switch (systemViewType) {
			case "replace" :
				clearIframe("mainFrame_" + replaceIframeId);
				break;
			case "tabs" :
				$('#' + funcRegionTabPanelId).tabs('close', title);
				break;
		}
	};
	function refreshTab() {
		var currentTab = $('#' + funcRegionTabPanelId).tabs('getSelected');
		var id = currentTab.panel('options').id;
		var iframe = $(currentTab.panel('options').content);
		var src = iframe.attr('src');
		$('#' + funcRegionTabPanelId).tabs('update', {
					tab : currentTab,
					options : {
						content : createFrame(id, src, false)
					}
				});
	};
	function menuCloseTab(action) {
		var alltabs = $('#' + funcRegionTabPanelId).tabs('tabs');
		var currentTab = $('#' + funcRegionTabPanelId).tabs('getSelected');
		var allTabtitle = [];
		$.each(alltabs, function(i, n) {
					allTabtitle.push($(n).panel('options').title);
				})

		switch (action) {
			case "refresh" :
				refreshTab();
				break;
			case "close" :
				var currtab_title = currentTab.panel('options').title;
				if (currtab_title != onlyOpenTitle) {
					$('#' + funcRegionTabPanelId).tabs('close', currtab_title);
				}
				break;
			case "closeall" :
				$.each(allTabtitle, function(i, n) {
							if (n != onlyOpenTitle) {
								$('#' + funcRegionTabPanelId).tabs('close', n);
							}
						});
				break;
			case "closeother" :
				var currtab_title = currentTab.panel('options').title;
				$.each(allTabtitle, function(i, n) {
							if (n != currtab_title && n != onlyOpenTitle) {
								$('#' + funcRegionTabPanelId).tabs('close', n);
							}
						});
				break;
			case "closeright" :
				var tabIndex = $('#' + funcRegionTabPanelId).tabs('getTabIndex', currentTab);

				if (tabIndex == alltabs.length - 1) {
					// alert('亲，后边没有啦 ^@^!!');
					return false;
				}
				$.each(allTabtitle, function(i, n) {
							if (i > tabIndex) {
								if (n != onlyOpenTitle) {
									$('#' + funcRegionTabPanelId).tabs('close', n);
								}
							}
						});

				break;
			case "closeleft" :
				var tabIndex = $('#' + funcRegionTabPanelId).tabs('getTabIndex', currentTab);
				if (tabIndex == 1) {
					// alert('亲，前边那个上头有人，咱惹不起哦。 ^@^!!');
					return false;
				}
				$.each(allTabtitle, function(i, n) {
							if (i < tabIndex) {
								if (n != onlyOpenTitle) {
									$('#' + funcRegionTabPanelId).tabs('close', n);
								}
							}
						});

				break;
			case "exit" :
				$('#tabMenu').menu('hide');
				break;
			case "newwin" :
				var currtab_title = currentTab.panel('options').title;
				if (currtab_title != onlyOpenTitle) {
					
					var id = currentTab.panel('options').id;
					var url = menuIdUrlMap.get(id);
					VortexUtil.goToPage(currtab_title, url);
				}
				break;	
		}
	};
	function createTabMenu() {
		var tabMenuId = 'tabMenu';
		var tmenu = $('<div id="' + tabMenuId
				+ '" class="easyui-menu" style="width: 200px;">'
				+ '<div id="refresh">刷新</div>' + '<div class="menu-sep"></div>'
				+ '<div id="close">关闭</div>' + '<div id="closeall">全部关闭</div>'
				+ '<div id="closeother">除此之外全部关闭</div>'
				+ '<div class="menu-sep"></div>'
				+ '<div id="closeright">当前页右侧全部关闭</div>'
				+ '<div id="closeleft">当前页左侧全部关闭</div>'
				+ '<div class="menu-sep"></div>' + '<div id="newwin">新窗口打开</div>'
				+ '</div>').appendTo('body');
		tmenu.menu({
					onClick : function(item) {
						menuCloseTab(item.id);
					}
				});
		return tabMenuId;
	};
	function tabClose() {
		$('#' + funcRegionTabPanelId).tabs({
			border : false,
			onClose : function(title) {
				FuncPanelUtil.minusTab();
				$('#' + funcRegionTabPanelId).tabs('select', FuncPanelUtil.getTabsTotalNum());
			}
		});
		/* 双击关闭TAB选项卡 */
		$(".tabs-inner").live('dblclick', function() {
					var subtitle = $(this).children(".tabs-closable").text();
					$('#' + funcRegionTabPanelId).tabs('close', subtitle);
				});
		/* 为选项卡绑定右键 */
		$(".tabs-inner").live('contextmenu', function(e, title) {
					e.preventDefault();
					if (!$('#tabMenu').length) {
						createTabMenu();
					}
					$('#tabMenu').menu('show', {
								left : e.pageX,
								top : e.pageY
							});

					var subtitle = $(this).children(".tabs-closable").text();

					$('#tabMenu').data("currtab", subtitle);
					$('#' + funcRegionTabPanelId).tabs('select', subtitle);

					/*
					 * var tabcount = $('#' + funcRegionTabPanelId).tabs('tabs').length; //
					 * tab选项卡的个数 if (tabcount <= 1) {
					 * $('#closeother').attr("disabled", "disabled") .css({
					 * "cursor" : "default", "opacity" : "0.4" }); } else {
					 * $('#closeother').removeAttr("disabled").css({ "cursor" :
					 * "pointer", "opacity" : "1" }); }
					 * 
					 * var tabs = $('#' + funcRegionTabPanelId).tabs('tabs'); // 获得所有的Tab选项卡
					 * var tabcount = tabs.length; // Tab选项卡的个数 var lasttab =
					 * tabs[tabcount - 1]; // 获得最后一个Tab选项卡 var lasttitle =
					 * lasttab.panel('options').tab.text(); // 最后一个Tab选项卡的Title
					 * var currtab_title = $('#mm').data("currtab"); //
					 * 当前Tab选项卡的Title
					 * 
					 * if (lasttitle == currtab_title) {
					 * $('#closeright').attr("disabled", "disabled") .css({
					 * "cursor" : "default", "opacity" : "0.4" }); } else {
					 * $('#closeright').removeAttr("disabled").css({ "cursor" :
					 * "pointer", "opacity" : "1" }); }
					 * 
					 * var onetab = tabs[0]; // 第一个Tab选项卡 var onetitle =
					 * onetab.panel('options').tab.text(); // 第一个Tab选项卡的Title if
					 * (onetitle == currtab_title) {
					 * $('#closeleft').attr("disabled", "disabled").css( {
					 * "cursor" : "default", "opacity" : "0.4" }); } else {
					 * $('#closeleft').removeAttr("disabled").css({ "cursor" :
					 * "pointer", "opacity" : "1" }); }
					 */
					return false;
				});

		// 为主tabs添加关闭前事件，清空iframe里的内存
		$("#" + funcRegionTabPanelId).tabs({
					onBeforeClose : function(title) {
						// $("#" + funcRegionTabPanelId).tabs('select', title);
						// var pp = $("#" + funcRegionTabPanelId).tabs('getSelected');
						// var tabs = pp.panel('options');
						// var parentobj = document.getElementById("mainFrame_"
						// + tabs.id);
						// alert(tabs.title + ":" + tabs.id);
						// clearIframe("mainFrame_" + tabs.id);
						// if (parentobj != null) {
						// parentobj.src = null;
						// parentobj.contentWindow.document.write("");
						// parentobj.contentWindow.close();
						// parentobj.parentNode.removeChild(parentobj);
						// parentobj = null;
						// }
						// if ($.browser.msie) {
						// setTimeout("CollectGarbage()", 1);
						// }

						if (typeof closeCallback == "function") {
							closeCallback.call(window);
							closeCallback = null;
						}
					}
				});
	};
	return {
		init : function() {
			init();
		},
		minusTab:function(){
			tabs --;
		},
		getViewType : function() {
			return getViewType();
		},
		getTabsTotalNum : function() {
			return tabs;
		},
		addTab : function(plugin, url,params) {
			addTab(plugin, url,params);
		},
		closeTab : function(title, callback) {
			closeTab(title, callback);
		},
		openTab : function(plugin, url) {
			addTab(plugin, url);
		}
	};
}();