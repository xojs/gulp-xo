'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var objectAssign = require('object-assign');
var xo = require('xo');

module.exports = function (opts) {
	opts = objectAssign({
		quiet: false
	}, opts);

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

		var results = report.results;

		if (opts.quiet) {
			results = xo.getErrorResults(results);
		}

		if (report.errorCount > 0 || report.warningCount > 0) {
			gutil.log('gulp-xo\n', xo.getFormatter()(results));
		}

		if (report.errorCount > 0) {
			this.emit('error', new gutil.PluginError('gulp-xo', report.errorCount + ' errors', {fileName: file.path}));
		}

		cb(null, file);
	});
};
