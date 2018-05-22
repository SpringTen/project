<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<meta http-equiv="Cache-Control" content="no-store"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<link rel="icon" href="resources/images/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="/resources/images/favicon.ico" type="image/x-icon"/>
<link rel="bookmark" href="resources/images/favicon.ico" type="image/x-icon"/>
<!-- ICON End -->	
<link rel="stylesheet" type="text/css" href="resources/js/jquery/easyui/1.3.6/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="resources/js/jquery/easyui/1.3.6/themes/icon.css">
<script type="text/javascript" src="resources/js/jquery/jquery-1.8.3.min.js"></script>
 
<script type="text/javascript" src="resources/js/jquery/easyui/1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="resources/js/jquery/easyui/1.3.6/locale/easyui-lang-zh_CN.js"></script>
<!-- qtip2 -->
<link rel="stylesheet" type="text/css" href="resources/js/jquery/qtip2/2.1.1/jquery.qtip.css">
<script type="text/javascript" src="resources/js/jquery/qtip2/2.1.1/jquery.qtip.min.js"></script>
<!-- jquery-noInput -->
<link href="resources/js/jquery/jquery-noInput/0.0.1/jquery-noInput.min.css" type="text/css" rel="stylesheet"/>
<script type="text/javascript" src="resources/js/jquery/jquery-noInput/0.0.1/jquery-noinput.min.js"></script>
<!-- bootstrap -->
<link href="resources/js/bootstrap/2.3.2/css/bootstrap.css" type="text/css" rel="stylesheet" />
<link href="resources/js/bootstrap/2.3.2/css/bootstrap-responsive.css" type="text/css" rel="stylesheet" />
<script src="resources/js/bootstrap/2.3.2/js/bootstrap.min.js" type="text/javascript"></script>
<!-- page css -->
<link href="resources/themes/vortex/css/page.css" type="text/css" rel="stylesheet" />
<link href="resources/themes/vortex.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="resources/file/css/show.css">
<%-- <%@include file="/common/commonjs.jsp"%> --%>
<script type="text/javascript" src="vortex/framework/easyui/extension/util.js"></script>
<script type="text/javascript" src="vortex/framework/constant.js"></script>
<script type="text/javascript" src="vortex/framework/util/global.js"></script>
<script type="text/javascript" src="vortex/framework/util/event.js"></script>
<script type="text/javascript" src="vortex/framework/util/easyuiValidate.js"></script>
<script type="text/javascript" src="vortex/framework/util/VortexUtil.js"></script>
<script type="text/javascript" src="vortex/framework/util/MapUtil.js"></script>
<script type="text/javascript" src="vortex/framework/util/dateUtils.js"></script>
<script type="text/javascript" src="vortex/framework/util/ScriptSynchLoaderMgr.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/CharacterUtil.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/uuid.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/Function.js"></script>	
<script type="text/javascript" src="vortex/uploadFile/uploadFile.js"></script>
<script type="text/javascript" src="vortex/framework/util/GridColumnMenu.js"></script>
<script type="text/javascript" src="vortex/framework/tree/Tree.js"></script>
<script type="text/javascript" src="vortex/framework/ajaxform/jqueryajaxform.js"></script>
<script type="text/javascript" src="vortex/framework/autocomplete/jqueryautocomplete.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/extension/jquery.datagrid.extend.js"></script>
<script type="text/javascript" src="vortex/framework/datagrid/easyuidatagrid.js"></script>
<script type="text/javascript" src="vortex/framework/datagrid/DataGridExport.js"></script>
<script type="text/javascript" src="vortex/framework/dynamicform/DynamicForm.js"></script>
<script type="text/javascript" src="vortex/framework/jquery/plugins/mask/mask.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/window/windowControl.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/plugins/datagrid-bufferview.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/plugins/datagrid-detailview.js"></script>
<script type="text/javascript" src="vortex/popup.js"></script>
<script type="text/javascript" src="resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.pack.js"></script>
<script type="text/javascript" src="resources/js/jquery/json/json2.js"></script>
<script type="text/javascript" src="vortex/reportConstant.js"></script>
<link rel="stylesheet" type="text/css" href="resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.css" media="screen" />
<script type="text/javascript">
var NewsInfoUpdateForm = {
	formId : 'form',
	form : null,
	formSubmit : function() {
		var t = this;		
		$('#' + t.formId).submit();
	},
	init : function() {
		var t = this;
		t.hasInit = true;
	},
	getObjectURL : function (file) {  
		  var url = null ;   
		  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
		  if (window.createObjectURL!=undefined) { // basic  
		    url = window.createObjectURL(file) ;  
		  } else if (window.URL!=undefined) { // mozilla(firefox)  
		    url = window.URL.createObjectURL(file) ;  
		  } else if (window.webkitURL!=undefined) { // webkit or chrome  
		    url = window.webkitURL.createObjectURL(file) ;  
		  }  
		  return url ;  
	},
	loadImage : function(obj){  
		  // getObjectURL是自定义的函数，见下面  
		  // this.files[0]代表的是选择的文件资源的第一个，因为上面写了 multiple="multiple" 就表示上传文件可能不止一个  
		  // ，但是这里只读取第一个   
		  var objUrl = NewsInfoUpdateForm.getObjectURL(obj.files[0]) ;  
		  if (objUrl) {  
		    // 在这里修改图片的地址属性  
		    $("#img").attr("src", objUrl) ;  
		  }  
	},
	hasInit : false
};

$(document).ready(function() {
	NewsInfoUpdateForm.init();
});
</script>
</head>
<body class="easyui-layout" id="main_layout" data-options="fit:true">
	<div data-options="region:'north',border:false"
		style="height: 35px; overflow: hidden;">
		<div class="vnav vnavfont vnavsize">新闻信息管理 &gt; 新增新闻信息</div>
		<div class="vsep"></div>
	</div>
	<div data-options="region:'center',border:false">
		<form action="newsController/newsUpdate" method="post" id="form" enctype="multipart/form-data">
			<div style="margin-top: 5px; padding-left: 0px; padding-right: 0px;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vtb">
					<tr>
						<td class="vtbtralignR" style="width: 30%">
							<input type="file" name="file"  onchange="javascript:NewsInfoUpdateForm.loadImage(this);">
							<input type="text" style="display: none;" name="newsImage" value="${news.newsImage }">
							<input type="text" style="display: none;" name="newsId" value="${news.newsId }">
						</td>
						<td class="vtbtralignL" style="width: 70%">
							<img id="img" src="imageController/readImage?name=${news.newsImage }"  style="width: 80%;height: 200px;margin-bottom: 20px;">
						</td>
					</tr>
					
					<tr>
						<td class="vtbtralignR" style="width: 25%">主题：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<textarea name="newsTitle" style="width: 60%;height: 150px">${news.newsTitle}</textarea>
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR"style="width: 25%">内容：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<textarea name="newsContent" style="width: 60%;height: 300px">${news.newsContent}</textarea>
						</td>
					</tr>
				</table>
			</div>
		</form>
	</div>
	<div data-options="region:'south',border:false" style="height: 30px; background: #e5eff8; overflow: hidden;" align="center">
		<a href="newsList.jsp" class="btn">返回</a> 
		<a class="btn btn-success" onclick="javascript:NewsInfoUpdateForm.formSubmit();">保存</a>
	</div>
</body>
</html>