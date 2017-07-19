'use strict';
const gulp = require('gulp');
const xo = require('.');

gulp.task('default', () =>
	gulp.src('_fixture.js')
		.pipe(xo())
		.pipe(xo.format())
		.pipe(xo.failAfterError())
);
