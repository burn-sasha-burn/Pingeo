import {AutoLocation} from 'components/Map/AutoLocation';
import {RMap} from 'components/Map/RMap';
import {RTileLayer} from 'components/Map/RTileLayer';
import * as React from 'react';
import {globeLayerAttribution, globeLayerUrlTemplate} from 'utils/constants/mapLayers';

interface IAppProps {

}

export class App extends React.Component<IAppProps> {
    public render() {
        return (
            <RMap>
                <AutoLocation/>
                <RTileLayer
                    urlTemplate={globeLayerUrlTemplate}
                    options={{
                        crossOrigin: true,
                        attribution: globeLayerAttribution,
                    }}
                />
            </RMap>
        );
    }
}
