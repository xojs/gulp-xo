'use strict';
const eslint = require('gulp-eslint');
const formatterPretty = require('eslint-formatter-pretty');
const through = require('through2');
const xo = require('xo');
const PluginError = require('plugin-error');

module.exports = options => {
	options = {
		quiet: false,
		...options
	};

	return through.obj(function (file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new PluginError('gulp-xo', 'Streaming not supported'));
			return;
		}

		let report;
		try {
			report = xo.lintText(file.contents.toString(), {
				...options,
				cwd: file.cwd,
				filename: file.path
			});
		} catch (error) {
			this.emit('error', new PluginError('gulp-xo', error, {fileName: file.path}));
		}

		let result = report.results;

		if (result.length === 0) {
			callback(null, file);
			return;
		}

		if (options.quiet) {
			result = xo.getErrorResults(result);
		}

		file.eslint = result[0];

		if (file.eslint.output) {
			file.contents = Buffer.from(file.eslint.output);
			file.eslint.fixed = true;
		}

		callback(null, file);
	});
};

Object.assign(module.exports, eslint);

for (const fn of ['formatEach', 'format']) {
	module.exports[fn] = (formatter, writable) => (
		eslint[fn](formatter ? xo.getFormatter(formatter) : formatterPretty, writable)
	);
}
