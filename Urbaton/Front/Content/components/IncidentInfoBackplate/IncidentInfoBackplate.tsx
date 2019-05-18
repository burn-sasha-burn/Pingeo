import cn from 'classnames';
import {IncidentInfo} from 'components/IncidentInfo/IncidentInfo';
import {IIncident} from 'domain/IIncident';
import {IPoint} from 'domain/IPoint';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setMapPosition as setMapPositionAction} from 'store/actions/mapInfoActions';
import {deselectIncident as deselectIncidentAction} from 'store/actions/selectedIncidentActions';
import {selectedIncidentSelector} from 'store/selectors/selectedIncidentSelector';
import styles from './IncidentInfoBackplate.scss';

interface IIncidentInfoBackplateProps {
    selectedIncident: IIncident;
    deselectIncident: () => void;
    setMapPosition: (position: IPoint) => void;
}

class IncidentInfoBackplateComponent extends React.Component<IIncidentInfoBackplateProps> {
    public render() {
        const {selectedIncident, deselectIncident, setMapPosition} = this.props;

        return (
            <div className={cn(styles.backplate, selectedIncident && styles.opened)}>
                <IncidentInfo incident={selectedIncident} onClose={deselectIncident} onToMap={setMapPosition}/>
            </div>
        );
    }
}

const mapStateToProps = (state: IGeneralObject) => ({
    selectedIncident: selectedIncidentSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    deselectIncident: deselectIncidentAction,
    setMapPosition: setMapPositionAction,
}, dispatch);
export const IncidentInfoBackplate = connect(mapStateToProps, mapDispatchToProps)(IncidentInfoBackplateComponent);
