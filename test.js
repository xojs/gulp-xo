import fs from 'fs';
import test from 'ava';
import vinylFile from 'vinyl-file';
import pEvent from 'p-event';
import Vinyl from 'vinyl';
import xo from '.';

test('main', async t => {
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
	stream.end(vinylFile.readSync('_fixture.js'));
	await finish;
});

test('fix option', async t => {
	fs.writeFileSync('.eslintignore', '_ignored.js');

	const stream = xo({
		fix: true
	});

	stream.on('data', file => {
		t.is(file.contents.toString(), 'alert();\n');
		t.pass();
	});
	const finish = pEvent(stream, 'finish');
	stream.end(new Vinyl({
		path: __filename,
		contents: Buffer.from('alert()')
	}));
	await finish;

	fs.unlinkSync('.eslintignore');
});

test.serial.failing('ignored files', async t => {
	fs.writeFileSync('.eslintignore', '_fixture.js');

	const stream = xo();
	stream.on('data', file => {
		t.falsy(file.eslint);
		t.pass();
	});
	const finish = pEvent(stream, 'finish');
	stream.end(vinylFile.readSync('_fixture.js'));
	await finish;

	fs.unlinkSync('.eslintignore');
});
