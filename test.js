import test from 'ava';
import vinylFile from 'vinyl-file';
import xo from '.';

test(t => {
	const stream = xo();
	stream.on('data', file => {
		t.truthy(file.eslint);
		t.truthy(file.eslint.messages.length);
		t.pass();
	});
	stream.on('error', () => {
		t.fail();
	});
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.write(vinylFile.readSync('_fixture.js'));
	stream.end();
});
