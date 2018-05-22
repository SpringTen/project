/**
 * 同步加载js、css
 */
ScriptSynchLoaderMgr = function() {
	var scriptCache = MapUtil.getInstance();
	var timeout = 10;
	var scripts = [];
	var disableCaching = false;

	function existScript(url) {
		if (scriptCache.get != undefined) {
			return false;
		} else {
			return true;
		}
	}
	function includeJS(url, sId, source, callback, callerScope) {
		try {
			var oHead = document.getElementsByTagName('HEAD').item(0);

			var scriptTag = document.getElementById(sId);
			if (scriptTag) {
				// oHead.removeChild(scriptTag);
				if (typeof callback == "function") {
					callback.call(callerScope || window);
				}
				return;
			}

			var oScript = null;

			var fileExtend = getfileExtend(url);
			if (fileExtend == 'css') {
				oScript = document.createElement("link");
				oScript.rel = 'stylesheet';
				oScript.type = 'text/css';

				oScript.href = url;
			} else if (fileExtend == 'js') {
				oScript = document.createElement("script");
				oScript.language = "javascript";
				oScript.type = "text/javascript";

				oScript.src = url;
			} else {
				// 无后缀名，当作js文件处理
				oScript = document.createElement("script");
				oScript.language = "javascript";
				oScript.type = "text/javascript";

				oScript.src = url;
			}

			oScript.id = sId || new UUID().toString();
			oScript.defer = true;
			oScript.text = source || '';

			if (oScript.text == '') {
				if (oScript.readyState) {// ie
					oScript.onreadystatechange = function() {
						// IE
						if (oScript.readyState == 'complete'
								|| oScript.readyState == 'loaded') {
							oScript.onreadystatechange = null;
							VortexUtil.log('[' + url + ']加载成功');
							scripts[url] = true;
							if (callback != null) {
								callback.call(callerScope || window);
							}
						} else if (oScript.readyState == 'loading') {
						} else {
							VortexUtil.log('文件获取失败: (' + oScript.readyState
									+ '):' + url);
							scripts[url] = false;
							if (callback != null) {
								callback.call(callerScope || window);
							}
						}
					};
				} else {
					oScript.onload = function() {
						oScript.onload = null;
						VortexUtil.log('[' + url + ']加载成功');
						scripts[url] = true;
						if (callback != null) {
							callback.call(callerScope || window);
						}
					};
				}
			} else {
				delete oScript.src;
			}

			oHead.appendChild(oScript);
		} catch (e) {
			VortexUtil.log('ScriptManager::IncludeJS exception: ' + e.message);
		}
	}

	function getfileExtend(url){
		var extend = 'js';
		var currentUrl = url;
		if (url.indexOf('?') != -1){
			currentUrl = url.substring(0,url.indexOf('?'));
		} 
		var fileExtend = currentUrl.substr(currentUrl.length - 3);
		if (fileExtend == 'css') {
			extend = 'css';
		} else if (fileExtend == '.js') {
			extend = 'js';
		} else {
			extend = 'js';
		}
		return extend;
	}
	function syncLoad(url, callback, sId) {
		try {
			var cfg, callerScope;
			if (typeof url == 'object') { // must be config object
				cfg = url;
				url = cfg.url;
				callback = callback || cfg.callback;
				callerScope = cfg.scope;
				if (typeof cfg.timeout != 'undefined') {
					this.timeout = cfg.timeout;
				}
				if (typeof cfg.disableCaching != 'undefined') {
					this.disableCaching = cfg.disableCaching;
				}
			}

			if (scripts[url] === false) {
				VortexUtil.log('[' + url + ']已被尝试加载，但加载失败');

				// end of add
				if (typeof callback == 'function') {
					callback.call(callerScope || window);
				}
				return null;
			} else if (scripts[url]) {
				VortexUtil.log('[' + url + ']已存在');

				// end of add
				if (typeof callback == 'function') {
					callback.call(callerScope || window);
				}
				return null;
			}

			// 略过http检测，以提升效率，但无法捕获异常
			includeJS(url, sId, '', callback, callerScope);
			return;

		} catch (e) {
			VortexUtil.log('ScriptManager::syncLoad exception: ' + e.message);
		}
	}
	return {
		/**
		 * 同步加载 支持事件,不支持回调,不推荐使用
		 */
		synchLoadJsEvent : function(o) {
			var params = o.params || {};
			var event = o.event || new Event();
			o.callback = function() {
				event.notify(params);
			}
			this.synchLoadJs1(o);
		},
		/**
		 * 同步加载 支持回调
		 */
		synchLoadJsCallback : function(o) {
			this.synchLoadJs1(o);
		},
		synchLoadJs1 : function(o) {
			if (!$.isArray(o.scripts)) {
				o.scripts = [ o.scripts ];
			}

			o.url = o.scripts.shift();

			if (o.scripts.length == 0) {
				syncLoad(o);
			} else {
				o.scope = this;
				syncLoad(o, function() {
					this.synchLoadJsCallback(o);
				});
			}
		},
		existScript : function(url) {
			return existScript(url);
		}
	};
}();
