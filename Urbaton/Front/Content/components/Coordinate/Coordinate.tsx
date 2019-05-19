import * as React from 'react';

interface ICoordinateProps {
    lat: number;
    lng: number;
}

export function Coordinate({lat = 0, lng = 0}: ICoordinateProps) {
    return (
        <span>
            {lat.toFixed(4)} {lng.toFixed(4)}
        </span>
    );
}
