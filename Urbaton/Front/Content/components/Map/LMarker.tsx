import {IPoint} from 'domain/IPoint';
import {DivIcon, Map, Marker} from 'leaflet';
import * as Leaflet from 'leaflet';
import * as React from 'react';

interface ILMarkerProps {
    position: IPoint;
    icon?: DivIcon;
    map?: Map;
}

export class LMarker extends React.Component<ILMarkerProps> {
    private readonly marker: Marker;

    constructor(props: ILMarkerProps) {
        super(props);
        this.marker = Leaflet.marker({lat: 0, lng: 0}, {icon: props.icon});
    }

    public componentDidMount() {
        this.updateMarker();
    }

    public componentDidUpdate() {
        this.updateMarker();
    }

    public render() {
        return (<></>);
    }

    private prevPosition: IPoint;
    private readonly updateMarker = () => {
        const {map, position} = this.props;
        if (!map || position === this.prevPosition) {
            return;
        }
        this.prevPosition = position;

        if (!position) {
            this.marker.remove();
        } else {
            this.marker.setLatLng(position);
            this.marker.addTo(map);
        }
    }
}
