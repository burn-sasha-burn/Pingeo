import {createSelector} from 'reselect';
import {incidentsByIdSelector} from 'store/selectors/incidentsSelectors';
import {pathInfoSelector} from 'store/selectors/routeSelectors';

export const selectedIncidentSelector = createSelector(
    [incidentsByIdSelector, pathInfoSelector],
    (incidentsById, pathInfo) => incidentsById[pathInfo.incident] || null,
);
