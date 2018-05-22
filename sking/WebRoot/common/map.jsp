
<%
	String mapjs_path = request.getContextPath();
	String mapjs_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ mapjs_path;
%>
<!-- map-defult value -->
<script type="text/javascript" src="../vortex/gisMapConstant.js"></script>
<script type="text/javascript" src="../vortex/gis/js/mapConstants.js"></script>
<script type="text/javascript" src="../vortex/gis/js/gisFactory.js"></script>
<script type="text/javascript" src="../vortex/gis/js/gisLibrary.js"></script>
<link rel="stylesheet" type="text/css" href="../vortex/gis/css/mapTool.css">
<script type="text/javascript" src="../vortex/gis/js/mapTool.js"></script>
<link rel="stylesheet" type="text/css" href="../vortex/gis/css/map.css">