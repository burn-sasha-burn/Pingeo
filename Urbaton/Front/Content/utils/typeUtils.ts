/**
 * Проверяет явялется ли аргумент числом
 * @param n
 * @returns {boolean}
 */
export function isNumeric(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Проверяет, является ли агумент объектом
 * @param o
 */
export function isObject(o: any): boolean {
    return o !== null && typeof o === 'object';
}

/**
 * Проверяет, является ли агумент массивом
 * @param a
 */
export function isArray(a: any): boolean {
    return Array.isArray(a);
}
