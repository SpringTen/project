(function ($, K) {

    if (!K)

        throw "KindEditor未定义!";

 

    function create(target) {

        var opts = $.data(target, 'kindeditor').options;

        var editor = K.create(target, opts);
        
        $.data(target, 'kindeditor').options.editor = editor;
       return editor;
        	
    }
 
    $.fn.kindeditor = function (options, param) {

        if (typeof options == 'string') {

            var method = $.fn.kindeditor.methods[options];

            if (method) {

                return method(this, param);

            }

        }

        options = options || {};

        return this.each(function () {

            var state = $.data(this, 'kindeditor');

            if (state) {

                $.extend(state.options, options);

            } else {

                state = $.data(this, 'kindeditor', {

                        options : $.extend({}, $.fn.kindeditor.defaults, $.fn.kindeditor.parseOptions(this), options)

                    });

            }

            create(this);
            

        });

    };

 

    $.fn.kindeditor.parseOptions = function (target) {

        return $.extend({}, $.parser.parseOptions(target, []));

    };

 

    $.fn.kindeditor.methods = {

        editor : function (jq) {

            return $.data(jq[0], 'kindeditor').options.editor;

        },
        create:function(t){
        	$.data(t, 'kindeditor', {

                options : $.extend({}, $.fn.kindeditor.defaults)

            });
        	 var editor=create(t);
        	 return editor;
        }

    };

 

    $.fn.kindeditor.defaults = {

        resizeType : 1,

        allowPreviewEmoticons : false,

        allowImageUpload : false,

        items : [
                 'source', '|','undo', 'redo', '|', 'preview', 'print',  'code', 'cut', 'copy', 'paste',
                 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                 'table', 'hr',  'pagebreak','insertfile','multiimage'
                 
                 ],

        afterChange:function(){

            this.sync();//这个是必须的,如果你要覆盖afterChange事件的话,请记得最好把这句加上.

        }

    };

    $.parser.plugins.push("kindeditor");

})(jQuery, KindEditor);
