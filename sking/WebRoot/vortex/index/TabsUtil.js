TabsUtil = function() {
	var tabs = 1;
	var maxTabsNum = 8;
	var tabName = "main_panel";
	var onlyOpenTitle = "主面板";
	var closeCallback = null;
	var replaceIframeId = null;

	var systemViewType = _systemConfig.systemViewType || "replace";
	var pageViewType = _systemConfig.pageViewType || "pop";
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
			el.src = '';
			// el.src = null;
			// el.src = 'about:blank';
			try {
				var iframe = el.contentWindow;
				if (typeof iframe.document === 'object') {
					// iframe.document.open();
					iframe.document.write('');
					iframe.document.clear();
					iframe.document.close();
				}

			} catch (e) {
			};
			// 以上可以清除大部分的内存和文档节点记录数了
			// 最后删除掉这个 iframe 就哦咧。
			// document.body.removeChild(el);
			// $('#' + id).remove();// 删除iframe

			el.parentNode.removeChild(el);
			if ($.browser.msie) {
				setTimeout("CollectGarbage()", 1);
			}

			// replaceIframeId = null;
		}

	};
	function addTab(plugin, url, icon) {

		if (url.indexOf('?') >= 0) {
			url += '&';
		} else {
			url += '?';
		}
		url += "pmsSession=true&currentMenuId=" + Index.getCurrentMenuId()
				+ "&currentMenuNavId=" + Index.getCurrentMenuNavId()
				+ "&currentNavId=" + Index.getCurrentNavId()
				+ "&currentSystemCode=" + Index.getNodeSystemCode();
		switch (systemViewType) {
			case "replace" :
				// $.messager.progress({
				// title : '加载提示',
				// msg : '正在加载'
				// });
				// $('#' + tabName + "_iframe").attr('src', "");
				// $('#' + tabName + "_iframe").attr('src', url);
				closeCallback = null;
				if (replaceIframeId != null) {
					clearIframe(replaceIframeId);
				}
				replaceIframeId = new UUID().toString();

				// $('#main_center').html(Index.getCenterReplaceHtml());
				if (!document.getElementById("mainFrame_" + replaceIframeId)) {
					$('#main_center').html(createFrame(replaceIframeId, url));
				} else {

					$('#mainFrame_' + replaceIframeId).attr('src', url);
					// var iframe = document.getElementById("mainFrame_"
					// + replaceIframeId);
					// iframe.contentWindow.location.replace(url);
				}

				// var iframe = document.getElementById("mainFrame_"
				// + replaceIframeId);
				try {
					// iframe.contentWindow.document.write('');
					// iframe.contentWindow.document.close();

					// iframe.contentWindow.location.replace(url);
					// iframe.src = "";
					// iframe.src = url;
				} catch (e) {
					VortexUtil.log(e);
				}
				//不用标题
				//$('#main_center').panel('setTitle', "" + plugin + "");
				break;
			case "tabs" :
			
				$('#' + tabName).tabs({tabPosition:'bottom'});
			
				if ($('#' + tabName).tabs('exists', plugin)) {
					$('#' + tabName).tabs('select', plugin);
					$('#refresh').click();
				} else {
					
					tabs++;
					if (tabs > maxTabsNum) {
						$('#' + tabName).tabs('close', 1);
					}
					var uuid = new UUID().toString();
					$('#' + tabName).tabs('add', {
						id : uuid,
						title : plugin,
						closable : true,
						content : createFrame(uuid, url, true)
							// tools : [{
							// iconCls : 'icon-mini-refresh',
							// handler : function() {
							// // var currentTab = $('#' +
							// // tabName)
							// // .tabs('getSelected');
							// // var iframe =
							// // $(currentTab.panel('options').content);
							// // var id =
							// // currentTab.panel('options').id;
							// // var src = iframe.attr('src');
							// // $('#' +
							// // tabName).tabs('update', {
							// // tab : currentTab,
							// // options : {
							// // content : createFrame(id,
							// // tabs, src,
							// // false)
							// // }
							// // });
							//
							// refreshTab();
							// }
							// }]
						});
				}
				break;
		}

	};
	function createFrame(id, url, needPath) {
		var s = '<iframe id="mainFrame_'
				+ id
				+ '" name="mainFrame_' + id +'" scrolling="auto" frameborder="0"  border="0" marginwidth="0" marginheight="0" allowtransparency="yes" src="'
				+ (needPath ? path + '/' : "") + (url ? url : "")
				+ '" style="width:100%;height:100%;"></iframe>';
		return s;
	};

	function clone3(obj) {
		function Clone() {
		}
		Clone.prototype = obj;
		var o = new Clone();
		for (var a in o) {
			if (typeof o[a] == "object") {
				o[a] = clone3(o[a]);
			}
		}
		return o;
	}
	function closeTab(title, callback) {
		closeCallback = null;
		if (typeof callback == "function") {
			closeCallback = callback;
		}

		switch (systemViewType) {
			case "replace" :
				// $('#' + tabName + "_iframe").attr('src', '');
				// clearIframe(tabName + "_iframe");
				// $('#mainFrame_' + replaceIframeId).attr('src', '');
				clearIframe("mainFrame_" + replaceIframeId);
				break;
			case "tabs" :
				$('#' + tabName).tabs('close', title);
				break;
		}
	};
	function refreshTab() {
		var currentTab = $('#' + tabName).tabs('getSelected');
		var id = currentTab.panel('options').id;
		var iframe = $(currentTab.panel('options').content);
		var src = iframe.attr('src');
		$('#' + tabName).tabs('update', {
					tab : currentTab,
					options : {
						content : createFrame(id, src, false)
					}
				});
	};
	function menuCloseTab(action) {
		var alltabs = $('#' + tabName).tabs('tabs');
		var currentTab = $('#' + tabName).tabs('getSelected');
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
					$('#' + tabName).tabs('close', currtab_title);
				}
				break;
			case "closeall" :
				$.each(allTabtitle, function(i, n) {
							if (n != onlyOpenTitle) {
								$('#' + tabName).tabs('close', n);
							}
						});
				break;
			case "closeother" :
				var currtab_title = currentTab.panel('options').title;
				$.each(allTabtitle, function(i, n) {
							if (n != currtab_title && n != onlyOpenTitle) {
								$('#' + tabName).tabs('close', n);
							}
						});
				break;
			case "closeright" :
				var tabIndex = $('#' + tabName).tabs('getTabIndex', currentTab);

				if (tabIndex == alltabs.length - 1) {
					// alert('亲，后边没有啦 ^@^!!');
					return false;
				}
				$.each(allTabtitle, function(i, n) {
							if (i > tabIndex) {
								if (n != onlyOpenTitle) {
									$('#' + tabName).tabs('close', n);
								}
							}
						});

				break;
			case "closeleft" :
				var tabIndex = $('#' + tabName).tabs('getTabIndex', currentTab);
				if (tabIndex == 1) {
					// alert('亲，前边那个上头有人，咱惹不起哦。 ^@^!!');
					return false;
				}
				$.each(allTabtitle, function(i, n) {
							if (i < tabIndex) {
								if (n != onlyOpenTitle) {
									$('#' + tabName).tabs('close', n);
								}
							}
						});

				break;
			case "exit" :
				$('#tabMenu').menu('hide');
				break;
		}
	};
	function createTabMenu() {
		var tabMenuId = 'tabMenu';
		var tmenu = $('<div id="' + tabMenuId
				+ '" class="easyui-menu" style="width: 150px;">'
				+ '<div id="refresh">刷新</div>' + '<div class="menu-sep"></div>'
				+ '<div id="close">关闭</div>' + '<div id="closeall">全部关闭</div>'
				+ '<div id="closeother">除此之外全部关闭</div>'
				+ '<div class="menu-sep"></div>'
				+ '<div id="closeright">当前页右侧全部关闭</div>'
				+ '<div id="closeleft">当前页左侧全部关闭</div>'
				+ '<div class="menu-sep"></div>' + '<div id="exit">退出</div>'
				+ '</div>').appendTo('body');
		tmenu.menu({
					onClick : function(item) {
						menuCloseTab(item.id);
					}
				});
		return tabMenuId;
	};
	function tabClose() {
		/* 双击关闭TAB选项卡 */
		$(".tabs-inner").live('dblclick', function() {
					var subtitle = $(this).children(".tabs-closable").text();
					$('#' + tabName).tabs('close', subtitle);
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
					$('#' + tabName).tabs('select', subtitle);

					/*
					 * var tabcount = $('#' + tabName).tabs('tabs').length; //
					 * tab选项卡的个数 if (tabcount <= 1) {
					 * $('#closeother').attr("disabled", "disabled") .css({
					 * "cursor" : "default", "opacity" : "0.4" }); } else {
					 * $('#closeother').removeAttr("disabled").css({ "cursor" :
					 * "pointer", "opacity" : "1" }); }
					 * 
					 * var tabs = $('#' + tabName).tabs('tabs'); // 获得所有的Tab选项卡
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
		$("#" + tabName).tabs({
					onBeforeClose : function (title,index){
						if (typeof closeCallback == "function") {
							closeCallback.call(window);
							closeCallback = null;
						}
						//清理iframe内存
						var currentTab = $('#' + tabName).tabs('getTab',index);
						var arr = currentTab.find("iframe");
						if(arr!=null && arr.length>0){
							var el = document.getElementById(arr[0].id);
							if (el) {
								$(el).unbind();
								
								try {
									var iframe = el.contentWindow;
									if (typeof iframe.document === 'object') {
										// iframe.document.open();
										iframe.document.write('');
										iframe.document.clear();
										iframe.document.close();
									}
									el.src = '';
								} catch (e) {
								}
								el.parentNode.removeChild(el);
								if ($.browser.msie) {
									setTimeout("CollectGarbage()", 1);
								}
							}
						}
					}
				});
	};
	return {
		init : function() {
			init();
		},
		getViewType : function() {
			return getViewType();
		},
		minusTab : function() {
			tabs--;
		},
		getTabsTotalNum : function() {
			return tabs;
		},
		addTab : function(plugin, url) {
			addTab(plugin, url);
		},
		closeTab : function(title, callback) {
			closeTab(title, callback);
		},
		tabClose : function() {
			tabClose();
		},
		openTab : function(plugin, url) {
			addTab(plugin, url);
		},
		setReplaceIframeId : function(id) {
			setReplaceIframeId(id);
		}
	};
}();