
<%
	String commonjs_path = request.getContextPath();
	String commonjs_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ commonjs_path;
%>
<%@include file="/common/dynamic.jsp"%>
<script type="text/javascript" src="../vortex/framework/easyui/extension/util.js"></script>

<script type="text/javascript" src="../vortex/framework/constant.js"></script>
<script type="text/javascript" src="../vortex/framework/util/global.js"></script>
<script type="text/javascript" src="../vortex/framework/util/event.js"></script>
<script type="text/javascript" src="../vortex/framework/util/easyuiValidate.js"></script>
<script type="text/javascript" src="../vortex/framework/util/VortexUtil.js"></script>
<script type="text/javascript" src="../vortex/framework/util/MapUtil.js"></script>
<script type="text/javascript" src="../vortex/framework/util/dateUtils.js"></script>
<script type="text/javascript" src="../vortex/framework/util/ScriptSynchLoaderMgr.js"></script>
<script type="text/javascript"
	src="../vortex/framework/util/CharacterUtil.js"></script>
<script type="text/javascript"
	src="../vortex/framework/util/uuid.js"></script>
<script type="text/javascript"
	src="../vortex/framework/util/Function.js"></script>	
<script type="text/javascript" src="../vortex/uploadFile/uploadFile.js"></script>
<script type="text/javascript" src="../vortex/framework/util/GridColumnMenu.js"></script>
<script type="text/javascript" src="../vortex/framework/tree/Tree.js"></script>
<script type="text/javascript" src="../vortex/framework/ajaxform/jqueryajaxform.js"></script>

<script type="text/javascript" src="../vortex/framework/autocomplete/jqueryautocomplete.js"></script>
<script type="text/javascript" src="../vortex/framework/easyui/extension/jquery.datagrid.extend.js"></script>
<script type="text/javascript" src="../vortex/framework/datagrid/easyuidatagrid.js"></script>
<script type="text/javascript" src="../vortex/framework/datagrid/DataGridExport.js"></script>
<script type="text/javascript" src="../vortex/framework/dynamicform/DynamicForm.js"></script>


<script type="text/javascript" src="../vortex/framework/jquery/plugins/mask/mask.js"></script>
<script type="text/javascript" src="../vortex/framework/easyui/window/windowControl.js"></script>
<script type="text/javascript" src="../vortex/framework/easyui/plugins/datagrid-bufferview.js"></script>
<script type="text/javascript" src="../vortex/framework/easyui/plugins/datagrid-detailview.js"></script>
<script type="text/javascript" src="../vortex/popup.js"></script>

<script type="text/javascript" src="../vortex/echarts/echarts.common.min.js"></script>
<script type="text/javascript" src="../vortex/echarts/echarts.min.js"></script>

<script type="text/javascript" src="../resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.pack.js"></script>

<script type="text/javascript" src="../resources/js/jquery/json/json2.js"></script>

<script type="text/javascript" src="../vortex/reportConstant.js"></script>
<link rel="stylesheet" type="text/css" href="../resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.css" media="screen" />
<script type="text/javascript">
try{
	if (_systemConfig.pageViewType == 'pop'){
		VortexUtil.changeWin(_systemConfig.windowWidth, _systemConfig.windowHeight);
	}
}catch(e){}
</script>