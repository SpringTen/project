VortexSkin = function() {
	var skin = MapUtil.getInstance();
	var skinHtml = MapUtil.getInstance();
	
	function skinTemplate() {
		var templateHtml = '<div class="skin">'
	        +'<div class="skin-img" id="input_skinId"><img src="input_skinImg" /></div>'
	        +'<div class="skin-txt">input_skinName</div>'
	        +'<div class="skin-look">'
	        +'<div style="float:left;"><img src="' + path + '/resources/themes/changeskin/images/skin-look.png" /></div>'
	        +'<div style="float:left"><a href="javacript:void(0)">预览</a></div>'
	        +'</div>'
	        +'</div>';
		return templateHtml;
	}

	function parseSkinTemplate(skinObj){
		var template = skinTemplate();
		var parserHtml = template;
		parserHtml = parserHtml.replace("input_skinId", skinObj.skinId);
		parserHtml = parserHtml.replace("input_skinName", skinObj.skinName);
		parserHtml = parserHtml.replace("input_skinImg", skinObj.skinImg);
		return parserHtml;
	}
	function createSkins(){
		var skinHtml = '<div style="min-width:665px; width:100%; height:auto;">';
		
		skinHtml +=parseSkinTemplate({
			skinId:'id1',
			skinName:'晴空万里',
			skinImg:path + '/resources/themes/changeskin/images/skin1.jpg'
		});
		skinHtml +=parseSkinTemplate({
			skinId:'id2',
			skinName:'城市发展',
			skinImg:path + '/resources/themes/changeskin/images/skin2.jpg'
		});
		skinHtml +=parseSkinTemplate({
			skinId:'id3',
			skinName:'湖泊山水',
			skinImg:path + '/resources/themes/changeskin/images/skin3.jpg'
		});
		skinHtml += '</div>';
		return skinHtml;
	}
	function checkSkin(targetId) {
		$.lhgdialog({
			lock : true,
			title : '皮肤中心',
			width : '670px',
			height : '300px',
			padding:'0px',
			min:false,
			max:false,
			content : createSkins(),
			init: function(here){
				var offset = $('#' + targetId).offset();
				var duration = 400, /*动画时长*/ 
		        api = this, 
		        opt = api.config, 
		        wrap = api.DOM.wrap, 
				top = parseInt(wrap[0].style.top),
		        left = parseInt(wrap[0].style.left),
		        ttop = offset.top,
		        tleft = offset.left,
		        style = api.DOM.main[0].style,
		        offsetHeight = parseInt(wrap[0].offsetHeight),
				offsetWidth = parseInt(wrap[0].offsetWidth);
	                        
		        wrap.css('top',ttop+'px').css('left',tleft+'px')
		        .css('width','0px').css('height','0px')
		        .animate({top: top +'px',left:left+'px',width:offsetWidth+'px',height:offsetHeight+'px'}, duration, function(){
	            	
	            });
	        },
			close:function(){ 
				
				var offset = $('#' + targetId).offset();
			    var duration = 400, /*动画时长*/ 
			        api = this, 
			        opt = api.config, 
			        wrap = api.DOM.wrap, 
			        top = offset.top,
			        left = offset.left; 
			    wrap.animate({top:top + 'px',left:left+'px',width:'0px',height:'0px', opacity:0}, duration, function(){ 
			        opt.close = function(){}; 
			        api.close(); 
			    }); 
			         
			    return false; 
			}
		});
	}
	function onChangeTheme(theme){
		$('#theme').attr('href','');
	}
	return {
		checkSkin : function(targetId) {
			checkSkin(targetId);
		},
		changeTheme:function(){
			
		}
	}
}();
