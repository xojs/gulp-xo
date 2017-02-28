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
		.pipe(gulp.dest('dist'))
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

##### quiet

Type: `boolean`<br>
Default: `false`

Report errors only.

##### output

- Type: `string`<br>
- Default: `null`
- Value: Output file path
- reporter: Any file reporter => [ESLint formatters](http://eslint.org/docs/user-guide/formatters/).
- `reporter`'s: 
  * `checkstyle`
  * `junit`
  * `json`
  * `jslint-xml`
  * `tap`  

Example for `checkstyle` reporter:

```js
	// Collect all 'gulp-*' plugins in one place!
	var plugins = require('gulp-load-plugins')();
	
	...
	
	//https://www.npmjs.com/package/gulp-xo
	.pipe(plugins.xo({
		reporter: 'checkstyle',
		output: __dirname + '/dist/checkstyle.xml'
	}));
	
	...
```

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
