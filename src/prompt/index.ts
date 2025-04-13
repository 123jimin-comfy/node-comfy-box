export type * from "./type";
export * from "./style.js";

import {PromptPair, Prompt} from "./type";

export function isPromptPair(prompt: Prompt): prompt is PromptPair {
    return typeof prompt !== 'string' && prompt.positive != null && prompt.negative != null;
}

export function toPromptPair(prompt: Prompt): PromptPair {
    if(typeof prompt === 'string') return {positive: prompt, negative: ""};
    if(isPromptPair(prompt)) return prompt;
    return {positive: prompt.positive ?? "", negative: prompt.negative ?? ""};
}

export function toPartialPromptPair(prompt: Prompt): Partial<PromptPair> {
    if(typeof prompt === 'string') return {positive: prompt};
    return prompt;
}