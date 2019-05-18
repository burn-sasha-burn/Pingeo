import {Action} from 'redux';
import {getIn, immutableSetIn, setIn} from 'utils/deepGetSet';
import {PayloadedAction} from 'utils/store/actionTypes';
import {wrapToArray} from 'utils/wrapToArray';

interface ITypedByIdState<T> {
    [key: string]: T;
}

type MergeValues<T> = (prev: T, next: T) => T;

/**
 * Создает редьюсер, который будет сохранять массив значений по ключу в объект.
 * По массиву ключей будет удалять значения из объекта.
 * @example слишком длинный. Наиболее полный пример есть в classifiersReducer
 * @param actionTypes - типы экшенов для сохранения и удаления. Можно задать clearActionType,
 * по которому очистятся все значения из стора
 * @param {ITypedByIdState<T>} initialState - начальное значение
 * @param {(value: T) => string} getKey - функция для получения ключа значения
 * @param {MergeValues<T>} mergeValues - функция обновления значений. Дефолтные варианты: replace, merge.
 * Можно задать свою.
 * @return {(state: ITypedByIdState<T>, action: Action) => {}}
 */
export function createByIdReducer<T>(
    actionTypes: { saveActionType: string, removeActionType: string, clearActionType?: string },
    initialState: ITypedByIdState<T>,
    getKey: (value: T) => string = (value: T & { id: string }) => value.id,
    mergeValues: MergeValues<T> = defaultReplaceValues,
): (state: ITypedByIdState<T>, action: Action) => {} {

    return function reducer(
        state: { [key: string]: T } = initialState,
        action: PayloadedAction<T[] | string[]>,
    ): {} {

        switch (action.type) {
            case actionTypes.saveActionType: {
                const payload = action.payload as T[];
                const nextState = {...state};
                payload.forEach((next) => {
                    const key = getKey(next);
                    setIn(nextState, key, mergeValues(getIn(nextState, key, {} as any), next));
                });
                return nextState;
            }
            case actionTypes.removeActionType: {
                const keysArr = wrapToArray(action.payload);
                const nextState = {...state};
                keysArr.forEach((key) => {
                    immutableSetIn(nextState, key, undefined);
                });
                return nextState;
            }
            default: {
                if (actionTypes.clearActionType) {
                    return {};
                }
                return state;
            }
        }
    };
}

function defaultReplaceValues<T>(prev: T, next: T): T {
    return next;
}

function defaultMergeValues<T>(prev: T = {} as T, next: T): T {
    return {...prev, ...next};
}
