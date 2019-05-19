import {IIncident} from 'domain/IIncident';
import {IStatus, Statuses} from 'domain/IStatus';

export function reshapeIncident(incident: IIncident): IIncident {
    return {
        ...incident,
        // Приходит непреобразованный энум числом
        status: Statuses[incident.status as any as number],
        meetupUsers: incident.meetupUsers || [],
        // todo УДОЛИТЬ МОК ДАННЫЕ
        // status: Statuses[Math.random() < 0.33 ? 2 : Math.random() > 0.5 ? 1 : 0],
        // status: IStatus.New,
        // image: {fileId: 'AgADAgADPKsxG5uvCUvd3L3_1RYnWJe9UQ8ABHnN_279LHVBU2sDAAEC'},
    };
}
