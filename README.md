# node-comfy-box

`node-comfy-box` is a wrapper for [@stable-canvas/comfyui-client](https://github.com/StableCanvas/comfyui-client) providing commonly-used utility functions.

This library is currently work-in-progress, being developed as I add features I need for my own projects.

## Features

- `BasicAuthPlugin` for authenticating with ComfyUI using HTTP Basic Auth.
- `withBasePipeContext` and `withEfficientPipeContext` for applying a context to a pipe.
- `withPrompt` for applying a prompt (positive and negative) to a pipe.
- `applyStyles` for applying styles to a prompt.
