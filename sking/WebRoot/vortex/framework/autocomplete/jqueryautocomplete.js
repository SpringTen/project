/**
 * config中包括如下属性
 * id: 需要模糊匹配的控件id
 * url: 模糊匹配的url
 * customAutoFill : 是否自动填充
 * customFormatItem : 格式化方法
 * customExtraParams : 数据过滤参数
 * customParse : 
 */
JqueryAutoComplete = function(config) {
	config = config || {};

	this.id = config.id;
	this.url = config.url;
	this.customAutoFill= config.customAutoFill;
	this.customParse = config.customParse;
	this.customFormatItem = config.customFormatItem;
	this.customExtraParams= config.customExtraParams;
	var defaultParse = function(data) {
		data = eval('(' + data.value + ')');
		var rows = [];
		for ( var i = 0; i < data.length; i++) {
			rows[rows.length] = {
				data : data[i].value,
				value : data[i].value,
				result : data[i].value
			};
		}
		return rows;

	};

	var defaultFormatItem = function(row, i, max) {
		// return i + '.' + max + ':' + row.value ;
		return row;
	};
	config = $.extend({}, JqueryAutoComplete.defaults, {
		width : $("#" + config.id).outerWidth(),
		extraParams : config.customExtraParams ? config.customExtraParams : {},
		parse : config.customParse ? config.customParse : defaultParse,
		formatItem : config.customFormatItem ? config.customFormatItem
				: defaultFormatItem,
		autoFill : config.customAutoFill ? config.customAutoFill : false
	}, config);

	this.options = config;
	this.init();
};
JqueryAutoComplete.prototype.init = function() {
	var t = this;
	t.initAutoComplete(t.options);
};
JqueryAutoComplete.prototype.initAutoComplete = function(config) {
	var t = this;
	$("#" + t.id).autocomplete(t.url, config);
};
JqueryAutoComplete.defaults = {
	max : 20,
	cacheLength : 0,
	matchContains : true,
	dataType : 'json'
};
