export const editMarksPath = 'editMarks';
export const newMarksPath = 'newMarks';
export const backupsPath = 'backups';

export interface IGeneralEditInfo<T> {
    [editMarksPath]: { [key: string]: boolean };
    [newMarksPath]: { [key: string]: boolean };
    [backupsPath]: { [key: string]: T };
}
