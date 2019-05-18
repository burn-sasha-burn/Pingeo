import {IIncident} from 'domain/IIncident';
import {REMOVE_INCIDENTS, SAVE_INCIDENTS} from 'store/actions/incidentsActions';
import {createByIdReducer} from 'utils/store/createByIdReducer';

export type IIncidentsByIdState = ITypedObject<IIncident>;

export const incidentsByIdReducer = createByIdReducer<IIncidentsByIdState>(
    {saveActionType: SAVE_INCIDENTS, removeActionType: REMOVE_INCIDENTS},
    {},
);
