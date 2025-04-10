import wildcardMatch from "wildcard-match";
import { type RecursivePartial } from "../util.js";

export type ComfyPreset<Params> = RecursivePartial<Params> & {ckpt_pattern?: string};

export function applyPresets<Params>(default_params: Params, presets: ComfyPreset<Params>[], ckpt: string): Params {
    const params = structuredClone(default_params);

    for(const preset of presets) {
        let match = true;

        if(preset.ckpt_pattern) {
            match = wildcardMatch(preset.ckpt_pattern)(ckpt);
        }

        if(match) {
            mergePresets(params, preset);
        }
    }

    return params;
}

function mergePresets<Params>(target: Params, source: RecursivePartial<Params>): Params {
    if(!source) return target;

    if(Array.isArray(source)) {
        if(!Array.isArray(target)) throw new Error("Cannot merge array with non-array");

        return mergeArrays(target, source) as Params;
    }

    if(typeof source === 'object') {
        if(target == null || typeof target !== 'object' || Array.isArray(target)) throw new Error("Cannot merge object with non-object");

        for(const key of Object.keys(source)) {
            const source_val = source[key as keyof typeof source];
            if(source_val === (void 0)) continue;

            const target_val = target[key as keyof typeof target];
            if(target_val == null) {
                target[key as keyof typeof target] = source_val as typeof target_val;
            } else {
                target[key as keyof typeof target] = mergePresets(target_val, source_val as RecursivePartial<typeof target_val>);
            }
        }

        return target;
    }

    return source as Params;
}

function mergeArrays<T>(target: T[], source: (T|'*')[]): T[] {
    if(!target?.length) return source.filter((v): v is T => v !== '*');
    if(!source?.length) return target;

    const result: T[] = [];
    for(const item of source) {
        if(item === '*') {
            result.push(...target);
        } else {
            result.push(item);
        }
    }

    return result;
}