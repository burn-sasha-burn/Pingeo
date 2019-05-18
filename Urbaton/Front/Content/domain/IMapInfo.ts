import {IPoint} from 'domain/IPoint';

export interface IMapInfo {
    position: IPoint;
}

export const defaultMapInfo: IMapInfo = {
    position: {lat: 0, lng: 0},
};
