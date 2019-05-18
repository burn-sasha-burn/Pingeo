import {IIncident} from 'domain/IIncident';
import {Map} from 'leaflet';
import * as React from 'react';
import {connect} from 'react-redux';

interface IIncidentMarksProps {
    incidents: ITypedObject<IIncident>;
    map?: Map;
    onClick?: () => void;
    loadIncidents?: () => void;
}

class IncidentMarksComponent extends React.Component<IIncidentMarksProps> {
    public static defaultProps: Partial<IIncidentMarksProps> = {
        onClick: () => '',
        loadIncidents: () => '',
    };

    public componentDidMount() {
        const {map} = this.props;
    }

    public render() {
        return (<></>);
    }
}

export const IncidentMarks = connect()(IncidentMarksComponent);
