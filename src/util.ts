export type RecursivePartial<T> = {
    [P in keyof T]?:
        T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends object ? RecursivePartial<T[P]> :
        T[P];
};

/**
 * Assign a value to an object path.
 * @param obj
 * @param path Dot-separated path.
 * @param value Value to assign.
 * @returns The modified object `obj`.
 */
export function assignObjectPath<T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T {
    const keys = path.split('.');

    let current: Record<string, unknown> = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        let next = current[keys[i]];
        if (next == null) {
            current[keys[i]] = next = {};
        }

        if (!next || typeof next !== 'object') {
            throw new Error(`Cannot assign to path "${keys.slice(0, i + 1).join('.')}": not an object`);
        }
        
        current = next as Record<string, unknown>;
    }

    current[keys.at(-1)!] = value;

    return obj;
}