import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import {combineReducers} from 'redux';
import {incidentsByIdReducer} from 'store/reducers/incidentsReducer';
import {mapInfoReducer} from 'store/reducers/mapInfoReducer';
import {incidentsByIdPath, mapInfoPath, routerPath} from 'store/rootPaths';

export function createRootReducer(history: History) {
    return combineReducers({
        [incidentsByIdPath]: incidentsByIdReducer,
        [mapInfoPath]: mapInfoReducer,
        [routerPath]: connectRouter(history),
    });
}
