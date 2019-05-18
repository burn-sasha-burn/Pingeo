import {initializeIncidentMarkers} from 'components/IncidentMarks/incidentMarkersUtils';
import {LFireMarker} from 'components/Map/LFireMarker';
import {IIncident} from 'domain/IIncident';
import {Map} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchAllIncidents} from 'store/actions/incidentsActions';
import {selectIncident} from 'store/actions/selectedIncidentActions';
import {incidentsByIdSelector} from 'store/selectors/incidentsSelectors';
import {HandlersCache} from 'utils/HandlersCache';

interface IIncidentMarkersProps {
    incidents: ITypedObject<IIncident>;
    map?: Map;
    onClick?: () => void;
    loadIncidents?: () => void;
    selectIncident?: (id: string) => void;
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
                {values.map((incident) => (
                    <LFireMarker
                        key={incident.id}
                        position={incident.coordinate}
                        onClick={this.markerClicksCache.getHandler(incident.id, incident)}
                        map={map}
                    />
                ))}
            </>
        );
    }

    private readonly handleMarkerClick = (incident: IIncident) => {
        this.props.selectIncident(incident.id);
    }
    private readonly markerClicksCache = new HandlersCache(this.handleMarkerClick);
}

const mapStateToProps = (state: IGeneralObject) => ({
    incidents: incidentsByIdSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loadIncidents: fetchAllIncidents,
    selectIncident,
}, dispatch);
export const IncidentMarkers = connect(mapStateToProps, mapDispatchToProps)(IncidentMarksComponent);
