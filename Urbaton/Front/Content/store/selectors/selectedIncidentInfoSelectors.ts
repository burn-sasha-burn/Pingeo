import {ISelectedIncidentInfo} from 'domain/ISelectedIncidentInfo';
import {selectedIncidentInfoPath} from 'store/rootPaths';

export function selectedIncidentInfoSelectors(
    state: { [selectedIncidentInfoPath]?: ISelectedIncidentInfo },
): ISelectedIncidentInfo {
    return state && state.selectedIncidentInfo || {selectedIncident: null};
}
