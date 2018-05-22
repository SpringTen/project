/**
 * ==================== init document online view ====================
*/
function initOnlineView(startDocument) {
	$('#viewArea').FlexPaperViewer({
		 config : {
			 DOC : escape(getDocumentUrl(startDocument)),
			 Scale : 1, 
			 ZoomTransition : 'easeOut',
			 ZoomTime : 0.5, 
			 ZoomInterval : 0.1,
			 FitPageOnLoad : false,
			 FitWidthOnLoad : false, 
			 FullScreenAsMaxWindow : false,
			 ProgressiveLoading : false,
			 MinZoomSize : 0.2,
			 MaxZoomSize : 5,
			 SearchMatchAll : false,
			 ViewModeToolsVisible : true,
			 ZoomToolsVisible : true,
			 NavToolsVisible : true,
			 CursorToolsVisible : true,
			 SearchToolsVisible : true,		 
			 jsDirectory :  path + '/resources/js/flexpaper/2.1.5/flexpaper/',
			 JSONDataType : 'jsonp',
			 WMode : 'window',
			 localeChain: 'en_US',
			 RenderingOrder : 'flash,flash'
			 }
	});
}

function getDocumentUrl(document){
	//return "/swfData.jsp?doc={doc}&format={format}&page={page}".replace("{doc}",document);     
	return path + "/vortexfile/clientUploadFile/swfPage?doc={doc}&format={format}&page={page}".replace("{doc}",document);     
}
