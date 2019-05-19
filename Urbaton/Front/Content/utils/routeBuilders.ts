import {Location} from 'history';
import {incidentsRoute, meetupsRoute, Page, pages} from 'utils/constants/routesConstants';

export const buildPageRoute = (page: Page) => `/${page}`;
export const buildIncidentsRoute = () => `/${incidentsRoute}`;
export const buildMeetupsRoute = () => `/${meetupsRoute}`;

export function buildSelectedIncidentRoute(location: Location, incidentId: string): string {
    return `${buildCurrentPageRoute(location)}/${incidentId}`;
}

export function buildCurrentPageRoute(location: Location): string {
    const pathInfo = parsePath(location && location.pathname);
    return `/${pathInfo.page}`;
}

export function parsePath(path: string = ''): { page: Page, incident: string } {
    const [, page, incident] = location.pathname.split('/');
    const inLowerCase = page.toLowerCase();
    const selectedPage = pages.includes(inLowerCase as Page) ? inLowerCase as Page : incidentsRoute;
    return {page: selectedPage, incident: incident || null};
}
