DynamicForm = function(config) {
	config = config || {};

	this.target = config.target || '_blank';
	this.actionUrl = config.actionUrl;
	this.requestParams = config.requestParams;
	this.method = config.method || "POST";

	this.submitFormObj = null;
	this.createForm = function() {
		var t = this;
		if (t.submitFormObj == null) {
			var submitForm = document.createElement("FORM");
			document.body.appendChild(submitForm);
			submitForm.style.display = "none";
			submitForm.method = t.method;
			submitForm.target = t.target;
			submitForm.action = t.actionUrl;
			for ( var prop in t.requestParams) {
				var newElement = document.createElement("input");
				var s = t.requestParams[prop];
				if (s != null) {
					s = s.toString();
				}
				newElement.value = s;
				newElement.name = prop;
				newElement.type = "hidden";
				
				/*newElement.setAttribute("name",prop);
			    newElement.setAttribute("type","hidden");
			    newElement.setAttribute("value",s);*/
			    submitForm.appendChild(newElement);
			 
				submitForm.appendChild(newElement);
			}
			t.submitFormObj = submitForm;
		}

	};

	this.submitForm = function() {
		var t = this;
		if (t.submitFormObj == null) {
			t.createForm();
			t.submitFormObj.submit();
		} else {
			t.submitFormObj.submit();
		}
		t.removeForm();
	};

	this.removeForm = function() {
		var t = this;
		if (t.submitFormObj != null) {
			document.body.removeChild(t.submitFormObj);

			t.submitFormObj = null;
		}
	}
}