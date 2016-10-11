'use strict';
const gulp = require('gulp');
const xo = require('./');

gulp.task('default', () =>
	gulp.src('fixture.js')
		.pipe(xo({reporter: 'unix'}))
);
