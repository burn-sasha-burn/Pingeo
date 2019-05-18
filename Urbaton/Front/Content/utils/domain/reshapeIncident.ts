import {IIncident} from 'domain/IIncident';
import {Statuses} from 'domain/IStatus';

export function reshapeIncident(incident: IIncident): IIncident {
    return {
        ...incident,
        // Приходит непреобразованный энум числом
        status: Statuses[incident.status as any as number],
        meetupUsers: incident.meetupUsers || [],
    };
}
