// import {push} from 'connected-react-router';
import {push} from 'connected-react-router';
import {ISelectedIncidentInfo} from 'domain/ISelectedIncidentInfo';
import {GeneralThunkAction, PayloadedAction} from 'utils/store/actionTypes';

export const UPDATE_SELECTED_INCIDENT_INFO = 'UPDATE_SELECTED_INCIDENT_INFO';

// export function selectIncident(id: string): PayloadedAction<ISelectedIncidentInfo> {
//     return {type: UPDATE_SELECTED_INCIDENT_INFO, payload: {selectedIncident: id}};
// }
//
// export function deselectIncident(): PayloadedAction<ISelectedIncidentInfo> {
//     return {type: UPDATE_SELECTED_INCIDENT_INFO, payload: {selectedIncident: null}};
// }

export function selectIncident(id: string) {
    return push(`/${id}`);
}

export function deselectIncident() {
    return push('/');
}
