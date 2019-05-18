import CrossIcon from '@skbkontur/react-icons/Delete';
import {Coordinate} from 'components/Coordinate/Coordinate';
import {IIncident} from 'domain/IIncident';
import * as React from 'react';
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
                <h1>Инцидент № я хз</h1>
                <button className={styles.close} onClick={onClose}>
                    <CrossIcon/>
                </button>
            </div>
            <p>
                Место: <Coordinate {...incident.location}/>
            </p>
            <br/>
            <p>
                Описание: {incident.description}
            </p>
        </div>
    );
}
