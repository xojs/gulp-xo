'use strict';
const gulp = require('gulp');
const xo = require('.');

exports.default = () => (
	gulp.src('_fixture.js')
		.pipe(xo())
		.pipe(xo.format())
		.pipe(xo.failAfterError())
);
