interface IPageInfo {
    page: Page;
    title: string;
}

export type Page = 'incidents' | 'meets';

export const incidentsRoute: Page = 'incidents';
export const myMeetsRoute: Page = 'meets';

export const pages: Page[] = [incidentsRoute, myMeetsRoute];
export const pagesInfo: IPageInfo[] = [
    {page: incidentsRoute, title: 'Все инциденты'},
    {page: myMeetsRoute, title: 'Мероприятия'},
];
