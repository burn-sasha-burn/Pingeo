import {IPoint} from 'domain/IPoint';
import {IStatus} from 'domain/IStatus';
import {IUser} from 'domain/IUser';

export interface IIncident {
    id: string;
    description: string;
    situation: string;
    location: IPoint;
    status: IStatus;
    creationDate: string;
    creator: IUser;
    fileId: string;
    meetupUsers: IUser[];
    customText: string;
}
