
<%
	String richtext_path = request.getContextPath();
	String richtext_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ richtext_path + "/";
%>
<link rel="stylesheet" href="../resources/js/kindEditor/kindeditor-4.1.7/themes/default/default.css" />
<script charset="utf-8" src="../resources/js/kindEditor/kindeditor-4.1.7/kindeditor.js"></script>
<script charset="utf-8" src="../resources/js/kindEditor/kindeditor-4.1.7/plugins/image/image.js"></script>
<script charset="utf-8" src="../resources/js/kindEditor/kindeditor-4.1.7/lang/zh_CN.js"></script>
<script type="text/javascript" src="../vortex/framework/easyui/plugins/easyui-kindEditor.js"></script>

