import {IImage} from 'domain/IImage';
import {IPoint} from 'domain/IPoint';
import {IStatus} from 'domain/IStatus';
import {IUser} from 'domain/IUser';

export interface IIncident {
    id: string;
    description: string;
    location: IPoint;
    status: IStatus;
    CreationDate: string;
    creator: IUser;
    images: IImage[];
    meetupUsers: IUser[];
    customText: string;
}
