/*!
 * 子页面关闭，父页面做相应的响应。
 * 如：父页面为一个记录列表，子页面做记录的更改操作（增加、更新、删除），要求子页面关闭，父页面做刷新。
 */
(function() {
	function isClose() {
		var isIE = document.all ? true : false;
		
		if(isIE) {//IE浏览器
			var evt = evt ? evt : (window.event ? window.event : null);
			
			// 鼠标位置
			var mouse = evt.screenX - window.screenLeft;
			
			// 右上角叉叉位置
			var scrollWidth = document.documentElement.scrollWidth;
			var close = scrollWidth - 46;
			
			// 鼠标水平位置在叉叉上
			var b = mouse > close;
			
			//alert("mouse=" + mouse + ", scrollWidth=" + scrollWidth +",close=" + close + ",b=" + b + ",evt.clientY=" + evt.clientY);
			
			if(b && evt.clientY < 0 || evt.altKey) {
				//alert("ie：是关闭而非刷新");
				return true;
			}
			else {
				//alert("ie：是刷新而非关闭");
				return false;
			}
		}
		else {//chrome浏览器
			return true;
		}
	}
	
	function onbeforeunload_handler() { 
		if(isClose()) {
			var json = '${operateInfoJson}';
			VortexUtil.pageOperateCallback(null, json, null);
		}
	};   

	function onunload_handler() {   
	    // nothing
	};
	
	window.onbeforeunload = onbeforeunload_handler;   
    //window.onunload = onunload_handler;
}());