interface IPageInfo {
    page: Page;
    title: string;
}

export type Page = 'incidents' | 'meetups';

export const incidentsRoute: Page = 'incidents';
export const meetupsRoute: Page = 'meetups';

export const pages: Page[] = [incidentsRoute, meetupsRoute];
export const pagesInfo: IPageInfo[] = [
    {page: incidentsRoute, title: 'Все инциденты'},
    {page: meetupsRoute, title: 'Мероприятия'},
];
