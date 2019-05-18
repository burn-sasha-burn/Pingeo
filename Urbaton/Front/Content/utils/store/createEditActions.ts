import {backupsPath, editMarksPath, IGeneralEditInfo, newMarksPath} from 'domain/IGeneralEditInfo';
import {Error} from 'tslint/lib/error';
import {immutableDeleteIn, immutableSetIn} from 'utils/deepGetSet';
import {IGeneralGetState, GeneralThunkAction, GeneralThunkDispatch, PayloadedAction} from 'utils/store/actionTypes';

type EntitiesSelector<T> = (stage: IGeneralObject) => ITypedObject<T>;
type EditInfoSelector<T> = (stage: IGeneralObject) => IGeneralEditInfo<T>;

type UpdateEditInfoAction<T> = (editInfo: IGeneralEditInfo<T>) => PayloadedAction<IGeneralEditInfo<T>>;
type StartEditAction<T> = (id: string, isNew: boolean) => GeneralThunkAction<void>;
type CompleteEditAction<T> = (id: string) => GeneralThunkAction<Promise<T>>;
type CancelEditAction<T> = (id: string) => GeneralThunkAction<void>;

/**
 * Создает экшены для начала, отмены, схоранения редактирования объекта
 * @param {string} entityName
 * @param {EntitiesSelector<T>} entitiesByIdSelector
 * @param {EditInfoSelector<T>} editInfoSelector
 * @param {(entity: T | T[]) => PayloadedAction<T[]>} saveEntityAction
 * @param {(entity: T) => Promise<T>} updateEntityOnServer
 * @returns {{updateEditInfoActionType: string; updateEditInfo: UpdateEditInfoAction<T>;
 * startEdit: StartEditAction<T>; completeEdit: CompleteEditAction<T>; cancelEdit: CancelEditAction<T>}}
 */
export function createEditActions<T>(
    entityName: string,
    entitiesByIdSelector: EntitiesSelector<T>,
    editInfoSelector: EditInfoSelector<T>,
    saveEntityAction: (entity: T | T[]) => PayloadedAction<T[]>,
    updateEntityOnServer: (entity: T) => Promise<T>,
): {
    updateEditInfoActionType: string,
    updateEditInfo: UpdateEditInfoAction<T>,
    startEdit: StartEditAction<T>,
    completeEdit: CompleteEditAction<T>,
    cancelEdit: CancelEditAction<T>,
} {

    const UPDATE_EDIT_INFO_ACTION_TYPE = `UPDATE_${entityName}_EDIT_INFO`;

    function updateEditInfo(editInfo: IGeneralEditInfo<T>): PayloadedAction<IGeneralEditInfo<T>> {
        return {type: UPDATE_EDIT_INFO_ACTION_TYPE, payload: editInfo};
    }

    function startEdit(id: string, isNew: boolean = false): GeneralThunkAction<void> {
        return (dispatch: GeneralThunkDispatch, getState: IGeneralGetState) => {
            const prevEditInfo = editInfoSelector(getState());
            const entitiesById = entitiesByIdSelector(getState());

            let nextEditInfos = immutableSetIn(prevEditInfo, [editMarksPath, id], true);
            if (isNew) {
                nextEditInfos = immutableSetIn(nextEditInfos, [newMarksPath, id], true);
            }
            nextEditInfos = immutableSetIn(nextEditInfos, [backupsPath, id], entitiesById[id] || {});

            dispatch(updateEditInfo(nextEditInfos as IGeneralEditInfo<T>));
        };
    }

    function completeEdit(id: string): GeneralThunkAction<Promise<T>> {
        return (dispatch: GeneralThunkDispatch, getState: IGeneralGetState) => {
            const prevEditInfos = editInfoSelector(getState());
            const entitiesById = entitiesByIdSelector(getState());

            const completingEntity = entitiesById[id];
            if (!completingEntity) {
                return Promise.reject(new Error(`Can't complete edit of not found ${entityName} with id: (${id})`));
            }

            updateEntityOnServer(completingEntity)
                .then(() => {
                    let nextEditInfos = immutableDeleteIn(prevEditInfos, ['editMarks', id]);
                    nextEditInfos = immutableDeleteIn(nextEditInfos, ['newMarks', id]);
                    nextEditInfos = immutableDeleteIn(nextEditInfos, ['backups', id]);

                    dispatch(updateEditInfo(nextEditInfos as IGeneralEditInfo<T>));
                });
        };
    }

    function cancelEdit(id: string): GeneralThunkAction<void> {
        return (dispatch: GeneralThunkDispatch, getState: IGeneralGetState) => {
            const prevEditInfos = editInfoSelector(getState());

            const originalEntity = prevEditInfos.backups[id];

            let nextEditInfos = immutableDeleteIn(prevEditInfos, ['editMarks', id]);
            nextEditInfos = immutableDeleteIn(nextEditInfos, ['newMarks', id]);
            nextEditInfos = immutableDeleteIn(nextEditInfos, ['backups', id]);

            dispatch(updateEditInfo(nextEditInfos as IGeneralEditInfo<T>));
            dispatch(saveEntityAction(originalEntity));
        };
    }

    return {
        updateEditInfoActionType: UPDATE_EDIT_INFO_ACTION_TYPE,
        updateEditInfo,
        startEdit,
        completeEdit,
        cancelEdit,
    };
}
