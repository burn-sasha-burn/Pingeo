import {push} from 'connected-react-router';
import {IMapInfo} from 'domain/IMapInfo';
import {IPoint} from 'domain/IPoint';
import {IStatus} from 'domain/IStatus';
import {mapInfoSelector} from 'store/selectors/mapInfoSelectors';
import {selectedIncidentSelector} from 'store/selectors/selectedIncidentSelector';
import {buildIncidentsRoute, buildMeetupsRoute} from 'utils/routeBuilders';
import {GeneralGetState, GeneralThunkAction, GeneralThunkDispatch, PayloadedAction} from 'utils/store/actionTypes';

export const UPDATE_MAP_INFO = 'UPDATE_MAP_INFO';

function updateMapInfo(mapInfo: IMapInfo): PayloadedAction<IMapInfo> {
    return {type: UPDATE_MAP_INFO, payload: mapInfo};
}

export function setMapPosition(position: IPoint): GeneralThunkAction<void> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        const prevMapInfo = mapInfoSelector(getState());
        const selectedIncident = selectedIncidentSelector(getState());

        // Смена адреса закрывает окно инцидента
        if (selectedIncident.status === IStatus.Process) {
            dispatch(push(buildMeetupsRoute()));
        } else {
            dispatch(push(buildIncidentsRoute()));
        }
        dispatch(updateMapInfo({...prevMapInfo, position: {...position}}));
    };
}
