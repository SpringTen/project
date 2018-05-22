<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
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

</script>
</head>
<body class="easyui-layout" id="main_layout" data-options="fit:true">
	<div data-options="region:'north',border:false"
		style="height: 35px; overflow: hidden;">
		<div class="vnav vnavfont vnavsize">雪具类型管理 &gt; 新增雪具类型</div>
		<div class="vsep"></div>
	</div>
	<div data-options="region:'center',border:false">
		<form action="typeController/typeAdd" method="post" id="form">
			<div style="margin-top: 5px; padding-left: 0px; padding-right: 0px;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vtb">
					<tr>
						<td class="vtbtralignR" style="width: 25%">名称：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<input type="text" style="width:200px; height: 30px;" name="typeName" class="vinput" placeholder="请输入名称">
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR"style="width: 25%">介绍：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<textarea name="typeBrief" style="width: 60%;height: 300px"></textarea>
						</td>
					</tr>
				</table>
			</div>
		</form>
	</div>
	<div data-options="region:'south',border:false" style="height: 30px; background: #e5eff8; overflow: hidden;" align="center">
		<a href="typeList.jsp" class="btn" >返回</a> 
		<a class="btn btn-success" onclick="javascript:$('#form').submit()">保存</a>
	</div>
</body>
</html>