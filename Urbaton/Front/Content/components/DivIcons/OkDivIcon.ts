// tslint:disable:max-line-length
import {DivIcon, DivIconOptions} from 'leaflet';

export class OkDivIcon {
    constructor(options: Omit<DivIconOptions, 'html'> = {}) {
        const divIconOptions: DivIconOptions = {
                iconSize: [40, 40],
                bgPos: [0, 0],
                className: '',
                ...options,
                html:
                okDivIconSvgString,
            }
        ;
        return new DivIcon(divIconOptions);
    }
}

export const okDivIconSvgString = `
    <svg viewBox="0 0 16 16">
        <path fill="#31b79a" d="M3.85937283 7.81051766 2.02089527 9.64899522 6.21608609 13.844186 13.9650569 6.09521524 12.1265793 4.25673767 6.21608609 10.1672309z"></path>
    </svg>
`
