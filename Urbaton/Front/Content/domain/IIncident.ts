import {IImage} from 'domain/IImage';
import {IPoint} from 'domain/IPoint';
import {IStatus} from 'domain/IStatus';
import {IUser} from 'domain/IUser';

export interface IIncident {
    id: string;
    description: string;
    location: IPoint;
    status: IStatus;
    creationDate: string;
    creator: IUser;
    image: IImage;
    meetupUsers: IUser[];
    customText: string;
}
