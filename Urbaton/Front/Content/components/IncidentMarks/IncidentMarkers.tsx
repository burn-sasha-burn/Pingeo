import {initializeIncidentMarkers} from 'components/IncidentMarks/incidentMarkersUtils';
import {LBroomMarker} from 'components/Map/LBroomMarker';
import {LFireMarker} from 'components/Map/LFireMarker';
import {LOkMarker} from 'components/Map/LOkMarker';
import {IIncident} from 'domain/IIncident';
import {IStatus} from 'domain/IStatus';
import {Map} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchAllIncidents} from 'store/actions/incidentsActions';
import {selectIncident} from 'store/actions/selectedIncidentActions';
import {filteredIncidentsSelector} from 'store/selectors/incidentsSelectors';
import {HandlersCache} from 'utils/HandlersCache';

interface IIncidentMarkersProps {
    incidents: IIncident[];
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

        return (
            <>
                {incidents.map((incident) => {
                    let LMarker = null;

                    switch (incident.status) {
                        case IStatus.New: {
                            LMarker = LFireMarker;
                            break;
                        }
                        case IStatus.Process: {
                            LMarker = LBroomMarker;
                            break;
                        }
                        case IStatus.Finished: {
                            LMarker = LOkMarker;
                            break;
                        }
                    }

                    if (!LMarker) {
                        return null;
                    }
                    return (
                        <LMarker
                            key={incident.id}
                            position={incident.location}
                            onClick={this.markerClicksCache.getHandler(incident.id, incident)}
                            map={map}
                        />
                    );
                })}
            </>
        );
    }

    private readonly handleMarkerClick = (incident: IIncident) => {
        this.props.selectIncident(incident.id);
    }
    private readonly markerClicksCache = new HandlersCache(this.handleMarkerClick);
}

const mapStateToProps = (state: IGeneralObject) => ({
    incidents: filteredIncidentsSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loadIncidents: fetchAllIncidents,
    selectIncident,
}, dispatch);
export const IncidentMarkers = connect(mapStateToProps, mapDispatchToProps)(IncidentMarksComponent);
