const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Fibonnaci = require('./fibonacci');

;(async () => {
    {
        const fibonacci = new Fibonnaci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        for await(const i of fibonacci.execute(3)){}
        const expectedCallCount = 4
        deepStrictEqual(spy.callCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonnaci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        const [...results] = fibonacci.execute(5)
        const { args } = spy.getCall(2)
        const expectedResults = [0,1,1,2,3];
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        deepStrictEqual(args, expectedParams);
        deepStrictEqual(results, expectedResults);
    }
})()