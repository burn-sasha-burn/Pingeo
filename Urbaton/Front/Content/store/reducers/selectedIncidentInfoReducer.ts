import {ISelectedIncidentInfo} from 'domain/ISelectedIncidentInfo';
import {UPDATE_SELECTED_INCIDENT_INFO} from 'store/actions/selectedIncidentActions';
import {createSimpleSaveReducer} from 'utils/store/createSimpleSaveReducer';

export const selectedIncidentInfoReducer = createSimpleSaveReducer<ISelectedIncidentInfo>(
    UPDATE_SELECTED_INCIDENT_INFO,
    {selectedIncident: null},
);
