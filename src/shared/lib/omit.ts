export function omit(obj: object, key: string) {
    const copy = {...obj}
    delete copy[key as keyof typeof copy];
    return copy;
}