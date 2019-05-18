import {combineReducers} from 'redux';
import {incidentsByIdReducer} from 'store/reducers/incidentsReducer';
import {selectedIncidentInfoReducer} from 'store/reducers/selectedIncidentInfoReducer';
import {incidentsByIdPath, selectedIncidentInfoPath} from 'store/rootPaths';

export const rootReducer = combineReducers({
    [incidentsByIdPath]: incidentsByIdReducer,
    [selectedIncidentInfoPath]: selectedIncidentInfoReducer,
});
