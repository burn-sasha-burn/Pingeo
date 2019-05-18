// tslint:disable:max-line-length
import {DivIcon, DivIconOptions} from 'leaflet';
import * as React from 'react';

export class BroomDivIcon {
    constructor(options: Omit<DivIconOptions, 'html'> = {}) {
        const divIconOptions: DivIconOptions = {
                iconSize: [40, 40],
                bgPos: [0, 0],
                className: '',
                ...options,
                html:
                broomDivIconSvgStr,
            }
        ;
        return new DivIcon(divIconOptions);
    }
}

export const broomDivIconSvgStr = `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet" width="40px" height="40px">
    <g transform="rotate(45)" transform-origin="50%">
        <rect x="80" y="80" rx="20" ry="20" width="352" height="352"
              style="fill:#FF6028;stroke:black;stroke-width:5;"
        />
        <rect x="95" y="95" rx="10" ry="10" width="322" height="322"
              style="fill:#ffd403;stroke:black;stroke-width:5;"
        />
    </g>
    <g transform="translate(95,125) scale(0.5)">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
           fill="#000000" stroke="none">
            <path d="M4442 5084 c-41 -21 -32 -6 -437 -764 -180 -338 -340 -635 -353 -661
            -14 -25 -23 -52 -20 -60 6 -14 565 -269 591 -269 6 0 31 53 53 118 23 64 146
            403 273 753 126 350 233 649 237 663 11 43 -5 95 -41 135 -69 76 -232 122
            -303 85z"
            />
            <path d="M3041 3424 c-94 -25 -210 -93 -281 -164 -69 -69 -132 -172 -115 -189
            7 -7 1791 -805 1851 -828 15 -6 52 126 60 213 17 185 -66 387 -208 505 -73 60
            -139 94 -502 256 -347 154 -437 192 -501 209 -65 18 -235 17 -304 -2z"
            />
            <path d="M2415 2688 c-142 -212 -368 -404 -629 -535 -349 -175 -747 -279
            -1158 -302 -190 -11 -230 -24 -275 -92 -33 -51 -43 -137 -20 -190 36 -87 380
            -442 591 -611 238 -191 482 -345 761 -482 467 -230 937 -371 1448 -436 249
            -31 293 -18 393 117 253 341 529 865 726 1378 52 133 140 387 135 390 -1 1
            -84 30 -185 65 -107 37 -187 59 -192 54 -5 -5 -39 -92 -76 -194 -174 -480
            -402 -949 -630 -1297 -62 -96 -78 -113 -99 -113 -60 0 -518 82 -533 95 -2 2
            33 57 77 123 196 292 353 582 315 582 -3 0 -56 -42 -117 -93 -276 -229 -475
            -353 -656 -407 -90 -28 -194 -24 -256 7 -22 12 -105 54 -185 95 -80 41 -152
            77 -160 80 -11 3 5 29 58 91 127 151 239 321 230 347 -2 5 -34 -16 -73 -45
            -112 -88 -241 -150 -403 -194 -54 -15 -80 -18 -99 -10 -34 13 -295 214 -384
            297 l-71 66 163 32 c324 65 578 150 839 280 276 138 485 290 635 461 83 95
            257 345 247 354 -13 12 -332 189 -340 189 -5 0 -39 -46 -77 -102z"
            />
        </g>
    </g>
</svg>`;
