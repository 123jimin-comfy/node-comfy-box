//@ts-check

import { assert } from 'chai';
import { recursiveMerge } from "../dist/index.js";

describe("recursiveMerge", function() {
    it("should merge objects recursively", function() {
        const target = { a: 1, b: { c: 2, d: 3 } };
        const source = { b: { d: 4 }, e: 5 };

        const result = recursiveMerge(target, source);
        assert.deepEqual(result, { a: 1, b: { c: 2, d: 4 }, e: 5 });
    });
});