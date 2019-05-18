import {RouterState} from 'connected-react-router';
import {Location} from 'history';
import {createSelector} from 'reselect';
import {routerPath} from 'store/rootPaths';
import {parsePath} from 'utils/routeBuilders';

export function locationSelector(state: { [routerPath]?: RouterState }): Location {
    return state && state.router && state.router.location || {pathname: '', hash: '', search: '', state: '', key: ''};
}

export const pathInfoSelector = createSelector(
    [locationSelector],
    ({pathname}: Location) => parsePath(pathname),
);
