if(!Array.indexOf) { 
     Array.prototype.indexOf = function(obj) {                
         for(var i=0; i<this.length; i++) { 
             if(this[i]==obj) 
             { 
                 return i; 
             } 
         } 
         return -1; 
     }; 
}
/* ========================================= 
 * String 操作
 * =========================================*/
if (!String.prototype.endWith) {
	String.prototype.endWith = function(str) {
		if (str == null || str == "" || this.length == 0 || str.length > this.length){
			return false;
		}
		if (this.substring(this.length - str.length) == str){
			return true;
		} else {
			return false;
		}
	};
}

// 左TRIM
String.prototype.ltrim = function() {
	return this.replace(/^\s*/, "");
}

// 右TRIM
String.prototype.rtrim = function() {
	return this.replace(/\s*$/, "");
}

// TRIM函数
String.prototype.trim = function() {
	return this.ltrim().rtrim();
}

// 判断是否属于整数型
String.prototype.isInteger = function() {
	if (this.trim().search(/^[-]?[0-9]*$/) == -1) {
		return false;
	} else {
		return true;
	}
}

// 判断是否属于正整数型
String.prototype.isPositiveInteger = function() {
	if (this.trim().search(/^[0-9]*[1-9][0-9]*$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断是否属于自然数
String.prototype.isNatural = function(){
	if (this.trim().search(/^((0)|([1-9][0-9]*))$/)==-1) {
		return false;
	} else {
		return true;
	}
}


// 判断是否属于浮点型
String.prototype.isFloat = function() {
	if (this.trim().search(/^[-]?[0-9]*[.]?[0-9]*$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断是否15位身份证号
String.prototype.isIDCard15 = function(){
	if (this.trim().search(/^(\d{15})$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断身份证号码(15或者18位)
String.prototype.isIDCard = function() {
	if (this.trim().search(/^((\d{15})|(\d{17}[0-9xX]))$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断18位身份证号码
String.prototype.isIDCard18 = function(){
	if (this.trim().search(/^(\d{17}[0-9xX])$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断手机号码
String.prototype.isMobilePhone = function(){
	if (this.trim().search(/^((13|15)\d{9})$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断联通手机号
String.prototype.isUnicomMobilePhone = function() {
	if (this.trim().search(/^((133|131|130|153|156)\d{8})$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断是否属于电话号码
String.prototype.isPhone = function(){
	if (this.trim().search(/^([0]?\d{2,3})?[-]?\d{5,8}([-]\d+)?$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断邮编
String.prototype.isPost = function(){
	if (this.trim().search(/^\d{6}$/)==-1) {
		return false;
	} else {
		return true;
	}
}
// 判断传真
String.prototype.isFax = function(){
	if (this.trim().search(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 判断日期(YYYY-MM-DD YYYY/MM/DD)
String.prototype.isDate = function(){
	var r = this.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	if( r == null ) {
		r = this.trim().match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
		if(r == null ) {
			return false;
		}
	}
	var d = new Date(r[1], r[2]-1, r[3]);
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
}

// 判断日期 (YYYY-MM-DD HH24:MI:SS 或者 YYYY/MM/DD HH24:MI:SS)
String.prototype.isDateTime = function() {
	var r = this.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if( r == null ) {
		r = this.trim().match(/^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if(r == null ) {
			return false;
		}
		return false;
	}
	var d = new Date(r[1], r[2]-1, r[3], r[4], r[5], r[6]);
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3] 
				&& d.getHours() == r[4] && d.getMinutes() == r[5] && d.getSeconds() == r[6]);
}

// 判断Email
String.prototype.isEmail = function(){
	if (this.trim().search(/^[a-zA-Z_0-9]+@[a-zA-Z_0-9.]+$/)==-1) {
		return false;
	} else {
		return true;
	}
}

// 是否中文字符
String.prototype.isNotCN = function() {
	if (this.trim().length == this.trim().replace(/[^\x00-\xff]/gi,'xx').length) {
		return true;
	} else {
		return false;
	}
}

// 是否为空
String.prototype.isNull = function(){
	if (this == null || this.trim()== "") {
		return true;
	} else {
		return false;
	}
}

// 是否为URL
String.prototype.isUrl = function() {
	if (this.trim().search( /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/) == -1) {
		return false;
	} else {
		return true;
	}
}

// 是否为数字
String.prototype.isNumber = function() {
	if(!isNaN(this.trim())) {
		return true;
	} else {
		return false;
	}
}
// 是否为IP
String.prototype.isIP = function() {
	if (this.trim().search(/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/) == -1) {
		return false;
	} else {
		return true;
	}
}
// 是否输入时间(yyyy-mm-dd)大于当前时间
function isAfterDate(inputDate)
{
	var now = new Date();
	var strDate = inputDate.replace(/-/g,"\/");
	strDate += " 23:59:59";
	var inpuDate = new Date(strDate);

	if(now >= inpuDate)
	{
		return false;
	}
	else
	{
		return true;
	}
}
/**
 * 检查开始时间是否大于等于结束时间
 * 
 * @param begin
 *            yyyy-MM-dd HH:mm:ss
 * @param end
 *            yyyy-MM-dd HH:mm:ss
 * @return
 */
function checkisDateTime(begin,end) {
	  if (!begin.isDateTime())return true;
	  if (!end.isDateTime())return true;
	  var d1 = new Date(begin.replace(/-/g, "/")); 
	  var d2 = new Date(end.replace(/-/g, "/")); 
	  if (Date.parse(d1) - Date.parse(d2) > 0) { 
		  return true;
	  }else {
	  	return false;
	  }
} 
/**
 * 检查开始时间是否大于等于结束时间
 * 
 * @param begin
 *            yyyy-MM-dd
 * @param end
 *            yyyy-MM-dd
 * @return
 */
function checkDate(begin,end) {
	  if (!begin.isDate())return true;
	  if (!end.isDate())return true;
	  var d1 = new Date(begin.replace(/-/g, "/")); 
	  var d2 = new Date(end.replace(/-/g, "/")); 
	  if (Date.parse(d1) - Date.parse(d2) > 0) { 
		  return true;
	  }else {
	  	return false;
	  }
}
/**
 * 时间的字符串转换成Date对象
 * 
 * @param str
 * @return
 */
function stringToDate(str){
	return new Date(str.replace(/-/g, "/"));
}
retNull = function(text) {
	if (text == null || text.trim()== "") {
		text = "null";
	}
	return text;
}
/**
 * 小数点保留几位
 * 
 * @param a
 *            浮点数
 * @param b
 *            要保留的小数点位数
 * @return
 */
function round(a,b){
    var num = Math.round(a*Math.pow(10, b))/Math.pow(10, b);
    var renum = num.toString();
    if (num==parseInt(num)){
    	if (b > 0){
    		renum += ".";
	        for(var i=0;i <b;i++){
	            renum += "0";
	        }
    	}
       
        return renum;
       
    }
    len = parseInt(a).toString().length+ b +1 -num.toString().length;
    if (len > 0){       
        for(var i=0;i <len;i++){
            renum += "0";
        }
    }
    return renum;
}
/**
 * 毫秒转化为 xdxhx'x
 * 
 * @param time
 * @return
 */
function getTimelag(time){
	var l = time;
	var day = round(l / (24 * 60 * 60 * 1000),0);
	var hour = round((l / (60 * 60 * 1000) - day * 24),0);
	var min = round(((l / (60 * 1000)) - day * 24 * 60 - hour * 60),0);
	var s = round((l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60),0);
	return day + "d" + hour + "h" + min + "'" + s;
}
/**
 * 获取浏览器类型
 * return IE,IE6,IE7,IE8,IE9,Chrome,Firefox,Opera,WebKit,Safari,Others
 */
getBrowserName = function() {
	var ua = navigator.userAgent.toLowerCase();
	var browserName;
	var isOpera = (/opera/).test(ua);
	var isChrome = (/chrome/).test(ua);
	var isFirefox = (/firefox/).test(ua);
	var isWebKit = (/webkit/);
	var isSafari = !isChrome && (/safari/).test(ua);
	var isIE = !isOpera && (/msie/).test(ua);
	var isIE7 = isIE && (/msie 7/).test(ua);
	var isIE8 = isIE && (/msie 8/).test(ua);
	if (isIE8) {
		browserName = "IE8";
	} else if (isIE7) {
		browserName = "IE7";
	} else if (isIE) {
		browserName = "IE";
	} else if (isChrome) {
		browserName = "Chrome";
	} else if (isFirefox) {
		browserName = "Firefox";
	} else if (isOpera) {
		browserName = "Opera";
	} else if (isWebKit) {
		browserName = "WebKit";
	} else if (isSafari) {
		browserName = "Safari";
	} else {
		browserName = "Others";
	}
	return browserName;
}

/*
 * ================================= 模式窗口与非模式窗口
 * =================================
 */
/*
 * 弹出模式页面 输入： url：需要打开页面的url width： 界面宽度 height：界面高度 showx：弹出界面横坐标 showy：弹出界面纵坐标
 * 返回： 弹出界面句柄
 */	
 popwin = function(url, width, height, showx, showy) {
	if(width == null) {
		width = 550;
	}
	if(height == null) {
		height = 500;
	}
	// check browser
	if(!$.browser.msie) {
		return openwin(url,width,height);
	}
	if(showx == null) {
		showx = 150;
	}
	if(showy == null) {
		showy = 100;
	}
	return window.showModalDialog(url,"window","dialogWidth:"+ width + "px;"
			+ "dialogHeight:"+height + "px;"
			// + "dialogLeft:"+showx+"px;"
			// + "dialogTop:"+showy+"px;"
			+ "directories:yes;center:yes;help:no;status:no;resizable:no;scrollbars:yes;");
}

/*
 * 弹出非模式页面 输入： url：需要打开页面的url width： 界面宽度 height：界面高度 name：弹出界面名称
 * status：界面的一些相关设置项 返回： 弹出界面句柄
 */
openwin = function(url, width, height, name, status) {
	if (width == null){
		width = screen.availWidth - 10;
	}
	if (height == null){
		height = screen.availHeight - 55
	}
	if(name == null) {
		name = "win";
	}
	if(status == null) {
		status = "yes";
	}
	return window.open(url,name,"width="+ width + ","
			+ "height="+ height + "," + "status=" + status + "," 
			+ "toolbar=no,menubar=no,location=no,scrollbars=yes,depended=yes,z-look=yes,top=0,left=0");
	//newwin.focus();
}
/*
 * 弹出非模式页面 输入： url：需要打开页面的url width： 界面宽度 height：界面高度 name：弹出界面名称,showx：弹出界面横坐标 showy：弹出界面纵坐标
 * 
 */
var divId = "dlg-vortex-pop-window";
popVortexWindow = function(url, width, height, name, callback){
	var bodyWidth = document.body.clientWidth;
	var bodyHeight = document.body.clientHeight;
	if (name == null){
		name = "伏泰弹出页面";
	}
	if (width == null || width > bodyWidth){
		width = bodyWidth - 10;
	}
	if (height == null || height > bodyHeight){
		height = bodyHeight - 55;
	}
	
	var div = $("#" + divId);
	if (div.length != 0) {
		$('#' + divId).dialog("destroy");
		div.parent().remove(); // 删除当前存在的DIV
	}
	var html = 
		'<div id="'+divId+'" style="width:'
		+ width
		+ 'px;height:'
		+ height
		+ 'px;"><iframe id="'+divId+'-target" name="'+divId+'-target" scrolling="auto" frameborder="0" border="0"' 
		 +'marginwidth="0" marginheight="0"'
		 +'allowtransparency="yes" '
		 +'style="width:100%;height:100%; z-index: 9002;"></iframe></div>';
	
	$("body").append(html);
	// 设置窗口显示内容及按钮
	$('#'+divId).dialog({
		title : name,
		maximizable : true,
		modal : true,
		onOpen :function(){
			document.getElementById(divId+'-target').src = url;
			var doc = document.getElementById(divId+'-target').contentWindow;
			if (typeof callback == 'function') { // 初始地图后的执行回调方法
				vortexWindowCallBack = callback;
				popVortexWindowCallBack = function(param){
					callback(param);
					$('#' + divId).dialog("destroy");
				}
			}
		}
	});
}
popVortexWindowCallBack = function(param){
	$('#' + divId).dialog("destroy");
}

/*
 * ======================================= cookie的操作
 * =======================================
 */
/*
 * 根据名称获取cookie信息 输入： name：页面中cookie名称 返回： cookie中对应该名称的值
 */
getCookie = function(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) {
        return null;
    }
    var end = document.cookie.indexOf(";", len);
    if (end == -1) {
        end = document.cookie.length;
    }
    return unescape(document.cookie.substring(len, end));
}

/*  
 */
setCookie = function(name, value, expires, path, domain, secure) {
	// set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
}
/*
*/
deleteCookie = function(name, path, domain) {
    if (Get_Cookie(name)) {
        document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}


/*
 * ========================================= 表单Form校验
 * =========================================
 */
/*
 * 检验Form formName: 页面中表单的名字 elec: 页面中需要验证的对象
 */
checkForm = function(formName) 
{
	var theForm = formName ? $("form[name='"+formName+"']") : $("form:eq(0)");
	var flag = true;
	var arr = jQuery.makeArray();
	// 获取表单的checkbox和radio元素
	$("input:checkbox,input:radio",theForm).each
	(
		function () 
		{
			
			if($(this).parent().attr("notnull") && $(this).parent().attr("notnull")=="true" && $(this).parent().parent().css("display") != "none")
			{
				// 排除已做过判断的同名元素
				if (jQuery.inArray(arr,this.name)==-1)
				{
					// 同名的checkbox或者radio有一个被选中即不为null
					if($("[type="+this.type+"][name="+this.name+"][@checked]",theForm).length<=0)
					{
						// formAlert("有*标志的输入项不能为空!");
						formAlert("带*必填");
						$(this).focus();
						changeInputbg(this,true); 
						flag=false;
						return false;
					} else {
						changeInputbg(this,false); 
					}
					arr.push(this.name);
				}

			}
			
		}
	);
	if(!flag)
	{
		return flag;
	}
	// 获取表单的非checkbox,radio,button的input,select元素
	$("input,select",theForm).not("input:checkbox,input:radio,input:button").each
	(
		function () 
		{
			if ($(this).parent().parent().css("display") != "none"){
				if($(this).parent().attr("notnull") && $(this).parent().attr("notnull")=="true")
				{
					if(this.value.isNull())
					{
						// formAlert("有*标志的输入项不能为空!");
						formAlert("带*必填");
						$(this).focus();
						changeInputbg(this,true); 
						flag=false;
						return false;
					} else {
						changeInputbg(this,false);
					}
				}
				
				if(!checkMaxLength(this))
				{
					flag=false; 
					return false;
				}
				if(!checkDataType(this))
				{
					flag=false; 
					return false;
				}
			}
			
			
		}
	);
	if(flag){
		// $("input:button").attr("disabled", true);
	}
	return flag;
}


// 判断maxLength , Form.Element 必须具有maxLength属性(区分大小写)
checkMaxLength = function(ele) {
	var mlength=ele.getAttribute? parseInt(ele.getAttribute("maxlength")) : "";
	if (ele.getAttribute && ele.value.length>mlength){
		formAlert("你只能输入"+ele.maxLength+"个英文或数字!\n(如果要输入中文字符，您最多只能输入"+ele.maxLength/2+"个中文字符)");
        $(ele).focus();
        changeInputbg(ele,true); 
        return false;
	} else {
		changeInputbg(ele,false); 
	}

//	if(ele.maxLength && ele.maxLength < ele.value.replace(/[^\x00-\xff]/gi,'xx').length){
//		formAlert("你只能输入"+ele.maxLength+"个英文或数字!\n(如果要输入中文字符，您最多只能输入"+ele.maxLength/2+"个中文字符)");
//        $(ele).focus();
//        changeInputbg(ele,true); 
//        return false;
//    } else {
//    	changeInputbg(ele,false); 
//    }
    return true;
}
// 判断 Datatype, Form.Elemnet必须具有datatype属性(区分大小写)
checkDataType = function(ele) {
	var dataType = $(ele).parent().attr("datatype");
	if (!dataType) return true;
	// 数字型
	if(dataType.toUpperCase() == "NUMBER") {
		if (!ele.value.isNull() && !ele.value.isNumber()) {
			formAlert("请输入正确的数值(如:1.23)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 浮点型
	if (dataType.toUpperCase().indexOf("FLOAT")>=0) {		
		if (!ele.value.isNull() && !ele.value.isFloat()) {
			formAlert("请输入正确的数值(如:1.23)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else{
			changeInputbg(ele,false); 
		}
		// 如果有精度控制
		if(dataType.indexOf("(")>=0) {
			len = dataType.substring(dataType.indexOf("(")+1,dataType.indexOf(","));
			prec = dataType.substring(dataType.indexOf(",")+1,dataType.indexOf(")"));
			if(!checkPrecision(ele,len,prec)){
				$(ele).focus();
				changeInputbg(ele,true); 
				return false;
			} else {
				changeInputbg(ele,false); 
			}
		}
	}
	// 自然数
	if (dataType.toUpperCase()=="NATURAL") {
		if (!ele.value.isNull() && !ele.value.isNatural()) {
			formAlert("请输入正确的自然数(如:0或者123)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 正整数
	if (dataType.toUpperCase()=="POSITIVEINTEGER" || dataType.toUpperCase() == "PINT") {
		if (!ele.value.isNull() && !ele.value.isPositiveInteger()) {
			formAlert("请输入正确的正整数(如:123)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 整数
	if (dataType.toUpperCase()=="INT" || dataType.toUpperCase()=="INTEGER") {
		if (!ele.value.isNull() && !ele.value.isInteger()) {
			formAlert("请输入正确的整数(如:123)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 日期
	if (dataType.toUpperCase()=="DATE") {
		if (!ele.value.isNull() && !ele.value.isDate()) {
			formAlert("请输入正确的日期(如:2009-12-12)!");
			$(ele).focus();
			changeInputbg(ele,true);
			return false;
		} else {
			changeInputbg(ele,false);
		}
	}
	// 日期
	if (dataType.toUpperCase() == "DATETIME") {
		if (!ele.value.isNull() && !ele.value.isDateTime()) {
			formAlert("请输入正确的日期时间(如:2009-12-12 12:21:30)!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 非中文字符
	if (dataType.toUpperCase()=="DSTRING" || dataType.toUpperCase()=="ASTRING") {
		if (!ele.value.isNull() && !ele.value.isNotCN()) {
			formAlert("该输入框不能有中文字符");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// email
	if (dataType.toUpperCase()=="EMAIL") {
		if (!ele.value.isNull() && !ele.value.isEmail()) {
			formAlert("该输入正确的Email地址!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 固定电话
	if (dataType.toUpperCase() == "PHONE") {
		if (!ele.value.isNull() && !ele.value.isPhone()) {
			formAlert("该输入正确的电话号码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 传真
	if (dataType.toUpperCase() == "FAX") {
		if (!ele.value.isNull() && !ele.value.isFax()) {
			formAlert("该输入正确的传真号码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 手机号码
	if (dataType.toUpperCase() == "MOBILEPHONE" || dataType.toUpperCase() == "MPHONE") {
		if (!ele.value.isNull() && !ele.value.isMobilePhone()) {
			formAlert("该输入正确的手机号码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 联通手机号码
	if (dataType.toUpperCase() == "UNICOMMOBILEPHONE" || dataType.toUpperCase() == "UMPHONE") {
		if (!ele.value.isNull() && !ele.value.isUnicomMobilePhone()) {
			formAlert("该输入正确的联通手机号码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 邮政编码
	if (dataType.toUpperCase() == "POST" ) {
		if (!ele.value.isNull() && !ele.value.isPost()) {
			formAlert("该输入正确的邮政编码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	// 身份证
	if (dataType.toUpperCase() == "IDCARD" ) {
		if (!ele.value.isNull() && !ele.value.isIDCard()) {
			formAlert("该输入正确的身份证号码!");
			$(ele).focus();
			changeInputbg(ele,true); 
			return false;
		} else {
			changeInputbg(ele,false); 
		}
	}
	return true;
}
// 判断浮点数后缀
checkPrecision = function(obj,len,prec) {   
    var numReg;    
    var strValueTemp, strInt, strDec;        
    var value = obj.value;
    numReg =/[\-]/;   
    strValueTemp = value.replace(numReg, "");   
    numReg =/[\+]/;   
    strValueTemp = strValueTemp.replace(numReg, "");   
    // 整数
    if(prec==0){   
    	numReg =/[\.]/;   
        if(numReg.test(value) == true){   
        	formAlert("输入必须为整数类型!");
            obj.select();
            changeInputbg(obj,true);
            return false;      
        }  else {
        	changeInputbg(obj,false);
        }
    }          
    if(strValueTemp.indexOf(".") < 0 ){   
        if(strValueTemp.length >( len - prec)){   
        	formAlert("整数位不能超过"+ (len - prec) +"位!");   
            obj.select();
            changeInputbg(obj,true);
            return false;   
        } else {
        	changeInputbg(obj,false);
        }
    }else{   
    	strInt = strValueTemp.substr( 0, strValueTemp.indexOf(".") );          
        if(strInt.length >( len - prec)){   
        	formAlert("整数位不能超过"+ (len - prec) +"位!");   
            obj.select();
            changeInputbg(obj,true);
            return false;   
        } else {
        	changeInputbg(obj,false);
        }
        strDec = strValueTemp.substr( (strValueTemp.indexOf(".")+1), strValueTemp.length );    
        if(strDec.length > prec){   
        	formAlert("小数位不能超过"+  prec +"位!");   
            obj.select();
            changeInputbg(obj,true);
            return false;  
        } else {
        	changeInputbg(obj,false);
        }
   	}          
    return true;   
}
/**
 * 改变Input框的背景色
 */
changeInputbg = function(element,bg){
	if(bg){
		$(element)[0].style.backgroundColor = "#f14343"; 
	} else {
		$(element)[0].style.backgroundColor = "#ffffff"; 
	}
}
/*
 * =============================== 统一的消息弹出 ===============================
 */
// Form表单验证时的弹出
function formAlert(msg,diplayId){
	//var msgHTML = "<font color='red'>" + msg + "</font>";
	var msgHTML =  msg ;
	if (diplayId == null){
		$("#form_errormsg").html(msgHTML);
	} else {
		$("#" + diplayId).html(msgHTML);
	}
	
}
/**
 * 页面的跳转
 * 
 * @param button
 *            哪个button可用
 * @param reload
 *            要执行的刷新语句
 * @param isclose
 *            是否要关闭本页
 * @return
 */
function gotoJSP(button,reload,isClose){
	var obj = document.getElementById("_listFrame");
 	obj.onreadystatechange  = function() {
		if (this.readyState && this.readyState != 'complete') {
			return;
		} else {
			var msg = window.frames['_listFrame'].document.getElementById('msg').value;
			if (msg.indexOf('成功')!= -1){
				// window.opener.parent.location.reload();
				eval(reload);
				if (isClose == null){
					window.setInterval('window.close();',2000); 
				}
				
			}
			document.getElementById(button).disabled = false;
		}
	};
	obj.onload = function() {//FF
		var msg = window.frames['_listFrame'].document.getElementById('msg').value;
			if (msg.indexOf('成功')!= -1){
				// window.opener.parent.location.reload();
				eval(reload);
				if (isClose == null){
					window.setInterval('window.close();',2000); 
				}
				
			}
			document.getElementById(button).disabled = false;
	};
}
function toggleDetailInfo($this, $detail){
	if ($detail.css('display')=='block'){
		$detail.hide();
		$this.removeClass('vtbnavtitle').addClass('vtbnavtitle2');
		$this.parent().removeClass('vtbnav').addClass('vtbnav2');
	} else {
		$detail.show();
		$this.removeClass('vtbnavtitle2').addClass('vtbnavtitle');
		$this.parent().removeClass('vtbnav2').addClass('vtbnav');
	};
}