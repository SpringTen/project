FineReportViewer = function(config) {

	config = config || {};
	this.queryParams = config.queryParams || {};
	this.finereportIframeId = config.finereportIframeId;
	this.showtoolbar = (config.showtoolbar == undefined)
			? true
			: config.showtoolbar;
	this.actionUrl = config.actionUrl || (path + '/ReportServer');
	this.templatePath = config.templatePath;
	this.reportAfterLoadCallback = config.reportAfterLoadCallback;
	this.currentOperation = config.currentOperation || '';
},

/**
 * @public 设置参数
 * @param {}
 *            queryParams
 */
FineReportViewer.prototype.setQueryParams = function(queryParams) {
	var t = this;
	t.queryParams = queryParams;

},

/**
 * @public 刷新,按设置的参数显示报表
 * @param {}
 *            queryParams:Object
 */
FineReportViewer.prototype.refresh = function() {
	var t = this;

	t.submitQueryParamsByHiddenForm();
	t.fetchReportPane();
},

FineReportViewer.prototype.fetchReportPane = function() {
	var t = this;
	setTimeout(function() {
				var pane = t.getReportPane();
				if (pane == null) {
					t.fetchReportPane();
				} else {

					t.currentPageIndex = t.getCurrentPageIndex();
					t.totalPage = t.getTotalPage();

					pane.on("afterload", function() {
								// alert("call afterload " + "pageIndex="+
								// t.getCurrentPageIndex()+ ",totalPage = " +
								// t.getTotalPage());
								if (typeof t.reportAfterLoadCallback == 'function') {
									t.reportAfterLoadCallback();

									// alert("call reportAfterLoadCallback");
									if (_systemConfig.debug) {
										VortexUtil
												.log("call reportAfterLoadCallback");
									}
								}
							})
				}

			}, 100);
},

FineReportViewer.prototype.gotoFirstPage = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.gotoFirstPage();
	}
},

FineReportViewer.prototype.gotoPreviousPage = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.gotoPreviousPage();
	}
},

FineReportViewer.prototype.gotoNextPage = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.gotoNextPage();
	}
},

FineReportViewer.prototype.gotoLastPage = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.gotoLastPage();
	}
},

FineReportViewer.prototype.getCurrentPageIndex = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		return pane.currentPageIndex;
	} else {
		return "";
	}
},

FineReportViewer.prototype.getTotalPage = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		return pane.reportTotalPage;
	} else {
		return "";
	}
},

/**
 * 导出Word
 */
FineReportViewer.prototype.exportToWord = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.exportReportToWord();
	}
},

/**
 * 导出PDF
 */
FineReportViewer.prototype.exportToPDF = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.exportReportToPDF();
	}
},

/**
 * 导出Excel,type=page|simple|sheet
 */
FineReportViewer.prototype.exportToExcel = function(type) {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.exportReportToExcel(type);
	}
},

/**
 * 打印
 */
FineReportViewer.prototype.print = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.flashPrint();
	}
},

/**
 * 页面设置
 */
FineReportViewer.prototype.pageSetup = function() {
	var t = this;
	var pane = t.getReportPane();
	if (pane) {
		pane.pageSetup();
	}
},

FineReportViewer.prototype.submitQueryParamsByHiddenForm = function() {
	var t = this;
	var actionUrl = t.actionUrl + "?reportlet=" + t.templatePath;
	var submitForm = document.createElement("FORM");
	document.body.appendChild(submitForm);
	submitForm.style.display = "none";
	submitForm.method = "POST";
	submitForm.target = t.finereportIframeId;
	if (t.currentOperation && t.currentOperation.length > 0) {
		actionUrl += "&op=" + t.currentOperation;
	}
	if (t.showtoolbar == false) {
		actionUrl += "&__showtoolbar__=false";
	}
	// actionUrl += "&op=view&__showtoolbar__=false";
	submitForm.action = actionUrl;
	// alert(actionUrl)
	for (var prop in this.queryParams) {
		var newElement = document.createElement("input");
		var s = t.queryParams[prop];
		if (s != null) {
			s = s.toString();
		}

		//newElement.value = encodeURIComponent(t.cjkEncode(s));
		newElement.value = (t.cjkEncode(s));
		//newElement.value = s;
		newElement.name = prop;

		newElement.type = "hidden";
		submitForm.appendChild(newElement);
	}
	submitForm.submit();
},

FineReportViewer.prototype.cjkEncode = function(text) {
	if (text == null || text == "undefined") {
		return "";
	}

	var newText = "";
	for (var i = 0; i < text.length; i++) {
		var code = text.charCodeAt(i);
		//alert(text.charAt(i) + "," +text.charCodeAt(i));
		if (code >= 128 || code == 91 || code == 93) {// 91 is "[", 93 is "]".
			newText += "[" + code.toString(16) + "]";
		} else {
			newText += text.charAt(i);
		}
	}
	return newText;
},

FineReportViewer.prototype.getReportPane = function() {
	var t = this;
	var pane = document.getElementById(t.finereportIframeId);
	if (pane) {
		pane = pane.contentWindow;
		if (pane) {
			pane = pane.contentPane;
		}
	}
	return pane;
}