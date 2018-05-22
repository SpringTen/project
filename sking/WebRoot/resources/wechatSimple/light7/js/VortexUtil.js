VortexUtil = function() {
	var controlMap = {};
	var controlId = 0;

	function getControlID() {
		return ++controlId;
	}
	;
	function getControlCode() {
		var id = this.getControlID();
		return 'vortexControl_' + id;
	}
	;
	function regControl(id, control) {
		controlMap[id] = control;
	}
	;

	function arrayIndexOf(array, value) {
		if (array == null || array == undefined) {
			return -1;
		}

		$.each(array, function(i, n) {
			if (n == value) {
				return i;
			}
		});
		return -1;
	}
	;
	function $f(params) {
		if (!params) {
			return;
		}
		var id = params.controlId;
		if (id) {
			var control = controlMap[id];
			if (control && (typeof control.onHtmlEvent == 'function')) {
				control.onHtmlEvent(params);
			}
		}
	}
	;
	function loading(show) {
		if (show) {
			$("#loading-mask").fadeIn("fast");
		} else {
			$("#loading-mask").fadeOut("fast");
		}
	}
	;
	function clone(jsonObj) {
		var buf;
		if (jsonObj instanceof Array) {
			buf = [];
			var i = jsonObj.length;
			while (i--) {
				buf[i] = arguments.callee(jsonObj[i]);
			}
			return buf;
		} else if (typeof jsonObj == "function") {
			return jsonObj;
		} else if (jsonObj instanceof Object) {
			buf = {};
			for ( var k in jsonObj) {
				buf[k] = arguments.callee(jsonObj[k]);
			}
			return buf;
		} else {
			return jsonObj;
		}
	}
	;
	/**
	 * 日志打印
	 */
	function log(s) {
		try {
			if (console && typeof console == "object") {
				console.log(s);
			}
		} catch (e) {
		}
	}
	;

	function updataUrl(key, value) {
		var url = document.location.href;

		var exp = '' + key + '=\\\w+';
		var reg = new RegExp(exp);
		var str = url.match(reg);
		if (str) {
			// 已存在
			var str1 = str[0];
			var idx = str1.indexOf('&');
			if (idx >= 0) {
				str1 = str1.substr(idx);
			}
			var strs = url.split(str1);
			if (strs.length == 2) {
				url = strs[0] + key + '=' + value + strs[1];
			}
		} else {
			// 未找到，新增
			if (url.indexOf('#') >= 0) {
				url += '&';
			} else {
				url += '#';
			}
			url += key + '=' + value;
		}
		document.location.href = url;
		// document.location.hash = url;
	}
	;
	function updateUrlKey(url,key, value) {
	
		var exp = '' + key + '=\\\w+';
		var reg = new RegExp(exp);
		var str = url.match(reg);
		if (str) {
			// 已存在
			var str1 = str[0];
			var idx = str1.indexOf('&');
			if (idx >= 0) {
				str1 = str1.substr(idx);
			}
			var strs = url.split(str1);
			if (strs.length == 2) {
				url = strs[0] + key + '=' + value + strs[1];
			}
		} else {
			// 未找到，新增
			if (url.indexOf('#') >= 0) {
				url += '&';
			} else {
				url += '#';
			}
			url += key + '=' + value;
		}
		return url;
	}
	;
	// 设置网页标题
	var systemName = '系统';
	function setPageTitle(title) {
		if (title) {
			if (title === true) {
				// 重置
				document.title = systemName;
			} else {
				systemName = title;
				document.title = title;
			}
		} else if (undefined === title) {
			document.title = systemName;
		}
	}
	;
	/*
	 * 弹出非模式页面 输入： url：需要打开页面的url width： 界面宽度 height：界面高度 name：弹出界面名称
	 * self：是否在本页面
	 */
	function openWin(url, width, height, name) {
		if (width == null) {
			try {
				width = screen.availWidth / 2 - 10;
			} catch (e) {
			}

		}
		if (height == null) {
			try {
				height = screen.availHeight / 2 - 55;
			} catch (e) {
			}
		}
		if (name == null) {
			name = "win";
		}

		var newWin = window
				.open(
						url,
						name,
						"toolbar=no,menubar=no,location=no,scrollbars=yes,depended=yes,z-look=yes,top=0,left=0,resizable=yes,width="
								+ width + ",height=" + height);
		newWin.focus();

	}
	;
	function popwin(url, width, height, showx, showy, dialogArguments) {
		if (dialogArguments == null) {
			dialogArguments = window;
		}
		if (width == null) {
			width = 550;
		}
		if (height == null) {
			height = 500;
		}
		if (showx == null) {
			showx = 150;
		}
		if (showy == null) {
			showy = 100;
		}
		return window
				.showModalDialog(
						url,
						dialogArguments,
						"dialogWidth:"
								+ width
								+ "px;"
								+ "dialogHeight:"
								+ height
								+ "px;"
								// + "dialogLeft:"+showx+"px;"
								// + "dialogTop:"+showy+"px;"
								+ "directories:yes;center:yes;help:no;status:no;resizable:no;scrollbars:yes;location:no;");
	}
	;
	function goToPage(name, url, pageViewType, width, height) {
		if (!url) {
			return;
		}
		if (!pageViewType) {
			pageViewType = _systemConfig.pageViewType;
		}
		// 页面查看方式
		if (pageViewType == 'pop') {
			var goToUrl = path + "/" + url;
			openWin(goToUrl, width, height, name);
			return;
			// check browser
			if (!$.browser.msie) {
				openWin(goToUrl, width, height, name);
			} else {
				popwin(goToUrl, width, height);
			}
		} else if (pageViewType == 'tabs') {
			window.parent.Index.addTab(name, url);
		} else if (pageViewType == 'replace') {
			var goToUrl = path + "/" + url;
			window.location.href = goToUrl;
		} else {
			var goToUrl = path + "/" + url;
			// check browser
			if (!$.browser.msie) {
				openWin(goToUrl, width, height, name);
			} else {
				popwin(goToUrl, width, height);
			}
		}

	}
	;
	/**
	 * 关闭打开的窗口，不提示
	 */
	function closeWin() {
		window.opener = null; // 禁止关闭窗口的提示
		window.open('','_self','');
		window.close(); // 自动关闭本窗口
	}
	;
	function changeWin(width, height, x, y) {
		var screen = null;
		/*
		 * if (!$.browser.msie) { screen = window.opener.screen; } else { screen =
		 * window.dialogArguments.screen; }
		 */
		if (window.opener != undefined) {// 针对window.open()
			screen = window.opener.screen;
		}
		if (window.dialogArguments != undefined) {// 针对window.showModalDialog()
			screen = window.dialogArguments.screen;
		}
		/*
		 * if (!htmlIsIFrame()) { // screen = window.opener.screen; screen =
		 * window.dialogArguments.screen; } else { screen = window.screen; //
		 * screen = window.opener.screen; }
		 */
		if (width == null) {
			width = screen.availWidth / 2;
		}
		if (height == null) {
			height = screen.availHeight / 2;
		}
		if (x == null) {
			x = (screen.availWidth - width) / 2;
		}
		if (y == null) {
			y = (screen.availHeight - height) / 2;
		}

		if (window.opener != undefined) {// 针对window.open()
			window.moveTo(x, y);
			window.resizeTo(width, height);// 调整大小
		}
		if (window.dialogArguments != undefined) {// 针对window.showModalDialog()
			window.dialogTop = y + "px";
			window.dialogLeft = x + "px";
			window.dialogHeight = height + "px";
			window.dialogWidth = width + "px";
		}
		/*
		 * if (!$.browser.msie) { window.moveTo(x, y); window.resizeTo(width,
		 * height);// 调整大小 } else { window.dialogTop = y + "px";
		 * window.dialogLeft = x + "px"; window.dialogHeight = height + "px";
		 * window.dialogWidth = width + "px"; }
		 */
	}
	;
	function getParentWinObj() {
		if (!(window.parent == window)) {// window.parent == window
			// true,代表是当前页
			return window.parent;
		}
		if (window.opener != undefined) {// 针对window.open()
			return window.opener;
		} else {
			return window.dialogArguments;// 针对window.showModalDialog()
		}
	}
	function callSyncDWR(fn) {
		if (!fn) {
			return;
		}
		var retData = null;
		// 设置超时
		// DWREngine.setTimeout(10000);

		// 设置为同步方式
		DWREngine.setAsync(false);

		var para = Array.prototype.slice.apply(arguments);
		para = para.slice(1);
		if (para && para.length > 0) {
			para.push(function(data) {
				retData = data;
			});
			fn.apply(Object, para);
		} else {
			fn(function(data) {
				retData = data;
			});
		}

		// 重新设置为异步方式
		DWREngine.setAsync(true);

		return retData;
	}
	;
	function String2Alpha(str) {
		var Result = "";
		try {
			// 返回数组，支持多音字
			var arr = makePy(str);
			Result = arr[0];
		} catch (e) {
			Result = " ";
		}
		return Result;
	}
	;
	/**
	 * * {
	 * 	msg:'',
	 * 	title:'',
	 * 	showType:'',
	 * }
	 */
	function show(config) {
		if (config.msg == undefined)
			return;
		$.messager.show({
			title : config.title || '提示',
			msg : config.msg,
			timeout : 2000,
			showType : config.showType || 'slide'
		});
	}
	;
	/**
	 * * {
	 * 	msg:'',
	 * 	title:'',
	 * 	callback:function(){},
	 * 	cancelCallback:function(){}
	 * }
	 */
	function confirm(config) {
		if (config.msg == undefined || config.callback == undefined)
			return;
		$.messager.confirm(config.title || '警告', config.msg, function(r) {
			if (r) {
				if (typeof config.callback == 'function') {
					config.callback();
				}
			} else {
				if (typeof config.cancelCallback == 'function') {
					config.cancelCallback();
				}
			}

		});
	}
	;
	/**
	 * 格式化文本（防止文本中含有html标签）
	 * 
	 * @param value
	 *            要格式化的文本
	 */
	function formatText(value) {
		return value ? $('<div/>').text(value).html() : "";
	}
	;

	function formatURL(url, params) {
		if (params) {
			var first = true;
			for ( var i in params) {
				if (params[i]) {
					if (first) {
						url = url + '?';
						first = false;
					} else {
						url = url + '&';
					}
					url = url + encodeURI(i) + '=' + encodeURI(params[i]);
				}
			}
		}
		return url;
	}
	;

	function getUrlRequestParamValue(url, param) {
		if (url.indexOf('#') != -1) {
			url = url.replace(/#/, "&");
		}
		var request = {
			queryString : function(val) {
				var uri = url || document.location.href;
				var re = new RegExp("" + val + "=([^&?]*)", "ig");
				return ((uri.match(re)) ? (uri.match(re)[0]
						.substr(val.length + 1)) : null);
			}
		};
		return request.queryString(param);
	}
	;
	/**
	 * 引用该js的页面是否在iframe中显示
	 */
	function htmlIsIFrame() {
		// if(window.location.href!=top.location.href)alert('当前网页在框架中.');
		var isIFrame = false;
		if (self.frameElement == null) {

		} else {
			if (self.frameElement.tagName == 'IFRAME') {
				isIFrame = true;
			}
		}
		return isIFrame;
	}
	;
	function checkDate(begin, end) {
		var d1 = new Date(begin.replace(/-/g, "/"));
		var d2 = new Date(end.replace(/-/g, "/"));
		if (Date.parse(d1) - Date.parse(d2) > 0) {
			return true;
		} else {
			return false;
		}
	}
	;
	/**
	 * 页面操作后回调
	 */
	function pageOperateCallback(pageViewType, operateObj, callback) {
		if (!pageViewType) {
			pageViewType = _systemConfig.pageViewType;
		}
		if (!operateObj) {
			return;
		}

		if (pageViewType == 'pop') {
			try {
				VortexUtil.getParentWinObj().otherCallback();
			} catch (e) {
			}
			VortexUtil.closeWin();
		} else if (pageViewType == 'tabs') {
			window.parent.Index.closeTab(operateObj.operateTitle, function() {
				this.Index.openTab(
						operateObj.operateCallbackInfo.operateCallbackTitle,
						operateObj.operateCallbackInfo.operateCallbackUrl);
			});
		} else if (pageViewType == 'replace') {
			var goToUrl = path + "/"
					+ operateObj.operateCallbackInfo.operateCallbackUrl;
			window.location.href = goToUrl;
		}
		if (typeof callback == 'function') {
			callback.call(window || this);
		}
	}
	;
	/**
	 * 调用后台SpringMVC Action
	 * {
	 * 	url:'',
	 * 	params:{},
	 * 	isAsync:true,
	 * 	dataType:'json',
	 * contentType : 'application/x-www-form-urlencoded',
	 * 	successCallback:function(data){
	 * 	}
	 * }
	 */
	function remoteCall(config) {
		config = config || {};
		if (config.url == undefined) {
			return;
		}
		var params = config.params ? config.params : {};
		var isAsync = config.isAsync ? false : true;
		var dataType = config.dataType ? config.dataType : "json";
		var contentType=config.contentType ? config.contentType : "application/x-www-form-urlencoded";
		$.ajax({
			type : "POST",
			url : config.url,
			data : params,
			async : isAsync,
			dataType : dataType,
			contentType : contentType,
			success : function(data) {
				//添加登陆判断
				if (data){
					if (data.relogin){
						window.top.location.href = path + '/' + data.reloginUri;
						return;
					}
				}
				if (typeof (config.successCallback) == "function") {
					config.successCallback(data);
				}
				

			},
			error : function(XMLHttpRequest, errorInfo, errorObject) {

			}
		});
	}
	;
	return {
		getControlID : function() {
			return getControlID();
		},
		getControlCode : function() {
			return getControlCode();
		},
		regControl : function(id, control) {
			regControl(id, control);
		},
		$f : function(params) {
			$f(params);
		},
		log : function(s) {
			log(s);
		},
		updataUrl : function(key, value) {
			updataUrl(key, value);
		},
		updateUrlKey:function (url,key, value) {
			return updateUrlKey(url,key, value);
		},
		setPageTitle : function(title) {
			setPageTitle(title);
		},
		goToPage : function(name, url, pageViewType, width, height) {
			goToPage(name, url, pageViewType, width, height);
		},
		openWin : function(url, width, height, name) {
			openWin(url, width, height, name);
		},
		callSyncDWR : function(fn) {
			callSyncDWR(fn);
		},
		show : function(config) {
			show(config);
		},
		confirm : function(config) {
			confirm(config);
		},
		clone : function(o) {
			return clone(o);
		},
		loading : function(show) {
			loading(show);
		},
		formatText : function(value) {
			return formatText(value);
		},
		formatURL : function(url, params) {
			return formatURL(url, params);
		},
		getUrlRequestParamValue : function(url, param) {
			return getUrlRequestParamValue(url, param);
		},
		arrayIndexOf : function(array, value) {
			return arrayIndexOf(array, value);
		},
		htmlIsIFrame : function() {
			return htmlIsIFrame();
		},
		closeWin : function() {
			closeWin();
		},
		changeWin : function(width, height, x, y) {
			changeWin(width, height, x, y);
		},
		checkDate : function(begin, end) {
			return checkDate(begin, end);
		},
		getParentWinObj : function() {
			return getParentWinObj();
		},
		popwin : function(url, width, height, showx, showy, dialogArguments) {
			return popwin(url, width, height, showx, showy, dialogArguments);
		},
		pageOperateCallback : function(pageViewType, operateObj, callback) {
			pageOperateCallback(pageViewType, operateObj, callback);
		},
		remoteCall : function(config) {
			remoteCall(config);
		}
	}
}();

Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
