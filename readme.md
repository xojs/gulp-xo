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

##### quiet

Type: `boolean`<br>
Default: `false`

Report errors only.

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
