import { BasePipe, EfficientPipe } from "@stable-canvas/comfyui-client";

export function createPipe(type: 'efficient'): EfficientPipe;
export function createPipe(type: string): BasePipe {
    switch(type) {
        case 'efficient': return new EfficientPipe();
        default: throw new Error(`Unknown pipe type: ${type}`);
    }
}