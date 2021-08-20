const File = require('./file');
const sinon = require('sinon');
const assert = require('assert');



;(async () => {

    const spy = sinon.spy(File, File.getFile.name);
        
    const result = await File.getFile();

    const expectedCall = 1;
    const expectedFilm = /Matrix/

    assert.deepStrictEqual(spy.callCount, expectedCall);
    assert.match(result, expectedFilm);
})();