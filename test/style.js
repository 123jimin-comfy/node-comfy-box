//@ts-check

import { assert } from 'chai';
import { applyStyleString } from "../dist/prompt/index.js";

describe("applyStyleString", function() {
    it("should handle empty styles correctly", function() {
        for(const prompt of ["", "test", "test, test", " hello world ", ",this is testing,"]) {
            assert.equal(applyStyleString(prompt, void 0), prompt, `Prompt "${prompt}" with undefined style should be unchanged.`);
            assert.equal(applyStyleString(prompt, null), prompt, `Prompt "${prompt}" with null style should be unchanged.`);
            assert.equal(applyStyleString(prompt, ""), prompt, `Prompt "${prompt}" with empty style should be unchanged.`);
        }
    });

    it("should handle simple styles correctly", function() {
        assert.equal(applyStyleString("test", "style"), "style, test");
    });

    it("should eliminate excessive spaces and commas", function() {
        assert.equal(applyStyleString("test", "style, "), "style, test");
        assert.equal(applyStyleString(" test", "style"), "style, test");
        assert.equal(applyStyleString(" test", "style, "), "style, test");
        assert.equal(applyStyleString(", test", "style, "), "style, test");
    });
});