ScriptLoader = function() {
	this.timeout = 10;
	this.scripts = [];
	this.disableCaching = true;
	this.loadMask = null;
};
ScriptLoader.prototype = {
	showMask : function() {
		if (!this.loadMask) {
			this.loadMask = new Ext.LoadMask(Ext.getBody());
			this.loadMask.show();
		}
	},
	hideMask : function() {
		if (this.loadMask) {
			this.loadMask.hide();
			this.loadMask = null;
		}
	},
	processSuccess : function(a) {
		if (typeof a.argument.callback == "function") {
			a.argument.callback.call(a.argument.scope, a.responseText,
					a.argument.url, a.argument.index);
		}
	},
	processFailure : function(a) {
		this.hideMask();
		Ext.MessageBox.show({
			title : "应用程序出错",
			msg : "Js脚本库加载出错，服务器可能停止，请联系管理员。文件路径：" + a.argument.url,
			closable : false,
			icon : Ext.MessageBox.ERROR,
			minWidth : 200
		});
		setTimeout(function() {
			Ext.MessageBox.hide();
		}, 3);
	},
	load : function(c, e) {
		var a, d, b;
		if (typeof c == "object") {
			a = c;
			c = a.url;
			b = a.index;
			e = e || a.callback;
			d = a.scope;
			if (typeof a.timeout != "undefined") {
				this.timeout = a.timeout;
			}
			if (typeof a.disableCaching != "undefined") {
				this.disableCaching = a.disableCaching;
			}
		}
		if (this.scripts[c]) {
			if (typeof e == "function") {
				e.call(d || window);
			}
			return null;
		}
		this.showMask();
		Ext.Ajax.request({
			url : c,
			success : this.processSuccess,
			failure : this.processFailure,
			scope : this,
			timeout : (this.timeout * 1000),
			disableCaching : this.disableCaching,
			argument : {
				"url" : c,
				"scope" : d || window,
				"callback" : e,
				"options" : a,
				"index" : b
			}
		});
	}
};
ScriptLoaderMgr = function() {
	this.mdCache = [];
	this.loader = new ScriptLoader();
	var loader = this.loader;
	this.load = function(o) {
		this.loader.scope = o.scope;
		if (!Ext.isArray(o.scripts)) {
			o.scripts = [ o.scripts ];
		}
		o.lfiles = 0;
		this.mdCache.length = 0;
		var mdCache = this.mdCache;
		for ( var i = 0; i < o.scripts.length; i++) {
			o.url = o.scripts[i];
			o.index = i;
			this.loader.load(o, function(rs, url, idx) {
				o.scope = this;
				mdCache[idx] = {
					content : rs
				};
				o.lfiles++;
				if (o.lfiles >= o.scripts.length) {
					for ( var j = 0; j < mdCache.length; j++) {
						try {
							window.execScript ? window
									.execScript(mdCache[j].content) : window
									.eval(mdCache[j].content);
						} catch (ex) {
						}
					}
					loader.hideMask();
					if (o.callback != null) {
						o.callback.call(this);
					}
				}
			});
		}
	};
};
ScriptMgr = new ScriptLoaderMgr();