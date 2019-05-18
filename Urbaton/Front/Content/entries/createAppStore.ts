import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from 'store/rootReducer';

export function createAppStore() {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(
            thunkMiddleware,
        )),
    );
}
