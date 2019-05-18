import {defaultMapInfo, IMapInfo} from 'domain/IMapInfo';
import {UPDATE_MAP_INFO} from 'store/actions/mapInfoActions';
import {createSimpleSaveReducer} from 'utils/store/createSimpleSaveReducer';

export const mapInfoReducer = createSimpleSaveReducer<IMapInfo>(
    UPDATE_MAP_INFO,
    defaultMapInfo,
);
