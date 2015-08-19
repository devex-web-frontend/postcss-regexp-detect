# postcss-regexp

[PostCSS](https://github.com/postcss/postcss) plugin to search for regexp in decls

## Usage
This plugin writes all warnings to postcss `result.messages`. You'll need some tool
to handle them. You can process them manually, or use some plugin for output. for example, postcss-reporter.
```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var regexp = require("postcss-regexp")
var reporter = require('postcss-reporter');

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(regexp)
  .use(reporter)
  .process(css, {
    from: "src/stylesheet/index.css"
    to: "dist/index.css"
  })
  .css
```

### Options

#### `regexp` (required)
Type: `String`  

Regexp to match

#### `message` (optional)
Type: `String`
Default: `Regexp matched with`

Message text. For expample you'll get 'Regexp matched with _$variable_ on line 134'

## [License](LICENSE)