'use strict';

const gutil = require('gulp-util');
const through = require('through2');
const xo = require('xo');
const fs = require('fs');
const path = require('path');
const gXOutils = require('./g-xo-utils');

module.exports = opts => {
	opts = Object.assign({
		quiet: false,
		output: null
	}, opts);

	let results = [];
	let errorCount = 0;
	let warningCount = 0;

	return through.obj(function(file, enc, cb) {
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
			report = xo.lintText(file.contents.toString(), {filename: file.relative});
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
	}, function(cb) {
		results = results.reduce((a, b) => a.concat(b), []);

		if (errorCount > 0 || warningCount > 0) {
			if (opts.output) {
				var filePath = opts.output;

				if (path.isAbsolute(filePath)) {

					if (!fs.existsSync(filePath)) {
						fs.mkdirSync(path.dirname(filePath));
					}

					gXOutils.writeResults(xo.getFormatter(opts.reporter)(results), gXOutils.resolveWritable(fs.createWriteStream(filePath)));
				} else {
					this.emit('error', new gutil.PluginError('gulp-xo', 'Bad output file path: [ ' + filePath + ' ].'));
				}
			} else {
				gutil.log('gulp-xo\n', xo.getFormatter(opts.reporter)(results));
			}
		}

		if (errorCount > 0 && !opts.output) {
			this.emit('error', new gutil.PluginError('gulp-xo', errorCount + ' errors'));
		}

		cb();
	});
};
