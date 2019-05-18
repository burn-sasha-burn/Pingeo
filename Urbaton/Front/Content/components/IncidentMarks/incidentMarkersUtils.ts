import {IncidentMarkers} from 'components/IncidentMarks/IncidentMarkers';
import {ComponentProps} from 'react';

export function initializeIncidentMarkers(props: ComponentProps<typeof IncidentMarkers>): void {
    const {incidents, loadIncidents} = props;
    if (!incidents || Object.keys(incidents).length === 0) {
        loadIncidents();
    }
}
