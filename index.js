'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var objectAssign = require('object-assign');
var xo = require('xo');

module.exports = function (opts) {
	opts = objectAssign({
		quiet: false,
		reporter: 'stylish'
	}, opts);

	var results = [];
	var errorCount = 0;
	var warningCount = 0;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-xo', 'Streaming not supported'));
			return;
		}

		var report;

		try {
			report = xo.lintText(file.contents.toString(), {filename: file.relative});
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-xo', err, {fileName: file.path}));
		}

		var result = report.results;

		if (opts.quiet) {
			result = xo.getErrorResults(result);
		}

		errorCount += report.errorCount;
		warningCount += report.warningCount;

		results.push(result);

		cb(null, file);
	}, function (cb) {
		results = results.reduce((a, b) => a.concat(b), []);

		if (errorCount > 0 || warningCount > 0) {
			gutil.log('gulp-xo\n', xo.getFormatter(opts.reporter)(results));
		}

		if (errorCount > 0) {
			this.emit('error', new gutil.PluginError('gulp-xo', errorCount + ' errors'));
		}

		cb();
	});
};
