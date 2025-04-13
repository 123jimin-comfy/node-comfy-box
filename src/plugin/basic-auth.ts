import {type Client, Plugin} from "@stable-canvas/comfyui-client";

/**
 * Provide authentication based on HTTP Basic Auth.
 */
export class BasicAuthPlugin extends Plugin {
    #username: string;
    #password: string;

    constructor(username: string, password: string = "") {
        super();

        this.#username = username;
        this.#password = password;

        // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias
        const plugin = this;

        this.addHook({
            type: 'function',
            name: "wsURL",
            fn: function (original) {
                const url = new URL(original());
                url.username = plugin.#username;
                url.password = plugin.#password;

                return url.toString();
            },
        });

        this.addHook({
            type: 'function',
            name: "apiHeaders",
            fn: function (original, options) {
                const headers = new Headers(original(options));
                headers.set("Authorization", `Basic ${btoa(`${plugin.#username}:${plugin.#password}`)}`);

                return headers;
            },
        });

        this.addHook({
            type: 'function',
            name: "fetch",
            fn: function (this: Client, original, url, options) {
                // Check whether the URL is from the API host.
                const request_url: URL = (typeof url === 'string') ? new URL(url) : (url instanceof URL ? url : new URL(url.url));
                const is_from_same_host = request_url.host.toLowerCase() === this.api_host.toLowerCase();

                if(is_from_same_host) {
                    return original(url, {
                        headers: this.apiHeaders(),
                        ...(options ?? {}),
                    });
                } else {
                    return original(url, options);
                }
            },
        });
    }
}