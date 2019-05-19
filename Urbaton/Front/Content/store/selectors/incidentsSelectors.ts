import {IIncident} from 'domain/IIncident';
import {IStatus} from 'domain/IStatus';
import {createSelector} from 'reselect';
import {IIncidentsByIdState} from 'store/reducers/incidentsReducer';
import {incidentsByIdPath} from 'store/rootPaths';
import {pathInfoSelector} from 'store/selectors/routeSelectors';
import {incidentsRoute, meetupsRoute} from 'utils/constants/routesConstants';

export function incidentsByIdSelector(state: { [incidentsByIdPath]?: IIncidentsByIdState }): ITypedObject<IIncident> {
    return state && state.incidentsById || {};
}

export const filteredIncidentsSelector = createSelector(
    [incidentsByIdSelector, pathInfoSelector],
    (incidentsById, pathInfo) => {
        if (pathInfo.page === incidentsRoute) {
            return Object.values(incidentsById)
                .filter((incident) => incident.status === IStatus.New || incident.status === IStatus.Finished);
        }
        if (pathInfo.page === meetupsRoute) {
            return Object.values(incidentsById)
                .filter((incident) => incident.status === IStatus.Process || incident.status === IStatus.Finished);
        }
        return [];
    },
);
