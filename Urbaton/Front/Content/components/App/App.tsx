import {IncidentInfoBackplate} from 'components/IncidentInfoBackplate/IncidentInfoBackplate';
import {IncidentMarkers} from 'components/IncidentMarks/IncidentMarkers';
import {AutoLocation} from 'components/Map/AutoLocation';
import {LMapContainer} from 'components/Map/LMapContainer';
import {LTileLayer} from 'components/Map/LTileLayer';
import {LZoomControl} from 'components/Map/LZoomControl';
import {OptionsBar} from 'components/OptionsBar/OptionsBar';
import * as React from 'react';
import {globeLayerAttribution, globeLayerUrlTemplate} from 'utils/constants/mapLayers';
import styles from './App.scss';

export class App extends React.Component {
    public render() {
        return (
            <div className={styles.appContainer}>
                <LMapContainer>
                    <AutoLocation/>
                    <LTileLayer
                        urlTemplate={globeLayerUrlTemplate}
                        options={{
                            crossOrigin: true,
                            attribution: globeLayerAttribution,
                        }}
                    />
                    <LZoomControl position="topleft"/>
                    <IncidentMarkers/>
                </LMapContainer>
                <OptionsBar/>
                <IncidentInfoBackplate/>
            </div>
        );
    }
}
