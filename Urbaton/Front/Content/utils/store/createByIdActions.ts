import {Action} from 'redux';
import {PayloadedAction} from 'utils/store/actionTypes';
import {wrapToArray} from 'utils/wrapToArray';

export function createByIdActions<T>(entitiesName: string): {
    save: (values: T | T[]) => PayloadedAction<T[]>,
    remove: (ids: string | string[]) => PayloadedAction<string[]>,
    clear: () => Action,
    saveActionType: string,
    removeActionType: string,
    clearActionType: string,
} {
    const SAVE_TYPE = `SAVE_${entitiesName.toUpperCase()}`;
    const REMOVE_TYPE = `REMOVE_${entitiesName.toUpperCase()}`;
    const CLEAR_TYPE = `CLEAR_${entitiesName.toUpperCase()}`;

    function save(value: T | T[]): PayloadedAction<T[]> {
        const arr = wrapToArray(value);
        return {type: SAVE_TYPE, payload: arr};
    }

    function remove(ids: string | string[]): PayloadedAction<string[]> {
        const arr = wrapToArray(ids);
        return {type: REMOVE_TYPE, payload: arr};
    }

    function clear(): Action {
        return {type: CLEAR_TYPE};
    }

    return {
        clear,
        clearActionType: CLEAR_TYPE,
        remove,
        removeActionType: REMOVE_TYPE,
        save,
        saveActionType: SAVE_TYPE,
    };
}
