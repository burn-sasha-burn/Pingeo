import {getLocation} from 'api/gepIpApi';
import {Map} from 'leaflet';
import * as React from 'react';

interface ILocationProps {
    map?: Map;
    zoom?: number;
}

const DEFAULT_LOCATION = {lat: 38.093139357445764, lng: 24.25888538360596};

export class AutoLocation extends React.Component<ILocationProps> {
    public static defaultProps: Partial<ILocationProps> = {
        zoom: 16,
    };

    public componentDidMount() {
        this.setView();
    }

    public componentDidUpdate() {
        this.setView();
    }

    public render() {
        return (<></>);
    }

    private isSet = false;
    private readonly setView = () => {
        const {map, zoom} = this.props;
        if (map && !this.isSet) {
            // Set default view
            map.setView(DEFAULT_LOCATION, zoom);

            // Use geoIp after browser location fail
            map.on('locationerror', () =>
                getLocation().then(({latitude, longitude}) => {
                    map.setView({lat: latitude, lng: longitude}, zoom);
                }),
            );
            // Attempt to locate user via browser api
            map.locate({setView: true, maxZoom: zoom});
            this.isSet = true;
        }
    }
}
