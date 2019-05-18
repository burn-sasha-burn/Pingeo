import {initializeIncidentMarkers} from 'components/IncidentMarks/incidentMarkersUtils';
import {LFireMarker} from 'components/Map/LFireMarker';
import {IIncident} from 'domain/IIncident';
import {Map} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchAllIncidents} from 'store/actions/incidentsActions';
import {incidentsByIdSelector} from 'store/selectors/incidentsSelectors';

interface IIncidentMarkersProps {
    incidents: ITypedObject<IIncident>;
    map?: Map;
    onClick?: () => void;
    loadIncidents?: () => void;
}

class IncidentMarksComponent extends React.PureComponent<IIncidentMarkersProps> {
    public static defaultProps: Partial<IIncidentMarkersProps> = {
        onClick: () => '',
        loadIncidents: () => '',
    };

    public componentDidMount() {
        initializeIncidentMarkers(this.props);
    }

    public render() {
        const {map, incidents} = this.props;
        if (!map || !incidents) {
            return null;
        }

        const values = Object.values(incidents);

        return (
            <>
                {values.map((incident) => <LFireMarker key={incident.id} position={incident.coordinate} map={map}/>)}
            </>
        );
    }
}

const mapStateToProps = (state: IGeneralObject) => ({
    incidents: incidentsByIdSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loadIncidents: fetchAllIncidents,
}, dispatch);
export const IncidentMarkers = connect(mapStateToProps, mapDispatchToProps)(IncidentMarksComponent);
