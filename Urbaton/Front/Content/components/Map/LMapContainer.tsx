import {LMap} from 'components/Map/LMap';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {generateIncidents} from 'store/actions/incidentsActions';
import {mapInfoSelector} from 'store/selectors/mapInfoSelectors';

const mapStateToProps = (state: IGeneralObject) => ({
    mapInfo: mapInfoSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onViewSet: generateIncidents,
}, dispatch);

export const LMapContainer = connect(mapStateToProps, mapDispatchToProps)(LMap);
