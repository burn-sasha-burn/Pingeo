import {push} from 'connected-react-router';
import {IMapInfo} from 'domain/IMapInfo';
import {IPoint} from 'domain/IPoint';
import {mapInfoSelector} from 'store/selectors/mapInfoSelectors';
import {locationSelector} from 'store/selectors/routeSelectors';
import {buildCurrentPageRoute} from 'utils/routeBuilders';
import {GeneralGetState, GeneralThunkAction, GeneralThunkDispatch, PayloadedAction} from 'utils/store/actionTypes';

export const UPDATE_MAP_INFO = 'UPDATE_MAP_INFO';

function updateMapInfo(mapInfo: IMapInfo): PayloadedAction<IMapInfo> {
    return {type: UPDATE_MAP_INFO, payload: mapInfo};
}

export function setMapPosition(position: IPoint): GeneralThunkAction<void> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        const prevMapInfo = mapInfoSelector(getState());
        const location = locationSelector(getState());
        // Смена адреса закрывает окно инцидента
        dispatch(push(buildCurrentPageRoute(location)));
        dispatch(updateMapInfo({...prevMapInfo, position: {...position}}));
    };
}
