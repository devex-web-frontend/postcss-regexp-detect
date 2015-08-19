var fs = require('fs');
var path = require('path');
var postcss = require('postcss');

var messageText = 'Regexp matched with';
var regexp;

module.exports = postcss.plugin('postcss-regexp', function(options, t) {
	return function(css, result) {
		if (!options.regexp) {
			throwOptionsError(result);
			return;
		}
		messageText = options.message ? options.message : messageText;
		regexp = options.regexp;

		css.eachDecl(function(decl) {
			if (decl.value) {
				processDecl(decl, result);
			}
		})
	}
});
function throwOptionsError(result){
	result.messages.push({
		type: 'error',
		plugin: 'postcss-regexp',
		text: 'No regexp provided'
	});
}

function processDecl(decl, result) {
	var value = decl.value;

	if (value.search(regexp) === 0) {
		var message = messageText + ' ' + value
			+ ' on line ' + decl.source.start.line;
		result.warn(message);
	}
}
