//@ts-check

import { assert } from 'chai';
import { assignObjectPath } from "../dist/index.js";

describe("assignObjectPath", function() {
    it("should assign a value to an object path", function() {
        /** @type {Record<string, unknown>} */
        const obj = {};
        
        assignObjectPath(obj, "a.b.c", 42);
        assert.deepEqual(obj, { a: { b: { c: 42 } } });

        assignObjectPath(obj, "a.b.d", 43);
        assert.deepEqual(obj, { a: { b: { c: 42, d: 43 } } });

        assignObjectPath(obj, "a.e", 44);
        assert.deepEqual(obj, { a: { b: { c: 42, d: 43 }, e: 44 } });
    });
});