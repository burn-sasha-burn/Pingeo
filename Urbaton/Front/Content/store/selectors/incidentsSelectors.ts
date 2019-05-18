import {IIncident} from 'domain/IIncident';
import {IIncidentsByIdState} from 'store/reducers/incidentsReducer';
import {incidentsByIdPath} from 'store/rootPaths';

export function incidentsByIdSelector(state: { [incidentsByIdPath]?: IIncidentsByIdState }): ITypedObject<IIncident> {
    return state && state.incidentsById || {};
}
