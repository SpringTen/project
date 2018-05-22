/**
 * panel方法扩展
 * @param {Object} jq
 * @param {Object} params
 */
$.extend($.fn.panel.methods, {  
    doBorderConf: function(jq, params){
        return jq.each(function(){
			function _removeClass(jObj,className){
				if(jObj.hasClass(className))
					jObj.removeClass(className);
			};
			function _removeAllClass(jObj){
				var classArray = ['top-border-no','right-border-no','bottom-border-no','left-border-no',
				'top-border','right-border','bottom-border','left-border'];
				for(var i=0; i<8; i++){
					_removeClass(jObj,classArray[i]);
				}
			};
			function _addAllClass(jObj,args){
				for(var i=0; i<args.length; i++){
					var classA = "";
					switch(i){
						case 0:
							classA = 'top-border';
							break;
						case 1:
							classA = 'right-border';
							break;
						case 2:
							classA = 'bottom-border';
							break;
						case 3:
							classA = 'left-border';
							break;
						default:
							classA = '';
							break;
					}
					if(args[i]==0) classA += '-no';
					jObj.addClass(classA);
				}
					
			};
			if(params.header){
				var borderList = params.header.split(' ');
				var hp = $(this).panel("header");
				_removeAllClass(hp);
				_addAllClass(hp,borderList);
			}
			if(params.body){
				var borderList = params.body.split(' ');
				var bp = $(this).panel("body");
				_removeAllClass(bp);
				_addAllClass(bp,borderList);
			}
			$(this).panel('resize');            
        });  
    },
	addHeader: function(jq,params){
		return jq.each(function(){
            function removeNode(node){
                node.each(function(){
                    $(this).remove();
                    if ($.browser.msie) {
                        this.outerHTML = "";
                    }
                });
            };
			var that = this;
			var opts = $.data(this, 'panel').options;
			var panel = $.data(this, 'panel').panel;
			if(params){
				opts.title = params.title?params.title:opts.title;
				opts.collapsible = params.collapsible?params.collapsible:opts.collapsible;
				opts.minimizable = params.minimizable?params.minimizable:opts.minimizable;
				opts.maximizable = params.maximizable?params.maximizable:opts.maximizable;
				opts.closable = params.closable?params.closable:opts.closable;
				opts.tools = params.tools?params.tools:opts.tools;
				opts.iconCls = params.iconCls?params.iconCls:opts.iconCls;
			}
			opts.noheader = false;
			opts.title = (opts.title==null || opts.title =="")?" ":opts.title;
			removeNode(panel.children("div.panel-header"));
            var header = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(panel);
            if (opts.iconCls) {
                header.find(".panel-title").addClass("panel-with-icon");
                $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(header);
            }
            var tool = $("<div class=\"panel-tool\"></div>").appendTo(header);
            if (opts.tools) {
                if (typeof opts.tools == "string") {
                    $(opts.tools).children().each(function(){
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").clone().appendTo(tool);
                    });
                }
                else {
                    for (var i = 0; i < opts.tools.length; i++) {
                        var t = $("<a href=\"javascript:void(0)\"></a>").addClass(opts.tools[i].iconCls).appendTo(tool);
                        if (opts.tools[i].handler) {
                            t.bind("click", eval(opts.tools[i].handler));
                        }
                    }
                }
            }
            if (opts.collapsible) {
                $("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function(){
                    if (opts.collapsed == true) {
						$(that).panel('expand',true);
                    }else {
                        $(that).panel('collapse',true);
                    }
                    return false;
                });
            }
            if (opts.minimizable) {
                $("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function(){
					$(that).panel('minimize');
                    return false;
                });
            }
            if (opts.maximizable) {
                $("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function(){
                    if (opts.maximized == true) {
						$(that).panel('restore');
                    }
                    else {
						$(that).panel('maximize');
                    }
                    return false;
                });
            }
            if (opts.closable) {
                $("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function(){
					$(that).panel('close');
                    return false;
                });
            }
            panel.children("div.panel-body").removeClass("panel-body-noheader");        
        });
	},
	removeHeader:function(jq,params){
		return jq.each(function(){
			function removeNode(node){
                node.each(function(){
                    $(this).remove();
                    if ($.browser.msie) {
                        this.outerHTML = "";
                    }
                });
            };
			var panel = $.data(this, 'panel').panel;
			removeNode(panel.children("div.panel-header"));
			panel.children("div.panel-body").addClass("panel-body-noheader");
		});
	},
	setCls:function(jq,params){
		return jq.each(function(){
			$(this).panel('panel').addClass('params');
		});
	},
	setHeaderCls:function(jq,params){
		return jq.each(function(){
			$(this).panel('header').addClass('params');
		});
	},
	setBodyCls:function(jq,params){
		return jq.each(function(){
			$(this).panel('body').addClass('params');
		});
	},
	setStyle:function(jq,params){
		return jq.each(function(){
			$(this).panel('panel').css(params);
		});
	}
});