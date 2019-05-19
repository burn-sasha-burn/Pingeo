import {OkDivIcon} from 'components/DivIcons/OkDivIcon';
import {LMarker} from 'components/Map/LMarker';
import {DivIcon} from 'leaflet';
import * as React from 'react';
import {ComponentProps} from 'react';

type LOkMarkerProps = Omit<ComponentProps<typeof LMarker>, 'icon'>;

const OkIcon = new OkDivIcon() as DivIcon;

export function LOkMarker(props: LOkMarkerProps) {
    return <LMarker icon={OkIcon} {...props}/>;
}
