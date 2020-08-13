import {abc} from '../src/aa';

const test = require('ava');

test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});

test('', t => {
  t.true(true);
});

test('abc', t => {
  t.true(abc());
});

