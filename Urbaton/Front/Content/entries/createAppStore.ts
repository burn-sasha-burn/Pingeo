import {routerMiddleware} from 'connected-react-router';
import {History} from 'history';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {createRootReducer} from 'store/rootReducer';

export function createAppStore(history: History) {
    return createStore(
        createRootReducer(history),
        composeWithDevTools(applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history),
        )),
    );
}
