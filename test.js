import test from 'ava';
import vinylFile from 'vinyl-file';
import hooker from 'hooker';
import gutil from 'gulp-util';
import xo from '.';

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

	stream.on('error', () => ({}));
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.end();
});

test('opts.fix', t => {
	const stream = xo({
		fix: true
	});

	stream.on('data', file => {
		t.is(file.contents.toString(), 'alert();\n');
		t.pass();
	});
	stream.on('error', () => ({}));
	stream.write(new gutil.File({
		path: __filename,
		contents: Buffer.from('alert()')
	}));
	stream.end();
});
