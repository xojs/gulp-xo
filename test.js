'use strict';
var test = require('ava');
var vinylFile = require('vinyl-file');
var hooker = require('hooker');
var gutil = require('gulp-util');
var xo = require('./');

test(function (t) {
	t.plan(1);

	var stream = xo();

	hooker.hook(gutil, 'log', function (str) {
			str = [].join.call(arguments, ' ');

			if (/camelcase/.test(str) && /no-unused-vars/.test(str)) {
				hooker.unhook(gutil, 'log');
				t.pass();
			}
		}
	);

	stream.on('error', function () {});
	stream.write(vinylFile.readSync('fixture.js'));
	stream.end();
});
