import {IIncident} from 'domain/IIncident';
import {Statuses} from 'domain/IStatus';

export function reshapeIncident(incident: IIncident): IIncident {
    return {
        ...incident,
        // Приходит непреобразованный энум числом
        // status: Statuses[incident.status as any as number],
        status: Statuses[Math.random() > 0.5 ? 1 : 0],
        meetupUsers: incident.meetupUsers || [],
    };
}
