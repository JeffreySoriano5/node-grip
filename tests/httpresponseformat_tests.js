var assert = require('assert');
var grip = require('../lib/grip');

(function testInitialize() {
    var hf = new grip.HttpResponseFormat();
    assert.equal(hf.code, null);
    assert.equal(hf.reason, null);
    assert.equal(hf.headers, null);
    assert.equal(hf.body, null);
    hf = new grip.HttpResponseFormat('code', 'reason',
            'headers', 'body');
    assert.equal(hf.code, 'code');
    assert.equal(hf.reason, 'reason');
    assert.equal(hf.headers, 'headers');
    assert.equal(hf.body, 'body');
    hf = new grip.HttpResponseFormat({ code: 'code',
            reason: 'reason', headers: 'headers', body: 'body' });
    assert.equal(hf.code, 'code');
    assert.equal(hf.reason, 'reason');
    assert.equal(hf.headers, 'headers');
    assert.equal(hf.body, 'body');
})();

(function testName() {
    var hf = new grip.HttpResponseFormat('body');
    assert.equal(hf.name(), 'http-response');
})();

(function testExport() {
    var hf = new grip.HttpResponseFormat({ body: 'body' });
    assert.equal(JSON.stringify(hf.export()), JSON.stringify({ body: 'body' }));
    hf = new grip.HttpResponseFormat({ code: 'code',
            reason: 'reason', headers: 'headers', body: 'body' });
    assert.equal(JSON.stringify(hf.export()), JSON.stringify(
            { code: 'code', reason: 'reason', headers: 'headers', body: 'body' }));
    hf = new grip.HttpResponseFormat({ code: 'code',
            reason: 'reason', headers: 'headers', body: new Buffer('body') });
    assert.equal(JSON.stringify(hf.export()), JSON.stringify(
            { code: 'code', reason: 'reason', headers: 'headers', 'body-bin':
            new Buffer('body').toString('base64') }));
})();
