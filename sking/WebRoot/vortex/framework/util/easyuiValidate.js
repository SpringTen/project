$.extend($.fn.validatebox.defaults.rules, {
			minLength : {
				validator : function(value, param) {
					return value.length >= param[0];
				},
				message : 'Please enter at least {0} characters.'
			},
			isNull : {
				validator : function(value, param) {
					return !value.isNull();
				},
				message : $.fn.validatebox.defaults.missingMessage

			},
			remoteUnique : {
				validator : function(value, param) {
					var isExist = false;
					var url = param[0];
					var requestPara = {};
					requestPara.value = value;
					$.ajax({
								url : url,
								dataType : "json",
								data : requestPara,
								async : false,
								cache : false,
								type : "post",
								success : function(data) {
									isExist = data.operateSuccess;
								}
							});
					return !isExist;
				},
				message : '该值已存在'

			},
			isPhone : {
				validator : function(value, param) {
					return !value.isPhone();
				},
				message : '请输入正确的电话号码'

			},
			isPost : {
				validator : function(value, param) {
					return !value.isPost();
				},
				message : '请输入正确的邮编'

			},
			isEmail : {
				validator : function(value, param) {
					return !value.isEmail();
				},
				message : '请输入正确的Email'

			},
			isEmail : {
				validator : function(value, param) {
					return !value.isEmail();
				},
				message : '请输入正确的Email'

			},
			isDateTime : {
				validator : function(value, param) {
					return !value.isDateTime();
				},
				message : '请输入正确的日期 (YYYY-MM-DD HH24:MI:SS 或者 YYYY/MM/DD HH24:MI:SS)'

			},
			isDate : {
				validator : function(value, param) {
					return !value.isDate();
				},
				message : '请输入正确的日期(YYYY-MM-DD YYYY/MM/DD)'

			},
			isNotCN : {
				validator : function(value, param) {
					return !value.isNotCN();
				},
				message : '请输入正确的中文字符'

			},
			isUrl : {
				validator : function(value, param) {
					return !value.isUrl();
				},
				message : '请输入正确的URL'

			},
			isNumber : {
				validator : function(value, param) {
					return !value.isNumber();
				},
				message : '请输入正确的数字'

			},
			isIP : {
				validator : function(value, param) {
					return !value.isIP();
				},
				message : '请输入正确的IP'

			}
		});