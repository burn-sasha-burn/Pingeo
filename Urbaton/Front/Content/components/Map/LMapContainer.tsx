import {LMap} from 'components/Map/LMap';
import {connect} from 'react-redux';
import {mapInfoSelector} from 'store/selectors/mapInfoSelectors';

const mapStateToProps = (state: IGeneralObject) => ({
    mapInfo: mapInfoSelector(state),
});

export const LMapContainer = connect(mapStateToProps)(LMap);
