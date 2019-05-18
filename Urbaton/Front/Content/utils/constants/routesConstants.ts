export type Page = 'incidents' | 'myIncidents' | 'myMeets';

export const incidentsRoute: Page = 'incidents';
export const myIncidentsRoute: Page = 'myIncidents';
export const myMeetsRoute: Page = 'myMeets';
export const pages: Page[] = [incidentsRoute, myIncidentsRoute, myMeetsRoute];
