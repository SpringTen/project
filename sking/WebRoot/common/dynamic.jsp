
<%
	String d_path = request.getContextPath();
	String d_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ d_path + "/";
%>
<script type="text/javascript">
<!--
	var _path = '<%=d_path%>';
	var _fullPath = '<%=d_basePath%>';
//-->
</script>
