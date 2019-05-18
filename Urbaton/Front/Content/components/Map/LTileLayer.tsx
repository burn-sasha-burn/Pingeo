import {Map, TileLayer, TileLayerOptions} from 'leaflet';
import * as Leaflet from 'leaflet';
import * as React from 'react';

interface IRTileLayerProps {
    map?: Map;
    urlTemplate: string;
    options?: TileLayerOptions;
}

export class LTileLayer extends React.Component<IRTileLayerProps> {
    private readonly tillLayer: TileLayer;

    constructor(props: IRTileLayerProps) {
        super(props);
        this.tillLayer = Leaflet.tileLayer(props.urlTemplate, props.options);
    }

    public componentDidMount() {
        this.props.map.addLayer(this.tillLayer);
    }

    public componentWillUnmount() {
        this.tillLayer.remove();
    }

    public render() {
        return (<></>);
    }
}
