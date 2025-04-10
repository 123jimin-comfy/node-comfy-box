import { BasePipe } from "@stable-canvas/comfyui-client";
import { ComfyPreset } from "./preset";

export type ComfyPipeContextTypeOf<T extends BasePipe> = T extends BasePipe<infer CTX> ? CTX : never;
export type ComfyPipePresets<T extends BasePipe> = Record<string, ComfyPreset<Omit<ComfyPipeContextTypeOf<T>, 'client'>>>;