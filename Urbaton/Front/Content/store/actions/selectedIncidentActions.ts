import {ISelectedIncidentInfo} from 'domain/ISelectedIncidentInfo';
import {PayloadedAction} from 'utils/store/actionTypes';

export const UPDATE_SELECTED_INCIDENT_INFO = 'UPDATE_SELECTED_INCIDENT_INFO';

export function selectIncident(id: string): PayloadedAction<ISelectedIncidentInfo> {
    return {type: UPDATE_SELECTED_INCIDENT_INFO, payload: {selectedIncident: id}};
}
