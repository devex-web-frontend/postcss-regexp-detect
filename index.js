var fs = require('fs');
var path = require('path');
var postcss = require('postcss');

var message = 'Regexp matched with';
var regexp;

module.exports = postcss.plugin('postcss-regexp', function(options) {
	return function(css, result) {
		if (!options.regexp) {
			result.messages.push({
				type: 'error',
				plugin: 'postcss-regexp',
				text:'No regexp provided'
			});
			return;
		}
		message = options.message ? options.message : message;
		regexp = options.regexp;

		css.eachDecl(function(decl) {
			if (decl.value) {
				processDecl(decl, result);
			}
		})
	}
});

function processDecl(decl, result) {
	var value = decl.value;
	if (value.search(regexp) === 0) {
		result.warn(message  +' ' + value + ' on line ' + decl.source.start.line);
	}
}
