'use strict';
const eslint = require('gulp-eslint');
const formatterPretty = require('eslint-formatter-pretty');
const gutil = require('gulp-util');
const through = require('through2');
const xo = require('xo');

module.exports = opts => {
	opts = Object.assign({
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

		let report;

		try {
			report = xo.lintText(file.contents.toString(), {
				cwd: file.cwd,
				filename: path.relative(file.cwd, file.path)
			});
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-xo', err, {fileName: file.path}));
		}

		let result = report.results;

		if (opts.quiet) {
			result = xo.getErrorResults(result);
		}

		file.eslint = result[0];

		cb(null, file);
	});
};

Object.assign(module.exports, eslint);

['formatEach', 'format'].forEach(fn => {
	module.exports[fn] = (formatter, writable) => (
		eslint[fn](formatter ? xo.getFormatter(formatter) : formatterPretty, writable)
	);
});
