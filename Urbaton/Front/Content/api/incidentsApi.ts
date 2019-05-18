import {IIncident} from 'domain/IIncident';
import {jsonFetchWithErrorLog} from 'utils/apiUtils';
import {reshapeIncident} from 'utils/domain/reshapeIncident';

export function getIncidents(): Promise<IIncident[]> {
    return jsonFetchWithErrorLog('/api/Incidents')
        .then((incidents: IIncident[]) => incidents.map(reshapeIncident));
}
