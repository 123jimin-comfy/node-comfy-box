//@ts-check

import type { BasePipe, EfficientPipe } from "@stable-canvas/comfyui-client";
import type { BasePipeContext, EfficientPipeContext, Prompt } from "../type";

/**
 * Applies the given context to the given pipe, returning the same pipe with the context applied.
 * @param pipe
 * @param ctx
 * @returns The same pipe with the context applied.
 */
export function withBasePipeContext<T extends BasePipe = BasePipe>(pipe: T, ctx: Partial<BasePipeContext>): T {
    if(ctx.seed != null) pipe.seed(ctx.seed);
    if(ctx.steps != null) pipe.steps(ctx.steps);
    if(ctx.cfg != null) pipe.cfg(ctx.cfg);
    if(ctx.sampler_name != null) pipe.sampler(ctx.sampler_name);
    if(ctx.scheduler != null) pipe.scheduler(ctx.scheduler);
    if(ctx.denoise != null) pipe.denoise(ctx.denoise);
    if(ctx.width != null && ctx.height != null) pipe.size(ctx.width, ctx.height);
    if(ctx.batch_size != null) pipe.batch_size(ctx.batch_size);
    if(ctx.ckpt_name != null) pipe.model(ctx.ckpt_name);
    if(ctx.positive != null) pipe.prompt(ctx.positive);
    if(ctx.negative != null) pipe.negative(ctx.negative);

    if(ctx.input_image != null) pipe.image(ctx.input_image);
    if(ctx.input_mask != null) pipe.mask(ctx.input_mask);
    if(ctx.client != null) pipe.with(ctx.client);

    return pipe;
}

/**
 * Applies the given context to the given pipe, returning the same pipe with the context applied.
 * @param pipe
 * @param ctx
 * @returns The same pipe with the context applied.
 */
export function withEfficientPipeContext<T extends EfficientPipe = EfficientPipe>(pipe: T, ctx: Partial<EfficientPipeContext>): T {
    withBasePipeContext(pipe, ctx);

    if(ctx.loras != null) {
        for(const lora of ctx.loras) {
            pipe.lora(lora.name, { weight: lora.weight, strength: lora.model_strength, clip_strength: lora.clip_strength });
        }
    }

    if(ctx.control_net_blocks != null) {
        for(const block of ctx.control_net_blocks) {
            pipe.cnet(block.name, block.image, { strength: block.strength, start: block.start, end: block.end });
        }
    }

    return pipe;
}

export function withPrompt<T extends BasePipe = BasePipe>(pipe: T, prompt: Prompt): T {
    if(typeof prompt === 'string') {
        pipe.prompt(prompt);
    } else {

    }

    return pipe;
}