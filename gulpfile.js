'use strict';
var gulp = require('gulp');
var xo = require('./');

gulp.task('default', function () {
	return gulp.src('fixture.js').pipe(xo({reporter: 'unix'}));
});
