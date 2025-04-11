//@ts-check

import { assert } from 'chai';
import { parseComfyApiUrl } from "../dist/client.js";

describe("parseComfyApiUrl", function() {
    it("should parse simple URL correctly", function() {
        const url = "http://localhost:8188/test";
        const config = parseComfyApiUrl(url);
        assert.deepEqual(config, { api_base: "/test", api_host: "localhost:8188", ssl: false });
    });

    it("should parse HTTPS URL correctly", function() {
        const url = "https://example.com/api";
        const config = parseComfyApiUrl(url);
        assert.deepEqual(config, { api_base: "/api", api_host: "example.com", ssl: true });
    });

    it("should parse URL with no path correctly", function() {
        const url = "http://example.com";
        const config = parseComfyApiUrl(url);
        assert.deepEqual(config, { api_base: "/", api_host: "example.com", ssl: false });
    });
});