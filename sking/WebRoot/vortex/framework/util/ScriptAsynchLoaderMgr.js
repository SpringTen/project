//加载有问题
ScriptLoader = function() {
	this.timeout = 10;
	this.scripts = [];
	this.disableCaching = false;
	this.scriptInfo = {
		"url" : null,
		"scope" : null,
		"callback" : null,
		"options" : null,
		"index" : null,
		"id" : null,
		"loadSuccess" : true
	};

};
ScriptLoader.prototype = {
	dispose : function() {
		var t = this;
		t.scripts = [];
		t.disableCaching = false;
		t.scriptInfo = {
			"url" : null,
			"scope" : null,
			"callback" : null,
			"options" : null,
			"index" : null,
			"id" : null,
			"loadSuccess" : true
		};
	},
	processSuccess : function() {
		var t = this;
		if (typeof t.scriptInfo.callback == "function") {
			t.scriptInfo.callback.call(t.scriptInfo.scope, t.scriptInfo.url,
					t.scriptInfo.index, t.scriptInfo.id,
					t.scriptInfo.loadSuccess,t);
		}
	},
	processFailure : function() {
		var t =this;
		t.processSuccess();
	},
	includeJS : function(url, sId, source, callback, callerScope) {
		var t = this;
		try {
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var oScript = null;

			var fileExtend = url.substr(url.length - 3);
			if (fileExtend == 'css') {
				oScript = document.createElement("link");
				oScript.rel = 'stylesheet';
				oScript.type = 'text/css';

				//oScript.href = url;
			} else if (fileExtend == '.js') {
				oScript = document.createElement("script");
				oScript.language = "javascript";
				oScript.type = "text/javascript";

				//oScript.src = url;
			} else {
				// 无后缀名，当作js文件处理
				oScript = document.createElement("script");
				oScript.language = "javascript";
				oScript.type = "text/javascript";

				//oScript.src = url;
			}

			oScript.id = sId;
			oScript.defer = true;
			oScript.text = source || '';
			oScript.url = url;	

			oHead.appendChild(oScript);

		} catch (e) {
			VortexUtil.log('ScriptManager::IncludeJS exception: ' + e.message);
		}
	},
	load : function(c, e) {
		var t = this;
		var a, d, b, f;
		if (typeof c == "object") {
			a = c;
			c = a.url;
			f = a.id || new UUID().toString();
			b = a.index;
			e = e || a.callback;
			d = a.scope;
			if (typeof a.timeout != "undefined") {
				t.timeout = a.timeout;
			}
			if (typeof a.disableCaching != "undefined") {
				t.disableCaching = a.disableCaching;
			}
		}
		if (ScriptAsynchLoaderMgr.existScript(c)) {
			if (typeof e == "function") {
				e.call(d || window);
			}
			return;
		}

		t.scriptInfo = $.extend({}, t.scriptInfo, {
			"url" : c,
			"scope" : d || window,
			"callback" : e,
			"options" : a,
			"index" : b,
			"id" : f
		});

		t.AjaxPage(c, f, e, d);
	},

	// 使用ajax加载内容
	GetHttpRequest : function() {
		if (window.XMLHttpRequest) // Gecko
			return new XMLHttpRequest();
		else if (window.ActiveXObject) // IE
			return new ActiveXObject("MsXml2.XmlHttp");
	},
	AjaxPage : function(url, sId, callback, callerScope) {
		var t = this;
		var oXmlHttp = t.GetHttpRequest();
		oXmlHttp.onreadystatechange = function() {
			if (oXmlHttp.readyState == 4) {
				if (oXmlHttp.status >= 200 && oXmlHttp.status < 300 || oXmlHttp.status == 304){  
					t.includeJS(url,sId , oXmlHttp.responseText, callback,
							callerScope);
					// 回调方法
					VortexUtil.log('[' + url + ']加载成功');
					t.scripts[url] = true;
					t.processSuccess();
				} else {
					alert('XML request error: ' + oXmlHttp.statusText + ' ('
							+ oXmlHttp.status + ')');
				}
			}
		}
		oXmlHttp.open('GET', url, true);
		oXmlHttp.send(null);
	}
};
ScriptAsynchLoaderMgr = function() {
	var scriptCache = MapUtil.getInstance();

	function existScript(url) {
		if (scriptCache.get != undefined) {
			return false;
		} else {
			return true;
		}
	}
	function load(o) {
		if (!$.isArray(o.scripts)) {
			o.scripts = [ o.scripts ];
		}
		o.lfiles = 0;
		var scriptLoader = null;
		for ( var i = 0; i < o.scripts.length; i++) {
			o.url = o.scripts[i];
			o.index = i;
			scriptLoader = new ScriptLoader();
			scriptLoader.load(o, function(url, idx, id, loadSuccess,scriptLoaderObj) {
				//销毁对象
				scriptLoaderObj.dispose();
				o.scope = this;
				o.lfiles++;
				if (loadSuccess) {
					scriptCache.add(url, id);
				}
				if (o.lfiles >= o.scripts.length) {
					if (typeof o.callback == "function") {
						o.callback.call(this || window);
					}
				}
			});
		}
	}

	return {
		/**
		 * 异步加载 支持回调
		 */
		asyncloadJsCallback : function(o) {
			load(o);
		},
		/**
		 * 异步加载 支持事件,不支持回调
		 */
		asyncLoadJsEvent : function(o) {
			var params = o.params || {};
			var event = new Event();
			o.callback = function() {
				event.notify(params);
			}
			this.loadJs(o);
			return event;
		},
		existScript : function(url) {
			return existScript(url);
		}
	}
}();
