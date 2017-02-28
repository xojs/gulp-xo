/*eslint-env es6*/

/**
 * See: https://github.com/adametry/gulp-eslint/blob/master/util.js
 */

'use strict';

const gutil = require('gulp-util');

/**
 * Resolve writable
 *
 * @param {(Function|stream)} [writable=gulp-util.log] - A stream or function to resolve as a format writer
 * @returns {Function} A function that writes formatted messages
 */
exports.resolveWritable = (writable) => {
	if (!writable) {
		writable = gutil.log;
	} else if (typeof writable.write === 'function') {
		writable = writable.write.bind(writable);
	}
	return writable;
};

/**
 * Write formatter results to writable/output
 *
 * @param {Object[]} results - A list of ESLint results
 * @param {Function} writable - A function used to write formatted ESLint results
 */
exports.writeResults = (results, writable) => {
	if (!results) {
		results = [];
	}

	if (writable && results !== null && results !== '') {
		writable(results);
	}
};
