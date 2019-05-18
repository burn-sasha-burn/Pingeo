import {isArray, isNumeric, isObject} from 'utils/typeUtils';
import {wrapToArray} from 'utils/wrapToArray';

interface IGeneralObject {
    [key: string]: any;
}

type ObjectOrArray = IGeneralObject | any[];

export function setIn(objectOrArray: ObjectOrArray, deepKey: any | any[], value: any): boolean {
    const keys = wrapToArray(deepKey);

    if (!isObject(objectOrArray) || keys.length === 0) {
        return false;
    }

    let current: ObjectOrArray = objectOrArray;
    for (let i = 0; i < keys.length - 1; i++) {
        if (isObject(current)) {
            let next = (current as IGeneralObject)[keys[i]];
            if (next === undefined) {
                next = {};
                (current as IGeneralObject)[keys[i]] = next;
            }
            current = next;
        } else {
            return false;
        }
    }

    if (isObject(current)) {
        (current as IGeneralObject)[keys[keys.length - 1]] = value;
        return true;
    }

    return false;
}

export function immutableSetIn(objectOrArray: ObjectOrArray, deepKey: any | any[], value: any): ObjectOrArray {
    const keys = wrapToArray(deepKey);

    if (!isObject(objectOrArray) || keys.length === 0) {
        return objectOrArray;
    }

    const wrappedObjectOrArray = wrapObjectOrArrayInNewInstance(objectOrArray);
    let current: ObjectOrArray = wrappedObjectOrArray;
    for (let i = 0; i < keys.length - 1; i++) {
        if (isObject(current)) {
            let next = (current as IGeneralObject)[keys[i]];
            if (next === undefined) {
                next = {};
            } else {
                next = wrapObjectOrArrayInNewInstance(next);
            }
            (current as IGeneralObject)[keys[i]] = next;
            current = next;
        } else {
            return objectOrArray;
        }
    }

    if ((typeof current === 'object' && current !== null) || Array.isArray(current)) {
        (current as IGeneralObject)[keys[keys.length - 1]] = value;
        return wrappedObjectOrArray;
    }

    return objectOrArray;
}

export function immutableDeleteIn(objectOrArray: ObjectOrArray, deepKey: any | any[]): ObjectOrArray {
    const keys = wrapToArray(deepKey);

    if (!isObject(objectOrArray) || keys.length === 0) {
        return objectOrArray;
    }

    const wrappedObjectOrArray = wrapObjectOrArrayInNewInstance(objectOrArray);
    let current: ObjectOrArray = wrappedObjectOrArray;
    for (let i = 0; i < keys.length - 1; i++) {
        if (isObject(current)) {
            let next = (current as IGeneralObject)[keys[i]];
            if (next === undefined) {
                next = {};
            } else {
                next = wrapObjectOrArrayInNewInstance(next);
            }
            (current as IGeneralObject)[keys[i]] = next;
            current = next;
        } else {
            return objectOrArray;
        }
    }

    if (isObject(current)) {
        if (isArray(current)) {
            const key = parseFloat(keys[keys.length - 1]);
            if (isNumeric(key)) {
                (current as any[]).splice(key, 1);
            }
        } else {
            delete (current as IGeneralObject)[keys[keys.length - 1]];
        }
        return wrappedObjectOrArray;
    }

    return objectOrArray;
}

function wrapObjectOrArrayInNewInstance(objectOrArray: ObjectOrArray): ObjectOrArray {
    if (!isObject(objectOrArray)) {
        return objectOrArray;
    }
    if (isArray(objectOrArray)) {
        return [...objectOrArray as any[]];
    }
    return {...objectOrArray};
}

/**
 * Глубинный поиск значения в объекте по заданному пути.
 * @example
 * const value = {prop1: 12, foo: {bar: 23: prop2: 'azaza'}};
 * getIn(value, ['foo', 'bar'], 'not found'); // 23
 * getIn(value, 'prop1', 'not found'); // 12
 * getIn(value, ['foo', 'baRRRR'], 'not found'); // 'not found'
 * @param {ObjectOrArray} objectOrArray - объект. Допускается массив.
 * @param {string | string[]} deepKey - путь, для которого требуется получить значение. Строка или массив строк.
 * @param {T} defaultValue - дефольное значение, если в объекте нет указанного пути.
 * @returns {T}
 */
export function getIn<T>(objectOrArray: ObjectOrArray, deepKey: any | any[], defaultValue?: T): T {
    const keys = wrapToArray(deepKey);

    if (!objectOrArray || typeof objectOrArray !== 'object' || keys.length === 0) {
        return defaultValue;
    }

    let current: ObjectOrArray = objectOrArray;
    for (const key of keys) {
        if (typeof current === 'object' || Array.isArray(current)) {
            const next = (current as IGeneralObject)[key];
            if (next === undefined) {
                return defaultValue;
            }
            current = next;
        } else {
            return defaultValue;
        }
    }
    return current as T;
}
