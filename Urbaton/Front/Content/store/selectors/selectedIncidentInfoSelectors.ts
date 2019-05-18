import {RouterState} from 'connected-react-router';
import {createSelector} from 'reselect';
import {routerPath} from 'store/rootPaths';
import {incidentsByIdSelector} from 'store/selectors/incidentsSelectors';

export function selectedIncidentIdSelector(
    state: { [routerPath]?: RouterState },
): string {
    const router = state && state.router;
    if (!router) {
        return null;
    }
    const path = router.location.pathname;
    return path.split('/')[1] || null;
}

export const selectedIncidentSelector = createSelector(
    [selectedIncidentIdSelector, incidentsByIdSelector],
    (selectedIncidentId, incidentsById) => {
        if (!selectedIncidentId || !incidentsById[selectedIncidentId]) {
            return null;
        }
        return incidentsById[selectedIncidentId];
    },
);
