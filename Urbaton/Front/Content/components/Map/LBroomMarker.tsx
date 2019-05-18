import {BroomDivIcon} from 'components/DivIcons/BroomDivIcon';
import {LMarker} from 'components/Map/LMarker';
import {DivIcon} from 'leaflet';
import * as React from 'react';
import {ComponentProps} from 'react';

type LFireMarkerProps = Omit<ComponentProps<typeof LMarker>, 'icon'>;

const BroomIcon = new BroomDivIcon() as DivIcon;

export function LBroomMarker(props: LFireMarkerProps) {
    return <LMarker icon={BroomIcon} {...props}/>;
}
