import { Client, IComfyApiConfig } from "@stable-canvas/comfyui-client";

export function parseComfyApiUrl(url: string|URL): Pick<IComfyApiConfig, 'api_base'|'api_host'|'ssl'> {
    if(typeof url === 'string') url = new URL(url);

    return {
        api_base: url.pathname,
        api_host: url.host,
        ssl: url.protocol === 'https:'
    };
}