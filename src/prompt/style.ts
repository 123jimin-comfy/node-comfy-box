import { type Prompt, toPartialPromptPair } from ".";

export type Style = Prompt;

export type ApplyParams = unknown;

export function applyStyleString(prompt: string, style: string|null|undefined, params?: ApplyParams): string {
    if(!style) return prompt;
    if(!prompt) return style;

    style = style.replace(/(,\s*)+$/, ",");
    if(!style.endsWith(",")) style += ",";

    prompt = prompt.replace(/^\s*(,\s*)*/, "");

    return `${style} ${prompt}`;
}

export function applyStyle(prompt: Prompt, style: Style, params?: ApplyParams): Prompt {
    if(typeof style === 'string') {
        if(typeof prompt === 'string') {
            return applyStyleString(prompt, style, params);
        }

        return {
            positive: applyStyleString(prompt.positive ?? "", style, params),
            negative: prompt.negative,
        };
    }

    if(typeof prompt === 'string') {
        return {
            positive: applyStyleString(prompt, style.positive, params),
            negative: style.negative,
        };
    }

    return {
        positive: applyStyleString(prompt.positive ?? "", style.positive, params),
        negative: applyStyleString(prompt.negative ?? "", style.negative, params),
    }
}

export function applyStyles(prompt: Prompt, styles: Style[], params?: ApplyParams): Prompt {
    return styles.reduceRight((acc, style) => applyStyle(acc, style, params), prompt);
}