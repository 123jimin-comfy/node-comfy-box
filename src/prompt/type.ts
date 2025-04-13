export interface PromptPair {
    positive: string;
    negative: string;
}

export type Prompt = string | Partial<PromptPair>;