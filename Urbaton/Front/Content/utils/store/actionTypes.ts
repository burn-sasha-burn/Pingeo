import {Action, ActionCreatorsMapObject, AnyAction, Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export type GeneralThunkAction<ReturnType> = ThunkAction<ReturnType, IGeneralObject, undefined, Action>;
export type GeneralThunkDispatch = ThunkDispatch<IGeneralObject, undefined, Action>;

export type PayloadedAction<P> = AnyAction & { payload: P };

export type GeneralGetState = () => { [key: string]: any };

/**
 * Redux behaviour changed by middleware, so overloads here
 *
 * from react-redux-typescript-guide:
 * https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/typings/redux-thunk/index.d.ts
 */
declare module 'redux' {

    /**
     * Overload for bindActionCreators redux function, returns expects responses from thunk actions
     */
    function bindActionCreators<M extends ActionCreatorsMapObject<any>>(
        actionCreators: M,
        dispatch: Dispatch,
    ): {
        [N in keyof M]: ReturnType<M[N]> extends ThunkAction<any, any, any, any>
            ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
            : M[N]
    };
}
