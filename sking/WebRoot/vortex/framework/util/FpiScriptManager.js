// create namespace  
Ext.namespace('framework.util');

//封装动态添加脚本的操作
framework.util.ScriptManager = function(){
    var timeout = 10;
    var scripts = [];
    var disableCaching = false;

    function GetHttpRequest(){
        //return HTTP.newRequest();
        if (Ext.isIE){
            // IE
            return new ActiveXObject("MsXml2.XmlHttp");
        }
        else{ 
            // Gecko
            return new XMLHttpRequest();
        }
    };

    function IncludeJS(url, sId, source, callback, callerScope){
        try{
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = null;

            var fileExtend = url.substr(url.length - 3);
            if(fileExtend == 'css'){
                oScript = document.createElement( "link" );                
                oScript.rel = 'stylesheet';                
                oScript.type = 'text/css'; 
                
                oScript.href = url;                 
            }
            else if(fileExtend == '.js'){
                oScript = document.createElement( "script" );
                oScript.language = "javascript";
                oScript.type = "text/javascript";
                
                oScript.src=url;                
            }
            else{
                //无后缀名，当作js文件处理
                oScript = document.createElement( "script" );
                oScript.language = "javascript";
                oScript.type = "text/javascript";
                
                oScript.src=url;
                
                sword.framework.log('perhaps illegal file: ' + url);
                //return false;
            }
            
            if(sId != null)
            {
                oScript.id = sId;
            }
            oScript.defer = true;
            oScript.text = source || '';

            oScript.onreadystatechange = function () {
                //IE
                if (oScript.readyState == 'complete' || oScript.readyState == 'loaded'){
                    //sword.framework.log('onreadystatechange ' + oScript.readyState + ':' + url);
                    scripts[url] = true;
                    if(callback != null){
                        callback.call(callerScope || window);
                    }
                }
                else if(oScript.readyState == 'loading'){                
                }
                else{
                    sword.framework.error('文件获取失败: (' + oScript.readyState + '):' + url);
                    scripts[url] = false;
                    if(callback != null){
                        callback.call(callerScope || window);
                    }      	
                }
            };
            oScript.onload = function(){
                //not IE
                //sword.framework.log('onload ' + url);
                scripts[url] = true;
                if(callback != null){
                    callback.call(callerScope || window);
                }
            };
            
            oHead.appendChild(oScript);     
                
            if(fileExtend == 'css'){
                sword.framework.log('onload ' + url);
                scripts[url] = true;
                if(callback != null){
                    callback.call(callerScope || window);
                }      
            }
        }
        catch (e){
            sword.framework.log('FpiScriptManager::IncludeJS exception: ' + e.message);
        }
    };
    
    //IE
    function syncLoad(url, callback, sId){
        try{
            var cfg, callerScope;
            if (typeof url == 'object') { // must be config object
                cfg = url;
                url = cfg.url;
                callback = callback || cfg.callback;
                callerScope = cfg.scope;
                if (typeof cfg.timeout != 'undefined') {
                    this.timeout = cfg.timeout;
                }
                if (typeof cfg.disableCaching != 'undefined') {
                    this.disableCaching = cfg.disableCaching;
                }
            }
    
            //修正dwr文件的后缀名
            var fileExtend = url.substr(url.length - 3);
            if(fileExtend == 'css'){           
            }
            else if(fileExtend == '.js'){                
            }
            else{
                //无后缀名，当作js文件处理
            	url = url + '.js';
            }
            
            if(scripts[url] === false){
                sword.framework.log('[' + url + ']已被尝试加载，但加载失败');
    
                //end of add
                if (typeof callback == 'function') {
                    callback.call(callerScope || window);
                }
                return null;            	
            }
            else if (scripts[url]) {
                sword.framework.log('[' + url + ']已存在');
    
                //end of add
                if (typeof callback == 'function') {
                    callback.call(callerScope || window);
                }
                return null;
            }
    
            //略过http检测，以提升效率，但无法捕获异常
            IncludeJS(url, sId, '', callback, callerScope);
            return;
    
            var oXmlHttp = GetHttpRequest();
    
            oXmlHttp.onreadystatechange = function(){
                if(oXmlHttp.readyState == 4){
                    if (oXmlHttp.status == 200 || oXmlHttp.status == 304){
                        IncludeJS(url, sId, oXmlHttp.responseText, callback, callerScope);
                    }
                    else{
                        sword.framework.error('文件获取失败: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + '):' + url);
                        scripts[url] = false;
                        if (typeof callback == 'function') {
                            callback.call(callerScope || window);
                        }
                    }
                }
            };
    
            oXmlHttp.open('GET', url, true);
            oXmlHttp.send(null);            
        }
        catch(e){   
            sword.framework.log('FpiScriptManager::syncLoad exception: ' + e.message);      
        }
    };

    //not IE
    function syncLoadTest(url, callback) {
        var cfg, callerScope;
        if (typeof url == 'object') { // must be config object
            cfg = url;
            url = cfg.url;
            callback = callback || cfg.callback;
            callerScope = cfg.scope;
            if (typeof cfg.timeout != 'undefined') {
                this.timeout = cfg.timeout;
            }
            if (typeof cfg.disableCaching != 'undefined') {
                this.disableCaching = cfg.disableCaching;
            }
        }

        if (scripts[url]) {
            //sword.framework.log('此前已经加载:' + url);
            if (typeof callback == 'function') {
                callback.call(callerScope || window);
            }
            return null;
        }

        //通用加载方式
        IncludeJS(url, null, null, callback, callerScope);
    };
    return{
        //标记已加载过的文件
        addLoadedFiles:function (urls){
            if(Ext.isString(urls)){
                scripts[urls] = true;
            }
            else if(Ext.isArray(urls)){
                for(var i = 0, len = urls.length; i < len; ++i){
                    var url = urls[i];
                    scripts[url] = true;
                }
            }
        },
        synchLoadJs:function(o){
            if(Ext.isIE){
                this.synchLoadJs1(o);
            }
            else{
                this.synchLoadJs1(o);
            }
        },
        synchLoadJs1:function(o){
            if (!Ext.isArray(o.scripts)) {
                o.scripts = [o.scripts];
            }

            o.url = o.scripts.shift();

            if (o.scripts.length == 0) {
                syncLoad(o);
            } else {
                o.scope = this;
                syncLoad(o, function() {
                    synchLoadJs(o);
                });
            }
        },
        synchLoadJs2:function(o){
            if (!Ext.isArray(o.scripts)) {
                o.scripts = [o.scripts];
            }

            o.url = o.scripts.shift();

            if (o.scripts.length == 0) {
                syncLoadTest(o);
            } else {
                o.scope = this;
                syncLoadTest(o, function() {
                    synchLoadJsTest(o);
                });
            }
        }
    };
}();