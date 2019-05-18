import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import {combineReducers} from 'redux';
import {incidentsByIdReducer} from 'store/reducers/incidentsReducer';
import {selectedIncidentInfoReducer} from 'store/reducers/selectedIncidentInfoReducer';
import {incidentsByIdPath, routerPath, selectedIncidentInfoPath} from 'store/rootPaths';

export function createRootReducer(history: History) {
    return combineReducers({
        [incidentsByIdPath]: incidentsByIdReducer,
        [selectedIncidentInfoPath]: selectedIncidentInfoReducer,
        [routerPath]: connectRouter(history),
    });
}
