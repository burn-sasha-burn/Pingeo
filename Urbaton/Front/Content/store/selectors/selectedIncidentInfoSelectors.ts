import {ISelectedIncidentInfo} from 'domain/ISelectedIncidentInfo';
import {createSelector} from 'reselect';
import {selectedIncidentInfoPath} from 'store/rootPaths';
import {incidentsByIdSelector} from 'store/selectors/incidentsSelectors';

export function selectedIncidentInfoSelector(
    state: { [selectedIncidentInfoPath]?: ISelectedIncidentInfo },
): ISelectedIncidentInfo {
    return state && state.selectedIncidentInfo || {selectedIncident: null};
}

export const selectedIncidentSelector = createSelector(
    [selectedIncidentInfoSelector, incidentsByIdSelector],
    (selectedIncidentInfo, incidentsById) => {
        if (!selectedIncidentInfo.selectedIncident || !incidentsById[selectedIncidentInfo.selectedIncident]) {
            return null;
        }
        return incidentsById[selectedIncidentInfo.selectedIncident];
    },
);
