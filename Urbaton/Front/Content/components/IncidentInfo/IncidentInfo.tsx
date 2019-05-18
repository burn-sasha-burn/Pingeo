import CrossIcon from '@skbkontur/react-icons/Delete';
import {Coordinate} from 'components/Coordinate/Coordinate';
import {IncidentStatus} from 'components/IncidentStatus/IncidentStatus';
import {IIncident} from 'domain/IIncident';
import * as React from 'react';
import {toDateTimeStr} from 'utils/dateUtils';
import styles from './IncidentInfo.scss';

interface IIncidentInfoProps {
    incident: IIncident;
    onClose: () => void;
}

export function IncidentInfo({incident, onClose}: IIncidentInfoProps) {
    if (!incident) {
        return null;
    }

    return (
        <div className={styles.incident}>
            <div className={styles.header}>
                <h1>Инцидент от {toDateTimeStr(incident.creationDate)}</h1>
                <button className={styles.close} onClick={onClose}>
                    <CrossIcon/>
                </button>
            </div>
            <IncidentStatus status={incident.status}/>
            <p>
                <span>Место:</span> <Coordinate {...incident.location}/>
            </p>
            <p>
                Описание: {incident.description}
            </p>
            <p>
                customText: {incident.customText}
            </p>
        </div>
    );
}
