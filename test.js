import test from 'ava';
import vinylFile from 'vinyl-file';
import gutil from 'gulp-util';
import pEvent from 'p-event';
import xo from '.';

test(async t => {
	const stream = xo();
	stream.on('data', file => {
		t.truthy(file.eslint);
		t.truthy(file.eslint.messages.length);
		t.pass();
	});
	const finish = pEvent(stream, 'finish');
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.end();
	await finish;
});

test('default formatter', async t => {
	const stream = xo();
	stream.pipe(xo.format(null, report => {
		t.truthy(/[×✖]/.test(report));
		t.pass();
	}));
	const finish = pEvent(stream, 'finish');
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.end();
	await finish;
});

test('fix option', async t => {
	const stream = xo({
		fix: true
	});

	stream.on('data', file => {
		t.is(file.contents.toString().trim(), 'alert();');
		t.pass();
	});
	const finish = pEvent(stream, 'finish');
	stream.write(new gutil.File({
		path: __filename,
		contents: Buffer.from('alert()')
	}));
	stream.end();
	await finish;
});
