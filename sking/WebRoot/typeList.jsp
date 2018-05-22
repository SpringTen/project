<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
var TypeList = {
	//构造查询条件
	getQueryParam : function() {
		var queryParam = {
			'name' : $('#name').val()
		};
		return queryParam;
	},
	//清空查询条件
	clearSearch : function() {
		var t = this;
		$('#name').val('');
		t.doSearch();
	},
	//查询
	doSearch : function() {
		var t = this;
		t.dataGrid.dataGridInstance.load();
	},
	//列表datagrid
	dataGrid : {
		dataGridId : 'data_list',
		dataGridUrl : 'typeController/findPage',
		dataGridInstance : null,
		//初始化datagrid
		initDataGrid : function() {
			var t = this;
			var columns = [ [ {
				field : 'typeId',
				title : '编号',
				width : 80,
				align : 'center'
			}, {
				field : 'typeName',
				title : '名称',
				width : 80,
				align : 'center'
			}, {
				field : 'typeBrief',
				title : '详细介绍',
				width : 300,
				align : 'center',
			}, {
				field : 'operate',
				title : '操作',
				width : 60,
				align : 'center',
				formatter : function(value, row, index) {
									return "<a href='typeController/findOne?id="+row.typeId+"' class='btn btn-success'>修改</a>"+ 
											"&nbsp;&nbsp;&nbsp;&nbsp;<a href='typeController/deleteById?id="+row.typeId+"' class='btn'>删除</a>";
								}
			}] ];
			var config = {
				gridId : t.dataGridId,
				gridUrl : t.dataGridUrl,
				columns : columns,
				gridQueryParam : TypeList.getQueryParam,
				pageList:[5,10,15,20]
			};
			t.dataGridInstance = new EasyuiDataGrid(config);
		},
		init : function() {
			var t = this;
			t.initDataGrid();
			t.hasInit = true;
		},
		hasInit : false
	},
	//初始化
	init : function() {
		var t = this;
		t.dataGrid.init();
		t.hasInit = true;
	},
	hasInit : false
};

$(document).ready(function() {
	TypeList.init();
});
//回车事件
document.onkeydown = function(e) {
	if (!e)
		e = window.event;//火狐中是 window.event
	if ((e.keyCode || e.which) == 13) {
		TypeList.doSearch();
	}
}
</script>
<title></title>
</head>
<body class="easyui-layout" id="main_layout">
	<div data-options="region:'north',border:false" style="overflow: hidden; height: 60px">
		<div style="height: 40px; margin-top: 10px;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vtb">
				<tr style="line-height: 37px;">
					<td width="100%" class="vtbtralignL">&nbsp; 
						<span style="text-align: right; margin-left: 10px;">类型名：</span>
						<input type="text" style="width: 150px;" id="name" name="videoCourse" class="vinput" placeholder="请输入">&nbsp;&nbsp;
						<a  class="btn btn-success" onclick="TypeList.doSearch()">查询</a>&nbsp;&nbsp;
						<a  class="btn" onclick="TypeList.clearSearch()">清空</a>&nbsp;&nbsp;
						<a  class="btn" href="typeAdd.jsp">新增</a>
					</td>
				</tr>
			</table>	
		</div>
		<div class="vsep"></div>
	</div>
	<div data-options="region:'center',border:false" style="overflow: hidden;padding: 5px;" id="center">
		<table id="data_list"></table>
	</div>
</body>
</html>