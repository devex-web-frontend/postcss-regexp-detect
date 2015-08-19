var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var chalk = require('chalk');

module.exports = postcss.plugin('postcss-regexp', function() {
	return function(css, result) {
		css.eachDecl(function(decl) {
			if (decl.value) {
				processDecl(decl, result);
			}
		})
	}
});

function processDecl(decl, result) {
	var value = decl.value;
	if (value.search(new RegExp('^\\$.*')) === 0) {
		result.warn('unresolved variable ' + chalk.red(value) +
			' on line ' + decl.source.start.line);
	}
}
