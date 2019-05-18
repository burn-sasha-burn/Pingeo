import {AutoLocation} from 'components/Map/AutoLocation';
import {LMap} from 'components/Map/LMap';
import {LTileLayer} from 'components/Map/LTileLayer';
import * as React from 'react';
import {globeLayerAttribution, globeLayerUrlTemplate} from 'utils/constants/mapLayers';

export class App extends React.Component {
    public render() {
        return (
            <LMap>
                <AutoLocation/>
                <LTileLayer
                    urlTemplate={globeLayerUrlTemplate}
                    options={{
                        crossOrigin: true,
                        attribution: globeLayerAttribution,
                    }}
                />
                {/*<LFireMarker position={{lat: 53.2035384, lng: 50.144849699999995}}/>*/}
                {/*<LFireMarker position={{lat: 53.2035384, lng: 51.144849699999995}}/>*/}
                {/*<LFireMarker position={{lat: 53.2035384, lng: 50.644849699999995}}/>*/}
            </LMap>
        );
    }
}
