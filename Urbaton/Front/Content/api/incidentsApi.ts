import {IIncident} from 'domain/IIncident';
import {jsonFetchWithErrorLog} from 'utils/apiUtils';

export function getIncidents(): Promise<IIncident[]> {
    return jsonFetchWithErrorLog('/api/Incidents');
}
