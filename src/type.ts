import type { BasePipe, EfficientPipe } from "@stable-canvas/comfyui-client";
import type { ComfyPreset } from "./preset";

export type * from "./prompt/type";

export type ComfyPipeContextTypeOf<T extends BasePipe> = T extends BasePipe<infer CTX> ? CTX : never;
export type ComfyPipePresets<T extends BasePipe> = Record<string, ComfyPreset<Omit<ComfyPipeContextTypeOf<T>, 'client'>>>;

export type BasePipeContext = ComfyPipeContextTypeOf<BasePipe>;
export type EfficientPipeContext = ComfyPipeContextTypeOf<EfficientPipe>;