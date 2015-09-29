var fs = require('fs');
var path = require('path');
var postcss = require('postcss');

var defaultPattern = 'Regexp matched with %s on line %l';
var postcssResult;

module.exports = postcss.plugin('postcss-regexp', function(options) {
	return function(css, result) {
		postcssResult = result;

		if (!options.regexp) {
			throwOptionsError();
			return;
		}

		css.eachDecl(function(decl) {
			if (decl.value) {
				processDecl(decl, options);
			}
		})
	}
});

function throwOptionsError(){
	postcssResult.messages.push({
		type: 'error',
		plugin: 'postcss-regexp',
		text: 'No regexp provided'
	});
}

function processDecl(decl, rule) {
	var value = decl.value;
		if (value.search(rule.regexp) === 0) {
			var pattern = rule.messagePattern || defaultPattern;
			var from = postcssResult.opts.from || '[source file not specified]';
			var message = pattern
				.replace('%s', value)
				.replace('%l', decl.source.start.line)
				.replace('%f', from);
			postcssResult.warn(message);
		}


}
