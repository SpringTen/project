
<%
	String highchartsjs_path = request.getContextPath();
	String highchartsjs_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ highchartsjs_path;
%>
<script src="../vortex/framework/highcharts/highcharts.js"></script>
<script src="../vortex/framework/highcharts/exporting.js"></script>
<script type="text/javascript" src="../vortex/framework/highcharts/highchartsline.js"></script>