import {getIncidents} from 'api/incidentsApi';
import {IIncident} from 'domain/IIncident';
import {GeneralGetState, GeneralThunkAction, GeneralThunkDispatch} from 'utils/store/actionTypes';
import {createByIdActions} from 'utils/store/createByIdActions';

const incidentActions = createByIdActions('INCIDENTS');

export const SAVE_INCIDENTS = incidentActions.saveActionType;
export const REMOVE_INCIDENTS = incidentActions.removeActionType;
export const saveIncidents = incidentActions.save;
export const removeIncidents = incidentActions.remove;

export function loadAllIncidents(): GeneralThunkAction<Promise<IIncident[]>> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        return getIncidents()
            .then((incidents) => {
                dispatch(saveIncidents(incidents));
                return incidents;
            });
    };
}
