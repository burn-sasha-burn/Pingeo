import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

export function createAppStore() {
    return createStore(
        () => 'asdf',
        composeWithDevTools(applyMiddleware(
            thunkMiddleware,
        )),
    );
}
