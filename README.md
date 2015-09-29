# postcss-regexp-detect

[PostCSS](https://github.com/postcss/postcss) plugin to search for regexp in rule declaraions

##Purpose
This plugin was initially created to analyse css compiled by stylus and find unresolved variables.

When stylus can't resolve a variable, it inserts string with its name and doesn't throw any warning.
To avoid such surprises we developed this warning plugin.
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
  .use(regexp({
      regexp: new RegExp('.+px'),
      messagePattern: 'Pixel value %s found on line %l'
  }))
  .use(reporter)
  .process(css, {
    from: "src/stylesheet/index.css"
    to: "dist/index.css"
  })
  .css
```

### Options

#### `regexp` (required)
Type: `String` or `RegExp`

Regexp to match

#### `messagePattern` (optional)
Type: `String`
Default: `Regexp matched with %s on line %l`

Pattern for message text.
* %s is for matched strings
* %l is for line number
* %f is for postcss from parameter


## [License](LICENSE)
