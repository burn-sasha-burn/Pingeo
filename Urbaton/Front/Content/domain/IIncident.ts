import {IPoint} from 'domain/IPoint';

export interface IIncident {
    id: string;
    coordinate: IPoint;
    description: string;
}
