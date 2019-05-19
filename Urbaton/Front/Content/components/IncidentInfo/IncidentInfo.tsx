import CrossIcon from '@skbkontur/react-icons/Delete';
import {Coordinate} from 'components/Coordinate/Coordinate';
import {IncidentImages} from 'components/IncidentImages/IncidentImages';
import {IncidentStatus} from 'components/IncidentStatus/IncidentStatus';
import {IIncident} from 'domain/IIncident';
import {IPoint} from 'domain/IPoint';
import * as React from 'react';
import Button from 'retail-ui/components/Button/Button';
import Hint from 'retail-ui/components/Hint/Hint';
import Link from 'retail-ui/components/Link/Link';
import {toDateTimeStr} from 'utils/dateUtils';
import styles from './IncidentInfo.scss';

interface IIncidentInfoProps {
    incident: IIncident;
    onClose: () => void;
    onToMap: (coordinate: IPoint) => void;
}

export function IncidentInfo({incident, onClose, onToMap}: IIncidentInfoProps) {
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
            <div className={styles.incidentInfo}>
                <IncidentStatus status={incident.status}/>
                <p>
                    <span>Место:</span>{' '}
                    <Hint text="Перейти к карте">
                        <Button use="link" onClick={() => onToMap(incident.location)}>
                            <Coordinate {...incident.location}/>
                        </Button>
                    </Hint>
                </p>
                <p>
                    Описание: {incident.description}
                </p>
                <p>
                    customText: {incident.customText}
                </p>
                <Link href="https://t.me/UrbaBurbaBot?start">Создать мероприятие</Link>
                <IncidentImages images={incident.images}/>
            </div>
        </div>
    );
}
