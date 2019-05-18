import {FireDivIcon} from 'components/DivIcons/FireDivIcon';
import {LMarker} from 'components/Map/LMarker';
import {DivIcon} from 'leaflet';
import * as React from 'react';
import {ComponentProps} from 'react';

type LFireMarkerProps = Omit<ComponentProps<typeof LMarker>, 'icon'>;

const FireIcon = new FireDivIcon() as DivIcon;

export function LFireMarker(props: LFireMarkerProps) {
    return <LMarker icon={FireIcon} {...props}/>;
}
