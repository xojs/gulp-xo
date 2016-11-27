'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const xo = require('xo');

module.exports = opts => {
	opts = Object.assign({
		quiet: false,
		withDrop: true,	// drop task if errors
		options: {}	// xo options
	}, opts);

	let results = [];
	let errorCount = 0;
	let warningCount = 0;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-xo', 'Streaming not supported'));
			return;
		}

		let report;

		try {
			report = xo.lintText(file.contents.toString(), Object.assign({filename: file.relative}, opts.options));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-xo', err, {fileName: file.path}));
		}

		let result = report.results;

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

		if (errorCount > 0 && opts.withDrop) {
			this.emit('error', new gutil.PluginError('gulp-xo', errorCount + ' errors'));
		}

		cb();
	});
};
