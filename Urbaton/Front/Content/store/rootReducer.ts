import {combineReducers} from 'redux';
import {incidentsByIdReducer} from 'store/reducers/incidentsReducer';
import {incidentsByIdPath} from 'store/rootPaths';

export const rootReducer = combineReducers({
    [incidentsByIdPath]: incidentsByIdReducer,
});
