export enum IStatus {
    New = 'New',
    Process = 'Process',
    Finished = 'Finished',
}

export const NamedStatuses: ITypedObject<string> = {
    New: 'Новый',
    Process: 'В процессе',
    Finished: 'Завершен',
};

export const Statuses: IStatus[] = [
    IStatus.New,
    IStatus.Process,
    IStatus.Finished,
];
