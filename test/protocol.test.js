const test = require('node:test');
const assert = require('node:assert/strict');
const { parseClientMessage } = require('../src/server/protocol');

test('accepts a valid join event', () => {
  assert.deepEqual(parseClientMessage('{"type":"join","username":" Ana "}'), {
    value: { type: 'join', username: 'Ana' }
  });
});

test('rejects malformed JSON and oversized messages', () => {
  assert.equal(parseClientMessage('{bad').error, 'A mensagem precisa ser um JSON válido.');
  const content = 'x'.repeat(501);
  assert.match(parseClientMessage(JSON.stringify({ type: 'message', content })).error, /500/);
});

test('rejects unknown event types', () => {
  assert.equal(parseClientMessage('{"type":"admin"}').error, 'Tipo de evento desconhecido.');
});
