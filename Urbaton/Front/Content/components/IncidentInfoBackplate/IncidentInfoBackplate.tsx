import cn from 'classnames';
import {IIncident} from 'domain/IIncident';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {deselectIncident} from 'store/actions/selectedIncidentActions';
import {selectedIncidentSelector} from 'store/selectors/selectedIncidentInfoSelectors';
import styles from './IncidentInfoBackplate.scss';

interface IIncidentInfoBackplateProps {
    selectedIncident: IIncident;
    deselectIncident: () => void;
}

class IncidentInfoBackplateComponent extends React.Component<IIncidentInfoBackplateProps> {
    public render() {
        const {selectedIncident} = this.props;

        return (
            <div className={cn(styles.backplate, selectedIncident && styles.opened)}>
                ПАРФЕНОН !!!!!!!!!!!!
            </div>
        );
    }
}

const mapStateToProps = (state: IGeneralObject) => ({
    selectedIncident: selectedIncidentSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    deselectIncident,
}, dispatch);
export const IncidentInfoBackplate = connect(mapStateToProps, mapDispatchToProps)(IncidentInfoBackplateComponent);
