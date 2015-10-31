import test from 'ava';
import vinylFile from 'vinyl-file';
import hooker from 'hooker';
import gutil from 'gulp-util';
import xo from './';

test(t => {
	t.plan(1);

	const stream = xo();

	hooker.hook(gutil, 'log', (...args) => {
		const str = args.join(' ');

		if (/camelcase/.test(str) && /no-unused-vars/.test(str)) {
			hooker.unhook(gutil, 'log');
			t.pass();
		}
	});

	stream.on('error', () => {});
	stream.write(vinylFile.readSync('fixture.js'));
	stream.end();
});
