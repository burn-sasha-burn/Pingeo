// tslint:disable:max-line-length
import {DivIcon, DivIconOptions} from 'leaflet';
import * as React from 'react';

export class FireDivIcon {
    constructor(options: Omit<DivIconOptions, 'html'> = {}) {
        const divIconOptions: DivIconOptions = {
                iconSize: [40, 40],
                bgPos: [0, 0],
                className: '',
                ...options,
                html:
                fireDivIconSvgStr,
            }
        ;
        return new DivIcon(divIconOptions);
    }
}

export const fireDivIconSvgStr = `<svg
            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            width="40px" height="40px" x="0px" y="0px" viewBox="0 0 512 512"
            xmlSpace="preserve"
        >
            <path
                style="fill: #FFB446;"
                d="M97.103,353.103C97.103,440.86,168.244,512,256,512l0,0c87.756,0,158.897-71.14,158.897-158.897
                    c0-88.276-44.138-158.897-14.524-220.69c0,0-47.27,8.828-73.752,79.448c0,0-88.276-88.276-51.394-211.862
                    c0,0-89.847,35.31-80.451,150.069c8.058,98.406-9.396,114.759-9.396,114.759c0-79.448-62.115-114.759-62.115-114.759
                    C141.241,247.172,97.103,273.655,97.103,353.103z"
            />
            <path
                style="fill: #FFDC64;"
                d="M370.696,390.734c0,66.093-51.033,122.516-117.114,121.241
                    c-62.188-1.198-108.457-48.514-103.512-110.321c2.207-27.586,23.172-72.276,57.379-117.517l22.805,13.793
                    C229.517,242.023,256,167.724,256,167.724C273.396,246.007,370.696,266.298,370.696,390.734z"/>
            <path
                style="fill: #FFFFFF;"
                d="M211.862,335.448c-8.828,52.966-26.483,72.249-26.483,105.931C185.379,476.69,216.998,512,256,512
                    l0,0c39.284,0,70.729-32.097,70.62-71.381c-0.295-105.508-61.792-158.136-61.792-158.136c8.828,52.966-17.655,79.448-17.655,79.448
                    C236.141,345.385,211.862,335.448,211.862,335.448z"
            />
        </svg>`;
