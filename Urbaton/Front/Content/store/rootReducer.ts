import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import {combineReducers} from 'redux';
import {incidentsByIdReducer} from 'store/reducers/incidentsReducer';
import {incidentsByIdPath, routerPath} from 'store/rootPaths';

export function createRootReducer(history: History) {
    return combineReducers({
        [incidentsByIdPath]: incidentsByIdReducer,
        [routerPath]: connectRouter(history),
    });
}
