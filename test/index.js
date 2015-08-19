var assert = require("assert");
var chalk = require('chalk')
var regexpPlugin = require('..');
var fs = require('fs');
var postcss = require('postcss');

var source = fs.readFileSync('test/fixtures/test.css', 'utf8').trim();

function composeMessage(text) {
	return {
		type: 'warning',
		plugin: 'postcss-regexp',
		text: text
	}
}

function assertMessages(messages, expected) {
	assert.equal(messages.length, expected.length);
	messages.forEach(function(message, index) {
		assert.equal(message.type, expected[index].type);
		assert.equal(message.plugin, expected[index].plugin);
		assert.equal(message.text, expected[index].text);
	})
}
function exec(expected, regexp, message) {
	return postcss()
		.use(regexpPlugin({
			message: message,
			regexp: regexp
		}))
		.process(source)
		.then(function(result) {
			assertMessages(result.messages, expected)
		});
}

describe('matching: ', function() {
	it('Should warn if regexp matched once', function() {
		var expected = [composeMessage('Regexp matched with $var on line 4')];
		var regexp = new RegExp('^\\$.*');
		return exec(expected, regexp);
	});
	it('Should warn if regexp matched multiple times', function() {
		var expected = [
			composeMessage('Regexp matched with 10px on line 2'),
			composeMessage('Regexp matched with 30px on line 3')
		];
		var regexp = new RegExp('^\\d.*');
		return exec(expected, regexp);
	});
});

describe('options: ', function() {

	it('Should throw error if regexp is not provided', function() {
		var expected = [{
			type: 'error',
			plugin: 'postcss-regexp',
			text: 'No regexp provided'
		}];
		return exec(expected);
	});

	it('Should use standard message \'Regexp matched with\' by default', function() {
		var expected = [composeMessage('Regexp matched with $var on line 4')];
		var regexp = new RegExp('^\\$.*');
		return exec(expected, regexp);
	});

	it('Should use custom message if provided', function() {
		var expected = [composeMessage('Hello $var on line 4')];
		var regexp = new RegExp('^\\$.*');
		return exec(expected, regexp, 'Hello');
	});
});
