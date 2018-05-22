Function.prototype.createCallback = function(/* args... */) {
	// make args available, in function below
	var args = arguments, method = this;
	return function() {
		return method.apply(window, args);
	};
};

Function.prototype.createDelegate = function(obj, args, appendArgs) {
	var method = this;
	return function() {
		var callArgs = args || arguments;
		if (appendArgs === true) {
			callArgs = Array.prototype.slice.call(arguments, 0);
			callArgs = callArgs.concat(args);
		} else if (typeof appendArgs === 'number') {
			callArgs = Array.prototype.slice.call(arguments, 0); // copy
			// arguments
			// first
			var applyArgs = [appendArgs, 0].concat(args); // create method
			// call params
			Array.prototype.splice.apply(callArgs, applyArgs); // splice them
			// in
		}
		return method.apply(obj || window, callArgs);
	};
};

Function.prototype.defer = function(millis, obj, args, appendArgs) {
	var t = this;
	var fn = t.createDelegate(obj, args, appendArgs);
	if (millis > 0) {
		return setTimeout(fn, millis);
	}
	fn();
	return 0;
};