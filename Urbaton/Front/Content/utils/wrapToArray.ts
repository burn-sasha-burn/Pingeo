export function wrapToArray(entity: any): any[] {
    return Array.isArray(entity) ? entity : [entity];
}
