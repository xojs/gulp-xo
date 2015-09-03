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
var gulp = require('gulp');
var xo = require('gulp-xo');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(xo())
		.pipe(gulp.dest('dist'));
});
```


## API

### xo([options])

#### options

XO [options](https://github.com/sindresorhus/xo#config) can be specified in package.json.

In the gulpfile you can specify the following options:

##### quiet

Type: `boolean`  
Default: `false`

Report errors only.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
