import {PayloadedAction} from 'utils/store/actionTypes';

export function createSimpleSaveReducer<T>(
    updateActionType: string,
    initialState: T,
    resetActionType: string = null,
): (state: T, action: PayloadedAction<T>) => T {
    return (state: T = initialState, action: PayloadedAction<T>): T => {
        switch (action.type) {
            case updateActionType: {
                return action.payload;
            }
            default: {
                if (resetActionType !== null && action.type === resetActionType) {
                    return initialState;
                }
                return state;
            }
        }
    };
}
