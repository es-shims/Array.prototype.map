'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es2019');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var slice = Array.prototype.slice;

// eslint-disable-next-line no-unused-vars
var boundMapShim = function map(array, callbackfn) {
	ES.RequireObjectCoercible(array);
	return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundMapShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMapShim;
