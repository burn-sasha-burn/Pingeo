import OkIcon from '@skbkontur/react-icons/Ok';
import {broomDivIconSvgStr} from 'components/DivIcons/BroomDivIcon';
import {fireDivIconFocusedSvgStr} from 'components/DivIcons/FireIconFocused';
import {IStatus, NamedStatuses} from 'domain/IStatus';
import * as React from 'react';
import styles from './IncidentStatus.scss';

interface IIncidentStatusProps {
    status: IStatus;
}

export function IncidentStatus({status}: IIncidentStatusProps) {
    if (status === IStatus.New) {
        return (
            <span className={styles.new}>
                <span className={styles.newIcon} dangerouslySetInnerHTML={{__html: fireDivIconFocusedSvgStr}}/>
                <span className={styles.text}>{NamedStatuses[status]}</span>
            </span>
        );
    }
    if (status === IStatus.Process) {
        return (
            <span>
                <span className={styles.newIcon} dangerouslySetInnerHTML={{__html: broomDivIconSvgStr}}/>
                <span className={styles.text}>{NamedStatuses[status]}</span>
            </span>
        );
    }

    if (status === IStatus.Finished) {
        return (
            <span className={styles.success}>
                <OkIcon size={24}/>
                <span className={styles.text}>{NamedStatuses[status]}</span>
            </span>
        );
    }

    return null;
}
