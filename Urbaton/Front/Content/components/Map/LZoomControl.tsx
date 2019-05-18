import {ControlPosition, Map} from 'leaflet';
import * as React from 'react';

interface ILZoomControlProps {
    position?: ControlPosition;
    map?: Map;
}

export class LZoomControl extends React.Component<ILZoomControlProps> {
    public static defaultProps: Partial<ILZoomControlProps> = {
        position: 'topleft',
    }

    public componentDidMount() {
        const {map, position} = this.props;
        if (map) {
            const zoom = map.zoomControl;
            zoom.remove();
            zoom.options.position = position;
            map.addControl(zoom);
        }
    }

    public render() {
        return (<></>);
    }
}
