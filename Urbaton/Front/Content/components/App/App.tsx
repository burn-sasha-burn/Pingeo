import {IncidentMarkers} from 'components/IncidentMarks/IncidentMarkers';
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
                <IncidentMarkers/>
            </LMap>
        );
    }
}
