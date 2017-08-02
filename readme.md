# gulp-xo [![Build Status](https://travis-ci.org/sindresorhus/gulp-xo.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-xo)

> Validate files with [XO](https://github.com/sindresorhus/xo)

![](screenshot.png)

*Issues regarding rules should be reported on the ESLint [issue tracker](https://github.com/eslint/eslint/issues) as it's the actual linter.*


## Install

```
$ npm install --save-dev gulp-xo
```


## Usage

```js
const gulp = require('gulp');
const xo = require('gulp-xo');

gulp.task('default', () =>
	gulp.src('src/app.js')
		.pipe(xo())
		.pipe(xo.format())
		.pipe(xo.failAfterError())
);
```


## API

### xo([options])

#### options

XO [options](https://github.com/sindresorhus/xo#config) can be specified in package.json.

In the gulpfile you can specify the following options:

##### reporter

Type: `string`<br>
Default: [`eslint-formatter-pretty`](https://github.com/sindresorhus/eslint-formatter-pretty)

Any [ESLint reporter](http://eslint.org/docs/user-guide/command-line-interface#f---format).

##### options.fix

Type: `boolean`

This option instructs ESLint to try to fix as many issues as possible. The fixes are applied to the gulp stream. The fixed content can be saved to file using `gulp.dest` (See [example/fix.js](https://github.com/adametry/gulp-eslint/blob/master/example/fix.js)). Rules that are fixable can be found in ESLint's [rules list](http://eslint.org/docs/rules/).

When fixes are applied, a "fixed" property is set to `true` on the fixed file's ESLint result.

##### options.quiet

Type: `boolean`<br>
Default: `false`

When `true`, this option will filter warning messages from ESLint results. This mimics the ESLint CLI [quiet option](http://eslint.org/docs/user-guide/command-line-interface#quiet).

Type: `function (message, index, list) { return Boolean(); }`

When provided a function, it will be used to filter ESLint result messages, removing any messages that do not return a `true` (or truthy) value.


### [xo.format(formatter, output)](https://github.com/adametry/gulp-eslint/#eslintformatformatter-output)

### [xo.failAfterError()](https://github.com/adametry/gulp-eslint/#eslintfailaftererror)

### [xo.failOnError()](https://github.com/adametry/gulp-eslint/#eslintfailonerror)

### [xo.formatEach(formatter, output)](https://github.com/adametry/gulp-eslint/#eslintformateachformatter-output)

### [xo.result(action)](https://github.com/adametry/gulp-eslint/#eslintresultaction)

### [xo.results(action)](https://github.com/adametry/gulp-eslint/#eslintresultsaction)

## Related

- [gulp-eslint](https://github.com/adametry/gulp-eslint): A gulp plugin for ESLint.
- [gulp-reporter](https://github.com/gucong3000/gulp-reporter): Error report for: CSSLint, EditorConfig, ESLint, HTMLHint, JSCS, JSHint, PostCSS, TSLint, XO.

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
