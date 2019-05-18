import {IIncident} from 'domain/IIncident';
import {Statuses} from 'domain/IStatus';

export function reshapeIncident(incident: IIncident): IIncident {
    return {
        ...incident,
        // Приходит непреобразованный энум числом
        // status: Statuses[incident.status as any as number],
        meetupUsers: incident.meetupUsers || [],
        // todo УДОЛИТЬ МОК ДАННЫЕ
        status: Statuses[Math.random() > 0.5 ? 1 : 0],
        images: [
            {someValue: '', link: 'https://sun7-3.userapi.com/c851124/v851124357/114756/WECb7e2WDbA.jpg'},
            {someValue: '', link: 'https://sun7-2.userapi.com/c840726/v840726736/4e9bd/fsJ0rL1PQOA.jpg'},
            {someValue: '', link: 'https://sun7-3.userapi.com/c840726/v840726736/4e9a2/vqquLV5sAIs.jpg'},
            {someValue: '', link: 'https://sun7-1.userapi.com/c840726/v840726736/4e9ab/RCJWerMUoy8.jpg'},
            {someValue: '', link: 'https://sun7-3.userapi.com/c840726/v840726736/4e9b4/dIricruGOhs.jpg'},
            {someValue: '', link: 'https://sun7-3.userapi.com/c840726/v840726736/4e9cf/iKfl5T_PES4.jpg'},
            {someValue: '', link: 'https://sun7-3.userapi.com/c840726/v840726736/4e9c6/rkl7NRbu26Q.jpg'},
        ],
    };
}
