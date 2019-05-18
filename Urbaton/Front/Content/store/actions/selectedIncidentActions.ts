// import {push} from 'connected-react-router';
import {push} from 'connected-react-router';
import {locationSelector} from 'store/selectors/routeSelectors';
import {buildCurrentPageRoute, buildSelectedIncidentRoute} from 'utils/routeBuilders';
import {GeneralGetState, GeneralThunkAction, GeneralThunkDispatch} from 'utils/store/actionTypes';

export const UPDATE_SELECTED_INCIDENT_INFO = 'UPDATE_SELECTED_INCIDENT_INFO';

export function selectIncident(id: string): GeneralThunkAction<void> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        const location = locationSelector(getState());
        dispatch(push(buildSelectedIncidentRoute(location, id)));
    };
}

export function deselectIncident(): GeneralThunkAction<void> {
    return (dispatch: GeneralThunkDispatch, getState: GeneralGetState) => {
        const location = locationSelector(getState());
        dispatch(push(buildCurrentPageRoute(location)));
    };
}
