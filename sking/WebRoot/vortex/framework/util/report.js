function cjkEncode(text) {
	if (text == null || text == "undefined") {
		return "";
	}

	var newText = "";
	for (var i = 0; i < text.length; i++) {
		var code = text.charCodeAt(i);
		if (code >= 128 || code == 91 || code == 93) {// 91 is
			// "[", 93
			// is "]".
			newText += "[" + code.toString(16) + "]";
		} else {
			newText += text.charAt(i);
		}
	}
	return newText;
}

function submitQueryParamsByHiddenForm(templatePath, queryParams,target) {
	var submitForm = document.createElement("FORM");
	document.body.appendChild(submitForm);
	submitForm.style.display = "none";
	var actionUrl = path + "/ReportServer?reportlet=" + templatePath;
	submitForm.method = "POST";
	submitForm.target = target || "reportFrame";
	submitForm.action = actionUrl;
	// alert(actionUrl)
	for (var prop in queryParams) {
		var newElement = document.createElement("input");
		var s = queryParams[prop];
		if (s != null) {
			s = s.toString();
		}

		newElement.value = cjkEncode(s);
		newElement.name = prop;

		newElement.type = "hidden";
		submitForm.appendChild(newElement);
	}
	submitForm.submit();
}

function submitQueryParamsByHiddenFormToOtherSystem(actionUrl,opt,templatePath, queryParams,target) {
	var submitForm = document.createElement("FORM");
	document.body.appendChild(submitForm);
	submitForm.style.display = "none";
	var url = actionUrl + "?reportlet=" + templatePath  + (opt || "");
	submitForm.method = "POST";
	submitForm.target = target || "reportFrame";
	submitForm.action = actionUrl;
	// alert(actionUrl)
	for (var prop in queryParams) {
		var newElement = document.createElement("input");
		var s = queryParams[prop];
		if (s != null) {
			s = s.toString();
		}

		newElement.value = cjkEncode(s);
		newElement.name = prop;

		newElement.type = "hidden";
		submitForm.appendChild(newElement);
	}
	submitForm.submit();
}