import {defaultMapInfo, IMapInfo} from 'domain/IMapInfo';
import {mapInfoPath} from 'store/rootPaths';

export function mapInfoSelector(state: { [mapInfoPath]?: IMapInfo }): IMapInfo {
    return state && state.mapInfo || defaultMapInfo;
}
