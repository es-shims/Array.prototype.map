'use strict';

var ES = require('es-abstract/es2019');
var callBound = require('es-abstract/helpers/callBound');
var isString = require('is-string');

// Check failure of by-index access of string characters (IE < 9) and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var strSplit = callBound('String.prototype.split');

module.exports = function map(callbackfn) {
	var O = ES.ToObject(this);
	var self = splitString && isString(O) ? strSplit(O, '') : O;
	var len = ES.ToUint32(self.length);

	// If no callback function or if callback is not a callable function
	if (!ES.IsCallable(callbackfn)) {
		throw new TypeError('Array.prototype.map callback must be a function');
	}

	var T;
	if (arguments.length > 1) {
		T = arguments[1];
	}

	var A = ES.ArraySpeciesCreate(O, len);
	var k = 0;
	while (k < len) {
		var Pk = ES.ToString(k);
		var kPresent = ES.HasProperty(O, Pk);
		if (kPresent) {
			var kValue = ES.Get(O, Pk);
			var mappedValue = ES.Call(callbackfn, T, [kValue, k, O]);
			ES.CreateDataPropertyOrThrow(A, Pk, mappedValue);
		}
		k += 1;
	}

	return A;
};
