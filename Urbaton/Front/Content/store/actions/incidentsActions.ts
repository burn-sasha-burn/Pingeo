import {getIncidents} from 'api/incidentsApi';
import {IIncident} from 'domain/IIncident';
import {IPoint} from 'domain/IPoint';
import {IStatus} from 'domain/IStatus';
import {GeneralGetState, GeneralThunkAction, GeneralThunkDispatch} from 'utils/store/actionTypes';
import {createByIdActions} from 'utils/store/createByIdActions';

const incidentActions = createByIdActions('INCIDENTS');

export const SAVE_INCIDENTS = incidentActions.saveActionType;
export const REMOVE_INCIDENTS = incidentActions.removeActionType;
export const saveIncidents = incidentActions.save;
export const removeIncidents = incidentActions.remove;

export function fetchAllIncidents(): GeneralThunkAction<Promise<IIncident[]>> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        return getIncidents()
            .then((incidents) => {
                dispatch(saveIncidents(incidents));
                return incidents;
            });
    };
}

export function generateIncidents(point: IPoint) {
    const incidents: IIncident[] = [];
    // for (let i = 0; i < 50; i++) {
    // incidents.push({
    //     id: Math.random().toString(36).slice(2),
    //     status: Math.random() < 0.33 ? IStatus.Finished : Math.random() > 0.5 ? IStatus.New : IStatus.Process,
    //     creationDate: new Date().toISOString(),
    //     creator: {nick: 'noone'},
    //     customText: 'asdf',
    //     fileId: 'AgADAgADQKoxGzO8CUutQ9XN2l_gbc49hA8ABMtu0GGOnqcezNwAAgI',
    //     location: {
    //         lat: point.lat + (Math.random() - 0.5) * 0.02 / 2,
    //         lng: point.lng + (Math.random() - 0.5) * 0.02,
    //     },
    //     meetupUsers: [],
    //     description: `Сгенерированный инцидент ${i + 1}`,
    //     situation: ``,
    // });
    // }
    return saveIncidents(incidents);
}
